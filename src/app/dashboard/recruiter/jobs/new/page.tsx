"use client";

import React, { useState } from "react";
import { 
    Input, 
    TextArea, 
    Select, 
    Button, 
    Label,
    ListBox,
    toast
} from "@heroui/react";
import { Briefcase, Building2, Info, Loader2 } from "lucide-react"; 
import { useRouter } from "next/navigation";
import { createJob } from "@/lib/actions/jobs";

// Define the shape of our form data
interface JobFormData {
    title: string;
    category: string;
    jobType: string;
    workplaceType: string;
    deadline: string;
    salaryMin?: string;
    salaryMax?: string;
    currency: string;
    location?: string;
    responsibilities: string;
    requirements: string;
    benefits?: string;
}

export default function NewJobPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    // State to track if the job is remote, onsite, or hybrid
    const [workplace, setWorkplace] = useState("onsite");

    // Mock company data (replace with actual session/DB data later)
    const companyData = {
        name: "Acme Corp",
        plan: "Growth",
        jobsPosted: 4,
        jobLimit: 10,
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent default browser refresh on submit
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as unknown as JobFormData;

        // Log to verify all data is captured perfectly
        console.log("Job Data Submitted:", {
            ...data,
            companyName: companyData.name,
            status: "active"
        });
        const res = await createJob(data)
        console.log("API Response:", res);
        if(res.acknowledged) {
            setIsLoading(false);
            toast.success("Job created successfully!");
            router.push("/");
        } else {
                setIsLoading(false);
            toast.danger("Failed to create job");
        }

        // Simulate an API call delay
       
        
        // 
    };

    return (
        <div className="w-full min-h-screen p-4 md:p-8 flex items-start justify-center">
            <div className="w-full max-w-4xl bg-[#111111] rounded-2xl border border-[#2a2a2a] shadow-2xl overflow-hidden">
                
                {/* --- Header --- */}
                <div className="p-6 md:p-8 border-b border-[#2a2a2a]">
                    <h2 className="text-2xl font-semibold text-white tracking-tight">Post a New Job</h2>
                    <p className="text-sm text-gray-400 mt-1">Fill in the details below to publish your opening to the platform.</p>
                </div>

                {/* --- Context Banner --- */}
                <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#222] border border-gray-700 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">Posting as {companyData.name}</p>
                            <p className="text-xs text-gray-400">{companyData.plan} Plan</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Info className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">
                            <span className="text-white font-medium">{companyData.jobsPosted}</span> / {companyData.jobLimit} jobs posted
                        </span>
                    </div>
                </div>

                {/* --- Form Body --- */}
                <form onSubmit={onSubmit} className="w-full">
                    <div className="p-6 md:p-8 flex flex-col gap-8 w-full">
                        
                        {/* SECTION 1: JOB INFO */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Briefcase className="w-5 h-5 text-[#5C53FE]" />
                                <h3 className="text-lg font-medium text-white">Job Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                <div className="flex flex-col gap-2">
                                    <Label className="text-sm font-medium text-gray-300">Job Title</Label>
                                    <Input 
                                        name="title"
                                        placeholder="e.g. Senior Frontend Developer" 
                                        required
                                        className="w-full"
                                    />
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <Label className="text-sm font-medium text-gray-300">Job Category</Label>
                                    <Select name="category" placeholder="Select category">
                                        <Select.Trigger className="bg-[#1a1a1a] border border-gray-700 text-white rounded-xl h-12">
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover className="bg-[#1a1a1a] border border-gray-700 rounded-xl">
                                            <ListBox>
                                                <ListBox.Item id="engineering" textValue="Engineering & Tech" className="text-white hover:bg-[#2a2a2a]">Engineering & Tech</ListBox.Item>
                                                <ListBox.Item id="design" textValue="Design & UX" className="text-white hover:bg-[#2a2a2a]">Design & UX</ListBox.Item>
                                                <ListBox.Item id="marketing" textValue="Marketing" className="text-white hover:bg-[#2a2a2a]">Marketing</ListBox.Item>
                                                <ListBox.Item id="sales" textValue="Sales" className="text-white hover:bg-[#2a2a2a]">Sales</ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label className="text-sm font-medium text-gray-300">Job Type</Label>
                                    <Select name="jobType" placeholder="Select type">
                                        <Select.Trigger className="bg-[#1a1a1a] border border-gray-700 text-white rounded-xl h-12">
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover className="bg-[#1a1a1a] border border-gray-700 rounded-xl">
                                            <ListBox>
                                                <ListBox.Item id="full-time" textValue="Full-time" className="text-white hover:bg-[#2a2a2a]">Full-time</ListBox.Item>
                                                <ListBox.Item id="part-time" textValue="Part-time" className="text-white hover:bg-[#2a2a2a]">Part-time</ListBox.Item>
                                                <ListBox.Item id="contract" textValue="Contract" className="text-white hover:bg-[#2a2a2a]">Contract</ListBox.Item>
                                                <ListBox.Item id="internship" textValue="Internship" className="text-white hover:bg-[#2a2a2a]">Internship</ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label className="text-sm font-medium text-gray-300">Application Deadline</Label>
                                    <Input 
                                        type="date"
                                        name="deadline"
                                        required
                                        className="w-full"
                                    />
                                </div>

                                {/* Salary Group */}
                                <div className="md:col-span-2 grid grid-cols-3 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-sm font-medium text-gray-300">Min Salary</Label>
                                        <Input type="number" name="salaryMin" placeholder="60,000" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-sm font-medium text-gray-300">Max Salary</Label>
                                        <Input type="number" name="salaryMax" placeholder="120,000" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-sm font-medium text-gray-300">Currency</Label>
                                        <Select name="currency" placeholder="USD">
                                            <Select.Trigger className="bg-[#1a1a1a] border border-gray-700 text-white rounded-xl h-10">
                                                <Select.Value />
                                                <Select.Indicator />
                                            </Select.Trigger>
                                            <Select.Popover className="bg-[#1a1a1a] border border-gray-700 rounded-xl">
                                                <ListBox>
                                                    <ListBox.Item id="usd" textValue="USD ($)" className="text-white hover:bg-[#2a2a2a]">USD ($)</ListBox.Item>
                                                    <ListBox.Item id="eur" textValue="EUR (€)" className="text-white hover:bg-[#2a2a2a]">EUR (€)</ListBox.Item>
                                                    <ListBox.Item id="gbp" textValue="GBP (£)" className="text-white hover:bg-[#2a2a2a]">GBP (£)</ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>
                                </div>

                                {/* Workplace Type & Location */}
                                <div className="md:col-span-2 flex flex-col md:flex-row gap-6 p-4 rounded-xl border border-[#2a2a2a] bg-[#161616]">
                                    
                                    <div className="flex-1 w-full flex flex-col gap-2">
                                        <Label className="text-sm font-medium text-gray-300">Workplace Type</Label>
                                        <Select 
                                            name="workplaceType" 
                                            selectedKeys={new Set([workplace])}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWorkplace(e.target.value)}
                                        >
                                            <Select.Trigger className="bg-[#1a1a1a] border border-gray-700 text-white rounded-xl h-12">
                                                <Select.Value />
                                                <Select.Indicator />
                                            </Select.Trigger>
                                            <Select.Popover className="bg-[#1a1a1a] border border-gray-700 rounded-xl">
                                                <ListBox>
                                                    <ListBox.Item id="onsite" textValue="On-site" className="text-white hover:bg-[#2a2a2a]">On-site</ListBox.Item>
                                                    <ListBox.Item id="hybrid" textValue="Hybrid" className="text-white hover:bg-[#2a2a2a]">Hybrid</ListBox.Item>
                                                    <ListBox.Item id="remote" textValue="Fully Remote" className="text-white hover:bg-[#2a2a2a]">Fully Remote</ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>

                                    <div className="flex-1 w-full flex flex-col gap-2">
                                        <Label className="text-sm font-medium text-gray-300">Location</Label>
                                        <Input 
                                            name="location"
                                            placeholder={workplace === "remote" ? "Not applicable for remote roles" : "City, Country"} 
                                            disabled={workplace === "remote"} 
                                            required={workplace !== "remote"}
                                            className="w-full"
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: JOB DESCRIPTION */}
                        <div className="pt-6 border-t border-[#2a2a2a]">
                            <h3 className="text-lg font-medium text-white mb-6">Job Description</h3>

                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <Label className="text-sm font-medium text-gray-300">Responsibilities</Label>
                                    <TextArea 
                                        name="responsibilities"
                                        placeholder="What will this person do on a daily basis?" 
                                        rows={4}
                                        required
                                        className="w-full"
                                    />
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <Label className="text-sm font-medium text-gray-300">Requirements</Label>
                                    <TextArea 
                                        name="requirements"
                                        placeholder="What skills and experience are necessary?" 
                                        rows={4}
                                        required
                                        className="w-full"
                                    />
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <Label className="text-sm font-medium text-gray-300">Benefits (Optional)</Label>
                                    <TextArea 
                                        name="benefits"
                                        placeholder="Health insurance, PTO, equity, etc." 
                                        rows={3}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Footer Actions --- */}
                    <div className="p-6 border-t border-[#2a2a2a] bg-[#161616] flex items-center justify-end gap-4 rounded-b-2xl w-full">
                        <Button 
                            type="button" 
                            onPress={() => router.back()}
                            className="bg-transparent border border-gray-700 text-white hover:bg-gray-800 font-medium px-6 py-2 rounded-xl transition-colors"
                            isDisabled={isLoading} 
                        >
                            Cancel
                        </Button>
                        
                        <Button 
                            type="submit" 
                            className="bg-white text-black font-semibold shadow-lg hover:bg-gray-200 px-6 py-2 rounded-xl flex items-center gap-2 transition-colors"
                            isDisabled={isLoading} 
                        >
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {isLoading ? "Posting..." : "Post Job"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}