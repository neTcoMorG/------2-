import { useEffect, useState } from "react";


export default function useLoginToken () {
    const [token, setToken] = useState()

    useEffect(() => {
        setToken(localStorage.getItem('9token'))
    }, [])

    return token
}