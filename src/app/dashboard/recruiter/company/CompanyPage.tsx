/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
    Building2,
    MapPin,
    Globe,
    Users,
    UploadCloud,
    Edit,
    Plus,
    CheckCircle2,
    Clock,
    XCircle,
    Loader2,
    X,
    ChevronDown
} from "lucide-react";
import { uploadToImgBB } from "@/lib/api/upload";
import { createCompany } from "@/lib/actions/companies";
import { toast } from "@heroui/react";
import { revalidate } from "@/lib/core/server";
import { useRouter } from "next/navigation";

export interface CompanyData {
    _id?: string;
    name: string;
    industry: string;
    website: string;
    location: string;
    employeeCount: string;
    logoUrl: string;
    description: string;
    status: "pending" | "approved" | "rejected";
    recruiterId: string;
}

const StatusBadge = ({ status }: { status: string }) => {
    if (status === "approved") {
        return (
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" /> Approved
            </span>
        );
    }
    if (status === "rejected") {
        return (
            <span className="flex items-center gap-1 text-xs font-medium text-red-500 bg-red-500/10 border border-red-500/20 px-2.5 py-1.5 rounded-full">
                <XCircle className="w-3.5 h-3.5" /> Rejected
            </span>
        );
    }
    return (
        <span className="flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5" /> Pending Approval
        </span>
    );
};

