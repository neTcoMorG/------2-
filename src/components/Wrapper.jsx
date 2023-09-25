
import {
    Box,
}
from '@chakra-ui/react'

export default function Wrapper ({ children, bgColor }) {
    return (
        <Box w={'1200px'} m={'auto'} p={'32px'} bgColor={bgColor}>
            { children }
        </Box>
    )
}