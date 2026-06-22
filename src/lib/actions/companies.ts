'use server'

import { serverMutation } from "../core/server";


export const createCompany = async (companyData: any) => {
    return serverMutation('companies', companyData);
}