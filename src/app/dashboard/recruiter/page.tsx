"use client"
import { DashboardStats } from '@/components/dashboardComponents/DashboardStats';
import { authClient } from '@/lib/auth-client';



const RecruiterDashboard = () => {
     const { data: session, isPending } = authClient.useSession();

    return (
        <div>
            <span className="text-2xl font-semibold text-white capitalize mb-6 inline-block">
                                {`Welcome back, ${session?.user?.name}` || "Welcome!"}
                            </span>
            <DashboardStats role={"recruiter"} />
        </div>
    );
};

export default RecruiterDashboard;