import React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/modetoggle"; 
import {
  Wand2,
  Ratio,
  Film,
  SlidersHorizontal,
  ShieldCheck,
  Brain
} from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";

export default async function LandingPage() {
  const {userId} = await auth()
  if(userId)redirect('/dashboard')

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="w-full p-4 flex justify-between items-center border-b animate-fade-in">
        <h1 className="text-2xl font-bold">Video2Video AI</h1>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <SignInButton>
            <Button variant="outline">Sign in</Button>
          </SignInButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow px-6 py-16 flex flex-col items-center text-center animate-fade-in delay-100">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse">
          AI-Powered Video Transformations
        </h2>
        <p className="text-xl max-w-2xl mb-10">
          Leverage our cutting-edge AI to convert, enhance, and transform your videos like never before. Customize prompts, resolutions, styles, and more in just a few clicks.
        </p>
        <Button size="lg" className="hover:scale-105 transition-transform duration-200">Get Started</Button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-muted text-muted-foreground">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-background shadow hover:shadow-lg transition-shadow duration-300">
            <Wand2 className="mb-2 text-purple-500" />
            <h3 className="text-xl font-semibold mb-2">Prompt-Based Editing</h3>
            <p>Describe your desired transformation in natural language and watch it come to life.</p>
          </div>

          <div className="p-6 rounded-2xl bg-background shadow hover:shadow-lg transition-shadow duration-300">
            <Ratio className="mb-2 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Custom Resolution & Aspect Ratio</h3>
            <p>Choose from standard or custom resolutions and aspect ratios for your video output.</p>
          </div>

          <div className="p-6 rounded-2xl bg-background shadow hover:shadow-lg transition-shadow duration-300">
            <Film className="mb-2 text-red-500" />
            <h3 className="text-xl font-semibold mb-2">Frame Control</h3>
            <p>Define how many frames to generate for smooth and realistic animations.</p>
          </div>

          <div className="p-6 rounded-2xl bg-background shadow hover:shadow-lg transition-shadow duration-300">
            <SlidersHorizontal className="mb-2 text-green-500" />
            <h3 className="text-xl font-semibold mb-2">Inference Tuning</h3>
            <p>Adjust inference steps and transformation strength to control the intensity of edits.</p>
          </div>

          <div className="p-6 rounded-2xl bg-background shadow hover:shadow-lg transition-shadow duration-300">
            <ShieldCheck className="mb-2 text-yellow-500" />
            <h3 className="text-xl font-semibold mb-2">Safety Checker</h3>
            <p>Enable our built-in safety checker to ensure content stays within guidelines.</p>
          </div>

          <div className="p-6 rounded-2xl bg-background shadow hover:shadow-lg transition-shadow duration-300">
            <Brain className="mb-2 text-pink-500" />
            <h3 className="text-xl font-semibold mb-2">AI That Understands You</h3>
            <p>State-of-the-art models that deliver results aligned with your creative vision.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center animate-fade-in delay-200">
        <h2 className="text-3xl font-bold mb-4">Start Your AI Video Transformation Now</h2>
        <p className="text-lg mb-6">No complex tools required. Just sign in and start creating.</p>
        <Button size="lg" className="hover:scale-105 transition-transform duration-200">Sign In</Button>
      </section>

      {/* Footer */}
      <footer className="w-full p-4 text-center border-t text-sm">
        &copy; {new Date().getFullYear()} Video2Video AI. All rights reserved.
      </footer>

    </div>
  );
}
