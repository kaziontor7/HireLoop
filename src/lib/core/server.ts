'use server'
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';


export const serverFetch = async (path:string)=>{
    const res = await fetch (`${API_URL}${path}`);
    return res.json();
}

export const serverMutation = async (path: string, data: any) => {
    const res = await fetch(`${API_URL}/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();

}   


export const revalidate =async (path: string) => {
    
    return await revalidatePath(path);
}