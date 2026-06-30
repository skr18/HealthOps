import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

import { login } from "@/features/auth/auth-api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useAppDispatch } from "@/app/hooks";
import { setAuthenticatedUser } from "@/features/auth/auth-slice";

import {getUserFromToken,saveToken,} from "@/lib/auth-storage";

const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(6, "Password required"),
});

type LoginFormValues =z.infer<typeof loginSchema>;

interface ApiErrorResponse {
  message?: string | string[];
}

export default function Login() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormValues>({
    resolver:zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {

      setServerError("");
      const response = await login(data);
      if ( !response.data.access_token || !response.data.user) {
        console.log("response ",response)
        setServerError("The responce object is empty !!!");
        return;
      }

      saveToken(response.data.access_token);

      dispatch(setAuthenticatedUser(response.data.user));

      navigate("/dashboard", { replace: true }); // replace true will clear you previous page histroy so when you click back button it does not take you back to login page.


    } catch (error: any) {

      const axiosError = error as AxiosError<ApiErrorResponse>;
      const message = axiosError.response?.data?.message;
      setServerError( Array.isArray(message)? message.join(", "): message ?? "Unable to sign in. Please try again.",);
    }
  };

   return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600">
            HealthOps
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Sign in to access your healthcare workspace.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          {serverError && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {serverError}
            </div>
          )}

          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
          >
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          New to HealthOps?{" "}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}