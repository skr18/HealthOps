import { signup } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const signupSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const {
    register,     // Replaces your onChange and value props
    handleSubmit, // Wraps your submit function
    formState: { errors, isSubmitting }, // Automatically tracks errors and loading states!
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: SignupFormValues) => {
    try {
      // 'data' is perfectly formatted: { email: "...", password: "..." }
      await signup(data);
      alert("Signup successful");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (

    <form onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "30px"
      }}>
      <h2 style={{ width: "300px" }}>Signup</h2>

      <div>
        <Input placeholder="Email" {...register("email")} />
        {/* Automatically show the specific Zod error for this field */}
        {errors.email && <p style={{ color: "red", fontSize: 12 }}>{errors.email.message}</p>}
      </div>

      <div>
        <Input type="password" placeholder="Password" {...register("password")} />
        {errors.password && <p style={{ color: "red", fontSize: 12 }}>{errors.password.message}</p>}
      </div>

      {/* Disable the button so the user can't click it twice while loading */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing up..." : "Signup"}
      </Button>
    </form>
  );
}