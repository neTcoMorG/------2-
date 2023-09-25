
import { 
    Box,
} 
from "@chakra-ui/react"
import Wrapper              from "../components/Wrapper"
import ProfileMe            from "./ProfileMe"
import ProfileSideBar       from "../components/ProfileSideBar"
import { Route, Routes }    from "react-router-dom"
import ProfileRequest       from "./ProfileRequest"
import ProfileModify        from "./ProfileModify"
import OpeningManager       from "./OpeningManager"
import ProfileBookmark      from "./ProfileBookmark"

export default function Profile () {
    return (
        <Box height={'100%'}>
            <Wrapper>
                <Box display={'flex'}>
                    <Box w={'240px'} mr={'10px'}>
                        <ProfileSideBar />
                    </Box>
                    <Box w={'100%'}>
                        <Routes>
                            <Route path="/"         element={<ProfileMe />}       />
                            <Route path="/requests" element={<ProfileRequest />}  />
                            <Route path="/modify"   element={<ProfileModify />}   />
                            <Route path="/opening"  element={<OpeningManager />}  />
                            <Route path="/bookmark" element={<ProfileBookmark />} />
                        </Routes>
                    </Box>
                </Box>
            </Wrapper>
        </Box>
    )
}