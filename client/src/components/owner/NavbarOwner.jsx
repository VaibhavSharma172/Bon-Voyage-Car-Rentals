import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const NavbarOwner = () => {

    const {user} = useAppContext()

  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all'>
<Link to="/" className="flex items-center gap-3">
  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B0B0B] text-[#F59E0B] font-extrabold text-lg shadow-md">
    BV
  </div>

  <div className="flex flex-col leading-none">
    <span className="text-lg font-bold text-[#0B0B0B]">
      Bon Voyage
    </span>

    <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
      Car Rentals
    </span>
  </div>
</Link>
      <p className="text-sm md:text-base font-medium">
Welcome, <span className="text-[#F59E0B]">{user?.name || "Owner"}</span>
</p>
    </div>
  )
}

export default NavbarOwner
