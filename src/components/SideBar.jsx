
import { 
    Box,
    Button,
    Text 
} from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function SideBar () {
    return (
        <Box display={'flex'} bgColor={'#F8F9FA'} w={'100%'} h={'100vh'} overflow={'hidden'} fontFamily={'Noto Sans KR'}>
            <Box w={'238px'} borderRight={'1px solid rgb(234, 236, 238)'} bgColor={'white'} p={'0 12px 12px 12px'}>
                <Box className="header" p={'12px 24px 24px 12px'}>
                    <Text fontWeight={'bold'} letterSpacing={'-1px'} fontSize={'24px'}>구해YO</Text>
                    <Button colorScheme='teal' w={'100%'} h={'38px'} fontWeight={'bold'} lineHeight={'1.43'} mt={'24px'}>
                        <Text color={'white'}>새 모집 공고 만들기</Text>
                    </Button>
                </Box>
                <Box className="menuSection" p={'12px'}>
                    <Text fontSize={'12px'} color={'rgb(161, 170, 178)'} fontWeight={500}>팀 관리</Text>
                    <Link>
                        <Box className="link-item" display={'flex'} justifyContent={'flex-start'} fontSize={'15px'}>
                            <span className="material-symbols-outlined" style={{margin: 0, fontSize: '23px'}}>home</span>
                            <Text fontWeight={'bold'} marginLeft={'19px'}>팀정보 관리</Text>
                        </Box>
                    </Link>
                </Box>
                <Box className="menuSection" p={'12px'}>
                    <Text fontSize={'12px'} color={'rgb(161, 170, 178)'} fontWeight={500}>모집 관리</Text>
                    <Link>
                        <Box className="link-item" display={'flex'} justifyContent={'flex-start'} fontSize={'15px'}>
                            <span className="material-symbols-outlined" style={{margin: 0, fontSize: '23px'}}>home</span>
                            <Text fontWeight={'bold'} marginLeft={'19px'}>모집 중</Text>
                        </Box>
                    </Link>
                    <Link>
                        <Box className="link-item" display={'flex'} justifyContent={'flex-start'} fontSize={'15px'}>
                            <span className="material-symbols-outlined" style={{margin: 0, fontSize: '23px'}}>home</span>
                            <Text fontWeight={'bold'} marginLeft={'19px'}>접수 마감</Text>
                        </Box>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}