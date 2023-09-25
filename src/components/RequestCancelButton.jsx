import { Button, IconButton, useToast } from "@chakra-ui/react";
import { API_SERVER } from "../properties";
import axios from "axios";
import { CloseIcon, DeleteIcon, LockIcon } from "@chakra-ui/icons";

export default function RequestCancelButton ({id, text, requests, setter, status}) {
    
    const toast = useToast()

    const onClickHandler = () => {
        axios.get(API_SERVER  + '/opening/cancel/' + id, {headers: {
            Authorization: localStorage.getItem('9token')
        }})
        .then(res => {
            const filter = requests.filter(r => r.id !== id)
            setter(filter)
        })
        .catch(err => {
            toast({
                title: '함께하기로 결정난 공고는 취소할 수 없어요'
            })
        })
    }
    
    if (status === "ALLOW") {
        return (
            <IconButton 
                icon={<LockIcon />}
                bgColor={'white'}
                aria-label="잠금"
            />
        )
    }

    return (
        <IconButton 
            icon={<DeleteIcon />}
            bgColor={'white'}
            aria-label="삭제"
            onClick={onClickHandler}
        />
    )
}