
import { 
    Box, 
    Center, 
    HStack, 
    Switch, 
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useToast,
} from "@chakra-ui/react"
import banner from '../resource/hubBanner2.jpg'
import { useEffect, useState } from "react"
import { API_SERVER } from "../properties"
import axios from "axios"
import useLoginToken from '../hooks/useLoginToken'
import { useNavigate } from "react-router-dom"

export default function HubBanner ({users, setter}) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const navigate = useNavigate()
    const [isHubOpen, setHubOpen] = useState(false)
    const token = useLoginToken()
    const toast = useToast()

    const onClickHubOpenSwitch = () => {
        if (token === null) {
            onOpen()
            return
        }

        axios.get(API_SERVER + '/hub/toggle', {headers: {Authorization: localStorage.getItem('9token')}}).then(res => {
            const result = res.data
            console.log(result)
            setHubOpen(result.status)
            setter(result.previews)

        }).catch(err => {
            const code = err.response.data.code
            if (code === "MalformedException") {
                toast({
                    title: '프로필을 완성해주세요',
                    status: 'info'
                })
                navigate('/profile/modify')
            }
        })
    }

    useEffect(() => {
        axios.get(API_SERVER + '/hub/status', {headers: {Authorization: localStorage.getItem('9token')}}).then(res =>
            setHubOpen(res.data))
    }, [])

    return (
        <Box h={'227px'} backgroundImage={banner} backgroundRepeat={'no-repeat'} backgroundSize={'cover'}>
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
            <Center h={'100%'} flexDir={'column'}>
                <Box>
                    <Text color={'#191F28'} fontSize={'32px'} fontWeight={'bold'} mb={5}>이런 개발자들이 활동하고 있어요!</Text>
                </Box>
                <HStack spacing={5}>
                    <Box 
                        display={'flex'} 
                        alignItems={'center'} 
                        justifyContent={'center'}
                        bgColor={'white'} 
                        padding={'12px 24px 12px 24px'} 
                        border={'3px solid rgb(234, 236, 238)'}
                        borderRadius={'10px'}>
                        <Text fontWeight={500}>네트워크에 공개</Text>
                        {isHubOpen ? 
                            <Switch size={'md'} onChange={onClickHubOpenSwitch} isChecked/> 
                            :<Switch size={'md'} onChange={onClickHubOpenSwitch} />}
                    </Box>
                    <Box 
                        cursor={'pointer'}
                        display={'flex'} 
                        alignItems={'center'} 
                        justifyContent={'center'}
                        bgColor={'white'} 
                        padding={'12px 24px 12px 24px'} 
                        border={'3px solid rgb(234, 236, 238)'}
                        borderRadius={'10px'}>
                        <Text fontWeight={500}>내 프로필</Text>
                    </Box>
                </HStack>
            </Center>
        </Box>
    )
}