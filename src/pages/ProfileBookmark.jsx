
import { 
    Box,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Avatar
} from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { API_SERVER } from "../properties"
import { Link } from "react-router-dom"

export default function ProfileBookmark () {

    const [marks, setMarks] = useState()
    
    useEffect(() => {
        axios.get(API_SERVER + '/user/bookmark', {headers: {
            Authorization: localStorage.getItem('9token')
        }})
        .then(res => {
            console.log(res.data)
            setMarks(res.data)
        })
    }, [])

    return (
        <Box boxShadow={'base'} borderRadius={'10px'} p={'32px 60px 60px 60px'} bgColor={'white'}>
            <Text fontSize={'24px'} color={'#212529'} fontWeight={'bold'}>북마크한 공고</Text>
             <Box mt={6}>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead bgColor={'rgb(248, 249, 250)'}>
                            <Tr>
                                <Th>공고</Th>
                                <Th>상태</Th>
                                <Th>기능</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {marks && marks.map(m => <Tr>
                                <Td>
                                    <HStack spacing={3}>
                                        <Avatar m={0} p={0} src={m.banner_url} />
                                        <Link to={'/opening/' + m.opening_id}><Text fontSize={'16px'}>{m.title}</Text></Link>
                                    </HStack>
                                </Td>
                                <Td>
                                    {m.open && 
                                        <Text fontWeight={'bold'} color={'green'}>모집중</Text>}
                                    {!m.open && 
                                        <Text fontWeight={'bold'} color={'crimson'}>마감</Text>}
                                </Td>
                                <Td>

                                </Td>
                            </Tr>)}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )  
}