import SignupForm from "./signup-form";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Signup() {
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
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
