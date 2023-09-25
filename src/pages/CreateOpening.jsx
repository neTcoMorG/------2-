import { 
    Container, 
    VStack,
    HStack, 
    Box, 
    Input,
    FormControl,
    FormLabel,
    Button,
    useToast,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCateFields, useCateSkills, useOpeningTypes, useUserTypes } from "../hooks/useCategory";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { API_SERVER, MODE } from "../properties";

import {
    Select as MultiSelect
  } from "chakra-react-select";
import { useNavigate } from "react-router-dom";

export default function CreateOpening () {

    const navigate = useNavigate()
    const toast = useToast()

    const [image, setImage] = useState(null)

    const fieldCates = useCateFields()
    const skillCates = useCateSkills()
    const userTypesCates = useUserTypes()
    const openingTypeCates = useOpeningTypes()

    const [title, setTitle] = useState()
    const [type, setType] = useState()
    const [skills, setSkills] = useState([])
    const [userTypes, setUserTypes] = useState([])
    const [txt, setTxt] = useState()
    const [count, setCount] = useState(1)
    const [fields, setFields] = useState()

    const onChangeTitle = (e) => { setTitle(e.target.value) }
    const onChangeCount = (e) => { setCount(e) }

    const appendImage = (e) => {
        if (e.target.files === null) return;
        setImage(e.target.files[0])
    }

    const createOpening = () => {
        const formData = new FormData()
        const packet = {
            title,
            type: type.label,
            skills: skills.map(s => s.label),
            user_types: userTypes.map(ut => ut.label),
            txt,
            count,
            fields: fields.map(f => f.label),
            banner_url: MODE !== "test" ? API_SERVER + "/image?id=0fb36575-0c7a-4f90-9a38-755e3fbe0074" 
                : 'https://www.stockvault.net/data/2020/10/02/279352/preview16.jpg' 
        }
        
        formData.append('image', image)
        formData.append('data', new Blob([JSON.stringify(packet)], {type: 'application/json'}))
        
        axios.post(API_SERVER + '/opening', formData, {headers: {
            Authorization: localStorage.getItem('9token'),
            'Content-Type': 'multipart/form-data'
        }}).then(res => {
            navigate('/opening/' + res.data)
            toast({
                title: '공고를 생성했어요! 지원자를 기다려봐요'
            })
        })
        .catch(err => {
            toast({
                status: 'error',
                title: err.response.data.msg
            })
        })
    }

    return (
        <Container maxWidth={'1160px'} p={'32px'}>
            <HStack align={'flex-start'} spacing={20}>
                <VStack align={'flex-start'} spacing={5} w={'80%'}>
                    <FormControl isRequired>
                        <FormLabel>제목</FormLabel>
                        <Input onChange={onChangeTitle} value={title} placeholder='백엔드 개발자 구해요!'/>
                    </FormControl>
                    <HStack w={'100%'}>
                        <FormControl isRequired>
                            <FormLabel>공고 유형</FormLabel>
                            <MultiSelect 
                                options={openingTypeCates}
                                value={type}
                                onChange={setType}
                                placeholder={'공고 유형'}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>모집 유형</FormLabel>
                            <MultiSelect 
                                isMulti
                                options={fieldCates}
                                value={fields}
                                onChange={setFields}
                                placeholder={'모집 유형'}
                                closeMenuOnSelect={false}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>모집 인원 수</FormLabel>
                            <NumberInput
                                defaultValue={1} min={1} max={20}
                                placeholder="몇명을 구해요?" 
                                onChange={onChangeCount} 
                                value={count} >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                    </HStack>
                    <HStack w={'100%'}>
                        <FormControl isRequired>
                            <FormLabel>작성중인 공고에 사용될 기술</FormLabel>
                            <MultiSelect 
                                isMulti
                                options={skillCates}
                                value={skills}
                                onChange={setSkills}
                                closeMenuOnSelect={false}
                                placeholder={'기술 선택'}
                                isOptionDisabled={() => skills.length === 6}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>모집 인원 조건</FormLabel>
                            <MultiSelect 
                                isMulti
                                options={userTypesCates}
                                value={userTypes}
                                onChange={setUserTypes}
                                closeMenuOnSelect={false}
                                placeholder={'조건 선택'}
                            />
                        </FormControl>
                    </HStack>
                </VStack>
                <Box w={'30%'} h={'100%'}>
                    <Box w={'100%'} >
                        <FormControl isRequired>
                                <FormLabel>배너 사진</FormLabel>
                                <Input 
                                    border={'1px solid rgb(234, 236, 238)'} 
                                    h={'250px'}
                                    type="file"
                                    accept={['.jpg', '.png']} 
                                    onChange={appendImage}
                                />
                        </FormControl>
                    </Box>
                </Box>
            </HStack>
            <Box mt={10} h={'500px'}>
                <MDEditor 
                    value={txt}
                    onChange={setTxt}
                    style={{ whiteSpace: 'pre-wrap' }}
                    height={'100%'}
                />
            </Box>
            <Button colorScheme={'teal'} w={'100%'} mt={'40px'} h={'50px'} onClick={createOpening}>공고글 올리기</Button>
        </Container>
    ) 
}