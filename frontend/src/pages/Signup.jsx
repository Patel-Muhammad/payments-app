import React, {useEffect, useState} from 'react'
import { Heading } from '../components/Heading'
import SubHeading from '../components/SubHeading'
import Inputbox from '../components/Inputbox'
import Button from '../components/Button'
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BottomWarning from '../components/BottomWarning'


const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
  
  const onClick = async() => {
    setIsDisabled(true);

    try {
    const res = await axios.post(`${process.env.BACKEND_URL}/api/v1/user/signup`,
      {
        username:username,
        firstName:firstName,
        lastName:lastName,
        password:password
      }
    )
    if(res.data.message == 'Email already exist') {
      toast.error(res.data.message)
    }
    else {
      toast.success(res.data.message);
      localStorage.setItem('token',res.data.token)
      navigate('/dashboard')
    }
    setIsDisabled(false)
    }
    catch {
      toast.error('Unexpected error')
      setIsDisabled(false)
    }
    setIsDisabled(false)

  }

  return (
    <div className='h-screen flex justify-center relative'>
      <div className='absolute right-0'>
        <Button label={'Login as guest'} onClick={() => navigate('/guest')}/>
      </div>
      <div className=" flex flex-col justify-center">
      <div className="rounded-lg bg-[#121212] w-80 text-center p-2 h-max px-4">
      <Heading label={'Sign up'}/>
      <SubHeading label={'Enter your info to create an account'}/>
      <Inputbox label={'First Name'} placeholder={'Jhon'} onChange={(e) => onChange(setFirstName,e)} />
      <Inputbox label={'Last Name'} placeholder={'Doe'} onChange={(e) => onChange(setLastName,e)} />
      <Inputbox label={'Username'} placeholder={'jhonD01'} onChange={(e) => onChange(setUsername,e)}/>
      <Inputbox label={'Password'} placeholder={'*****'} onChange={(e) => onChange(setPassword,e)}/>
      <Button label={'Signup'} onClick={onClick} isFull={true} isDisabled={isDisabled} />
      <BottomWarning label={'Already have an account?'} to={'/signin'} buttonText={'Signin'} />
     </div>
     </div>
    </div>
  )
}

export default Signup