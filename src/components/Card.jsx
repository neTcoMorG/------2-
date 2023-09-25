
import { Badge, Box, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Card ({teamName, title, skills, image, userTypes, isDone, openingId}) {

    return (
        <Box w={'272px'} color={'#212529'} fontFamily={'Noto Sans KR'} mb={'10px'}>
            <Link to={"/opening/" + openingId}>
                <img loading="lazy" style={{
                    width: '100%',
                    height: '151px',
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    border: '1px solid gainsboro',
                    borderRadius: '5px',
                    marginBottom: '10px' }} src={image} />
                <Box w={'100%'} h={'20px'} mb={'2px'} fontSize={'14px'} color={'#21252A'}>
                    <Text>{teamName}</Text>
                </Box>
                <Box w={'100%'} h={'45px'} fontSize={'16px'} style={{
                            overflow:'hidden',
                            textOverflow: 'ellipsis',
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'}}>
                    <Text fontWeight={500}>{title}</Text>
                </Box>
                <Box display={'flex'} h={'19px'} mb={'5px'} mt={'10px'}>
                    {skills.map((skill, idx) => 
                        <Text color={'#878E98'} fontSize={'14px'} pr={'5px'}>
                            { idx > 0 ? "  |  " + skill : skill }
                        </Text>
                    )}
                </Box>
                <HStack h={'19px'} spacing={2} position={'relative'} left={'-1px'}>
                    {userTypes ? 
                     userTypes.map((type, idx) => 
                        <Text color={'#878E98'} fontSize={'14px'} fontWeight={500}>
                            {type === "꿈나무" ? <Badge ml={0} colorScheme={'green'}>{type}</Badge> : null}
                            {type === "취준생" ? <Badge ml={0}colorScheme={'purple'}>{type}</Badge> : null}
                            {type === "실무자" ? <Badge ml={0}colorScheme={'red'}>{type}</Badge> : null}
                            {type === "실력 무관" ? <Badge ml={0}>실력 무관</Badge> : null}
                        </Text>
                    ) :     
                    <Text color={'#878E98'} fontSize={'14px'} pr={'5px'} fontWeight={500}>
                        실력 무관
                    </Text>}
                </HStack>
            </Link>
        </Box>
    )
}