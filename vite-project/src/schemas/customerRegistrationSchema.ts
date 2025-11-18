import { z } from "zod";

// Simple phone validator (10 digits, allows various formats)
const phoneValidator = z
  .string()
  .min(1, "Phone number is required")
  .refine(
    (val) => {
      // Remove all non-digit characters
      const digits = val.replace(/\D/g, "");
      // Check if it's exactly 10 digits
      return digits.length === 10;
    },
    "Phone number must be 10 digits"
  );

// Customer registration schema
const customerRegistrationSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(2, "Name is required"),
    password: z.string().min(9, "Password must be at least 9 characters"),
    confirmPassword: z.string(),
    phone: phoneValidator,
    address: z.string().min(5, "Address is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default customerRegistrationSchema;