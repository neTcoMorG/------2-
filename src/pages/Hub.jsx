
import { 
    Box, Text, Container, HStack, Grid, Stack, Wrap, WrapItem, Flex, Center
} from '@chakra-ui/react'
import ProfileCard from '../components/ProfileCard'

import { useCateFields } from '../hooks/useCategory'
import HubBanner from '../components/HubBanner'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_SERVER } from '../properties'

export default function Hub() {
    
    const cateFields = useCateFields()
    const [users, setUsers] = useState()

    const onSearch = (e) => {
        if (e.target.id === "") {
            axios.get(API_SERVER + '/hub/users') .then(res => {
                setUsers(res.data.content)
            })
        }

        axios.get(API_SERVER + '/hub/users?field=' + e.target.id).then(res => setUsers(res.data.content))
    }

    useEffect(() => {
        axios.get(API_SERVER + '/hub/users') .then(res => {
            setUsers(res.data.content)
        })
    }, [])

    return (
        <Box>
            <HubBanner users={users} setter={setUsers} />
            <Container maxW={'1250px'} p={'0 0 32px 0'}>
                <HStack spacing={5} alignItems={'flex-start'} w={'100%'} p={'34px'}>
                    <Box w={'15%'}>
                        <Text fontSize={'15px'} fontWeight={'bold'} pb={5}>분야 선택</Text>
                        <Stack direction={'row'} wrap={'wrap'}>
                            <Box onClick={onSearch} cursor={'pointer'} p={'6px 12px 6px 12px'} border={'1px solid #e9e9e9'} borderRadius={'17px'}>
                                <Text fontSize={'15px'} onClick={onSearch}>전체</Text>
                            </Box>
                            {cateFields && cateFields.map(f => 
                                <Box cursor={'pointer'} p={'6px 12px 6px 12px'} border={'1px solid #e9e9e9'} borderRadius={'17px'}>
                                    <Text id={f.label} fontSize={'15px'} onClick={onSearch}>{f.label}</Text>
                                </Box>)}
                        </Stack>
                    </Box>
                    <Grid w={'85%'} templateColumns='repeat(4, 1fr)' gap={4} p={'0 32px 0 32px'}>
                        {users && users.map(user => 
                            <ProfileCard user={user} />)}
                    </Grid>
                </HStack>
            </Container>
        </Box>
    )
}
