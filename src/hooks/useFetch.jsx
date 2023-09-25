import { useEffect, useState } from "react";
import { API_SERVER } from "../properties";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export function useGetFetch (url) {
    const [data, setData] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(API_SERVER + url, {headers: { Authorization: localStorage.getItem('9token')}})
        .then(res => { 
            setData(res.data) 
        })
        .catch(err => {
            const code = err.response.data.code
            if (code === "NotFoundException") {
                navigate('/login')
            }
        })
    }, [])

    return [data, setData]
}

export function usePostFetch (url) {
    const [data, setData] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios.post(API_SERVER + url, {headers: { Authorization: localStorage.getItem('9token')}})
        .then(res => {
            setData(res.data)
        })
        .catch(err => {
            const code = err.response.data.code
            if (code === "NotFoundException") {
                navigate('/login')
            }
        })
    }, [])

    return [data, setData]
}