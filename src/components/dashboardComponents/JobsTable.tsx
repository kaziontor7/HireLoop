"use client";

import React from "react";
import {
    Table,
    Button,
    Tooltip
} from "@heroui/react";
import { Eye, Edit, Trash2 } from "lucide-react";

// Define the shape of your job data
export interface Job {
    _id: string;
    title: string;
    category: string;
    location?: string; // Made optional since remote jobs might not have it
    deadline: string;
    workplaceType: string;
    status: string;
}

export function JobsTable({ jobs }: { jobs: Job[] }) {
    return (
        <Table className="bg-[#111111] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden w-full">
            <Table.ScrollContainer>
                <Table.Content aria-label="Active jobs table">
                    
                    {/* Fixed: Added text-xs to headers for a cleaner, premium look */}
                    <Table.Header className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
                        <Table.Column id="title" className="text-gray-400 font-medium text-xs tracking-wider py-4 px-6 text-left">JOB TITLE</Table.Column>
                        <Table.Column id="category" className="text-gray-400 font-medium text-xs tracking-wider py-4 px-6 text-left">CATEGORY</Table.Column>
                        <Table.Column id="location" className="text-gray-400 font-medium text-xs tracking-wider py-4 px-6 text-left">LOCATION</Table.Column>
                        <Table.Column id="deadline" className="text-gray-400 font-medium text-xs tracking-wider py-4 px-6 text-left">DEADLINE</Table.Column>
                        <Table.Column id="actions" className="text-gray-400 font-medium text-xs tracking-wider py-4 px-6 text-right">ACTIONS</Table.Column>
                    </Table.Header>
                    
                    <Table.Body 
                        items={jobs} 
                        renderEmptyState={() => <div className="p-8 text-center text-gray-400">No active jobs found.</div>}
                    >
                        {(job) => (
                            <Table.Row id={job._id} className="hover:bg-white/[0.02] transition-colors border-b border-white/[0.05]">
                                
                                {/* 1. Job Title */}
                                <Table.Cell className="py-4 px-6">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-white capitalize">{job.title}</span>
                                        <span className="text-xs text-gray-400 capitalize">{job.workplaceType}</span>
                                    </div>
                                </Table.Cell>

                                {/* 2. Category */}
                                <Table.Cell className="py-4 px-6 text-gray-300 capitalize">
                                    {job.category}
                                </Table.Cell>

                                {/* 3. Location (FIXED: Handles Remote Logic) */}
                                <Table.Cell className="py-4 px-6">
                                    {job.workplaceType.toLowerCase() === "remote" ? (
                                        <span className="text-[#5C53FE] font-medium bg-[#5C53FE]/10 px-2 py-1 rounded-md text-sm">
                                            Remote
                                        </span>
                                    ) : (
                                        <span className="text-gray-300 capitalize">
                                            {job.location || "N/A"}
                                        </span>
                                    )}
                                </Table.Cell>

                                {/* 4. Deadline */}
                                <Table.Cell className="py-4 px-6 text-gray-300">
                                    {new Date(job.deadline).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </Table.Cell>

                                {/* 5. Actions */}
                                <Table.Cell className="py-4 px-6">
                                    <div className="flex items-center justify-end gap-2">
                                        
                                        {/* View Tooltip */}
                                        <Tooltip>
                                            <Tooltip.Trigger>
                                                <Button isIconOnly size="sm" className="bg-transparent text-gray-400 hover:text-white transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content placement="top" className="bg-[#222] text-white px-3 py-1.5 rounded-lg text-sm border border-white/10">
                                                View Details
                                            </Tooltip.Content>
                                        </Tooltip>

                                        {/* Edit Tooltip */}
                                        <Tooltip>
                                            <Tooltip.Trigger>
                                                <Button isIconOnly size="sm" className="bg-transparent text-gray-400 hover:text-[#5C53FE] transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content placement="top" className="bg-[#222] text-white px-3 py-1.5 rounded-lg text-sm border border-white/10">
                                                Edit Job
                                            </Tooltip.Content>
                                        </Tooltip>

                                        {/* Delete Tooltip */}
                                        <Tooltip>
                                            <Tooltip.Trigger>
                                                <Button isIconOnly size="sm" className="bg-transparent text-gray-400 hover:text-red-500 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content placement="top" className="bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1.5 rounded-lg text-sm">
                                                Delete Job
                                            </Tooltip.Content>
                                        </Tooltip>

                                    </div>
                                </Table.Cell>

                            </Table.Row>
                        )}
                    </Table.Body>

                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
}