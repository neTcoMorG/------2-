import { Avatar, Box, Button, Image, Text, Badge, HStack  } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_SERVER } from "../properties";
import MDEditor from "@uiw/react-md-editor";
import { useToast } from '@chakra-ui/react'
import { useGetFetch } from '../hooks/useFetch'

export default function OpeningDetail () {

    const {id} = useParams();
    const navigate = useNavigate()
    const [data, setData] = useGetFetch("/opening/" + id)

    const toast = useToast()

    const bookmark = () => {
        axios.get(API_SERVER + '/opening/vote?id=' + id, {headers: {
            Authorization: localStorage.getItem('9token')
        }}).then(() => {
            setData({
                ...data,
                marked: !data.marked
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    const requestJoin = () => {
        axios.get(API_SERVER + '/opening/join/' + id, {headers: {
            Authorization: localStorage.getItem('9token')
        }}).then(res => {
            toast({
                colorScheme: 'teal',
                title: '성공적으로 요청되었어요',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        })
        .catch(err => {
            const code = err.response.data.code
            if (code === "NotFoundException") {
                navigate('/login')
            }
        })
    }

    return (
        <>
        {data && <Box p={'32px'} mt={'10px'} zIndex={2}>
            <Box w={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Box className="Header" w={'1052px'}>
                    <Box className={"HeaderName"} display={'flex'} alignItems={'center'} mb={'4px'}>
                        <Avatar src={data.writer_avatar} style={{
                            position: 'relative',
                            width: '34px',
                            height: '34px',
                            left: '-11px' }}/>
                        <Text fontSize={'18px'} fontWeight={600}>{data.nickname}</Text>
                    </Box>
                    <Text fontSize={'36px'} fontWeight={'bold'}>{data.title}</Text>
                </Box>
                <Box className="contentArea" display={'flex'} mt={'14px'}>
                    <Box w={'720px'} pb={'80px'}>
                        <HStack spacing={3} mb={'16px'}>
                                {data.skills && data.skills.map(skill => <Badge m={0} fontSize={'14px'} colorScheme='green' p={'5px 8px 5px 8px'}>{'#'+skill}</Badge>)}
                        </HStack>
                        <Image src={data.banner_url} 
                            w={'100%'} 
                            h={'394px'}
                            objectFit={'cover'} 
                            borderRadius={'6px'} />
                        <Box mt={'26px'}>
                            <MDEditor.Markdown source={data.txt} style={{backgroundColor: 'white', color:'white', fontFamily: 'Noto Sans KR' }}/>
                        </Box>
                    </Box>
                    <Box className="controlPanel" position="sticky" mt={'46px'} top={'86px'} w={'314px'} h={'300px'} p={'24px'} style={{
                            border: "1px solid rgb(234, 236, 238)",
                            borderRadius: "6px",
                            marginLeft: "16px" }}>
                        <Box mb={'14px'} style={{
                            overflow:'hidden',
                            textOverflow: 'ellipsis',
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'}}>
                            <Text fontSize={'20px'} fontWeight={'bold'}>{data.title}</Text>
                        </Box>
                        <Box>
                            <Box display={'flex'} h={'40px'} fontSize={'15px'} alignItems={'center'}>
                                <Text color={'#a1aab2'} w={'90px'}>유형</Text>
                                <Text>{data.type}</Text>
                            </Box>
                            <Box display={'flex'} h={'40px'} fontSize={'15px'} alignItems={'center'} style={{borderTop: 'solid 1px #f2f4f6'}}>
                                <Text color={'#a1aab2'} w={'90px'}>조건</Text>
                                <HStack spacing={1}>
                                {data.user_types.map(type => <Text fontWeight={600}>{type}</Text>)}
                                </HStack>
                            </Box>
                            <Box display={'flex'} h={'40px'} fontSize={'15px'} alignItems={'center'} style={{borderTop: 'solid 1px #f2f4f6'}}>
                                <Text color={'#a1aab2'} w={'90px'}>마감일</Text>
                                <Text>인원 충족 시 마감</Text>
                            </Box>
                        </Box>
                        <Box display={'flex'} mt={'15px'} justifyContent={'space-between'}>
                            <Button h={'43px'} w={'43px'} bgColor={'white'} border={'1px solid #eaecee'} >
                                {data.marked ? 
                                    <span onClick={bookmark} class="material-symbols-outlined" style={{
                                        position:'relative',
                                        left: '-8px',
                                        fontSize: '20px',
                                        fontWeight: '500',
                                        color: 'green'
                                    }}>
                                    beenhere
                                    </span> : 
                                    <span onClick={bookmark} class="material-symbols-outlined" style={{
                                        position:'relative',
                                        left: '-8px',
                                        fontSize: '20px',
                                        fontWeight: '500'
                                    }}>
                                        bookmark
                                    </span>    
                                }
                            </Button>
                            {!data.join ?   
                            <Button w={'212px'} onClick={requestJoin} h={'43px'} bgColor={'#00CCAA'} color={'white'} fontSize={'15px'} fontWeight={'bold'}>
                                같이해요
                            </Button>
                            : <Button w={'212px'} h={'43px'} bgColor={'gray'} color={'white'} fontSize={'15px'} fontWeight={'bold'} disabled>
                                이미 지원했어요
                            </Button>}
                        
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        }
        </>
    )
}