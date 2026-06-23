"use client";

import React, { useState } from "react";
import { Link2, FileText, UserCheck, Briefcase, Loader2, CheckCircle } from "lucide-react";
import { createApplication } from "@/lib/actions/applications";

interface ApplyFormProps {
    jobDetails: any;
    applicant: any;
    applications: any[] | undefined;
}

export default function ApplyForm({ jobDetails, applicant, applications }: ApplyFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const hasAlreadyApplied = applications?.find((app: any) => app.jobId === jobDetails._id);
     
    if (hasAlreadyApplied) {
        return (
            <div className="w-full max-w-xl bg-[#111111] border border-white/8 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-4 shadow-2xl animate-fade-in">
                <div className="w-14 h-14 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 flex items-center justify-center rounded-2xl">
                    <Briefcase className="w-7 h-7" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Application Already Submitted</h3>
                    <p className="text-sm text-gray-400 mt-1 max-w-sm mx-auto">
                        Our records indicate that you've already applied for the position of <span className="text-white font-medium">{jobDetails?.title || "this role"}</span> at <span className="text-white font-medium">{jobDetails?.companyName || "the company"}</span>. We appreciate your interest and encourage you to explore other opportunities with us.
                    </p>
                </div>
            </div>
        );
    }

    const handleApplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const submissionData = {
            jobId: jobDetails?._id,
            jobTitle: jobDetails?.title,
            companyName: jobDetails?.companyName,
            applicantId: applicant?.id,
            applicantName: applicant?.name,
            applicantEmail: applicant?.email,
            resumeLink: formData.get("resumeLink") as string,
            portfolioLink: formData.get("portfolioLink") as string,
            coverLetter: formData.get("coverLetter") as string,
            status: "applied",
        };

       const res =  await createApplication(submissionData);

       if(res.acknowledged){
        await new Promise((resolve) => setTimeout(resolve, 1800));
        
        setIsLoading(false);
        setIsSubmitted(true);
       }

        // console.log("Submitting application database payload:", submissionData);

        // TODO: Wire up your database server action here
        // e.g., const res = await submitApplicationAction(submissionData);

        // Simulate API network response latency delay
        
    };

    if (isSubmitted) {
        return (
            <div className="w-full max-w-xl bg-[#111111] border border-white/8 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-4 shadow-2xl animate-fade-in">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center rounded-2xl">
                    <CheckCircle className="w-7 h-7" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Application Submitted!</h3>
                    <p className="text-sm text-gray-400 mt-1 max-w-sm mx-auto">
                        Your application profile for <span className="text-white font-medium">{jobDetails?.title || "Position"}</span> has been transmitted successfully to the recruitment pipeline at <span className="text-white font-medium">{jobDetails?.companyName}</span>.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-xl bg-[#111111] border border-white/8 rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Header Header Status strip */}
            <div className="border-b border-white/5 p-6 bg-white/[0.01]">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#5C53FE]/10 border border-[#5C53FE]/20 text-[#5C53FE] rounded-xl">
                        <Briefcase className="w-4 h-4" />
                    </div>
                    <h2 className="text-lg font-bold text-white tracking-tight">
                        Apply for {jobDetails?.title || "Job Opening"}
                    </h2>
                </div>
                <p className="text-xs text-gray-400">
                    Reviewing manager: <span className="text-gray-300 font-medium">{jobDetails?.companyName || "Hiring Team"}</span>
                </p>
            </div>

            {/* Application Main input wrapper container */}
            <form onSubmit={handleApplySubmit} className="p-6 flex flex-col gap-5">
                
                {/* Applicant Summary (ReadOnly) */}
                <div className="bg-[#161616] border border-white/5 rounded-xl p-3.5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center shrink-0">
                        <UserCheck className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium">Applying as</span>
                        <span className="text-sm font-semibold text-white">
                            {applicant?.name || "Anonymous Applicant"} ({applicant?.email || "No email linked"})
                        </span>
                    </div>
                </div>

                {/* Resume URL Field Link input */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-300">Resume Link</label>
                    <div className="flex w-full bg-[#1a1a1a] border border-white/5 focus-within:border-[#5C53FE] rounded-xl h-10 overflow-hidden transition-colors hover:border-white/10">
                        <div className="flex items-center pl-3 pr-2 text-gray-500 border-r border-white/5 bg-white/[0.01]">
                            <FileText className="w-4 h-4" />
                        </div>
                        <input 
                            type="url"
                            name="resumeLink"
                            required
                            placeholder="https://drive.google.com/file/d/..."
                            className="flex-1 bg-transparent px-3 text-white placeholder-gray-600 text-sm focus:outline-none"
                        />
                    </div>
                </div>

                {/* Portfolio URL Field Link input */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-300">Portfolio Link <span className="text-gray-600 text-xs">(Optional)</span></label>
                    <div className="flex w-full bg-[#1a1a1a] border border-white/5 focus-within:border-[#5C53FE] rounded-xl h-10 overflow-hidden transition-colors hover:border-white/10">
                        <div className="flex items-center pl-3 pr-2 text-gray-500 border-r border-white/5 bg-white/[0.01]">
                            <Link2 className="w-4 h-4" />
                        </div>
                        <input 
                            type="url"
                            name="portfolioLink"
                            placeholder="https://bento.me/username or github.com"
                            className="flex-1 bg-transparent px-3 text-white placeholder-gray-600 text-sm focus:outline-none"
                        />
                    </div>
                </div>

                {/* Why We Should Hire You / Cover Pitch description box */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-300">Why should we hire you?</label>
                    <textarea 
                        name="coverLetter"
                        required
                        rows={5}
                        placeholder="Briefly showcase your expertise, notable milestones, and what drives your alignment with this specific engineering squad..."
                        className="w-full bg-[#1a1a1a] border border-white/5 hover:border-white/10 focus:border-[#5C53FE] text-white placeholder-gray-600 text-sm rounded-xl p-3 transition-colors resize-none focus:outline-none leading-relaxed"
                    />
                </div>

                {/* Footer submit action row */}
                <div className="border-t border-white/5 pt-4 mt-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-white text-black font-semibold text-sm px-6 h-11 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isLoading ? "Transmitting..." : "Submit Application"}
                    </button>
                </div>

            </form>
        </div>
    );
}