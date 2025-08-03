import SignupForm from "./signup-form";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "rithvik",
    email: "rithvik@gmail.com",
    password: "12345678",
  });

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_BASE_URL + "/api/auth/register",
        formData,
      );
      if (response.status === 201) {
        toast.success("Signup successful, redirecting to login page...", {
          duration: 1000,
        });
        navigate("/login");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          const errorMessage =
            error.response?.data?.message || "Validation failed";
          toast.error(errorMessage);
          return;
        }

        console.error(
          "Unexpected signup error:",
          error.response?.data || error.message,
        );
        toast.error("Signup failed. Please try again.");
      } else {
        console.error("Non-Axios error during signup:", error);
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="h-screen bg-gray-50">
        <div className="mx-auto w-full max-w-md">
          <div className="p-2">
            <div className="mt-36 flex w-full flex-col items-center justify-center gap-2">
              <div className="flex w-full flex-col gap-2 p-2">
                <Link
                  to="/"
                  className="text-muted-foreground flex items-center gap-2 hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </Link>
                <h1 className="text-4xl font-medium tracking-tighter">
                  Signup
                </h1>
                <p className="text-muted-foreground text-md">
                  Create an account to get started.
                </p>
                <SignupForm
                  handleSignUp={handleSignUp}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
