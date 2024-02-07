import React, { useState } from 'react'
import UserAvatar from './UserAvatar'
import { useNavigate } from 'react-router-dom'


const AppBar = ({username}) => {
  const navigate = useNavigate();
  return (
    <div className='shadow shadow-gray-600 flex justify-between items-center px-5 py-7 h-10'>
        <div className='text-3xl font-bold cursor-pointer' onClick={()=> navigate('/dashboard')}>Payments App 💰</div>
        <div className='flex items-center'>
            <div className='mr-5 hidden sm:block'>
                Hello, {username}
            </div>
            <UserAvatar label={username[0].toUpperCase()} / >
        </div>

    </div>
  )
}

export default AppBar