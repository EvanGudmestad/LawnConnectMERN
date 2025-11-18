import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import loginSchema from "@/schemas/loginSchema"
import { useNavigate } from "react-router-dom";


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  
  // State Variables for form inputs
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn } = authClient;
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();



  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();
    // Handle login logic here, e.g., call authClient.login(email, password)
    console.log("Logging in with", email, password);

     //Validate with zod schema
        const result = loginSchema.safeParse({ email, password });

         if (!result.success) {
            // Handle validation errors
            setError(result.error.issues[0].message);
            return;
        }

     await signIn.email({
      email,
      password,
    }, {
      onSuccess: () => {
        // User is automatically logged in, session cookie is set
        console.log("Login successful");
        navigate("/");

        setError(null);
      },
      onError: () => {
        setError("Invalid email or password");
      }
    });
  }

    const handleGoogleLogin = async () => {
  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/", // Redirect to home page after successful login
    });
  } catch (error) {
    console.error("Google login failed:", error);
    setError("Google login failed. Please try again.");
  }
}


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button variant="outline" type="button" onClick={handleGoogleLogin}>
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
