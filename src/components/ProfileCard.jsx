
import { Box, Stack, Image, Text, Badge, HStack, Button, Grid, VStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import ProfileCardSkill from "./ProfileCardSkill";

export default function ProfileCard ({user}) {

    const navigate = useNavigate()

    return (
        <Box cursor={'pointer'} w={'210px'} onClick={() => navigate('/hub/profile/' + user.nickname)}>
            <Grid gridRowGap={1} templateRows='210px 85px 35px'> 
            {user && <>
                <Image 
                    w={'201px'}
                    borderRadius={'10px'}
                    objectFit={'cover'}
                    src={user.avatar_url}
                />
                <VStack alignItems={'flex-start'} spacing={2}>
                    <HStack>
                        <Text fontSize={'16px'} fontWeight={600}>{user.field} 개발자</Text>
                        {user.user_type === "실무자" ? <Badge colorScheme="red" p={'0 3px 0 3px'} m={0}>{user.user_type}</Badge> : null}
                        {user.user_type === "취준생" ? <Badge colorScheme="green" p={'0 3px 0 3px'} m={0}>{user.user_type}</Badge> : null}
                        {user.user_type === "꿈나무" ? <Badge p={'0 3px 0 3px'} m={0}>{user.user_type}</Badge> : null}
                    </HStack>
                    <Box>
                        <Text fontSize={'14px'} color={'gray'} fontWeight={400} w={'200px'} style={{
                            overflow:'hidden',
                            textOverflow: 'ellipsis',
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                        }}>
                            {user.about}
                        </Text>
                    </Box>
                </VStack>
                <ProfileCardSkill skills={user.skills} />
                <Button w={'100%'} h={'38px'} fontSize={'14px'} bgColor={'white'} border={'1px solid #e9e9e9'} borderRadius={5}>같이해요</Button>
            </> }
              
            </Grid>
        </Box>
    )
}