export default function CompanyPage({ recruiter, companyData }: { recruiter: any, companyData: CompanyData }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
 

    // FIXED: Hydrate all initial states using your database props so values are pre-filled on load!
    const initialCompany = Array.isArray(companyData) ? companyData[0] : companyData;

    const company = initialCompany || null;
    const [industry, setIndustry] = useState(companyData?.industry || "");
    const [employeeCount, setEmployeeCount] = useState(companyData?.employeeCount || "");
    const [logoUrl, setLogoUrl] = useState(companyData?.logoUrl || "");

    

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        try {
            const hostedUrl = await uploadToImgBB(file);
            setLogoUrl(hostedUrl);
        } catch (error) {
            alert("Failed to upload logo to ImgBB. Check your console log for API keys.");
            console.error("Upload error details:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const newCompany: CompanyData = {
            name: data.companyName as string,
            industry: industry || (data.industry as string),
            website: data.website as string,
            location: data.location as string,
            employeeCount: employeeCount || (data.employeeCount as string),
            description: data.description as string,
            logoUrl: logoUrl || company?.logoUrl || "", // FIXED: Fallback to existing database logoUrl if untouched
            status: "pending",
            recruiterId: recruiter.id
        };

        const createdCompany = await createCompany(newCompany);

        if (createdCompany.acknowledged) {
            setIsLoading(false);
            setIsOpen(false);
            toast.success("Company profile created successfully! Awaiting admin approval.");
            await revalidate('/dashboard/recruiter/company');
            router.refresh();
        } else {
            setIsLoading(false);
            toast.danger("Failed to create company profile. Please try again.");
        }

        // console.log(createdCompany);
    };

    return (
        <div className="w-full min-h-[calc(100vh-4rem)] p-4 md:p-8 flex items-start justify-center relative">

            <div className="w-full max-w-5xl">

                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-white tracking-tight">My Company</h1>
                    <p className="text-sm text-gray-400 mt-1">Manage your company profile and brand identity.</p>
                </div>

                {!company?._id ? (
                    // --- EMPTY STATE ---
                    <div className="w-full bg-[#111111] border border-[#2a2a2a] rounded-2xl shadow-xl p-12 flex flex-col items-center justify-center text-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center mb-2">
                            <Building2 className="w-8 h-8 text-[#5C53FE]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-white">No Company Registered</h2>
                            <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
                                You need to register a company profile before you can start posting jobs. Admin approval is required to go public.
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setIndustry(company?.industry || "");
                                setEmployeeCount(company?.employeeCount || "");
                                setLogoUrl(company?.logoUrl || "");
                                setIsOpen(true);
                            }}
                            className="flex items-center bg-[#5C53FE] text-white font-medium hover:bg-[#4b43db] transition-colors mt-4 px-6 py-2.5 rounded-xl shadow-lg"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Register Company
                        </button>
                    </div>
                ) : (
                    // --- FILLED STATE ---
                    <div className="w-full bg-[#111111] border border-[#2a2a2a] rounded-2xl shadow-xl overflow-hidden">

                        <div className="h-32 w-full bg-linear-to-r from-[#1a1a1a] to-[#222] border-b border-[#2a2a2a] relative">
                            <div className="absolute -bottom-10 left-8">
                                <div className="w-24 h-24 rounded-2xl bg-[#161616] border-2 border-[#2a2a2a] p-2 shadow-xl flex items-center justify-center overflow-hidden">
                                    {company.logoUrl ? (
                                        <img src={company.logoUrl} alt="Logo" className="w-full h-full object-contain rounded-xl" />
                                    ) : (
                                        <Building2 className="w-10 h-10 text-gray-500" />
                                    )}
                                </div>
                            </div>
                            <div className="absolute top-6 right-6 flex items-center gap-4">
                                <StatusBadge status={company.status} />
                                <button
                                    onClick={() => {
                                        setIndustry(company?.industry || "");
                                        setEmployeeCount(company?.employeeCount || "");
                                        setLogoUrl(company?.logoUrl || "");
                                        setIsOpen(true);
                                    }}
                                    className="flex items-center border border-[#2a2a2a] text-white bg-[#161616] hover:bg-[#1a1a1a] transition-colors font-medium px-4 py-2 rounded-xl"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </button>
                            </div>
                        </div>

                        <div className="pt-16 pb-8 px-8">
                            <h2 className="text-2xl font-bold text-white tracking-tight">{company.name}</h2>

                            <div className="flex flex-wrap items-center gap-6 mt-4 border-b border-[#2a2a2a] pb-6">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Globe className="w-4 h-4 text-[#5C53FE]" />
                                    <span className="capitalize">{company.industry}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <MapPin className="w-4 h-4 text-[#5C53FE]" />
                                    <span>{company.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Users className="w-4 h-4 text-[#5C53FE]" />
                                    <span>{company.employeeCount}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Globe className="w-4 h-4 text-[#5C53FE]" />
                                    {company.website ? (
                                        <a
                                            href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:text-white transition-colors"
                                        >
                                            {company.website.replace("https://", "").replace("http://", "")}
                                        </a>
                                    ) : (
                                        <span className="text-gray-500">No website provided</span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-sm font-medium text-white mb-3">About the Company</h3>
                                <p className="text-sm text-gray-400 leading-relaxed max-w-4xl whitespace-pre-wrap">
                                    {company.description}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* --- PURE TAILWIND HTML MODAL --- */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">

                    {/* Dark Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                        onClick={() => !isLoading && setIsOpen(false)}
                    />

                    {/* Modal Content Box */}
                    <div className="relative w-full max-w-2xl bg-[#161616] border border-[#2a2a2a] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">

                        {/* Header */}
                        <div className="flex justify-between items-start border-b border-[#2a2a2a] p-6 shrink-0">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl font-semibold text-white">
                                    {company ? "Edit Company Profile" : "Register New Company"}
                                </h2>
                                <p className="text-sm text-gray-400 font-normal">
                                    Enter your business details to start hiring on HireLoop.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => !isLoading && setIsOpen(false)}
                                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form Body - Scrollable */}
                        <div className="p-6 overflow-y-auto flex-1">
                            <form id="companyForm" onSubmit={onSubmit} className="flex flex-col gap-6">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Company Name */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-300">Company Name</label>
                                        <input
                                            name="companyName"
                                            defaultValue={company?.name || ""}
                                            placeholder="e.g. Acme Corp"
                                            required
                                            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-gray-600 focus:outline-none focus:border-[#5C53FE] text-white placeholder-gray-600 text-sm rounded-xl h-10 px-3 transition-colors"
                                        />
                                    </div>

                                    {/* Industry / Category */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-300">Industry / Category</label>
                                        <div className="relative w-full">
                                            <select
                                                name="industry"
                                                defaultValue={company?.industry || ""}
                                                onChange={(e) => setIndustry(e.target.value)}
                                                required
                                                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-gray-600 focus:outline-none focus:border-[#5C53FE] text-white text-sm rounded-xl h-10 pl-3 pr-10 appearance-none transition-colors cursor-pointer"
                                            >
                                                <option value="" disabled>Select industry</option>
                                                <option value="Technology">Technology</option>
                                                <option value="Healthcare">Healthcare</option>
                                                <option value="Finance">Finance</option>
                                                <option value="Education">Education</option>
                                                <option value="Retail">Retail</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Website URL */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-300">Website URL</label>
                                        <div className="flex w-full bg-[#1a1a1a] border border-[#2a2a2a] focus-within:border-[#5C53FE] rounded-xl h-10 overflow-hidden transition-colors hover:border-gray-600">
                                            <div className="flex items-center px-3 border-r border-[#2a2a2a] bg-[#1a1a1a] text-gray-500 text-sm select-none">
                                                https://
                                            </div>
                                            <input
                                                name="website"
                                                defaultValue={company?.website.replace("https://", "").replace("http://", "") || ""}
                                                placeholder="www.company.com"
                                                required
                                                className="flex-1 bg-transparent px-3 text-white placeholder-gray-600 text-sm focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-300">Location</label>
                                        <div className="flex w-full bg-[#1a1a1a] border border-[#2a2a2a] focus-within:border-[#5C53FE] rounded-xl h-10 overflow-hidden transition-colors hover:border-gray-600">
                                            <div className="flex items-center pl-3 pr-2 text-gray-500">
                                                <MapPin className="w-4 h-4" />
                                            </div>
                                            <input
                                                name="location"
                                                defaultValue={company?.location || ""}
                                                placeholder="City, Country"
                                                required
                                                className="flex-1 bg-transparent px-2 text-white placeholder-gray-600 text-sm focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Employee Count */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-300">Employee Count</label>
                                        <div className="relative w-full">
                                            <select
                                                name="employeeCount"
                                                defaultValue={company?.employeeCount || ""}
                                                onChange={(e) => setEmployeeCount(e.target.value)}
                                                required
                                                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-gray-600 focus:outline-none focus:border-[#5C53FE] text-white text-sm rounded-xl h-10 pl-3 pr-10 appearance-none transition-colors cursor-pointer"
                                            >
                                                <option value="" disabled>Select range</option>
                                                <option value="1-10 employees">1-10 employees</option>
                                                <option value="11-50 employees">11-50 employees</option>
                                                <option value="51-200 employees">51-200 employees</option>
                                                <option value="201-500 employees">201-500 employees</option>
                                                <option value="500+ employees">500+ employees</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Company Logo Upload */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-300">Company Logo</label>
                                        <div className="flex items-center gap-4">
                                            <label className="cursor-pointer group flex items-center justify-center w-12 h-12 bg-[#1a1a1a] border border-dashed border-[#2a2a2a] hover:border-[#5C53FE] rounded-xl transition-colors relative overflow-hidden shrink-0">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                                {isUploading ? (
                                                    <Loader2 className="w-5 h-5 text-[#5C53FE] animate-spin" />
                                                ) : logoUrl || company?.logoUrl ? (
                                                    <img src={logoUrl || company?.logoUrl} alt="Logo preview" className="w-full h-full object-contain p-1" />
                                                ) : (
                                                    <UploadCloud className="w-5 h-5 text-gray-500 group-hover:text-[#5C53FE] transition-colors" />
                                                )}
                                            </label>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-white">Upload image</span>
                                                <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Brief Description */}
                                <div className="flex flex-col gap-2 w-full mt-2">
                                    <label className="text-sm font-medium text-gray-300">Brief Description</label>
                                    <textarea
                                        name="description"
                                        defaultValue={company?.description || ""}
                                        placeholder="Tell us about your company's mission and culture..."
                                        rows={4}
                                        required
                                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-gray-600 focus:outline-none focus:border-[#5C53FE] text-white placeholder-gray-600 text-sm rounded-xl p-3 transition-colors resize-none"
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-[#2a2a2a] p-6 flex justify-end gap-3 shrink-0 bg-[#161616]">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                disabled={isLoading}
                                className="bg-transparent border border-gray-700 text-white hover:bg-[#1a1a1a] font-medium px-6 py-2.5 rounded-xl transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                form="companyForm"
                                disabled={isLoading || isUploading}
                                className="bg-white text-black font-semibold shadow-lg hover:bg-gray-200 px-6 py-2.5 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {isLoading ? "Saving..." : company ? "Update Profile" : "Register Company"}
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}