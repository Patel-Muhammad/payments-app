import React, { useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import SubHeading from "../components/SubHeading";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Guest = () => {
  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  // Generate random last name
  const lastName = generateRandomString(8);

  // Generate random username
  const username = generateRandomString(10);

  // Generate random password
  const password = generateRandomString(12);
  const [firstName, setFirstName] = useState("Guest");
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const onChange = (content, e) => {
    content(e.target.value);
  };

  const onClick = async () => {
    setIsDisabled(true);

    try {
      const res = await axios.post(
        `${process.env.BACKEND_URL}/api/v1/user/signup`,
        {
          username: username,
          firstName: firstName,
          lastName: lastName,
          password: password,
        }
      );
      if (res.data.message == "Email already exist") {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
      setIsDisabled(false);
    } catch {
      toast.error("Unexpected error");
      setIsDisabled(false);
    }
    setIsDisabled(false);
  };

  return (
    <div className="h-screen flex justify-center relative">
      <div className=" flex flex-col justify-center">
        <div className="rounded-lg bg-[#121212] w-80 text-center p-2 h-max px-4">
          <Heading label={"Guest"} />
          <Inputbox
            label={"Name"}
            placeholder={"Jhon"}
            onChange={(e) => onChange(setFirstName, e)}
          />
          <Button
            label={"Login →"}
            onClick={onClick}
            isFull={true}
            isDisabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default Guest;
