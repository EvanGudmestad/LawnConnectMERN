import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

import { getClient, getDatabase } from "./database.js";

const client = await getClient();
const db = await getDatabase();

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:8080",
    trustedOrigins: ["http://localhost:5173", "http://localhost:3000", "http://localhost:8080", "https://lawnconnect-service-294349793000.us-central1.run.app"],
   database: mongodbAdapter(db, {
        client
    }),
     emailAndPassword: { 
        enabled: true, 
    },
    socialProviders:{
        google:{
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }
    },
     session:{
        cookieCache:true,
        maxAge: 60 * 60 * 1000 // 1 hour
    },
    user: {
        additionalFields: {
            role: {
                type: "json",
                required: false,
                 defaultValue: ["customer"]
            },
            profile: {
                type: "json",
                required: false,
                defaultValue: {}
                /* Polymorphic structure based on role:
                 * For CUSTOMER:
                 * {
                 *   firstName: string,
                 *   lastName: string,
                 *   phone: string,
                 *   avatar: string,
                 *   address_history: [{ address, city, state, zip, isDefault, addedAt }],
                 *   preferences: { notifications, newsletter },
                 *   saved_providers: [ObjectId]
                 * }
                 * 
                 * For PROVIDER:
                 * {
                 *   firstName: string,
                 *   lastName: string,
                 *   phone: string,
                 *   avatar: string,
                 *   company_name: string (required),
                 *   bio: string,
                 *   stripe_connect_account_id: string (critical for payments),
                 *   services: [ObjectId],
                 *   service_area: [{ city, state, radius }],
                 *   rating: number,
                 *   total_reviews: number,
                 *   verified: boolean
                 * }
                 */
            }
        }
    }

});