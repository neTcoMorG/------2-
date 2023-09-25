import { useEffect, useState } from "react";
import { API_SERVER } from '../properties'
import axios from "axios";

export default function UserProfile () {
    const [profile, setProfile] = useState({})

    useEffect(() => {
        axios.get(API_SERVER + "/user", {headers: {
            Authorization: localStorage.getItem('9token')
        }}).then(res => {
            setProfile(res.data)
            console.log(res.data)
        })
    }, [])

    return [profile, setProfile]
}