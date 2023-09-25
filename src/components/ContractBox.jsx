import { 
    FormControl, 
    FormLabel, 
    VStack, Box, 
    Center, Text, Switch, HStack, Image,
    Alert,
    AlertIcon,
    Input,
 } from "@chakra-ui/react";

import kakao from '../resource/kakao.png'
import discord from '../resource/discord.png'
import { useState } from "react";

export default function ContractBox ({object, setter}) {

    const [status, setStatus] = useState({
        discord: false,
        kakao: false,
        phone: true,
    })

    const onChangeValue = (e) => {
        const {name, value} = e.target
        setter({
            ...object,
            [name]: value
        })
    }

    const changeStatus = (name) => {
        setStatus({
            ...status,
            [name]: !status[name]
        })
    }
    
    return (
        <FormControl isRequired p={'40px 0 70px 0'}>
            <FormLabel>연락처</FormLabel>
            <Alert status='info' w={'100%'} mb={3}>
                <AlertIcon />
                팀원 모집 혹은 가입할 때 반드시 필요한 정보에요! (최소 하나는 작성해야되요)
            </Alert>
            <HStack alignItems={'flex-start'} spacing={3}>
                <VStack spacing={5}>
                    <Box border={'1px solid rgb(234, 236, 238)'} borderRadius={10}>
                        <Center width={'250px'} h={'50px'}>
                            <Text fontWeight={500}>핸드폰</Text>
                            <Switch  size={'md'} ml={0} onChange={() => changeStatus('phone')} defaultChecked/>
                        </Center>
                    </Box>
                    {status.phone && 
                    <Box>
                        <Input name={'phone'} value={object.phone} onChange={onChangeValue} variant={'flushed'} placeholder={'전화번호'} />
                    </Box>}
                </VStack>
                <VStack spacing={5}>
                    <Box border={'1px solid rgb(234, 236, 238)'} borderRadius={10}>
                        <HStack width={'250px'} h={'50px'} justifyContent={'center'}>
                            <Image src={kakao} objectFit={'contain'} w={'30px'} h={'30px'} />
                            <Text fontWeight={500} pl={1}>카카오톡</Text>
                            <Switch size={'md'} ml={0} onChange={() => changeStatus('kakao')} />
                        </HStack> 
                    </Box>
                    {status.kakao && 
                    <Box>
                        <Input name={'kakao'} value={object.kakao} onChange={onChangeValue} variant={'flushed'} placeholder={'카카오톡 아이디'} />
                    </Box>}
                </VStack>
                <VStack spacing={5}>
                    <Box border={'1px solid rgb(234, 236, 238)'} borderRadius={10}>
                        <Center width={'250px'} h={'50px'}>
                            <Image src={discord} objectFit={'contain'} w={'30px'} h={'30px'} />
                            <Text fontWeight={500} pl={2}>디스코드</Text>
                            <Switch ml={0} size={'md'} onChange={() => changeStatus('discord')}/>
                        </Center>
                    </Box>
                    {status.discord &&
                    <Box>
                        <Input name={'discord'} value={object.discord} onChange={onChangeValue} variant={'flushed'} placeholder={'디스코드 아이디'} />
                    </Box>}
                </VStack>
            </HStack>
        </FormControl>
    )
}