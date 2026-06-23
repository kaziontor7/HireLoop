/* eslint-disable @typescript-eslint/no-explicit-any */
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import React from 'react';
import { CheckCircle2, ArrowRight, Mail, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import Link from 'next/link';
import { createSubscription } from '@/lib/actions/subscription';

interface PageProps {
    searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: PageProps) {
    // Safely await dynamic asynchronous search routing parameters in Next.js
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error('Verification failed: Please provide a valid session_id context wrapper.');
    }

    // Retrieve full session details from Stripe backend APIs
    const session: any = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    });

    const planId = session?.metadata?.planId || 'unknown_plan';

    const customerEmail = session?.customer_details?.email || 'your registered account email';
    const status = session?.status;
    const lineItemName = session?.line_items?.data?.[0]?.description || "Premium Subscription Allocation";

    // If checkout state remains incomplete, send them safely back to homebase
    if (status === 'open') {
        return redirect('/');
    }

    const subsInfo ={
        email: customerEmail,
        planId: planId,
    }

    const result = await createSubscription(subsInfo);
    

    return (
        <div className="w-full min-h-screen bg-[#0a0a0a] text-white px-4 py-16 md:px-8 flex items-center justify-center relative overflow-hidden">

            {/* Ambient Radial Spotlight Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#5C53FE]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-xl bg-[#111111] border border-white/8 rounded-2xl p-6 md:p-8 shadow-2xl relative flex flex-col items-center text-center z-10">

                {/* --- MICRO-ANIMATED HERO SUCCESS BADGE --- */}
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/5 animate-pulse">
                    <CheckCircle2 className="w-8 h-8" />
                </div>

                {/* --- HEADER TEXT --- */}
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                    Payment Confirmed!
                </h1>
            
                <p className="text-sm text-gray-400 mt-2 max-w-sm">
                    Thank you for your purchase. Your account privileges and system allocations have been updated immediately.
                </p>

                {/* --- SUMMARY TRANSACTION DETAILS DETAIL CARD --- */}
                <div className="w-full bg-[#161616] border border-white/5 rounded-xl p-4 mt-8 flex flex-col gap-3 text-left">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Transaction Summary</span>

                    {/* Tier product allocation detail name */}
                    <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2.5">
                        <span className="text-gray-400 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#5C53FE]" /> Activated Plan:
                        </span>
                        <span className="font-bold text-white tracking-wide">{lineItemName}</span>
                    </div>

                    {/* Email fulfillment line item link */}
                    <div className="flex items-center justify-between text-sm pt-0.5">
                        <span className="text-gray-400 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#5C53FE]" /> Delivery Destination:
                        </span>
                        <span className="font-semibold text-gray-300 truncate max-w-[220px]" title={customerEmail}>
                            {customerEmail}
                        </span>
                    </div>
                </div>

                {/* --- FULL SUPPORT EMAIL INLINE FOOTER BANNER --- */}
                <div className="w-full mt-6 bg-white/[0.02] border border-white/5 rounded-xl p-3 flex items-center gap-3 text-left">
                    <div className="p-2 rounded-lg bg-white/4 text-gray-400 shrink-0">
                        <Building2 className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-gray-400 leading-normal">
                        A verification tracking document receipt was sent over. For payment configuration queries, feel free to pitch our support deck at{' '}
                        <a href="mailto:support@hireloop.com" className="text-white font-medium hover:underline">
                            support@hireloop.com
                        </a>.
                    </p>
                </div>

                {/* --- SEPARATION SPACING BARS --- */}
                <div className="h-px bg-white/5 w-full my-8" />

                {/* --- NAVIGATION CTA CALL-TO-ACTIONS --- */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                    <Link
                        href="/dashboard"
                        className="w-full sm:flex-1 inline-flex items-center justify-center bg-white text-black font-bold text-sm h-11 rounded-xl transition-colors hover:bg-gray-200 cursor-pointer shadow-md"
                    >
                        Go To Dashboard
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                    <Link
                        href="/jobs"
                        className="w-full sm:flex-1 inline-flex items-center justify-center bg-transparent border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white text-sm font-semibold h-11 rounded-xl transition-colors"
                    >
                        Explore Jobs
                    </Link>
                </div>

                {/* Embedded global SSL secure icon marker */}
                <div className="mt-8 flex items-center gap-1.5 text-[10px] text-gray-600 font-semibold select-none">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#5C53FE]" /> Verified secure activation channel
                </div>

            </div>
        </div>
    );
}