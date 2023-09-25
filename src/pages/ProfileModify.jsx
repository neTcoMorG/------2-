import { Box, Avatar, Button, Center, FormControl, FormLabel, HStack, Input, Textarea, VStack, useToast } from "@chakra-ui/react";
import { Select as MultiSelect } from "chakra-react-select";
import { useCateFields, useCateSkills, useUserTypes } from "../hooks/useCategory";
import { useState } from "react";
import UserProfile from "../hooks/useUserProfile";
import { API_SERVER } from "../properties";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ContractBox from "../components/ContractBox";

export default function ProfileModify () {

    const navigate = useNavigate()
    const toast = useToast()

    const skillCates = useCateSkills()
    const fieldCates = useCateFields()
    const userTypesCates = useUserTypes()
    const [profile, setProfile] = UserProfile()

    const [skills, setSkills]     = useState()
    const [fields, setFields]     = useState()
    const [type, setType]         = useState()
    const [contract, setContract] = useState({
        phone: "",
        kakao: "",
        discord: ""
    })

    const onChangeValue = (e) => {
        const {name, value} = e.target
        setProfile({
            ...profile,
            [name]: value
        })
    }

    const validateEmpty = () => {
        if (fields == null || fields == 0) {
            console.log('분야 입력바람')
            toast({
                title: '분야를 선택해주세요',
                status: 'error',
                isClosable: true,
            })
            return false
        }

        if (skills == null || skills.length == 0) {
            console.log('기술 입력바람')
            toast({
                title: '기술을 선택해주세요',
                status: 'error',
                isClosable: true,
            })
            return false
        }

        if (type == null) {
            toast({
                title: '역량을 선택해주세요',
                status: 'error',
                isClosable: true,
            })
            return false
        }

        if (contract.discord == "" && contract.kakao == "" && contract.phone == "") {
            toast({
                title: '하나 이상의 연락처를 등록해주세요',
                status: 'error',
                isClosable: true,
            })
            return false
        }

        return true
    }

    const modifyProfile = () => {
        if (validateEmpty()) {
            const packet = {
                ...profile,
                fields: fields.map(f => f.label),
                skills: skills.map(s => s.label),
                type: type.label,
                contract,
            }

            console.log(JSON.stringify(packet))

            axios.post(API_SERVER + "/user", JSON.stringify(packet), {headers: {
                Authorization: localStorage.getItem('9token'),
                'Content-Type': 'application/json' }})
            .then(res => {
                console.log(res.data)
                navigate('/profile')
    
            })
            .catch(err => {
                console.log(err.response)
            })
        }
    }
    
    return (
        <Box boxShadow={'base'} borderRadius={'10px'} p={'32px 32px 60px 60px'} bgColor={'white'}>
            <Box>
                <HStack>
                    <VStack width={'50%'}>
                        <Input 
                            name="nickname"
                            variant='flushed' placeholder="닉네임" 
                            value={profile.nickname}   onChange={onChangeValue}   />
                        <Input 
                            name="repository"
                            variant='flushed' placeholder="깃허브 주소" 
                            value={profile.repository} onChange={onChangeValue} />
                    </VStack>
                </HStack>
                <ContractBox object={contract} setter={setContract} />
                <HStack mt={'20px'}>
                    <FormControl isRequired>
                        <FormLabel>분야</FormLabel>
                        <MultiSelect 
                            isMulti
                            placeholder={'분야 선택'}
                            value={fields}
                            options={fieldCates}
                            onChange={setFields}
                            closeMenuOnSelect={false}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>보유한 기술</FormLabel>
                        <MultiSelect 
                            isMulti
                            placeholder={'기술 선택'}
                            value={skills}
                            options={skillCates}
                            onChange={setSkills}
                            closeMenuOnSelect={false}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>본인의 역량</FormLabel>
                        <MultiSelect 
                            value={type}
                            placeholder={'역량 선택'}
                            options={userTypesCates}
                            onChange={setType}
                            closeMenuOnSelect={false}
                        />
                    </FormControl>
                </HStack>
                <FormControl mt={8}>
                    <FormLabel>간단한 자기소개</FormLabel>
                    <Textarea name="about" onChange={onChangeValue} value={profile.about}>
                    </Textarea>
                </FormControl>
                <Button w={'100%'} colorScheme={'teal'} mt={8} onClick={modifyProfile}>변경하기</Button>
            </Box>
        </Box>
    )
}