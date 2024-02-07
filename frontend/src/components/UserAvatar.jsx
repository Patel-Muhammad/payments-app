import React, { useState } from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'


const UserAvatar = ({label}) => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const onClick = () => {
    localStorage.removeItem('token')
    navigate('/signin')
  }
  return (
    <div className='bg-slate-500 p-2 w-10 rounded-full' >
    <div className='flex items-center justify-center relative cursor-pointer' onClick={()=> setShow(!show)}>
    {label}
    </div>
    { show &&    <div className='absolute right-0 top-16 h-4 flex justify-center items-center'>
      <Button label={'Signout'} onClick={onClick}/>
    </div>}
    </div>
  )
}

export default UserAvatar