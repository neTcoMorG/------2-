import { Box, HStack, Badge } from "@chakra-ui/react";

export default function ProfileCardSkill ({skills}) {

    if (skills.length > 4) {
        return (
            <Box>
                <HStack wrap={'wrap'} spacing={'3px'}>
                    {skills && Array.from({length: 3}, (_, idx) => 
                    <Badge m={0} p={'3px 7px 3px 7px'} fontWeight={600} borderRadius={5} fontSize={'10px'}>
                        {skills[idx]}
                    </Badge>)}
                    <Badge m={0} p={'3px 7px 3px 7px'} fontWeight={'bold'} colorScheme={'twitter'} borderRadius={5} fontSize={'10px'}>
                        + {skills.length - 4}
                    </Badge>
                </HStack>
            </Box>
        )
    }

    return (
        <Box>
            <HStack wrap={'wrap'} spacing={'3px'}>
                {skills && skills.map(skill => 
                    <Badge m={0} p={'3px 7px 3px 7px'} fontWeight={600} borderRadius={5} fontSize={'10px'}>
                        {skill}
                    </Badge>)}
            </HStack>
        </Box>   
    )
}