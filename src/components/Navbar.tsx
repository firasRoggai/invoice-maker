"use client";

// clerk
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";

import Link from 'next/link';
// react imports
import { useState } from 'react';
// icon imports
import { IoIosMenu } from 'react-icons/io';
import { Button } from "~/components/ui/button";
import { MainNavItem } from "~/types/types";

interface MainNavProps {
    items: MainNavItem[]
    children?: React.ReactNode
}
const Navbar = ({ items }: MainNavProps) => {

    const { isSignedIn } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={`min-h-[15vh] grid items-center justify-center bg-gray-50 py-4`}>

            <div className="w-[90vw] py-4 flex justify-between items-center gap-4">
                <div className="flex">
                    <h1 className="text-xl">
                        <Link className="flex gap-3 font-heading items-center" href={'/'}>
                            <Image alt="logo" src={"/logo.png"} width={30} height={20} />
                            InvoiceGenerator
                        </Link>
                    </h1>
                    <ul className="items-center hidden lg:flex px-5 text-gray-500">
                        {items.map(navItem => {
                            return (
                                <li key={navItem.title} className='hover:underline px-2 text-[0.9rem]'>
                                    <Link href={navItem.href}>{navItem.title}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                {/* burger menu */}
                <div>
                    <button aria-label="close" onClick={() => { setMenuOpen(!menuOpen) }} className="lg:hidden" >
                        <IoIosMenu className='text-[2rem]' />
                    </button>
                    <div className="hidden lg:block">
                        {
                            isSignedIn ?
                                <UserButton afterSignOutUrl="/" />
                                :
                                <Button>
                                    <SignInButton />
                                </Button>
                        }
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${menuOpen ? "flex" : "hidden"} items-end w-[90vw]`}>
                <ul>
                    <li className='pl-2 py-2 text-[0.9rem]'>
                        {
                            isSignedIn ?
                                <UserButton afterSignOutUrl="/" />
                                :
                                <Button>
                                    <SignInButton />
                                </Button>
                        }
                    </li>
                    {items.map(navItem => {
                        return (
                            <li key={navItem.title} className='hover:underline px-2 text-[0.9rem]'>
                                <Link href={navItem.href}>{navItem.title}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;