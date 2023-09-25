import { 
    HStack, 
    Box,
    Text,
    Container, 
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_SERVER } from "../properties";
import UserProfile from "../components/UserProfile";
import UserComment from "../components/UserComment";

export default function HubProfile () {

    const {email} = useParams()
    const [data, setData] = useState()

    const navigate = useNavigate()
    
    useEffect(() => {   
        axios.get(API_SERVER + '/hub/user/' + email).then(res => {
            setData(res.data)
        })
        .catch(err => {
            const code = err.response.data.code
            if (code === "PermissionException") {
                alert('프로필이 닫혀있습니다')
                navigate(-1)
            }
        })
    }, [email])

    return (
        <Container maxW={'1400px'} p={'32px 0 32px 0'}>
            {data &&
            <HStack spacing={6} justifyContent={'center'} alignItems={'flex-start'} w={'100%'}>
                <Box w={'65%'}>
                    <UserProfile user={data.user} />
                </Box>
                <Box w={'25%'}>
                    <Text fontSize={'18px'} fontWeight={'bold'} pb={2}>반응 ({data.reactions.length})</Text>
                    <UserComment 
                        nickname={email} 
                        reactions={data.reactions} 
                        setter={setData}
                        before={data}
                    />
                </Box>
            </HStack>
            }
        </Container>
    )
}