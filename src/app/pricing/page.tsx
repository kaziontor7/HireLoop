"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronDown, HelpCircle, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

interface PricingTier {
    id: string;
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    ctaText: string;
    popular?: boolean;
}

export default function PricingPage() {
    // State to toggle between Seeker and Recruiter plans
    const [userType, setUserType] = useState<"seeker" | "recruiter">("seeker");

    // State to handle multiple open FAQ items separately
    const [openFaq, setOpenFAQ] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFAQ(openFaq === index ? null : index);
    };

    // Data mapped directly from your image requirements specifications
    const seekerPlans: PricingTier[] = [
        {
            name: "Free",
            id: "seeker_free",
            price: "$0",
            period: "/forever",
            description: "Essential tools to kickstart your professional job search mapping journey.",
            features: [
                "Browse & save up to 10 jobs",
                "Apply to up to 3 jobs per month",
                "Basic profile creation",
                "Standard email alerts"
            ],
            ctaText: "Get Started Free"
        },
        {
            name: "Pro",
            id: "seeker_pro",
            price: "$19",
            period: "/month",
            description: "Advanced features built for active job seekers targeting competitive roles.",
            features: [
                "Apply to up to 30 jobs per month",
                "Unlimited saved positions",
                "Real-time application tracking",
                "Exclusive salary insight data"
            ],
            ctaText: "Upgrade to Pro",
            popular: true
        },
        {
            name: "Premium",
            id: "seeker_premium",
            price: "$39",
            period: "/month",
            description: "Ultimate placement resources giving you maximum reach and visibility.",
            features: [
                "Everything included in Pro tier",
                "Unlimited job applications",
                "Profile boost priority ranking",
                "Early access to fresh openings",
                "24/7 dedicated priority support"
            ],
            ctaText: "Go Premium"
        }
    ];

    const recruiterPlans: PricingTier[] = [
        {
            name: "Free",
            id: "recruiter_free",
            price: "$0",
            period: "/forever",
            description: "Basic features perfect for sourcing your company's inaugural early hires.",
            features: [
                "Up to 3 active job postings",
                "Basic applicant management profile",
                "Standard organic listing visibility"
            ],
            ctaText: "Start Sourcing Free"
        },
        {
            name: "Growth",
            id: "recruiter_growth",
            price: "$49",
            period: "/month",
            description: "Expanded utilities built for scaling companies with recurring talent needs.",
            features: [
                "Up to 10 active job postings",
                "Comprehensive applicant tracking metrics",
                "Basic data analytics tracking dashboard",
                "Standard email support queue"
            ],
            ctaText: "Scale My Sourcing",
            popular: true
        },
        {
            name: "Enterprise",
            id: "recruiter_enterprise",
            price: "$149",
            period: "/month",
            description: "Complete hiring suite designed for large corporations needing deep workflows.",
            features: [
                "Up to 50 active job postings",
                "Advanced data analytics pipeline",
                "Featured prominent premium listings",
                "Team collaboration seat licenses",
                "Custom corporate branding spaces",
                "Priority account manager support"
            ],
            ctaText: "Contact Enterprise Sales"
        }
    ];

    const currentPlans = userType === "seeker" ? seekerPlans : recruiterPlans;

    const faqs = [
        {
            q: "Can I switch or cancel my plan at any time?",
            a: "Absolutely. All paid premium tiers operate on a month-to-month subscription matrix. You can modify your tier limits or cancel auto-renew tracking inside your account settings layout instantly with zero penalty overhead fees."
        },
        {
            q: "What payment methods are supported on HireLoop?",
            a: "We process all platform tier payments safely through secure tokenized transactions supporting standard credit cards (Visa, MasterCard, Amex), Apple Pay, Google Pay, and direct global wire options."
        },
        {
            q: "What happens if I exhaust my application allocation quota midway?",
            a: "If your monthly application submission tracking ceiling is reached, your pipeline will temporarily halt new submissions. You can cleanly unlock expanded volume targets immediately by choosing a higher plan tier."
        },
        {
            q: "Are there refunds if I cancel my subscription period early?",
            a: "Subscriptions remain fully operational throughout the pre-paid billing term window. We do not issue partial pro-rated refunds for unused days following an mid-cycle cancellation."
        }
    ];

    return (
        <div className="w-full min-h-screen bg-[#0a0a0a] text-white px-4 py-12 md:px-8 lg:px-12 flex flex-col items-center">
            <div className="w-full max-w-7xl flex flex-col items-center">

                {/* --- HEADER TITLE CONTEXT --- */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                        Flexible Plans Tailored For You
                    </h1>
                    <p className="text-sm text-gray-400 mt-3 max-w-md mx-auto leading-relaxed">
                        Choose the right workspace resource boundaries to match your career exploration or team scaling objectives.
                    </p>

                    {/* --- TOGGLE SELECTION COMPONENT --- */}
                    <div className="inline-flex bg-[#111111] border border-white/5 p-1 rounded-xl mt-8 shadow-inner">
                        <button
                            onClick={() => setUserType("seeker")}
                            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${userType === "seeker"
                                    ? "bg-[#5C53FE] text-white shadow-md"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            For Job Seekers
                        </button>
                        <button
                            onClick={() => setUserType("recruiter")}
                            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${userType === "recruiter"
                                    ? "bg-[#5C53FE] text-white shadow-md"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            For Recruiters
                        </button>
                    </div>
                </div>

                {/* --- CARDS GRID CONTENT LAYOUT --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-stretch justify-items-center mb-24">
                    {currentPlans.map((tier, idx) => (
                        <div
                            key={idx}
                            className={`w-full max-w-sm rounded-2xl p-6 flex flex-col border transition-all duration-300 relative shadow-2xl ${tier.popular
                                    ? "bg-[#13131c] border-[#5C53FE]/50 shadow-[#5C53FE]/5 scale-[1.02] z-10"
                                    : "bg-[#111111] border-white/8 hover:border-white/15"
                                }`}
                        >
                            {tier.popular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5C53FE] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                                    <Zap className="w-3 h-3 fill-current" /> Most Popular
                                </span>
                            )}

                            {/* Plan Header */}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white tracking-tight">{tier.name}</h3>
                                <p className="text-xs text-gray-500 mt-1 h-8 leading-normal">{tier.description}</p>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-4xl font-extrabold text-white tracking-tight">{tier.price}</span>
                                    <span className="text-sm text-gray-400 font-medium ml-1">{tier.period}</span>
                                </div>
                            </div>

                            {/* Action Button */}
                            
                              {tier.id === "seeker_free" || tier.id === "recruiter_free" ? <><Link href="/"><button className={` w-full h-11 font-bold text-sm rounded-xl transition-all cursor-pointer shadow-md mb-8 ${tier.popular
                                        ? "bg-[#5C53FE] text-white hover:bg-[#4b43db] shadow-[#5C53FE]/10"
                                        : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                                    }`} >
                                        
                                            {tier.ctaText}
                                            </button></Link></>:<><form action="/api/checkout_sessions" method="POST">
                                            <input type="hidden" name="plan_id" value={tier.id}></input>
                                    <section>
                                       <button   className={`w-full h-11 font-bold text-sm rounded-xl transition-all cursor-pointer shadow-md mb-8 ${tier.popular
                                        ? "bg-[#5C53FE] text-white hover:bg-[#4b43db] shadow-[#5C53FE]/10"
                                        : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                                    }`} type="submit" role="link">
                                        
                                            {tier.ctaText}
                                        </button>
                                        
                                    </section>
                                </form></>}
                        
                                
                                
                            

                            {/* Features Stack List */}
                            <div className="flex-1 flex flex-col gap-3.5">
                                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">Key Features Included</span>
                                {tier.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-start gap-3 text-sm text-gray-300">
                                        <CheckCircle2 className="w-4 h-4 text-[#5C53FE] shrink-0 mt-0.5" />
                                        <span className="leading-tight">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- ACCORDION FAQ SECTION --- */}
                <div className="w-full max-w-3xl border-t border-white/5 pt-16">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
                            <HelpCircle className="w-6 h-6 text-[#5C53FE]" /> Frequently Asked Questions
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            Everything you need to know about billing configurations, switching pipelines, and allocations.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        {faqs.map((faq, fIdx) => {
                            const isCurrentOpen = openFaq === fIdx;
                            return (
                                <div
                                    key={fIdx}
                                    className="bg-[#111111] border border-white/5 hover:border-white/10 rounded-xl overflow-hidden transition-all duration-300"
                                >
                                    <button
                                        onClick={() => toggleFaq(fIdx)}
                                        className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm md:text-base text-white focus:outline-none cursor-pointer transition-colors"
                                    >
                                        <span>{faq.q}</span>
                                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 shrink-0 ml-4 ${isCurrentOpen ? "rotate-180 text-white" : ""}`} />
                                    </button>

                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isCurrentOpen ? "max-h-40 border-t border-white/5" : "max-h-0"
                                            }`}
                                    >
                                        <p className="p-5 text-sm text-gray-400 leading-relaxed bg-[#141414]">
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer trust strip */}
                <div className="mt-20 flex items-center gap-2 text-xs text-gray-600 font-medium select-none pb-4">
                    <ShieldCheck className="w-4 h-4 text-[#5C53FE]" /> All billing channels are protected via industry-standard end-to-end SSL data encryption protocols.
                </div>

            </div>
        </div>
    );
}