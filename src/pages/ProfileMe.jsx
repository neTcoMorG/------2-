
import {
    Avatar,
    Box,
    Text,
    HStack,
    Badge,
} from '@chakra-ui/react'
import UserProfile from '../hooks/useUserProfile'
import { Link } from 'react-router-dom'

export default function ProfileMe () {
    
    const [profile, setProfile] = UserProfile()
    
    return (
        <>
            {profile ? 
            <Box height={'100%'} borderRadius={10} backgroundColor={'white'} p={'32px 72px 52px 72px'} boxShadow='lg' position={'relative'}>
                <Box position={'absolute'} right={'70px'} top={'20px'}>
                    <Link to={'/profile/modify'}><Text color={'gray'}>프로필 수정하기</Text></Link>
                </Box>
                <Box className="self" w={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} mt={5}>
                    <Avatar w={'218px'} h={'218px'} src={profile.avatar_url}/>
                    <Text mt={'16px'} fontSize={'40px'} fontWeight={'bold'}>{profile.nickname}</Text>
                    <HStack spacing={2} mt={4}>
                        {profile.fields && profile.fields.map(f =>
                            <Badge m={0} fontSize={'24px'}>{f}</Badge>
                        )}
                        <Text fontSize={'24px'}>개발자</Text>
                    </HStack>
                    <Text mt={4} color={'#878E98'}>
                        <a style={{fontSize: '16px', margin: '0px'}} href={profile.repository}>{profile.repository}</a>
                    </Text>
                </Box>
                <Box mt={'52px'}>
                    <Text fontSize={'18px'}>{profile.about}</Text>
                </Box>
                <Box mt={'60px'}>
                    <Text fontSize={'30px'} fontWeight={'bold'}>기술 스택</Text>
                    <HStack mt={5} wrap={'wrap'}>
                        {profile.skills && profile.skills.map(skill =>  <Box p={'5px 16px 5px 16px'} style={{
                            borderRadius: '15px',
                            border: '1px solid rgb(223, 226, 230)',
                            fontSize: '15px'
                        }} >{skill}</Box> )}
                    </HStack>
                </Box>
            </Box>
            : null}
        </>
    )
}