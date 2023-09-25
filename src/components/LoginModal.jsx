
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
  } from '@chakra-ui/react'
import { useEffect } from 'react'

export default function LoginModal () {

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        onOpen()
    }, [])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>로그인이 필요합니다</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    닫기
                    </Button>
                </ModalFooter>
            </ModalContent>
      </Modal>
    )
}