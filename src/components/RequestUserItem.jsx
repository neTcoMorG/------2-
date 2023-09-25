
import { 
    Box,
    HStack,
    Avatar,
    VStack,
    Text,
    Badge
 } from "@chakra-ui/react"

export default function RequestUserItem ({user, profileClickHandler}) {

    if (user.status == "ALLOW") {
        return (
            <Box w={'100%'} bgColor={'green.100'} onClick={profileClickHandler}>
                <HStack spacing={3}>
                    <Avatar src={user.avatar_url} p={0} m={0} />
                    <VStack alignItems={'flex-start'} spacing={1}>
                        <HStack cursor={'pointer'} spacing={1}>
                            <Text fontSize={'14px'} fontWeight={'bold'}>{user.nickname}</Text>
                            <Badge m={0}>{user.type}</Badge>
                        </HStack>
                        <HStack spacing={1} wrap={'wrap'}>
                        {user.skills.map(skill => 
                            <Text color={'gray'} fontSize={'8px'}>{skill}</Text>)}
                        </HStack>
                    </VStack>
                </HStack>
            </Box>)
    }

    if (user.status === "DENY") {
        return (
            <Box w={'100%'} bgColor={'red.100'} onClick={profileClickHandler}>
                <HStack spacing={3}>
                    <Avatar src={user.avatar_url} p={0} m={0} />
                    <VStack alignItems={'flex-start'} spacing={1}>
                        <HStack cursor={'pointer'} spacing={1}>
                            <Text fontSize={'14px'} fontWeight={'bold'}>{user.nickname}</Text>
                            <Badge m={0}>{user.type}</Badge>
                        </HStack>
                        <HStack spacing={1} wrap={'wrap'}>
                        {user.skills.map(skill => 
                            <Text color={'gray'} fontSize={'8px'}>{skill}</Text>)}
                        </HStack>
                    </VStack>
                </HStack>
            </Box>)
    }

    return (<Box onClick={profileClickHandler}>
        <HStack spacing={3}>
            <Avatar src={user.avatar_url} p={0} m={0} />
            <VStack alignItems={'flex-start'} spacing={1}>
                <HStack cursor={'pointer'} spacing={1}>
                    <Text fontSize={'14px'} fontWeight={'bold'}>{user.nickname}</Text>
                    <Badge m={0}>{user.type}</Badge>
                </HStack>
                <HStack wrap={'wrap'} spacing={1}>
                {user.skills.map(skill => 
                    <Text color={'gray'} fontSize={'8px'}>{skill}</Text>)}
                </HStack>
            </VStack>
        </HStack>
    </Box>)
}