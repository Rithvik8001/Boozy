import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <div className="mt-2 flex w-full flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input type="email" placeholder="Email" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Password</Label>
        <Input type="password" placeholder="Password" />
      </div>
      <Button>Login</Button>
      <Link
        to="/signup"
        className="text-muted-foreground text-sm hover:underline"
      >
        <p>Don&apos;t have an account? click here to signup.</p>
      </Link>
    </div>
  );
}
