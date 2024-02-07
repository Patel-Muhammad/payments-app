import React, {useEffect, useState} from 'react'
import { Heading } from '../components/Heading'
import SubHeading from '../components/SubHeading'
import Inputbox from '../components/Inputbox'
import Button from '../components/Button'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import BottomWarning from '../components/BottomWarning'


const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false)
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard')
    }
  },[])


  const onChange = (content, e) => {
    content(e.target.value)
  }
  const onClick = async () => {
    setIsDisabled(true)

    try {
      const res = await axios.post(`${process.env.BACKEND_URL}/api/v1/user/signin`, {
        username,
        password
      })



      if(res.data.message == 'User/password does not match') {
        toast.error(res.data.message)
      }
      else{
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      }

      setIsDisabled(false)

    } catch {
      toast.error('Unexpected error occured')
      setIsDisabled(false)
    }
    
    setIsDisabled(false)
  }
  return (
    <div className='h-screen flex justify-center relative'>
            <div className='absolute right-0'>
        <Button label={'Login as guest'} onClick={() => navigate('/guest')}/>
      </div>
      <div className='flex flex-col justify-center'>
      <div className="rounded-lg bg-[#121212] w-80 text-center p-2 h-max px-4">
      <Heading label={'Sign in'}/>
      <SubHeading label={'Enter username and password to sign in'}/>
      <Inputbox label={'Username'} placeholder={'jhon09'} onChange={(e) => onChange(setUsername,e)} />
      <Inputbox label={'Password'} placeholder={'****'} onChange={(e) => onChange(setPassword,e)} />
      <Button label={'Signin'} onClick={onClick} isFull={true} isDisabled={isDisabled} />
      <div>
      <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
      </div>
      </div>
    </div>
  )
}

export default Signin