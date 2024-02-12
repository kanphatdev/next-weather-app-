"use client";
;
import { MdOutlineWbSunny } from "react-icons/md";
import { MdLocationSearching } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import SeachBox from "./SeachBox";




const Navbar = () => {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
    <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
      <p className="flex items-center justify-center gap-2">
        <h2 className="capitalize text-gray-500 text-3xl">weather</h2>
        <MdOutlineWbSunny className="text-3xl mt-1 text-amber-300" />
      </p>
      {/*  */}
      <section className="flex gap-2 items-center">
        <MdLocationSearching className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
        <>
          <IoLocationOutline className="text-3xl text-black" />
        </>
        <p className="text-slate-900/80 text-sm capitalize">thailand</p>
        <div className="">
        {/* SeachBox */}
    <>
    <SeachBox/>
    
    </>
      </div>
      </section>
     
    </div>
  </nav>
  )
}

export default Navbar
