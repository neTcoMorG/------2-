import { Container, Box, Stack } from "@chakra-ui/react";

export default function Test () {
    return (
        <Container maxWidth={'1200px'}>
            <Stack direction={['column', 'row']}>
                <Box w={'100px'} h={'100px'} bgColor={'red'} />
                <Box w={'100px'} h={'100px'} bgColor={'blue'} />
            </Stack>
        </Container>
    )
}