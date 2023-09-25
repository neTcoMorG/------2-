
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
} from "@chakra-ui/react"
import useUserRequests from "../hooks/useUserRequests"
import RequestCancelButton from "../components/RequestCancelButton"

export default function ProfileRequest () {

    const [requests, setRequests] = useUserRequests()
    
    return (
        <Box height={'100%'} boxShadow={'base'} borderRadius={'10px'} p={'32px 60px 60px 60px'} bgColor={'white'}>
            <Text fontSize={'24px'} color={'#212529'} fontWeight={'bold'}>제출한 지원서</Text>
            <Box mt={6}>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead bgColor={'rgb(248, 249, 250)'}>
                            <Tr>
                                <Th>지원 날짜</Th>
                                <Th>공고명</Th>
                                <Th>상태</Th>
                                <Th>기능</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {requests && requests.map(req => <Tr>
                                <Td>{req.request_date}</Td>
                                <Td>{req.title}</Td>
                                <Td>
                                    {req.status === "WAIT" ? 
                                    <Text color={'gray'}>
                                        대기중
                                    </Text> : null}
                                    {req.status === "ALLOW" ? 
                                    <Text fontWeight={'bold'} color={'green'}>
                                        합격
                                    </Text> : null}
                                    {req.status === "DENY" ? 
                                    <Text fontWeight={'bold'} color={'red'}>
                                        불합격
                                    </Text> : null}
                                </Td>
                                <Td>
                                    <RequestCancelButton
                                        id={req.id}
                                        requests={requests}
                                        setter={setRequests}
                                        status={req.status}
                                    />
                                </Td>
                            </Tr>)}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}