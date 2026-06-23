"use client";

import React, { useState } from 'react';
import { Label, Radio, RadioGroup, Form } from "@heroui/react";
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

// Import your Better Auth client
import { authClient } from "@/lib/auth-client";

// Define TypeScript Interface
interface SignUpFormData {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    plan?: string;
}

const SignUpPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    // UI States
    const [isLoading, setIsLoading] = useState(false);
    const [globalError, setGlobalError] = useState('');
    const [success, setSuccess] = useState('');
      
        const searchParams = useSearchParams()
    
        const redirectTo = searchParams?.get('redirect') || '/';

    // Native onSubmit Handler
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        
        setGlobalError('');
        setSuccess('');

        // Extract native FormData using currentTarget for safety
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as unknown as SignUpFormData;

         const plan = data.role === "recruiter" ? "recruiter_free" : "seeker_free"; // Default to seeker_free if role is not specified

        // Basic validation check
        if (!data.email || !data.password || !data.name) {
             setGlobalError("Please fill out all required fields.");
             return;
        }



        // Better Auth Integration
        await authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.name,
            role: data.role || "seeker", // Default to "seeker" if role is not selected
            plan
        }, {
            onRequest: () => setIsLoading(true),
            onSuccess: () => {
                setSuccess("Account created successfully! Redirecting...");
                router.push(redirectTo); // Redirect to the specified page after successful signup
            },
            onError: (ctx) => {
                setGlobalError(ctx.error.message || "An unexpected error occurred.");
                setIsLoading(false);
            },
        });
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] p-6 relative overflow-hidden">
            
            {/* Soft background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] bg-[#5C53FE]/10 pointer-events-none"></div>

            {/* Glassmorphism Auth Card */}
            <div className="w-full max-w-md bg-[#111111]/80 backdrop-blur-xl rounded-3xl border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.5)] p-8 md:p-10 relative z-10">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center text-3xl font-extrabold tracking-tighter mb-6 cursor-pointer" onClick={() => router.push('/')}>
                        <span className="text-[#0088ff]">hire</span>
                        <span className="text-[#ff6b00]">loop</span>
                    </div>
                    <h1 className="text-2xl font-semibold text-white tracking-tight">Create an account</h1>
                    <p className="text-sm text-gray-400 mt-2">Join the AI-native career platform.</p>
                </div>

                {/* Status Messages */}
                {globalError && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                        {globalError}
                    </div>
                )}
                {success && (
                    <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
                        {success}
                    </div>
                )}

                {/* HeroUI Form */}
                <Form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">

                    {/* Name Input */}
                    <div className="flex flex-col gap-2 w-full">
                        <Label className="text-sm font-medium text-gray-300">Full Name</Label>
                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            required
                            disabled={isLoading}
                            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:border-[#5C53FE] focus:ring-[#5C53FE] transition-all disabled:opacity-50"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-2 w-full">
                        <Label className="text-sm font-medium text-gray-300">Email Address</Label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            required
                            disabled={isLoading}
                            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:border-[#5C53FE] focus:ring-[#5C53FE] transition-all disabled:opacity-50"
                        />
                    </div>

                    {/* Password Input with Toggle */}
                    <div className="flex flex-col gap-2 w-full">
                        <Label className="text-sm font-medium text-gray-300">Password</Label>
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                required
                                minLength={8}
                                disabled={isLoading}
                                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl pl-4 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:border-[#5C53FE] focus:ring-[#5C53FE] transition-all disabled:opacity-50"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Radio Group - CORRECTED HEROUI V3 STRUCTURE */}
                    <div className="flex flex-col gap-2 w-full">
                        <Label className="text-sm font-medium text-gray-300">Role</Label>
                        <RadioGroup 
                            orientation="horizontal"
                            name="role" 
                            defaultValue="seeker"
                        >
                            <Radio value="seeker">
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>
                                <Radio.Content>
                                    <Label className="text-gray-300 font-normal">Job Seeker</Label>
                                </Radio.Content>
                            </Radio>
                            <Radio value="recruiter">
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>
                                <Radio.Content>
                                    <Label className="text-gray-300 font-normal">Recruiter</Label>
                                </Radio.Content>
                            </Radio>
                        </RadioGroup>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-2 bg-[#5C53FE] text-white font-medium rounded-xl px-4 py-3 hover:bg-[#4b43db] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5C53FE] focus:ring-offset-2 focus:ring-offset-[#050505] shadow-[0_0_15px_rgba(107,102,255,0.2)] disabled:opacity-70 flex justify-center items-center"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </Form>

                {/* Footer Link */}
                <div className="mt-8 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link  href={`/signin?redirect=${redirectTo}`} className="text-[#6b66ff] hover:text-[#8480ff] font-medium transition-colors">
                        Sign In
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default SignUpPage;