"use client";

import React, { useState } from "react";

import { Message } from "./icon/Message";
import { DropdownMenuDemo } from "./ButtonHamburger";
import Link from "next/link";
import { Plus } from "./icon/Plus";
import { useRouter } from "next/navigation";
import Image from "next/image";
import VehicleHeader from "./ui/HeaderContact";

function HeaderCars() {
  const router = useRouter();
  const [check, setCheck] = useState(false);

  const handleCheck = () => {
    if (check) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };

  return (
    <div
      className="fixed top-0 left-0   z-10000 font-playfair
w-screen    text-white flex flex-col gap-0"
    >
      <VehicleHeader />

      <div className="  flex items-center justify-between bg-[#333333] px-4  sm:py-2 h-[60px] lg:h-[80px]  ">
        <p className=" text-[25px] sm:text-3xl select-none">Auto-Occaz.com</p>
        <div className="hidden lg:flex gap-4 items-center">
          <div
            className="flex items-center gap-1  cursor-pointer "
            title="Envoyez-nous un message"
            onClick={() => router.push("/send-message")}
          >
            <Message width={25} height={25} color="white" />
            <p className="">Nous contacter</p>
          </div>
          {/*  <DropdownMenuDemo /> */}
          <div className="hidden  w-[35px] h-[35px] lg:w-[180px] lg:flex items-center justify-center cursor-pointer">
            <Link
              href="/add-auto"
              className=" hidden lg:flex lg:items-center h-[40px]  p-3 rounded-[20px] bg-white text-black boxElement "
            >
              {/*
           
            */}
              <Plus className="mr-1" />
              Ajoute une auto
            </Link>
            {/*  <Hamburger width={30} height={30} color="white" /> */}
          </div>
        </div>
        <div className="fixed top-[48px] sm:top-[70px] right-0  w-screen   lg:hidden bodyBurger">
          <input
            className="burger-check p-2 "
            id="burger-check"
            type="checkbox"
            checked={check}
            onChange={handleCheck}
          />
          <label htmlFor="burger-check" className="burger mr-2"></label>
          <nav
            id="navigation1"
            className="navigation bg-white rounded-sm text-black text-start px-2 border-1 border-solid border-[#333333] "
          >
            <ul className="headerUl flex flex-col gap-3">
              <li
                className="headerLi pl-5 p-3 flex items-center bg-[#333333] text-white mt-2 rounded-sm cursor-pointer "
                onClick={() => {
                  router.push("/add-auto");
                  setCheck(false);
                }}
              >
                <p className="headerA flex items-center    ">
                  <Plus className="mr-1" />
                  <span>Ajoute une auto</span>
                </p>
              </li>
              <li
                className="headerLi p-3 flex items-center bg-[#333333] text-white rounded-sm mb-2 cursor-pointer"
                onClick={() => {
                  router.push("/send-message");
                  setCheck(false);
                }}
              >
                <p className="headerA flex items-center gap-1  cursor-pointer">
                  <Message width={25} height={25} color="#fff" />
                  <span className="">Nous contacter</span>
                </p>
              </li>
            </ul>
          </nav>
        </div>

        {/*  <Image
        src="/logo.png"
        alt=""
        width={100}
        height={100}
        className="w-[70px] h-[70px] object-cover cursor-pointer "
      /> */}
      </div>
    </div>
  );
}

export default HeaderCars;
