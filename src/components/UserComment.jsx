import { Avatar, Box, HStack, VStack, Text, Badge, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { API_SERVER } from "../properties";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserComment ({nickname, reactions, setter, before}) {

    const navigate = useNavigate()
    const [isReaction , setReaction] = useState(false)
     
    const reaction = (type) => {
        axios.post(API_SERVER + '/hub/reaction/' + nickname, {type}, {headers: {
            Authorization: localStorage.getItem('9token'),
            'Content-Type': 'application/json'
        }})
        .then(res => {
            setter({
                ...before,
                reactions: res.data
            })
            setReaction(true)
        })
    }

    const cancel = () => {
        axios.post(API_SERVER + '/hub/reaction/delete', {nickname}, {headers: {
            Authorization: localStorage.getItem('9token'),
            'Content-Type': 'application/json'
        }})
        .then(res => {
            setter({
                ...before,
                reactions: res.data
            })
            setReaction(false)
        })
    }

    useEffect(() => {
        axios.get(API_SERVER + '/hub/reaction/status?nickname=' + nickname, {
            headers: {Authorization: localStorage.getItem('9token')}
        })
        .then(res => setReaction(res.data))
    }, [])

    if (reactions.length == 0) {
        return (
            <VStack spacing={5}>
                <Text fontWeight={'bold'} color={'gray'} fontSize={'18px'} p={'60px 0 60px 0'}>아직 반응이 없어요..</Text>
                <Box borderTop={'1px solid rgb(234, 236, 238)'} w={'100%'} p={'16px 16px 12px 16px'}>
                    <Text fontSize={'18px'} fontWeight={'bold'}>반응하기</Text>
                    <HStack spacing={2} wrap={'wrap'} pt={3}>
                        <Button onClick={() => reaction(true)}  h={'30px'} w={'auto'} colorScheme={'blue'} fontSize={'12px'}>대단해요</Button>
                        <Button onClick={() => reaction(false)} h={'30px'} w={'auto'} colorScheme={'red'} fontSize={'12px'}>별로에요</Button>
                    </HStack>
                </Box>
            </VStack>
        )
    }

    return (
        <VStack w={'100%'} border={'1px solid rgb(234, 236, 238)'} borderRadius={10} spacing={4} p={'16px 0 16px 0'}>
            {reactions && reactions.map(r =>
                <VStack w={'100%'} justifyContent={'flex-start'} spacing={4} p={'0 16px 0 16px'} cursor={'pointer'} onClick={() => {navigate('/hub/profile/' + r.user.nickname);}}>
                    <HStack w={'100%'} spacing={4} alignItems={'center'}>
                        <Avatar m={0} w={'48px'} h={'48px'} src={r.user.avatar_url} />
                        <VStack alignItems={'flex-start'} spacing={1}>
                            <Text fontSize={'14px'}>{r.user.nickname}</Text>
                            {r.type && <Badge m={0} colorScheme="blue" p={'1px 10px 1px 10px'}>대단해요</Badge> }
                            {!r.type && <Badge m={0} colorScheme="red" p={'1px 10px 1px 10px'}>별로에요</Badge> }
                        </VStack>
                    </HStack>
                </VStack>
            )}
            <Box borderTop={'1px solid rgb(234, 236, 238)'} w={'100%'} p={'16px 16px 12px 16px'}>
                <Text fontSize={'18px'} fontWeight={'bold'}>반응하기</Text>
                <HStack spacing={2} wrap={'wrap'} pt={3}>
                    
                    {isReaction == true ?
                        <Button w={'30%'} onClick={cancel} h={'30px'} colorScheme={'green'} fontSize={'12px'}>반응 삭제하기</Button> 
                    :<>
                        <Button onClick={() => reaction(true)}  h={'30px'} w={'auto'} colorScheme={'blue'} fontSize={'12px'}>대단해요</Button>
                        <Button onClick={() => reaction(false)} h={'30px'} w={'auto'} colorScheme={'red'} fontSize={'12px'}>별로에요</Button>
                    </> }
                </HStack>
            </Box>
        </VStack>
    )
}