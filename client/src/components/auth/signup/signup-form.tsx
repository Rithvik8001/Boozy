import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
}
interface SignupFormProps {
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: FormData;
  setFormData: (formData: FormData) => void;
}
export default function SignupForm({
  handleSignUp,
  formData,
  setFormData,
}: SignupFormProps) {
  return (
    <form onSubmit={handleSignUp} className="mt-2 flex w-full flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label>Name</Label>
        <Input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
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
          required
        />
      </div>
      <Button type="submit">Signup</Button>
      <Link
        to="/login"
        className="text-muted-foreground text-sm hover:underline"
      >
        <p>Already have an account? click here to login.</p>
      </Link>
    </form>
  );
}
