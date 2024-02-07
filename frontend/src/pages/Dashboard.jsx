import React, { useEffect, useState } from 'react'
import { Heading } from '../components/Heading'
import AppBar from '../components/AppBar'
import UserAvatar from '../components/UserAvatar';
import axios from 'axios'
import { toast } from 'react-toastify'
import UserSeachElement from '../components/UserSeachElement';
import { useNavigate } from 'react-router-dom'



const Dashboard = () => {
  const [userName, setUsername] = useState('aatel');
  const [balance, setBalance] = useState(98);
  const [listOfUsers, setListOfUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
    const fetchData = async() => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.BACKEND_URL}/api/v1/user/bulk`,{
        headers: {
          Authorization: token
        }
      })
      const data = res.data;
      setUsername( data.thisUser[0].firstName)
      setListOfUsers(data.otherUser)

      const balanceReq = await axios.get(`${process.env.BACKEND_URL}/api/v1/account/balance`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

      const balance = balanceReq.data.balance;
      setBalance(balance)
  }
  fetchData();
}
else {
  navigate('/signin')
}
  }, [])


  return (
    <div className='text-slate-200'>
      <AppBar username={userName} / >
      <div className='text-2xl px-5 py-5'>
        Your balance: ₹ {balance}
        </div>
      <div>
          <div className='text-2xl mx-5 my-6'>Users:</div>
          <div>
            {listOfUsers.map(user => <UserSeachElement key={user._id} userdata={user}/>)}
          </div>
      </div>
    </div>
  )
}

export default Dashboard