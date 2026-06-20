"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

// Import your Better Auth client
import { authClient } from "@/lib/auth-client"; 

// Define the form data type
type SignInFormData = {
    email: string;
    password: string;
};

const SignInPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    
    // UI States
    const [isLoading, setIsLoading] = useState(false);
    const [globalError, setGlobalError] = useState('');
    const [success, setSuccess] = useState('');

    // Initialize React Hook Form
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<SignInFormData>();

    const onSubmit = async (data: SignInFormData) => {
        setGlobalError('');
        setSuccess('');

        // Better Auth Integration for Sign In
        await authClient.signIn.email({
            email: data.email,
            password: data.password,
        }, {
            onRequest: () => {
                setIsLoading(true);
            },
            onSuccess: () => {
                setSuccess("Signed in successfully! Redirecting...");
                // Redirect to dashboard on successful login
                router.push('/dashboard'); 
            },
            onError: (ctx) => {
                // Display the error (e.g., "Invalid email or password")
                setGlobalError(ctx.error.message || "Invalid credentials. Please try again.");
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
                    <h1 className="text-2xl font-semibold text-white tracking-tight">Welcome back</h1>
                    <p className="text-sm text-gray-400 mt-2">Sign in to your account to continue.</p>
                </div>

                {/* Global Status Messages */}
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

                {/* Sign In Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    
                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-300">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="you@example.com"
                            disabled={isLoading}
                            {...register("email", { 
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email address"
                                }
                            })}
                            className={`w-full bg-[#1a1a1a] border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all disabled:opacity-50 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-[#5C53FE] focus:ring-[#5C53FE]'}`}
                        />
                        {errors.email && <span className="text-xs text-red-400 mt-1">{errors.email.message as string}</span>}
                    </div>

                    {/* Password Input with Toggle */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            {/* Optional: Add a forgot password link later */}
                            <Link href="/forgot-password" className="text-xs text-[#6b66ff] hover:text-[#8480ff] transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••"
                                disabled={isLoading}
                                {...register("password", { 
                                    required: "Password is required"
                                })}
                                className={`w-full bg-[#1a1a1a] border rounded-xl pl-4 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all disabled:opacity-50 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-[#5C53FE] focus:ring-[#5C53FE]'}`}
                            />
                            {/* Eye Toggle Button */}
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        {errors.password && <span className="text-xs text-red-400 mt-1">{errors.password.message as string}</span>}
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
                            "Sign In"
                        )}
                    </button>
                </form>

                {/* Footer Link */}
                <div className="mt-8 text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-[#6b66ff] hover:text-[#8480ff] font-medium transition-colors">
                        Sign Up
                    </Link>
                </div>
                
            </div>
        </div>
    );
};

export default SignInPage;