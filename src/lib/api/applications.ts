import { serverFetch } from "../core/server"

export const getApplicationsByJobId = async (applicantId: string | undefined) => {
     const res = await serverFetch(`/applications?applicantId=${applicantId}`);
     return res;
}