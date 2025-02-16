"use client";

import { useAuth } from "@/app/_context/AuthContext";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const { googleSignIn, logOut, user } = useAuth();
  const { loggedIn, photoUrl } = user;
  const [name, setName] = useState("");
  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsHovered(true);
  };

  const handleMouseLeave = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsHovered(false);
  };
  useEffect(() => {
    const name = String(localStorage.getItem("name"));
    setName(name);
  }, []);

  let userPhotoUrl = photoUrl;
  if (photoUrl === "") {
    userPhotoUrl = "/bghom.jpg";
  }

  return (
    <nav className="bg-white">
      <div
        className={`flex shadow-md w-full mx-auto px-2 sm:px-8 h-20 relative justify-between items-center`}
      >
        <div className="inline-flex">
          <a className="_o6689fn" href="/home">
            <div className="flex">
              <Image
                src="/navlogo.png"
                alt="logo"
                width={100}
                height={100}
              ></Image>
            </div>
          </a>
        </div>
        <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
          <div className="inline-block">
            <div className="inline-flex items-center max-w-full"></div>
          </div>
        </div>
        <div className="flex-initial">
          <div className="flex justify-end items-center relative">
            {!loggedIn && user.name && (
              <div className="hidden sm:flex mr-4 gap-x-2 items-center">
                <button
                  onClick={googleSignIn}
                  className="bg-indigo-600 rounded-md text-white w-fit px-3 py-1"
                >
                  Login
                </button>
                <button
                  onClick={googleSignIn}
                  className="bg-indigo-600 rounded-md text-white w-fit px-3 py-1"
                >
                  Signup
                </button>
              </div>
            )}
            <div className="block">
              <div className="inline relative">
                <div className="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg">
                  <div
                    className="dropdown inline-block relative pl-1 sm:pl-0"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      className=""
                      style={{
                        display: "block",
                        fill: "none",
                        height: "16px",
                        width: "16px",
                        stroke: "currentcolor",
                        strokeWidth: "3",
                        overflow: "visible",
                      }}
                    >
                      <g fill="none" fillRule="nonzero">
                        <path d="m2 16h28"></path>
                        <path d="m2 24h28"></path>
                        <path d="m2 8h28"></path>
                      </g>
                    </svg>
                    <ul
                      className={`dropdown-menu shadow-lg bg-white absolute ${
                        isHovered ? `block` : `hidden`
                      } text-gray-700 z-40 pt-1`}
                    >
                      <li className="">
                        <a
                          className="rounded-t hover:bg-black hover:text-white py-2 px-4 block whitespace-no-wrap"
                          href="/home"
                        >
                          Home
                        </a>
                      </li>
                      <li className="">
                        <a
                          className=" hover:bg-black hover:text-white py-2 px-4 block whitespace-no-wrap"
                          href="/dashboard"
                        >
                          Dashboard
                        </a>
                      </li>
                      {loggedIn ? (
                        <li className="">
                          <button
                            className="rounded-b text-left px-4 w-full  hover:bg-black hover:text-white py-2 block whitespace-no-wrap"
                            onClick={() => {
                              console.log("logging out from navbar");
                              logOut();
                            }}
                          >
                            Logout
                          </button>
                        </li>
                      ) : (
                        <>
                          <li className="">
                            <a
                              className="hover:bg-black hover:text-white py-2 px-4 block whitespace-no-wrap"
                              href="/"
                            >
                              Sign In
                            </a>
                          </li>
                          <li className="">
                            <a
                              className="rounded-b  hover:bg-black hover:text-white py-2 px-4 block whitespace-no-wrap"
                              href="/"
                            >
                              Sign Up
                            </a>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div className="block flex-grow-0 flex-shrink-0 h-10 sm:h-8 sm:w-fit pl-5 sm:pl-2">
                    {loggedIn === false ? (
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        style={{
                          display: "block",
                          height: "100%",
                          width: "100%",
                          fill: "#3949AB",
                        }}
                      >
                        <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                      </svg>
                    ) : (
                      <div className="flex w-full h-full items-center gap-x-2">
                        <p className="text-sm my-auto">Hello, {name}</p>
                        <Image
                          src={userPhotoUrl}
                          alt={name || ""}
                          width={100}
                          height={100}
                          className="rounded-full h-[24px] w-[24px]"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
