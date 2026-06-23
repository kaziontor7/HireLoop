import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const planPriceIds: Record<string, string> = {
    'seeker_pro': "price_1TlXM7Dq4iEC9v6oB4yUWJyD",
    'seeker_premium': "price_1TlZ4ADq4iEC9v6o2WQvDYsB",
    'recruiter_growth': "price_1TlZ5UDq4iEC9v6os9pZHVNH",
    'recruiter_enterprise': "price_1TlZ6RDq4iEC9v6oIga7oc3k",
};