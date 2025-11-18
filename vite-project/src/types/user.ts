// Base user fields that all users have
export interface BaseUser {
  _id: string;
  email: string;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  role?: string[];
  name?: string;
}

// Customer-specific profile
export interface CustomerProfile {
  given_name?: string;
  family_name?: string;
  phone?: string;
  address_history?: string[];
}

// Provider-specific profile
export interface ProviderProfile {
  company_name?: string;
  bio?: string;
  phone?: string;
  address_history?: string[];
  service_area?: Array<{
    city: string;
    state: string;
  }>;
  services?: Array<{
    serviceId: string;
    pricing: {
      unit: string;
      rate: number;
      minimumCharge: number;
      tiers: Array<{
        upToSqft?: number;
        rate: number;
        minimumCharge?: number;
      }>;
    };
    available: boolean;
  }>;
  [key: string]: unknown; // Allow additional properties for future changes
}

// User type with discriminated union
export type User = 
  | (BaseUser & { role?: ["customer"]; profile?: CustomerProfile })
  | (BaseUser & { role?: ["provider"]; profile?: ProviderProfile })
  | (BaseUser & { role?: string[]; profile?: Record<string, unknown> }); // Fallback for other roles