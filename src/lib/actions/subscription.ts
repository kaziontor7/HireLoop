import { serverMutation } from "../core/server";

export const createSubscription = async (subscriptionData: any) => {
    // TODO: Implement the actual API call to create a subscription
    return serverMutation('subscriptions', subscriptionData);
};