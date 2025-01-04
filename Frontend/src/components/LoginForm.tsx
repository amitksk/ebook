import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/http/api.ts";
import useTokenStore from "@/store";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");

  const navigate = useNavigate();

  const { setTokens } = useTokenStore.getState();

  // // Inside your component
  // useEffect(() => {
  //   const { accessToken } = useTokenStore.getState(); // Get token after the mutation
  //   console.log("Access Token after update:", accessToken);
  // }, [useTokenStore.getState().accessToken]); // Trigger effect when accessToken changes

  // Mutations
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (response) => {
      const accessToken = response?.data?.data?.accessToken;
      const refreshToken = response?.data?.data?.refreshToken;

      if (accessToken && refreshToken) {
        //console.log("Tokens:", accessToken, refreshToken);
        
        setTokens(accessToken, refreshToken);

      console.log("Tokens saved to Zustand");

      navigate("/");
      } else {
        console.error("Access or Refresh token missing in response!");
      }
    },
    onError: (err) => {
      console.error("Login Error: ", err.message || "Something went wrong");
      alert(err.message || "Login failed");
    },
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (!email || !password) {
      return alert("Please fill in all the fields");
    }
    mutation.mutate({ email, password });
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
          {mutation.isPending && <div>Loading...</div>}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleLoginSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col">
          <Button className="w-full" type="submit">
            Sign In
          </Button>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <p className="text-sm text-muted-foreground text-center p-3">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
