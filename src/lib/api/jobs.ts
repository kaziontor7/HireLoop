import { serverFetch } from "../core/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';


export const getJobs = async () => {
    const res = await serverFetch('/jobs');
    return res;
}

export const getJobById = async (id: string) => {
    const res = await serverFetch(`/jobs/${id}`);
    return res;
}

export const getCompanyJobs = async (companyId: string, status: string) => {
    const res = await fetch(`${API_URL}/jobs?companyId=${companyId}&status=${status}`)
    return res.json();
}