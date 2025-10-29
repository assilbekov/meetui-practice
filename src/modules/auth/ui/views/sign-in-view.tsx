"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export function SignInView() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.push("/");
          setIsLoading(false);
        },
        onError: ({ error }) => {
          setError(error.message);
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-semibold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Enter your email and password to sign in to your account
                  </p>
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="m@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {!!error && (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="after:border-border relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.25 after:bg-border flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    Or continue with
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  Github
                </Button>
              </div>

              <div className="flex flex-col items-center text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-primary underline hover:text-primary/80"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </Form>

          <div className="bg-radial from-green-500 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <Image src="/logo.svg" alt="Meet AI" width={55} height={41} />
            <p className="text-2xl font-semibold text-white">Meet AI</p>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground text-center text-sm">
        <p>
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-primary/80">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-primary/80">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
