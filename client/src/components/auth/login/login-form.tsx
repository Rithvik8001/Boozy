import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}
interface LoginFormProps {
  isLoading: boolean;
  formData: LoginFormData;
  setFormData: (formData: LoginFormData) => void;
  handleLogin: () => void;
}

export default function LoginForm({
  isLoading,
  formData,
  setFormData,
  handleLogin,
}: LoginFormProps) {
  return (
    <div className="mt-2 flex w-full flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>
      <Button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
      <Link
        to="/signup"
        className="text-muted-foreground text-sm hover:underline"
      >
        <p>Don&apos;t have an account? click here to signup.</p>
      </Link>
    </div>
  );
}
