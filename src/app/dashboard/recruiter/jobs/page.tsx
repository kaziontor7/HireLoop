import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Plus } from "lucide-react";

// Import your custom API fetcher and the Client Component table
import { getCompanyJobs } from "@/lib/api/jobs"; 
import { JobsTable } from "@/components/dashboardComponents/JobsTable";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";
 

export default async function JobsPage() {
    // Mock session/DB company ID (Replace with your actual auth logic)
    const company =await getLoggedInRecruiterCompany(); // Fetch the logged-in recruiter's company data

    

    // const companyId = company?._id || "123453"; // Extract company ID from the data, default to empty string if not found

    const companyId =  Array.isArray(company) && company[0]?._id ? company[0]?._id : '0'; // Extract company ID from the data
   
   console.log(companyId);
    
    // console.log("Company ID for fetching jobs:", companyId); // Debug log to check company ID
    // Fetch active jobs from your database securely on the server
    const jobs = await getCompanyJobs(companyId, "");


    console.log("Fetched Jobs:", jobs); // Debug log to check fetched jobs data

    return (
        <div className="w-full min-h-screen p-4 md:p-8 flex flex-col gap-8">
            
            {/* --- Page Header & Actions --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white tracking-tight">Manage Jobs</h1>
                    <p className="text-sm text-gray-400 mt-1">View, edit, and manage your active job postings.</p>
                </div>
                
                {/* Action Button linking to the New Job form */}
                <Link href="/dashboard/recruiter/jobs/new">
                    <Button 
                        className="bg-[#5C53FE] text-white font-medium hover:bg-[#4b43db] transition-colors shadow-[0_0_15px_rgba(107,102,255,0.2)] px-6"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Post New Job
                    </Button>
                </Link>
            </div>

            {/* --- The Jobs Table --- */}
            <div className="w-full">
                {/* Pass the fetched jobs to the Client Component table.
                  If the array is empty, the table will automatically show the empty state.
                */}
                <JobsTable jobs={jobs} />
            </div>
            
        </div>
    );
}