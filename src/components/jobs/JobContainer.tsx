"use client";

import React, { useState, useMemo } from "react";
import { JobFilters } from "./JobFilters";
import { JobCard, Job } from "./JobCard";

export function JobsContainer({ initialJobs }: { initialJobs: Job[] }) {
    // State management tracking user interactions
    const [searchQuery, setSearchQuery] = useState("");
    const [workplaceType, setWorkplaceType] = useState("");
    const [jobType, setJobType] = useState("");
    const [category, setCategory] = useState("");

    // Memoized computation pipeline to filter matching positions live
    const filteredJobs = useMemo(() => {
        return initialJobs.filter((job) => {
            const matchesSearch = 
                !searchQuery ||
                job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.responsibilities?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesWorkplace = 
                !workplaceType || 
                job.workplaceType?.toLowerCase() === workplaceType.toLowerCase();

            const matchesJobType = 
                !jobType || 
                job.jobType?.toLowerCase() === jobType.toLowerCase();

            const matchesCategory = 
                !category || 
                job.category?.toLowerCase() === category.toLowerCase();

            return matchesSearch && matchesWorkplace && matchesJobType && matchesCategory;
        });
    }, [initialJobs, searchQuery, workplaceType, jobType, category]);

    return (
        <div className="w-full max-w-7xl">
            {/* Interactive Filters Bar Component */}
            <JobFilters 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                workplaceType={workplaceType}
                setWorkplaceType={setWorkplaceType}
                jobType={jobType}
                setJobType={setJobType}
                category={category}
                setCategory={setCategory}
            />

            {/* Dynamic Results Header Counter info line */}
            <div className="text-xs font-semibold text-gray-500 mb-6 uppercase tracking-wider select-none">
                Found {filteredJobs.length} matching positions
            </div>

            {/* Responsive Fluent Cards Grid Layout */}
            {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {filteredJobs.map((job) => {
                        const uniqueKey = typeof job._id === 'object' ? job._id.$oid : job._id;
                        return <JobCard key={uniqueKey} job={job} />;
                    })}
                </div>
            ) : (
                /* Fallback layout if active filters clear out the entire list array */
                <div className="w-full py-20 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl bg-[#111111]/30">
                    <span className="text-sm text-gray-500 font-medium">
                        No positions match your selected filter parameters. Try clearing your search fields!
                    </span>
                </div>
            )}
        </div>
    );
}