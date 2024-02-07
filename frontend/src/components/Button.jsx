import React from 'react'

const Button = ({label, onClick, isDisabled, isFull ,isGreen}) => {
  return (
    <button onClick={onClick} type="button"
    
    className={`${
        isDisabled ? "bg-gray-400" : "bg-gray-300"
      } ${isGreen ? 'bg-green-600' : ''} ${isFull? 'w-full' : '' }  ${isGreen? 'text-gray-200':'text-gray-800'} ${isDisabled ? "hover:bg-gray-400" : "hover:opacity-90"}
      ${isDisabled? "cursor-wait":"cursor-pointer"} focus:outline-none font-medium rounded-lg text-sm px-5 mt-6 py-2.5 me-2 mb-2`}

    //   className={`focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-400`}
    
    disabled={isDisabled}>
        {isDisabled? 'Please wait...':label}
    </button>
  )
}

export default Button