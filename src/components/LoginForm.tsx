import { useRef, useState } from "react";
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
  const setToken = useTokenStore((state) => state.setToken)

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Mutations
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
       console.log("login successful")

        setToken(response.data.accessToken);
        navigate("/home");
    },
  })

  const handleLoginSubmit = ()=> {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      console.log("DATA", {email, password});

      if(!email || !password){
        return alert("Please fill in all the fields");
      }
      mutation.mutate({email, password});

  }


  return (
    <Card className="w-[350px]">
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
              <Input ref={emailRef}
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required/>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input ref={passwordRef}
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col">
          <Button onClick={handleLoginSubmit} className="w-full" type="submit">
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
