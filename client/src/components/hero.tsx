import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="border-border m-2 overflow-hidden rounded-2xl border">
      <div className="from-background via-background to-muted/20 flex h-[calc(100vh-3rem)] flex-col items-center justify-center bg-gradient-to-br">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="relative">
              <img
                src="/logo.png"
                alt="Boozy Logo"
                width={48}
                height={32}
                className="rounded-lg shadow-sm"
              />
              <div className="from-primary/20 to-secondary/20 absolute -inset-1 rounded-lg bg-gradient-to-r opacity-50 blur-sm"></div>
            </div>
            <h1 className="from-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
              Boozy
            </h1>
          </div>

          <div className="mb-4">
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg sm:text-xl">
              AI-powered todo list that understands your tasks and helps you
              complete them.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="group relative overflow-hidden px-8 py-3 text-base font-medium"
            >
              <Link to="/signup">
                <span className="relative z-10">Get Started</span>
                <div className="from-primary to-primary/80 absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-100"></div>
              </Link>
            </Button>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4" />
              <span>Powered by AI</span>
            </div>
          </div>
          <div className="mt-16 flex justify-center">
            <div className="via-border h-px w-24 bg-gradient-to-r from-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
