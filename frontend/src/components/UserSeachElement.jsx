import React from 'react'
import UserAvatar from './UserAvatar'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

const UserSeachElement = ({userdata}) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/sendmoney?name=${userdata.firstName}%20${userdata.lastName}&id=${userdata._id}`)
  }
  return (
    <div className='px-5 mt-5 flex items-center justify-between'>
        <div className='flex items-center'>
            <UserAvatar label={userdata.firstName[0]}/>
            <div className='font-bold ml-3'>
                {userdata.firstName +' '+ userdata.lastName}
            </div>
        </div>
        <Button onClick={onClick} label={'Send Money'} />
    </div>
  )
}

export default UserSeachElement