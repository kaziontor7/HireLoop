import { serverMutation } from "../core/server";

export const createApplication = async (applicationData: any) => {
    // TODO: Implement the actual API call to create an application
    return serverMutation('applications', applicationData);
};