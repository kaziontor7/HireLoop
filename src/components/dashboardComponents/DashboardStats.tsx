"use client";

import React from 'react';
import { 
    FileText, Users, Zap, CheckCircle, // Recruiter Icons
    Send, Eye, Calendar,               // Seeker Icons
    Building, ShieldAlert              // Admin Icons
} from 'lucide-react';
import { StatCard } from './StatCard';

export function DashboardStats({ role }: { role: 'recruiter' | 'seeker' | 'admin' }) {
    
    // 1. Define the data based on the user's role
    interface StatItem {
        title: string;
        value: string;
        icon: typeof FileText;
    }
    let stats: StatItem[] = [];

    if (role === 'recruiter') {
        // Matches your reference image exactly
        stats = [
            { title: "Total Job Posts", value: "48", icon: FileText },
            { title: "Total Applicants", value: "1,284", icon: Users },
            { title: "Active Jobs", value: "18", icon: Zap },
            { title: "Jobs Closed", value: "32", icon: CheckCircle },
        ];
    } else if (role === 'seeker') {
        stats = [
            { title: "Applications Sent", value: "12", icon: Send },
            { title: "Profile Views", value: "148", icon: Eye },
            { title: "Interviews Scheduled", value: "2", icon: Calendar },
        ];
    } else if (role === 'admin') {
        stats = [
            { title: "Total Users", value: "15,402", icon: Users },
            { title: "Total Companies", value: "840", icon: Building },
            { title: "Reported Posts", value: "3", icon: ShieldAlert },
        ];
    }

    // 2. Render the cards dynamically
    return (
        <div className="flex flex-wrap items-center gap-4 w-full">
            {stats.map((stat, index) => (
                <StatCard 
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                />
            ))}
        </div>
    );
}