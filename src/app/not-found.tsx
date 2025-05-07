"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-background text-foreground">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Oops! Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist or you don't have access to it.
        </p>
        <Link href="/">
          <Button variant="default">Go to Home</Button>
        </Link>
      </div>
    </main>
  );
}
