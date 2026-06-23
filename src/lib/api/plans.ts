import { serverFetch } from "../core/server";

export const getPlan = (planId: string) => {
    return serverFetch(`/plans?plan_id=${planId}`);
}