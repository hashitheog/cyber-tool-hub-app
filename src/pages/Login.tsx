
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Mail } from "lucide-react";
import { useAuth } from "@/components/AuthContext";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await login(values.email, values.password);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="p-3 rounded-full bg-cyber-primary/10">
            <Shield className="h-10 w-10 text-cyber-primary" />
          </div>
        </div>
        <h1 className="text-center text-3xl font-bold text-cyber-foreground mb-2">
          CyberToolHub
        </h1>
        <p className="text-center text-cyber-foreground/70 mb-8">
          Access your cybersecurity toolkit
        </p>
        <Card className="border border-cyber-border bg-cyber-muted/30">
          <CardHeader>
            <CardTitle className="text-cyber-foreground">Login</CardTitle>
            <CardDescription className="text-cyber-foreground/70">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cyber-foreground">Email</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-cyber-foreground/70" />
                        <FormControl>
                          <Input
                            placeholder="you@example.com"
                            className="pl-10 bg-cyber-background border-cyber-border text-cyber-foreground"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cyber-foreground">Password</FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-cyber-foreground/70" />
                        <FormControl>
                          <Input
                            placeholder="••••••••"
                            type="password"
                            className="pl-10 bg-cyber-background border-cyber-border text-cyber-foreground"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-cyber-primary hover:bg-cyber-secondary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Log in"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-cyber-foreground/70">
              Don't have an account?{" "}
              <Link to="/register" className="text-cyber-primary hover:text-cyber-secondary">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
        <p className="text-center mt-6 text-xs text-cyber-foreground/50">
          © {new Date().getFullYear()} CyberToolHub. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
