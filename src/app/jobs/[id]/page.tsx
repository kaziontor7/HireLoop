/* eslint-disable @next/next/no-img-element */
import { getJobById } from "@/lib/api/jobs";
import React from "react";
import { 
    Building2, 
    MapPin, 
    Briefcase, 
    DollarSign, 
    Calendar, 
    ArrowLeft, 
    Share2, 
    Bookmark, 
    CheckCircle2,
    ShieldAlert
} from "lucide-react";
import Link from "next/link";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function JobDetailsPage({ params }: PageProps) {
    // Await params safely in Next.js App Router
    const { id } = await params;
    const job = await getJobById(id);

    // Dynamic fail-safe layout if database document fetch fails
    if (!job) {
        return (
            <div className="w-full min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 text-red-500">
                    <ShieldAlert className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-semibold">Job Posting Not Found</h2>
                <p className="text-sm text-gray-400 mt-1 max-w-sm text-center">
                    The position you are looking for might have been closed, deleted, or unlisted by the recruiter.
                </p>
                <Link href="/jobs" className="mt-6 text-sm text-[#5C53FE] hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Explore Jobs
                </Link>
            </div>
        );
    }

    const formatSalary = (amount: string) => {
        if (!amount) return "0";
        const num = parseInt(amount, 10);
        return isNaN(num) ? amount : num.toLocaleString();
    };

    return (
        <div className="w-full min-h-screen bg-[#0a0a0a] text-white px-4 py-8 md:px-8 lg:px-12 flex flex-col items-center">
            <div className="w-full max-w-6xl">
                
                {/* --- TOP BACK NAVIGATION BAR --- */}
                <div className="flex items-center justify-between w-full mb-8 border-b border-white/5 pb-4">
                    <Link 
                        href="/jobs" 
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                        Back to jobs
                    </Link>
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-gray-400 hover:text-white bg-white/5 border border-white/10 rounded-xl transition-colors cursor-pointer">
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white bg-white/5 border border-white/10 rounded-xl transition-colors cursor-pointer">
                            <Bookmark className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* --- MAIN HERO COVER AREA --- */}
                <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#111111] border border-white/8 rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-[#161616] border border-white/10 p-3 flex items-center justify-center overflow-hidden shrink-0">
                            {job.companyLogo ? (
                                <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-contain" />
                            ) : (
                                <Building2 className="w-8 h-8 text-gray-500" />
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{job.title}</h1>
                            <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                                {job.companyName} <span className="text-gray-600 mx-1.5">•</span> <span className="text-[#5C53FE]">{job.category?.replace("-", " ")}</span>
                            </p>
                        </div>
                    </div>
                    {job.status === "pending" && (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full select-none">
                            <Clock className="w-3.5 h-3.5" /> Pending Verification
                        </span>
                    )}
                </div>

                {/* --- TWOM-COLUMN CONTENT CONTENT LAYOUT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* LEFT COLUMN: MAIN SPEC DETAILS */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        
                        {/* 1. Responsibilities */}
                        <div className="bg-[#111111] border border-white/8 rounded-2xl p-6 md:p-8 shadow-md">
                            <h2 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Responsibilities</h2>
                            <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">
                                {job.responsibilities || "No responsibilities listed."}
                            </p>
                        </div>

                        {/* 2. Requirements */}
                        <div className="bg-[#111111] border border-white/8 rounded-2xl p-6 md:p-8 shadow-md">
                            <h2 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Requirements</h2>
                            <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">
                                {job.requirements || "No specialized requirements listed."}
                            </p>
                        </div>

                        {/* 3. Benefits & Perks */}
                        <div className="bg-[#111111] border border-white/8 rounded-2xl p-6 md:p-8 shadow-md">
                            <h2 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Benefits & Perks</h2>
                            <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">
                                {job.benefits || "Standard company matching options and medical allowances apply."}
                            </p>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: STICKY META INSIGHT SIDEBAR CARD */}
                    <div className="lg:sticky lg:top-6 flex flex-col gap-6">
                        
                        <div className="bg-[#111111] border border-white/8 rounded-2xl p-6 shadow-xl flex flex-col gap-5">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Job Summary</h3>
                            
                            {/* Salary Line info item */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-xl bg-white/4 border border-white/5 text-[#5C53FE] shrink-0">
                                    <DollarSign className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 font-medium">Salary Range</span>
                                    <span className="text-sm font-semibold text-white uppercase">
                                        {formatSalary(job.salaryMin)} - {formatSalary(job.salaryMax)} / {job.currency || "USD"}
                                    </span>
                                </div>
                            </div>

                            {/* Format Line info item */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-xl bg-white/4 border border-white/5 text-[#5C53FE] shrink-0">
                                    <Briefcase className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 font-medium">Job Format / Availability</span>
                                    <span className="text-sm font-semibold text-white capitalize">
                                        {job.workplaceType} <span className="text-gray-600 mx-1">•</span> {job.jobType?.replace("-", " ")}
                                    </span>
                                </div>
                            </div>

                            {/* Location Line info item */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-xl bg-white/4 border border-white/5 text-[#5C53FE] shrink-0">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 font-medium">Location</span>
                                    <span className="text-sm font-semibold text-white capitalize">
                                        {job.location || "Remote Available"}
                                    </span>
                                </div>
                            </div>

                            {/* Deadline Line info item */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-xl bg-white/4 border border-white/5 text-[#5C53FE] shrink-0">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 font-medium">Application Deadline</span>
                                    <span className="text-sm font-semibold text-white">
                                        {job.deadline ? new Date(job.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "N/A"}
                                    </span>
                                </div>
                            </div>

                            {/* Divider spacing */}
                            <div className="h-px bg-white/5 w-full my-2" />

                            {/* --- THE APPLY NOW BUTTON --- */}
                            <Link
                                href={`/jobs/${id}/apply`}
                                className="w-full bg-[#5C53FE] hover:bg-[#4b43db] active:scale-[0.99] text-white font-bold text-sm h-11 rounded-xl shadow-lg shadow-[#5C53FE]/10 hover:shadow-[#5C53FE]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Apply For This Position
                            </Link>
                        </div>
                        
                        {/* Subtle safety notice text below card */}
                        <p className="text-[11px] text-gray-600 text-center px-4 leading-normal">
                            By applying, you confirm that you agree to our terms of compliance data usage and processing pipeline rules.
                        </p>

                    </div>

                </div>

            </div>
        </div>
    );
}

// Inline placeholder for missing Clock import error support
const Clock = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);