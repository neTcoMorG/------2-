import { 
    Container, HStack, Box, Text, Avatar, Badge, VStack, Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_SERVER } from "../properties";
import { useNavigate, useParams } from "react-router-dom";
import RequestUserItem from "../components/RequestUserItem";

import kakao from '../resource/kakao.png'
import discord from '../resource/discord.png'

export default function OpeningManagerDetail () {

    const {id} = useParams();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const navigate = useNavigate()

    const [contract, setContract] = useState()
    const [requestUsers, setRequestUsers] = useState([])
    const [selectUser, setSelectUser] = useState(0)
    
    // tmp
    const [openingId, setOpeningId] = useState()

    const onProfileClick = (idx) => { setSelectUser(idx) }

    const requestProcess = (status) => {
        const packet = {
            opening_id: id,
            request_user_id: requestUsers[selectUser].user_id,
            status
        }

        axios.post(API_SERVER + '/opening/requests/process', JSON.stringify(packet), {headers: {
            Authorization: localStorage.getItem('9token'),
            'Content-Type': 'application/json' }})

        requestUsers[selectUser].status = status
        setRequestUsers([...requestUsers])
    }

    const checkContract = () => {
        const packet = {
            opening_id: openingId,
            nickname: requestUsers[selectUser].nickname
        }
        axios.post(API_SERVER + '/opening/contract', JSON.stringify(packet), {headers: {
            Authorization: localStorage.getItem('9token'),
            'Content-Type': 'application/json'}})
        .then(res => {
            setContract(res.data)
            onOpen()
        })
    }

    useEffect(() => {
        axios.get(API_SERVER + '/opening/requests/' + id, {headers: {
            Authorization: localStorage.getItem('9token')
        }})
        .then(res => {
            if (res.data.length == 0) {
                alert('아직 지원자가 없어요')
                navigate(-1)
                return
            }
            setRequestUsers(res.data.requests)
            setOpeningId(res.data.opening_id)
        })
    }, [])

    return (
        <>
            <>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>연락처</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack alignItems={'flex-start'} spacing={3}>
                                <HStack spacing={4}>
                                    <Avatar src={''} size={'sm'}/>
                                    {contract && contract.phone !== "" ?
                                        <Text fontSize={'16px'}>{contract.phone}</Text> : <Text fontSize={'16px'}>없음</Text>}
                                </HStack>
                                <HStack spacing={4}>
                                    <Avatar src={kakao} size={'sm'}/>
                                    {contract && contract.kakao !== "" ?
                                        <Text fontSize={'16px'}>{contract.kakao}</Text> : <Text fontSize={'16px'}>없음</Text>}
                                </HStack>
                                <HStack spacing={4}>
                                    <Avatar src={discord} size={'sm'}/>
                                    {contract && contract.discord !== "" ?
                                        <Text fontSize={'16px'}>{contract.discord}</Text> : <Text fontSize={'16px'}>없음</Text>}
                                </HStack>
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button mr={3} onClick={onClose} border={'1px solid rgb(234, 236, 238)'} bgColor={'white'}>
                                닫기
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
            <Container maxWidth={'1300px'} p={'10px 10px 30px 10px'}>
                <HStack mt={6} spacing={4} alignItems={'flex-start'}>
                    { requestUsers[selectUser] &&    
                    <Box boxShadow={'lg'} w={'75%'} p={'10px 50px 60px 50px'} position={'relative'}>
                        <HStack position={'absolute'} right={'38px'} top={5}>
                            {requestUsers[selectUser].status === "WAIT" ? 
                            <>
                                <Button onClick={() => requestProcess('ALLOW')} colorScheme={'blue'} fontSize={'14px'} w={'100px'}>같이해요</Button>
                                <Button onClick={() => requestProcess('DENY')}  colorScheme={'red'}  fontSize={'14px'} w={'100px'}>죄송해요</Button>
                            </> : null}
                            {requestUsers[selectUser].status === "ALLOW" ? 
                            <>
                                <Button colorScheme={'teal'} fontSize={'14px'} w={'150px'} onClick={checkContract}>연락처 확인</Button>
                            </> : null}
                            {requestUsers[selectUser].status === "DENY" ? 
                            <>
                                <Button colorScheme={'red'} fontSize={'14px'} w={'150px'}>다음에 만나요 ㅠ</Button>
                            </> : null}
                        </HStack>
                        <Box className="self" w={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} mt={5}>
                            <Avatar w={'218px'} h={'218px'} src={requestUsers[selectUser].avatar_url}/>
                            <Text mt={'16px'} fontSize={'40px'} fontWeight={'bold'}>{requestUsers[selectUser].nickname}</Text>
                            <HStack spacing={2} mt={4}>
                                {requestUsers[selectUser].fields && requestUsers[selectUser].fields.map(f =>
                                    <Badge m={0} fontSize={'24px'}>{f}</Badge>
                                )}
                                <Text fontSize={'24px'}>개발자</Text>
                            </HStack>
                            <Text mt={4} color={'#878E98'}>
                                <a style={{fontSize: '16px', margin: '0px'}} href={requestUsers[selectUser].repository}>{requestUsers[selectUser].repository}</a>
                            </Text>
                        </Box>
                        <Box mt={'52px'}>
                            <Text fontSize={'18px'}>{requestUsers[selectUser].about}</Text>
                        </Box>
                        <Box mt={'60px'}>
                            <Text fontSize={'30px'} fontWeight={'bold'}>기술 스택</Text>
                            <HStack wrap={'wrap'} mt={5}>
                                {requestUsers[selectUser].skills && requestUsers[selectUser].skills.map(skill =>  <Box p={'5px 16px 5px 16px'} style={{
                                    borderRadius: '15px',
                                    border: '1px solid rgb(223, 226, 230)',
                                    fontSize: '15px'
                                }} >{skill}</Box> )}
                            </HStack>
                        </Box>
                    </Box> }
                    <Box boxShadow={'base'} w={'25%'} p={'32px'}>
                        <Box borderBottom={'1px solid rgb(234, 236, 238)'} pb={3}>
                            <Text fontWeight={'bold'}>지원자 목록</Text>
                        </Box>
                        <VStack mt={4} spacing={5} alignItems={'flex-start'}>
                            {requestUsers && requestUsers.map((user, idx) =>  (
                                <RequestUserItem
                                    user={user}
                                    profileClickHandler={() => onProfileClick(idx)}
                                />
                            ))}
                        </VStack>
                    </Box>
                </HStack>
            </Container>
        </>
    )
}