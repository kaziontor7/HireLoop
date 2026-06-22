import { JobsContainer } from '@/components/jobs/JobContainer';
import { getJobs } from '@/lib/api/jobs';

export default async function JobsPage() {
    // Fetch the jobs array directly on the server
    const initialJobs = await getJobs();

    return (
        <div className="w-full min-h-screen bg-[#0a0a0a] text-white px-4 py-8 md:px-8 lg:px-12 flex flex-col items-center">
            
            {/* Header Content Section */}
            <div className="w-full max-w-7xl mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Explore Opportunities
                    </h1>
                    <p className="text-sm text-gray-400 mt-1.5 max-w-xl">
                        Discover your next career milestone. Find high-performance technical engineering positions curated from top-tier teams.
                    </p>
                </div>
            </div>

            {/* Pass the server data down into our smart interactive Client Container */}
            <JobsContainer initialJobs={initialJobs || []} />

        </div>
    );
}