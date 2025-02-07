'use client'
import { UserContext, UserType } from '@/context/UserContext/UserContext'
import React, { useContext, useEffect } from 'react'

interface PropType {
    user: UserType
}

const UpdateUserDetails: React.FC<PropType> = ({ user }) => {

    const { setUser } = useContext(UserContext)

    useEffect(() => {
        setUser(user);
    }, [user, setUser])

    return (
        null
    )
}

export default UpdateUserDetails