
import {
    Avatar,
    Badge,
    Box, 
    HStack,
    Text,
    VStack
} from '@chakra-ui/react'

export default function UserProfile ({user}) {
    return (
        <VStack spacing={5} p={'40px 50px 50px 50px'} border={'1px solid rgb(234, 236, 238)'} borderRadius={10}>
            <Avatar w={'210px'} h={'210px'} src={user.avatar_url} />
            <VStack spacing={1} pt={1}>
                {user.type === "실무자" ? <Badge fontSize={'24px'} borderRadius={10} colorScheme="red"       p={'5px 12px 5px 12px'} m={0}>{user.type}</Badge> : null}
                {user.type === "취준생" ? <Badge fontSize={'24px'} borderRadius={10} colorScheme="green"     p={'5px 12px 5px 12px'} m={0}>{user.type}</Badge> : null}
                {user.type === "꿈나무" ? <Badge fontSize={'24px'} borderRadius={10} p={'5px 12px 5px 12px'} m={0}>{user.type}</Badge> : null}
                <Text 
                    fontSize={'42px'} 
                    fontWeight={'bold'}>{user.nickname}</Text>
                <Text color={'gray'}>{user.repository}</Text>
            </VStack>
            <Box w={'100%'} pt={10}>
                <Text>{user.about}</Text>
            </Box>
            <Box w={'100%'} pt={10}>
                <VStack alignItems={'flex-start'} spacing={10}>
                    <Box>
                        <Text fontSize={'28px'} fontWeight={'bold'}>분야</Text>
                        <HStack wrap={'wrap'} pt={3}>
                            {user.fields.map(fields =>
                                <Badge m={0} p={'4px 8px 4px 8px'} borderRadius={10}>{fields}</Badge>)}
                        </HStack>
                    </Box>
                    <Box>
                        <Text fontSize={'28px'} fontWeight={'bold'}>기술스택</Text>
                        <HStack wrap={'wrap'} pt={3}>
                            {user.skills.map(skill =>
                                <Badge m={0} p={'4px 8px 4px 8px'} borderRadius={10}>{skill}</Badge>)}
                        </HStack>
                    </Box>
                </VStack>
            </Box>
        </VStack>
    )
}