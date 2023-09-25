
import { useEffect, useState } from 'react'
import styles from './Main.module.css'
import { 
    Box, 
    Button, 
    Center, 
    HStack, 
    Input,
    Select,
    Text,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'
import { Select as MultiSelect } from 'chakra-react-select'
import Pagination from 'react-js-pagination'

import Card from '../components/Card'
import { useCateSkills, useCateFields } from '../hooks/useCategory'
import { API_SERVER } from '../properties'


export default function Main () {
    
    const skillCates = useCateSkills()
    const fieldsCates = useCateFields()

    const navigate = useNavigate()
    const toast = useToast()

    const [skills, setSkills] = useState()
    const [fields, setFields] = useState()
    const [previews, setPreviews] = useState()
    const [pagination, setPagination] = useState({})

    const [searchTitle, setSearchTitle] = useState()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const getPreviews = (page, options) => {
        let query = "/opening/previews?page=" + page
        
        if (skills != null) {
            const skillsArray = skills.map(s => s.label)
            query += "&skills=" + skillsArray.join(',')
        }
        if (fields != null) {
            query += "&position=" + fields.label
        }
        if (searchTitle != null) {
            query += "&title=" + searchTitle
        }

        axios.get(API_SERVER + query)
            .then(res => {
                setPreviews(res.data.content)
                setPagination({
                    pageable: res.data.pageable,
                    size: res.data.size,
                    total: res.data.totalElements,
                    totalPages: res.data.totalPages,
                })
            })
    }

    const onEnter = (e) => {
        if (e.key === 'Enter') {
            getPreviews(0)
        }
    }

    const onCreateOpening = () => {
        axios.get(API_SERVER + '/user/status', {headers: {Authorization: localStorage.getItem('9token')}})
        .then(res => {
            if (res.data) {
                navigate('/opening/create')
            }
            else {    
                toast({
                    title: '프로필을 완성해주세요',
                    status: 'info'
                })
                navigate('/profile/modify')
            }
        })
        .catch(err => {
            const code = err.response.data.code
            if (code === "NotFoundException") {
                onOpen()
                return
            }
        })
    }

    const onSearchHandler = () => { getPreviews(0) }
    const onChangeValue = (e) => { setSearchTitle(e.target.value) }
    const onChangePage = (page) => { getPreviews(page-1) }

    useEffect(() => {
        getPreviews(0)
    }, [])
    
    return (
        <>
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>로그인이 필요합니다</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Button w={'100%'} bgColor={'black'} color={'white'} fontWeight={500}
                            onClick={() => window.location.href = "https://github.com/login/oauth/authorize?client_id=Iv1.4734d61391d516c5"}
                        >github 계정으로 시작하기</Button>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose} border={'1px solid rgb(234, 236, 238)'} bgColor={'white'}>
                            닫기
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
        <div className={styles.container}>
            <Box style={{backgroundImage: "linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%)"}}>
                <div className={styles.search_box}>
                    <div className={styles.search_form}>
                        <Box borderBottom={'1px solid black'} w={'100%'} h={'100%'} borderColor={'gainsboro'} display={'flex'} alignItems={'center'}>
                            <Input onChange={onChangeValue} onKeyPress={onEnter} type='text' border={'none'} placeholder='프로젝트/스터디 검색'/>
                            <Button onClick={onSearchHandler} w={'120px'}>검색</Button>
                        </Box>
                        <Box w={'100%'} h={'100%'} display={'flex'}>
                            <Box w={'50%'} h={'100%'} borderRight={'1px solid gainsboro'} display={'flex'} alignItems={'center'}>  
                                <Box width={'100%'} p={'0 10px 0 10px'}>
                                <MultiSelect 
                                    placeholder={'분야 선택'}
                                    options={fieldsCates}
                                    value={fields}
                                    onChange={setFields}
                                />
                                </Box>
                            </Box>
                            <HStack spacing={1} w={'80%'}>
                                <Text fontSize='15px' p={"0px 16px 0px 16px"} style={{
                                    position: 'relative',
                                    top: '-2px'
                                }}>
                                    <span className="material-symbols-outlined" style={{
                                        position: 'relative',
                                        bottom: '-5px',
                                        left: '-9px',
                                        fontSize: '22px',
                                        fontWeight: 'normal'
                                    }}>
                                        code
                                    </span>
                                    기술스택
                                </Text>
                                <Box width={'560px'}>
                                    <MultiSelect 
                                        isMulti
                                        options={skillCates}
                                        onChange={setSkills}
                                        value={skills}
                                        closeMenuOnSelect={false}
                                        placeholder={'기술 선택'}
                                    />
                                </Box>
                            </HStack>
                        </Box>
                    </div>
                </div>
            </Box>
            <div className={styles.wrapper}>
                <Box w={'100%'} p={'15px 32px 0 32px'}>
                    <HStack h={'57px'}>
                        <Button onClick={onCreateOpening} w={'120px'} bgColor={'#20d0b5'} fontSize={'15px'} fontWeight={500} color={'white'}>
                                모집하기
                            </Button>
                        <Select color={"#131313"} fontSize={'15px'} letterSpacing={'-1px'} w={'120px'}>
                            <option>최신순</option>
                            <option>인기순</option>
                        </Select>
                    </HStack>
                    {previews && previews.length === 0 ?
                            <Center w={'100%'} h={'370px'} fontSize={'32px'} color={'gray'}>
                                아무런 결과가 없어요
                            </Center>
                    :
                    <Box>
                        <Box mt={2} display={'grid'} gridTemplateColumns={'repeat(4, 1fr)'}  style={{position: 'relative', top: '-20px'}}>
                        {previews && previews.map(p => 
                            <Card 
                                teamName={p.writer}
                                title={p.title}
                                image={p.banner_url}
                                skills={p.skills}
                                userTypes={p.user_types}
                                openingId={p.id}
                            />)}
                        </Box>
                        <Center pb={'86px'} mt={5} w={'100%'}>
                            <Pagination
                                activePage={pagination.pageNumber}
                                itemsCountPerPage={pagination.size}
                                totalItemsCount={pagination.total}
                                pageRangeDisplayed={pagination.totalPages}
                                onChange={onChangePage}
                            />  
                        </Center>
                    </Box>}
                </Box>
            </div>
        </div>
        </>
    )
}