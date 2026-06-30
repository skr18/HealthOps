import { checkNickname, signup } from "@/features/auth/auth-api";;
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

const signupSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  nickname: z.string().min(3, "Nickname must be at least 3 characters").max(20, "Nickname cannot exceed 20 characters"),
  confirmPassword: z.string(),
  role: z.enum(["PATIENT", "DOCTOR"]),
}).refine(data => data.password === data.confirmPassword,
  {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  }
);

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const {
    register,     // Replaces your onChange and value props
    handleSubmit, // Wraps your submit function
    watch,
    formState: { errors, isSubmitting }, // Automatically tracks errors and loading states!
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "PATIENT"
    }
  });

  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [nicknameStatus, setNicknameStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const nickname = watch("nickname");

  const debouncedNickname = useDebounce(nickname, 500);

  useEffect(() => {
    if (!debouncedNickname || debouncedNickname.length < 3) {
      setNicknameStatus("idle");
      return;
    }

    async function validateNickname() {
      try {
        setNicknameStatus("checking");

        const response = await checkNickname(debouncedNickname);

        setNicknameStatus(response.data.available ? "available" : "taken");
      } catch {
        setNicknameStatus("idle");
      }
    }

    validateNickname();
  }, [debouncedNickname]);


  const onSubmit = async (data: SignupFormValues) => {
    try {
      setApiError("");
      await signup(data);
      navigate("/login");
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div
        className="
          w-full
          max-w-md
          rounded-xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm
        "
      >
        <h1
          className="
            text-2xl
            font-bold
            text-slate-900
          "
        >
          Create Account
        </h1>

        <p
          className="
            mt-2
            mb-6
            text-sm
            text-slate-500
          "
        >
          Join HealthOps Healthcare Platform
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Input
            label="Nickname"
            placeholder="Choose a nickname"
            error={errors.nickname?.message}
            {...register("nickname")}
          />

          {nicknameStatus === "checking" && (
            <p className="text-sm text-slate-500">
              Checking availability...
            </p>
          )}

          {nicknameStatus === "available" && (
            <p className="text-sm text-green-600">
              ✓ Nickname available
            </p>
          )}

          {nicknameStatus === "taken" && (
            <p className="text-sm text-red-600">
              ✗ Nickname already taken
            </p>
          )}

          <Input
            label="Email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email")}
          />

          <div className="space-y-1">
            <label
              className="
                text-sm
                font-medium
                text-slate-700
              "
            >
              Role
            </label>

            <select
              {...register("role")}
              className="
                w-full
                rounded-lg
                border
                border-slate-300
                px-3
                py-2
              "
            >
              <option value="PATIENT">
                Patient
              </option>

              <option value="DOCTOR">
                Doctor
              </option>
            </select>

            {errors.role && (
              <p className="text-sm text-red-500">
                {errors.role.message}
              </p>
            )}
          </div>

          <Input
            type="password"
            label="Password"
            placeholder="Enter password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm password"
            error={
              errors.confirmPassword?.message
            }
            {...register("confirmPassword")}
          />

          {apiError && (
            <div
              className="
                rounded-md
                bg-red-50
                p-3
                text-sm
                text-red-600
              "
            >
              {apiError}
            </div>
          )}

          <Button
            type="submit"
            isLoading={isSubmitting}
            loadingText="Creating Account..."
            className="w-full"
          >
            Create Account
          </Button>
        </form>

        <p
          className="
            mt-6
            text-center
            text-sm
            text-slate-600
          "
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              font-medium
              text-blue-600
              hover:text-blue-700
            "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
