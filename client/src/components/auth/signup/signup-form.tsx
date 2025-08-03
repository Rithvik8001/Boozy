import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function SignupForm() {
  return (
    <div className="mt-2 flex w-full flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label>Name</Label>
        <Input type="text" placeholder="Name" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input type="email" placeholder="Email" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Password</Label>
        <Input type="password" placeholder="Password" />
      </div>
      <Button>Signup</Button>
      <Link
        to="/login"
        className="text-muted-foreground text-sm hover:underline"
      >
        <p>Already have an account? click here to login.</p>
      </Link>
    </div>
  );
}
