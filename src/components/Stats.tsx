"use client";

import React from 'react';
import { Briefcase, Building2, Users, Star } from 'lucide-react'; 

const statsData = [
  {
    icon: <Briefcase className="w-5 h-5 text-gray-400" />,
    number: '50K',
    label: 'Active Jobs',
  },
  {
    icon: <Building2 className="w-5 h-5 text-gray-400" />,
    number: '12K',
    label: 'Companies',
  },
  {
    icon: <Users className="w-5 h-5 text-gray-400" />,
    number: '2M',
    label: 'Job Seekers',
  },
  {
    icon: <Star className="w-5 h-5 text-gray-400" />,
    number: '97%',
    label: 'Satisfaction Rate', 
  },
];

const StatsComponent = () => {
  return (
    <div className="relative w-full bg-[#050505] bg-[url('/images/globe.png')] bg-no-repeat bg-cover bg-center text-white pt-32 pb-24 px-6 md:px-12 lg:px-24 border-t border-[#1a1a1a]">
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505] z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col items-center">
        
        {/* --- Hero Text Section --- */}
        <div className="text-center max-w-2xl px-4 mb-32 md:mb-40">
          <p className="text-3xl md:text-4xl font-semibold leading-snug drop-shadow-lg">
            Assisting over <span className="text-[#5C53FE]">15,000</span> job seekers find their dream positions.
          </p>
        </div>

        {/* --- Stats Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {statsData.map((stat, index) => (
            <div 
              key={index} 
              // UPDATED: Glassmorphism Tailwind Classes applied here
              className="flex flex-col gap-6 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06] hover:border-[#5C53FE]/50 hover:shadow-[0_8px_30px_rgba(92,83,254,0.15)] bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            >
              
              <div className="flex items-center">
                {stat.icon}
              </div>

              <div className="text-5xl lg:text-6xl font-bold tracking-tight text-white mt-auto drop-shadow-md">
                {stat.number}
              </div>

              <div className="text-sm font-medium text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default StatsComponent;