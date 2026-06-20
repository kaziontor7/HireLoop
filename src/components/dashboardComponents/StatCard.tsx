
import { LucideIcon } from 'lucide-react';

export interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
}

export function StatCard({ title, value, icon: Icon }: StatCardProps) {
    return (
        <div className="flex flex-col p-6 bg-[#161616] border border-white/10 rounded-2xl flex-1 min-w-[240px]">
            {/* Icon Wrapper */}
            <div className="flex items-center justify-center w-10 h-10 mb-10 rounded-xl bg-[#2a2a2a] text-gray-300">
                <Icon className="w-5 h-5" strokeWidth={2} />
            </div>
            
            {/* Text Content */}
            <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-gray-400">
                    {title}
                </span>
                <span className="text-3xl font-semibold text-white tracking-tight">
                    {value}
                </span>
            </div>
        </div>
    );
}