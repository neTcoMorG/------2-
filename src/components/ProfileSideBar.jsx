
import { Box, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function ProfileSideBar () {
    return (
        <Box boxShadow={'base'} borderRadius={'10px'} p={"20px 20px 20px 20px"} fontSize={'15px'} bgColor={'white'} w={'200px'}>
            <Box>
                <Text 
                    fontSize={'14px'} 
                    color={'gray'} 
                    fontWeight={'bold'} 
                    borderBottom={'1px solid rgb(234, 236, 238)'}
                    paddingBottom={'10px'}>프로필</Text>
                <VStack alignItems={'start'} mt={4} spacing={4}>
                    <Box>
                        <Link style={{margin: 0, padding: 0}} to={'/profile'} bgColor><Text>내 프로필</Text></Link>
                    </Box>
                    <Box>
                        <Link style={{margin: 0, padding: 0}} to={'/profile/requests'}><Text>제출한 지원서</Text></Link>
                    </Box>
                    <Box>
                        <Link style={{margin: 0, padding: 0}} to={'/profile/bookmark'}><Text>북마크한 공고</Text></Link>
                    </Box>
                    <Box>
                        <Link style={{margin: 0, padding: 0}} to={'/profile/bookmark'}><Text>제안하기 리스트</Text></Link>
                    </Box>
                </VStack>
            </Box>
            <Box mt={10}>
                <Text 
                    fontSize={'14px'} 
                    color={'gray'} 
                    fontWeight={'bold'} 
                    borderBottom={'1px solid rgb(234, 236, 238)'}
                    paddingBottom={'10px'}>공고</Text>
                <VStack alignItems={'start'} spacing={4} mt={4}>
                    <Link to={'/profile/opening'} style={{margin: 0, padding: 0}}><Text>공고 관리</Text></Link>
                </VStack>
            </Box>
        </Box>
    )
}