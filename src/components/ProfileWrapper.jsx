
import { Box } from "@chakra-ui/react"

export default function ProfileWrapper ({children}) {
    return (
        <Box boxShadow={'base'} borderRadius={'10px'} w={'100%'} p={'32px 60px 60px 60px'} bgColor={'white'}>
            {children}
        </Box>
    )
}