/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { Card } from "@heroui/react";
import { MapPin, Briefcase, DollarSign, ArrowUpRight, Calendar, Building2 } from "lucide-react";
import Link from "next/link";

export interface Job {
    _id: { $oid: string } | string;
    title: string;
    category: string;
    jobType: string;
    deadline: string;
    salaryMin: string;
    salaryMax: string;
    currency: string;
    workplaceType: string;
    location: string;
    responsibilities: string;
    requirements: string;
    benefits: string;
    companyName: string;
    status: string;
    companyId: string;
    companyLogo: string;
}

export function JobCard({ job }: { job: Job }) {
    if (!job) return null;

    const jobId = typeof job._id === "object" ? job._id?.$oid : job._id;

    const formatSalary = (amount: string) => {
        if (!amount) return "0";
        const num = parseInt(amount, 10);
        return isNaN(num) ? amount : num.toLocaleString();
    };

    return (
        /* FIXED: Added 'flex flex-col h-full' so all cards extend to match each other's layout heights */
        <Card className="bg-[#111111] border border-white/8 hover:border-white/15 p-6 rounded-2xl shadow-xl w-full max-w-md h-full flex flex-col transition-all duration-300 group">
            
            {/* Upper half container for variable content */}
            <div className="flex-1">
                {/* Top Row: Logo, Title & Brand */}
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#161616] border border-white/10 p-2 flex items-center justify-center overflow-hidden shrink-0">
                        {job.companyLogo ? (
                            <img 
                                src={job.companyLogo} 
                                alt={`${job.companyName || "Company"} logo`} 
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <Building2 className="w-6 h-6 text-gray-500" />
                        )}
                    </div>
                    
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#5C53FE] transition-colors line-clamp-1">
                            {job.title || "Untitled Position"}
                        </h3>
                        <span className="text-xs font-medium text-gray-400 tracking-wide uppercase">
                            {job.companyName || "Unknown Company"} • {job.category ? job.category.replace("-", " ") : "General"}
                        </span>
                    </div>
                </div>

                {/* Description Paragraph */}
                <p className="text-sm text-gray-400 mt-4 leading-relaxed line-clamp-2">
                    {job.responsibilities || "No description provided."}
                </p>

                {/* Badges Container */}
                <div className="flex flex-wrap gap-2 mt-5">
                    <span className="inline-flex items-center gap-1.5 bg-white/4 border border-white/6 text-gray-300 rounded-full px-3 py-1 text-xs font-medium h-7">
                        <MapPin className="w-3.5 h-3.5 text-[#5C53FE]" />
                        {job.location || "N/A"}
                    </span>

                    <span className="inline-flex items-center gap-1.5 bg-white/4 border border-white/6 text-gray-300 rounded-full px-3 py-1 text-xs font-medium h-7 capitalize">
                        <Briefcase className="w-3.5 h-3.5 text-[#5C53FE]" />
                        {job.workplaceType || "Full-Time"}
                    </span>

                    <span className="inline-flex items-center gap-1.5 bg-white/4 border border-white/6 text-gray-300 rounded-full px-3 py-1 text-xs font-medium h-7 uppercase">
                        <DollarSign className="w-3.5 h-3.5 text-[#5C53FE]" />
                        {formatSalary(job.salaryMin)}-{formatSalary(job.salaryMax)} {job.currency || "USD"}
                    </span>
                </div>
            </div>

            {/* FIXED: 'mt-auto' locks this footer area to the absolute bottom of every single card card uniformly */}
            <div className="mt-auto pt-6">
                {/* Divider line */}
                <div className="h-px bg-white/6 w-full mb-4" />

                {/* Action Footer Row */}
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                            Apply before: {job.deadline ? new Date(job.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "N/A"}
                        </span>
                    </div>

                    <Link href={`/jobs/${jobId}`} 
                        className="inline-flex items-center justify-center bg-[#5C53FE] hover:bg-[#4b43db] text-white text-sm font-semibold rounded-xl px-4 py-2 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(107,102,255,0.3)] cursor-pointer"
                    >
                        Apply Now
                        <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link >
                </div>
            </div>

        </Card>
    );
}