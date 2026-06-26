/* eslint-disable @next/next/no-img-element */
import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import ApplyForm from './ApplyForm';
import { ArrowLeft, Building2, MapPin, Briefcase, DollarSign, CreditCard, Layers } from 'lucide-react';
import Link from 'next/link';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getPlan } from '@/lib/api/plans';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ApplyPage({ params }: PageProps) {
    // Safely await route parameters in Next.js App Router
    const { id } = await params; 
    const user = await getUserSession(); 

    if (!user) {
        redirect(`/signin?redirect=/jobs/${id}/apply`);
    }

    const applications = await getApplicationsByApplicant(user?.id);
    const currentApplicationCount = applications?.length || 0;

    const plan = await getPlan(user?.plan || "seeker_free"); 
      
    if (user.role !== 'seeker') {
        return (    
            <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Access Denied</h1>
                <p className="text-gray-400 mt-2 max-w-sm text-sm leading-relaxed">
                    Only job seekers can apply for open postings. Please switch or register a seeker profile.
                </p>
                <Link href={`/jobs/${id}`} className="mt-6 text-sm text-[#5C53FE] hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Position Details
                </Link>
            </div>
        );
    }

    // Determine if the user has reached their maximum plan allowances
    const isUnlimited = plan && plan.maxApplicationsPerMonth > 30;
    const isLimitReached = plan && !isUnlimited && currentApplicationCount >= plan.maxApplicationsPerMonth;

    if (isLimitReached) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Application Limit Reached</h1>
                <p className="text-gray-400 mt-2 max-w-sm text-sm leading-relaxed">
                    You have reached the maximum number of applications ({plan.maxApplicationsPerMonth}) allowed under your <span className="text-amber-500 font-semibold">{plan.name}</span>. Please upgrade your tier selection to continue applying.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                    <Link 
                        href="/pricing" 
                        className="inline-flex items-center justify-center bg-[#5C53FE] hover:bg-[#4b43db] text-white text-sm font-semibold rounded-xl px-6 h-11 transition-all shadow-lg shadow-[#5C53FE]/10"
                    >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Upgrade Subscription Plan
                    </Link>
                    <Link 
                        href={`/jobs/${id}`} 
                        className="inline-flex items-center justify-center bg-transparent border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white text-sm font-medium rounded-xl px-6 h-11 transition-colors"
                    >
                        Back to Details
                    </Link>
                </div>
            </div>
        );
    }

    const jobDetails = await getJobById(id);

    const formatSalary = (amount: string) => {
        if (!amount) return "0";
        const num = parseInt(amount, 10);
        return isNaN(num) ? amount : num.toLocaleString();
    };

    return (
        <div className="w-full min-h-screen bg-[#0a0a0a] text-white px-4 py-8 md:px-8 lg:px-12 flex flex-col items-center">
            <div className="w-full max-w-6xl flex flex-col gap-6">
                
                {/* Back Link Row */}
                <div className="w-full">
                    <Link 
                        href={`/jobs/${id}`} 
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                        Back to position details
                    </Link>
                </div>

                {/* Main Interactive Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mt-2">
                    
                    {/* LEFT PANEL: CONTEXT CARD (2 Columns Wide) */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className="bg-[#111111] border border-white/8 rounded-2xl p-6 shadow-xl flex flex-col gap-5">
                            
                            {/* Logo + Header context text */}
                            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                                <div className="w-12 h-12 rounded-xl bg-[#161616] border border-white/10 p-2 flex items-center justify-center overflow-hidden shrink-0">
                                    {jobDetails?.companyLogo ? (
                                        <img src={jobDetails.companyLogo} alt={jobDetails.companyName} className="w-full h-full object-contain" />
                                    ) : (
                                        <Building2 className="w-6 h-6 text-gray-500" />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">You are applying for</span>
                                    <h2 className="text-lg font-bold text-white tracking-tight leading-tight mt-0.5">{jobDetails?.title || "Position"}</h2>
                                </div>
                            </div>

                            {/* Minimal key indices specification text elements list */}
                            <div className="flex flex-col gap-3.5 text-sm text-gray-400 border-b border-white/5 pb-4">
                                <div className="flex items-center gap-2.5">
                                    <Building2 className="w-4 h-4 text-[#5C53FE]" />
                                    <span>Company: <strong className="text-white font-medium">{jobDetails?.companyName}</strong></span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <MapPin className="w-4 h-4 text-[#5C53FE]" />
                                    <span className="capitalize">Location: <strong className="text-white font-medium">{jobDetails?.location || "Remote"}</strong></span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <Briefcase className="w-4 h-4 text-[#5C53FE]" />
                                    <span className="capitalize">Workplace format: <strong className="text-white font-medium">{jobDetails?.workplaceType}</strong></span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <DollarSign className="w-4 h-4 text-[#5C53FE]" />
                                    <span className="uppercase">Compensation: <strong className="text-white font-medium">{formatSalary(jobDetails?.salaryMin)}-{formatSalary(jobDetails?.salaryMax)} {jobDetails?.currency}</strong></span>
                                </div>
                            </div>

                            {/* --- ADDED: DYNAMIC PLAN QUOTA COMPONENT --- */}
                            <div className="flex items-center justify-between text-sm bg-white/[0.02] border border-white/5 rounded-xl p-3">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Layers className="w-4 h-4 text-[#5C53FE]" />
                                    <span>Monthly Quota Usage:</span>
                                </div>
                                <div className="font-bold tracking-wide">
                                    {isUnlimited ? (
                                        <span className="text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 text-[11px] px-2.5 py-1 rounded-md uppercase font-extrabold tracking-widest">
                                            Unlimited
                                        </span>
                                    ) : (
                                        <span className="text-white">
                                            {currentApplicationCount} <span className="text-gray-600 font-normal">/</span> {plan?.maxApplicationsPerMonth || 3}
                                        </span>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT PANEL: LIVE INPUT FORM FIELD (3 Columns Wide) */}
                    <div className="lg:col-span-3 flex justify-center w-full">
                        <ApplyForm jobDetails={jobDetails} applicant={user} applications={applications} />
                    </div>

                </div>

            </div>
        </div>
    );
}