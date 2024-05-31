"use client"
import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const page = () => {

  const {user} = useContext(UserContext)

  return (
    <div>{JSON.stringify(user)}</div>
  )
}

export default page