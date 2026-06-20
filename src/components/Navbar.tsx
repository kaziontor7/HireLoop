"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react'; 

// Import your Better Auth client
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Fetch the active session from Better Auth
    const { data: session, isPending } = authClient.useSession();
    

    // Handle Sign Out
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/signin'); // Redirect to sign in after logging out
                    setIsMobileMenuOpen(false); // Close mobile menu if open
                },
            },
        });
    };

    return (
        <div className="w-full flex justify-center py-6">
            <nav className="relative flex items-center justify-between w-full max-w-[90%] px-6 py-3 bg-[#1e1e1e] rounded-2xl shadow-lg">
                
                {/* 1. Logo Section */}
                <div className="flex items-center">
                    <Link href="/">
                        <div className="flex items-center text-2xl font-extrabold tracking-tighter cursor-pointer">
                            <span className="text-[#0088ff]">hire</span>
                            <span className="text-[#ff6b00]">loop</span>
                        </div>
                    </Link>
                </div>

                {/* Mobile Hamburger Button */}
                <div className="md:hidden flex items-center">
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-300 hover:text-white focus:outline-none"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* 2. Desktop Navigation Links & Right Section */}
                <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
                    <Link href="/jobs" className="hover:text-white transition-colors">Browse Jobs</Link>
                    <Link href="/company" className="hover:text-white transition-colors">Company</Link>
                    <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                    
                    <div className="flex items-center gap-5">
                        <div className="hidden md:block w-px h-5 bg-gray-700"></div>

                        {/* Conditional Auth Rendering */}
                        {isPending ? (
                            // Loading state (invisible placeholder to prevent layout shift)
                            <div className="w-32 h-10 animate-pulse bg-gray-800/50 rounded-xl"></div>
                        ) : session ? (
                            // Logged In State
                            <div className="flex items-center gap-5">
                                <span className="text-sm font-medium text-gray-400">
                                    Hi, <span className="text-white">{session.user.name.split(' ')[0]}</span>
                                </span>
                                <Button
                                    onClick={handleSignOut}
                                    className="bg-[#1a1a1a] border border-gray-700 text-gray-300 font-medium px-5 rounded-xl hover:bg-gray-800 hover:text-white transition-colors"
                                >
                                    Sign Out
                                </Button>
                            </div>
                        ) : (
                            // Logged Out State
                            <>
                                <Link href="/signin" className="text-sm font-medium text-[#6b66ff] hover:text-[#8480ff] transition-colors">
                                    Sign In
                                </Link>
                                <Link href="/signup">
                                    <Button className="bg-[#5C53FE] text-white font-medium px-6 rounded-xl shadow-[0_0_15px_rgba(107,102,255,0.2)]">
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* 3. Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="absolute top-[110%] left-0 w-full bg-[#1e1e1e] rounded-2xl shadow-lg flex flex-col p-6 gap-5 md:hidden z-50 border border-gray-800">
                        <div className="flex flex-col gap-4 text-sm text-gray-300">
                            <Link href="/jobs" className="hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Browse Jobs</Link>
                            <Link href="/company" className="hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Company</Link>
                            <Link href="/pricing" className="hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
                        </div>
                        
                        <div className="w-full h-px bg-gray-700"></div>
                        
                        <div className="flex flex-col gap-4">
                            {/* Mobile Conditional Auth Rendering */}
                            {isPending ? (
                                <div className="w-full h-10 animate-pulse bg-gray-800/50 rounded-xl"></div>
                            ) : session ? (
                                <>
                                    <span className="text-sm font-medium text-gray-400 pb-2">
                                        Hi, <span className="text-white">{session.user.name.split(' ')[0]}</span>
                                    </span>
                                    <Button
                                        onClick={handleSignOut}
                                        className="bg-[#1a1a1a] border border-gray-700 text-gray-300 font-medium px-6 rounded-xl hover:bg-gray-800 hover:text-white transition-colors w-full"
                                    >
                                        Sign Out
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/signin" className="text-sm font-medium text-[#6b66ff] hover:text-[#8480ff] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                        Sign In
                                    </Link>
                                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                                        <Button className="bg-[#5C53FE] text-white font-medium px-6 rounded-xl shadow-[0_0_15px_rgba(107,102,255,0.2)] w-full">
                                            Get Started
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;