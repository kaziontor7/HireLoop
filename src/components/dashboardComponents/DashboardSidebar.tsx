"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    Building2, 
    Briefcase, 
    Layers, 
    Settings, 
    Menu 
} from "lucide-react";
import { Button, Drawer } from "@heroui/react";

// Import Better Auth Client
import { authClient } from "@/lib/auth-client"; 

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Building2, label: "My Company", href: "/dashboard/company" },
    { icon: Briefcase, label: "Manage Jobs", href: "/dashboard/jobs" },
    { icon: Layers, label: "Applications", href: "/dashboard/applications" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function DashboardSidebar() {
    const pathname = usePathname();

    // Fetch active session data
    const { data: session, isPending } = authClient.useSession();

    // FIXED: Changed from a nested Component to a standard JSX variable
    const sidebarContentJsx = (
        <div className="flex flex-col h-full bg-[#111111] text-white py-8">
            
            {/* Logo */}
            <div className="px-8 mb-10">
                <h1 className="text-3xl font-extrabold tracking-tight">HireLoop</h1>
            </div>

            {/* Profile Section */}
            <div className="px-8 mb-10">
                {isPending ? (
                    <div className="flex items-center gap-4 mb-4 animate-pulse">
                        <div className="w-12 h-12 rounded-full bg-gray-800"></div>
                        <div className="flex flex-col gap-2">
                            <div className="h-4 w-24 bg-gray-800 rounded"></div>
                            <div className="h-3 w-16 bg-gray-800 rounded"></div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4 mb-4">
                        {/* <img 
                            src={session?.user?.image || "https://i.pravatar.cc/150?img=11"} 
                            alt={session?.user?.name || "User"} 
                            className="w-12 h-12 rounded-full object-cover border border-white/10 shadow-sm bg-[#1a1a1a]"
                        /> */}
                        <div className="flex flex-col">
                            <span className="text-base font-semibold text-white capitalize">
                                {session?.user?.name || "Welcome!"}
                            </span>
                            <span className="text-sm text-gray-400 capitalize">
                                {(session?.user as any)?.role || "Member"}
                            </span>
                        </div>
                    </div>
                )}
                
                <div className="inline-flex items-center px-3 py-1.5 text-[10px] font-bold tracking-wider text-gray-300 uppercase border border-gray-600 rounded bg-[#1a1a1a]">
                    PREMIUM ACCOUNT
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col w-full">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (pathname === '/' && item.href === '/dashboard');
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-4 px-8 py-4 text-base transition-colors ${
                                isActive
                                    ? "bg-[#222222] text-white border-r-4 border-white"
                                    : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                            }`}
                        >
                            <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-gray-500"}`} strokeWidth={1.5} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );

    return (
        <>
            {/* DESKTOP VIEW */}
            <aside className="hidden md:flex flex-col w-72 h-screen  left-0 top-0 border-r border-white/[0.05]  bg-[#111111]">
                {/* FIXED: Render the variable instead of a component */}
                {sidebarContentJsx}
            </aside>

            {/* MOBILE VIEW */}
            <div className="md:hidden flex items-center justify-between p-4 bg-[#111111] border-b border-white/[0.08] sticky top-0 z-50">
                <h1 className="text-xl font-extrabold tracking-tight text-white">HireLoop</h1>
                
                <Drawer>
                    <Button isIconOnly variant="outline" className="border-white/[0.08] text-white">
                        <Menu className="w-5 h-5" />
                    </Button>
                    
                    <Drawer.Backdrop>
                        <Drawer.Content placement="left" className="bg-[#111111] w-[80vw] max-w-[320px] p-0 border-r border-white/[0.08]">
                            <Drawer.Dialog className="h-full p-0">
                                <Drawer.CloseTrigger className="absolute top-6 right-6 z-50 text-gray-400 hover:text-white" />
                                
                                <Drawer.Body className="p-0 overflow-y-auto">
                                    {/* FIXED: Render the variable instead of a component */}
                                    {sidebarContentJsx}
                                </Drawer.Body>
                                
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>
            </div>
        </>
    );
}