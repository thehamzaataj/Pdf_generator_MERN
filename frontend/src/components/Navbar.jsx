import React from 'react'

const Navbar = () => {
  return (
    <div className="flex justify-between bg-slate-500 text-white shadow-lg px-10 py-6">
    <div className='flex items-center'>
        <div className="log font-bold text-4xl">
            <h1>MYPDF</h1>
        </div>
    </div>
    <ul className='flex gap-20 items-center'>
        <li className='text cursor-pointer hover:font-bold translate-x-0'>Home</li>
        <li className='text cursor-pointer hover:font-bold translate-x-0'>Contact us</li>
        <li className='text cursor-pointer hover:font-bold translate-x-0'>Help</li>
    </ul>
    </div>
  )
}

export default Navbar