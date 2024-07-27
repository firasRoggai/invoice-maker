"use client";

// clerk
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

import Link from 'next/link';
// react imports
import { useState } from 'react';
// icon imports
import { IoIosMenu } from 'react-icons/io';
import { Button } from "~/components/ui/button";

const Navbar = () => {

    const { isLoaded, userId, sessionId, getToken, isSignedIn } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={`min-h-[15vh] grid items-center justify-center bg-[#3d4c59] text-white py-4`}>

            <div className="w-[90vw] py-4 flex justify-between items-center gap-4">
                <div className="flex">
                    <h1 className="text-xl">
                        <Link href={'/'}>
                            Invoice Generator
                        </Link>
                    </h1>
                    <ul className="items-center hidden lg:flex">
                        <li className='px-2 text-[0.9rem]'><Link href="/guid">Invoicing Guide</Link></li>
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
                    <li className='py-2 text-[0.9rem]'>
                        {
                            isSignedIn ?
                                <UserButton afterSignOutUrl="/" />
                                :
                                <Button>
                                    <SignInButton />
                                </Button>
                        }
                    </li>
                    <li className='pe-2 py-2 text-[0.9rem]'><Link href="/guid">Invoicing Guide</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;