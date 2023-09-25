
import { useEffect, useState } from 'react'
import ProfileWrapper from '../components/ProfileWrapper'
import { API_SERVER } from '../properties'
import { 
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Tooltip ,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, SettingsIcon, ViewIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function OpeningManager () {

    const navigate = useNavigate()
    const [openings, setOpenings] = useState([])

    const onOpeningDeleteButtonClick = (openingId) => {
        axios.get(API_SERVER + '/opening/delete/' + openingId, {headers: {Authorization: localStorage.getItem('9token')}})
        .then(() => {
            const newArray = openings.filter(o => o.id !== openingId)
            setOpenings(newArray)
        })
    }

    useEffect(() => {
        axios.get(API_SERVER + '/opening/all', {headers: {
            Authorization: localStorage.getItem('9token')
        }})
        .then(res => {
            setOpenings(res.data)
        })
    }, [])

    return (
        <ProfileWrapper>
            <Text fontSize={'24px'} color={'#212529'} fontWeight={'bold'}>진행중인 공고</Text>
            <TableContainer mt={6}>
                <Table variant='simple'>
                    <Thead bgColor={'rgb(248, 249, 250)'}>
                        <Tr>
                            <Th>생성일</Th>
                            <Th>공고명</Th>
                            <Th>남은 인원 수</Th>
                            <Th>기능</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {openings && openings.map(o => 
                            <Tr>
                                <Td>{o.created}</Td>
                                <Td>{o.title}</Td>
                                <Td>{o.left_count}</Td>
                                <Td>
                                    <HStack>
                                        <Tooltip label={'지원자 목록'}>
                                            <IconButton 
                                                aria-label='Search database'
                                                icon={<ViewIcon />}
                                                onClick={() => navigate('/manager/opening/' + o.id)}
                                            />
                                        </Tooltip>
                                        <Menu>
                                            <MenuButton
                                                as={IconButton}
                                                aria-label='Options'
                                                icon={<SettingsIcon />}
                                                variant='outline'
                                            />
                                            <MenuList>
                                                <MenuItem icon={<EditIcon />}>수정</MenuItem>
                                                <MenuItem onClick={() => onOpeningDeleteButtonClick(o.id)} icon={<DeleteIcon />}>삭제</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </HStack>
                                </Td>
                            </Tr>)}
                    </Tbody>
                </Table>
            </TableContainer>
        </ProfileWrapper>
    )
}