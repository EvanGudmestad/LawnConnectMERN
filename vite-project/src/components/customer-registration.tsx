import { useState, type FormEvent } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import customerRegistrationSchema from "@/schemas/customerRegistrationSchema";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router-dom";

export function CustomerRegistrationForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
    };

    try {
      // Validate with zod
      const validated = customerRegistrationSchema.parse(data);

      // Use Better Auth signUp with additional fields via fetchOptions
      const { data: result, error } = await authClient.signUp.email(
        {
          email: validated.email,
          password: validated.password,
          name: validated.name,
        },
        {
          onRequest: (ctx) => {
            // Parse the body if it's a string, otherwise use as-is
            const bodyData =
              typeof ctx.body === "string"
                ? JSON.parse(ctx.body)
                : ctx.body;

            // Add custom fields
            const updatedBody = {
              ...bodyData,
              role: ["customer"],
              profile: {
                phone: validated.phone,
                address_history: [validated.address],
              },
            };

            // Stringify the body back
            ctx.body = JSON.stringify(updatedBody);

            // Return the full context
            return ctx;
          },
        }
      );

      if (error) {
        throw new Error(error.message || "Registration failed");
      }

      console.log("Registration successful:", result);

      // Better Auth automatically sets session cookies
      // Redirect to home page after successful registration
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);

      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path && issue.path.length > 0) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setErrors({
          root: error instanceof Error ? error.message : "Registration failed",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Customer Account</CardTitle>
        <CardDescription>
          Sign up to find lawn care services in your area
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Name Fields */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(314) 286-3691"
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="4431 Finney Ave, St. Louis, MO 63113"
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword}</p>
            )}
          </div>

          {/* General Error */}
          {errors.root && (
            <div className="text-sm text-destructive">{errors.root}</div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>

          {/* Link to Provider Registration */}
          <p className="text-center text-sm text-muted-foreground">
            Are you a lawn care provider?{" "}
            <a
              href="/register/provider"
              className="text-primary hover:underline"
            >
              Sign up here
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}