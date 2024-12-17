import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { userRegister } from "@/http/api";

export default function RegisterForm() {
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  // Mutations
  const mutation = useMutation({
    mutationFn: userRegister,
    onSuccess: (data) => {
      console.log("Registration successful"+ JSON.stringify(data));
      navigate("/auth/login");
    },
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userName = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!userName || !email || !password || !confirmPassword) {
      return alert("Please fill in all the fields");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    mutation.mutate({ userName, email, password });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create your account</CardDescription>
      </CardHeader>
      <form onSubmit={handleRegisterSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input ref={nameRef} id="name" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input ref={emailRef} id="email" type="email" placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input ref={passwordRef} id="password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input ref={confirmPasswordRef} id="confirmPassword" type="password" />
          </div>
          {mutation.isError && (
            <p className="text-sm text-red-500">Registration failed. Please try again.</p>
          )}
        </CardContent>

        <CardFooter>
          <div className="w-full">
            <Button onClick={handleRegisterSubmit} type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? "Registering..." : "Register"}
            </Button>
            <p className="text-sm text-muted-foreground text-center p-3">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
