"use server"

import { serverMutation } from "../core/server";



export const createJob = async (jobData: any) => {
    return serverMutation('jobs', jobData);
}
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// export const createJob = async (jobData: any) => {
//     const res = await fetch(`${API_URL}/jobs`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(jobData),
//     });
//     return res.json();
// }