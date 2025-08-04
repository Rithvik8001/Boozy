import axios, { AxiosError } from "axios";
import LoginForm from "./login-form";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLogin = async () => {
    setIsLoading(true);
    if (formData.email === "" || formData.password === "") {
      toast.error("Please fill in all fields");
      return;
    } else if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    } else if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_BASE_URL + "/api/auth/login",
        formData,
      );
      if (response.status === 200) {
        toast.success("Login successful, redirecting to dashboard...", {
          duration: 1000,
        });
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials, please try again");
      }
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        toast.error("Invalid credentials, please try again");
      } else {
        toast.error("Something went wrong, please try again");
      }
    } finally {
      setIsLoading(false);
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
                  Login to Boozy
                </h1>
                <p className="text-muted-foreground text-md">
                  Login to your account to get started.
                </p>
                <LoginForm
                  isLoading={isLoading}
                  formData={formData}
                  setFormData={setFormData}
                  handleLogin={handleLogin}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
