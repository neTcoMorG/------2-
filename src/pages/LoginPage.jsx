
import { Container, Center, Text, Avatar, Box } from "@chakra-ui/react";
import { GITHUB_LOGIN_URL } from "../properties";

export default function LoginPage () {

    const login = () => {
        window.location.href = GITHUB_LOGIN_URL
    }
    
    return (
        <Container>
            <Box bgColor={'black'} borderRadius={10} mt={'50%'} cursor={'pointer'} onClick={login}>
                <Center p={'10px 0 10px 0'}>
                    <Avatar 
                        src="https://velog.velcdn.com/images/augus-xury/post/a3c5cffd-1919-4976-a82d-62826a4f020c/GitHub-APK-MOD-Download-1.18.0.png"
                        w={'50px'}
                        h={'50x'}
                        objectFit={'contain'}
                        m={0}
                        mr={2}
                    />
                    <Text color={'white'} fontWeight={'bold'} fontSize={'32px'}>
                        Github 계정으로 시작하기
                    </Text>
                </Center>
            </Box>
        </Container>
    )
}