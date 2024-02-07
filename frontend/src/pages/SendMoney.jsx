import React, { useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import UserAvatar from "../components/UserAvatar";
import SubHeading from "../components/SubHeading";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import AppBar from "../components/AppBar";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [isDisabled, setIsDisabled] = useState(false);
  const [amountToSend, setAmountToSend] = useState(undefined);
  const [balance, setBalance] = useState();
  const [username, setUsername] = useState('t');

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${process.env.BACKEND_URL}/api/v1/user/bulk`,{
        headers: {
          Authorization: token
        }
      })
      const data = res.data;
      setUsername(data.thisUser[0].firstName)
      const balanceReq = await axios.get(
        `${process.env.BACKEND_URL}/api/v1/account/balance`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const balance = balanceReq.data.balance;
      setBalance(balance);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onChange = (e) => {
    setAmountToSend(e.target.value);
  };
  const onClick = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${process.env.BACKEND_URL}/api/v1/account/transfer`,
        {
          to: id,
          amount: amountToSend,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      fetchData();
    } catch (e) {
      console.error(e.response.status); // Log the response status

      if (e.response.status === 400) {
        toast.error(e.response.data.message); // Log the error message
      } else {
        toast.error("An error occurred"); // Handle other errors
      }
    }
  };
  return (
    <div>
      <AppBar username={username} />
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="bg-[#121212] rounded-lg h-3/8 w-3/4 lg:w-3/6 flex flex-col p-5 lg:max-w-md">
          <div className="mb-10">
            <Heading label={"Send Money"} />
          </div>
          <div className="flex items-center">
            <UserAvatar label={"P"} />
            <div className="text-2xl ml-3">{name}</div>
          </div>
          <div>
            <Inputbox
              label={"Amount (in Rs)"}
              placeholder={"Enter amount"}
              onChange={(e) => onChange(e)}
            />
            <Button
              label={"Initialize Transfer"}
              isDisabled={false}
              onClick={onClick}
              isGreen={true}
              isFull={true}
            />
            <div className="text-center mt-10">Your balance: {balance}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
