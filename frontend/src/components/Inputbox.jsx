import React from 'react'

const Inputbox = ({label,placeholder, onChange}) => {
  return (
    <div>
        <div className='text-sm font-medium text-left py-2'>{label}</div>
        <input required placeholder={placeholder} onChange={onChange} className='w-full px-2 py-1 mb-2 border rounded border-slate-200' />
    </div>
    
  )
}

export default Inputbox