"use client";

import React from "react";
import { Search, Briefcase, MapPin, Layers, ChevronDown } from "lucide-react";

interface JobFiltersProps {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    workplaceType: string;
    setWorkplaceType: (val: string) => void;
    jobType: string;
    setJobType: (val: string) => void;
    category: string;
    setCategory: (val: string) => void;
}

export function JobFilters({
    searchQuery,
    setSearchQuery,
    workplaceType,
    setWorkplaceType,
    jobType,
    setJobType,
    category,
    setCategory
}: JobFiltersProps) {
    return (
        <div className="w-full max-w-7xl bg-[#111111] border border-white/8 rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center gap-4 shadow-xl">
            
            {/* 1. Text Search Input Field */}
            <div className="relative w-full md:flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Search className="w-4 h-4" />
                </div>
                <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by job title, company, or keywords..."
                    className="w-full bg-[#161616] border border-white/5 hover:border-white/15 focus:border-[#5C53FE] text-white placeholder-gray-600 text-sm rounded-xl h-11 pl-10 pr-4 transition-colors focus:outline-none"
                />
            </div>

            {/* Dropdowns Multi-Grid wrapper */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto md:min-w-[500px]">
                
                {/* 2. Category Dropdown Filter */}
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <Layers className="w-4 h-4" />
                    </div>
                    <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-[#161616] border border-white/5 hover:border-white/15 focus:border-[#5C53FE] text-white text-sm rounded-xl h-11 pl-9 pr-10 appearance-none transition-colors cursor-pointer focus:outline-none"
                    >
                        <option value="">All Categories</option>
                        <option value="engineering-tech">Engineering</option>
                        <option value="design-ux">Design & UX</option>
                        <option value="marketing">Marketing</option>
                        <option value="sales">Sales</option>
                        <option value="retail">Retail</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                {/* 3. Workplace Type Filter (Remote/Hybrid/Onsite) */}
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <MapPin className="w-4 h-4" />
                    </div>
                    <select 
                        value={workplaceType}
                        onChange={(e) => setWorkplaceType(e.target.value)}
                        className="w-full bg-[#161616] border border-white/5 hover:border-white/15 focus:border-[#5C53FE] text-white text-sm rounded-xl h-11 pl-9 pr-10 appearance-none transition-colors cursor-pointer focus:outline-none"
                    >
                        <option value="">All Formats</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="onsite">Onsite</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                {/* 4. Job Availability Type Filter */}
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <Briefcase className="w-4 h-4" />
                    </div>
                    <select 
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        className="w-full bg-[#161616] border border-white/5 hover:border-white/15 focus:border-[#5C53FE] text-white text-sm rounded-xl h-11 pl-9 pr-10 appearance-none transition-colors cursor-pointer focus:outline-none"
                    >
                        <option value="">All Job Types</option>
                        <option value="full-time">Full-Time</option>
                        <option value="part-time">Part-Time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

            </div>

        </div>
    );
}