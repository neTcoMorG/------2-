import { useEffect, useState } from "react"
import {API_SERVER} from '../properties'
import axios from "axios"
import { useToast } from "@chakra-ui/react"

export default function useUserRequests () {
    const [requests, setRequests] = useState([])


    useEffect(() => {
        axios.get(API_SERVER + '/user/requests', {headers: {
            Authorization: localStorage.getItem('9token')
        }}).then(res => {
            console.log(res.data)
            setRequests(res.data)
        })
    }, [])

    return [requests, setRequests]
}