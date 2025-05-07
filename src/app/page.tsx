import React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/modetoggle"; 
import {
  ImageIcon,
  Brush,
  Frame,
  ShieldCheck,
  Brain
} from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";

export default async function LandingPage() {
  const { userId } = await auth();
  if (userId) redirect('/dashboard/image-transform');

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="w-full p-4 flex justify-between items-center border-b animate-fade-in">
        <h1 className="text-2xl font-bold">Image2Image AI</h1>
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
          AI-Powered Image Transformations
        </h2>
        <p className="text-xl max-w-2xl mb-10">
          Leverage cutting-edge AI to transform your images based on detailed prompts. Customize resolution, styles, and more to create stunning visual art in seconds.
        </p>
        <SignInButton>
        <Button size="lg" className="hover:scale-105 transition-transform duration-200">Get Started</Button>
        </SignInButton>
        
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-muted text-muted-foreground">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-background shadow hover:shadow-lg transition-shadow duration-300">
            <ImageIcon className="mb-2 text-purple-500" />
            <h3 className="text-xl font-semibold mb-2">Prompt-Based Transformation</h3>
            <p>Describe your desired image transformation in natural language and watch it come to life.</p>
          </div>

          <div className="p-6 rounded-2xl bg-background shadow hover:shadow-lg transition-shadow duration-300">
            <Brush className="mb-2 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Custom Style & Resolution</h3>
            <p>Choose from different styles and resolutions to customize your image's final look.</p>
          </div>

          <div className="p-6 rounded-2xl bg-background shadow hover:shadow-lg transition-shadow duration-300">
            <Frame className="mb-2 text-red-500" />
            <h3 className="text-xl font-semibold mb-2">Fine-Tuned Inference</h3>
            <p>Control the intensity of the transformation with adjustable parameters like strength and inference steps.</p>
          </div>

          <div className="p-6 rounded-2xl bg-background shadow hover:shadow-lg transition-shadow duration-300">
            <ShieldCheck className="mb-2 text-yellow-500" />
            <h3 className="text-xl font-semibold mb-2">Safety Checker</h3>
            <p>Enable our built-in safety checker to ensure content adheres to guidelines.</p>
          </div>

          <div className="p-6 rounded-2xl bg-background shadow hover:shadow-lg transition-shadow duration-300">
            <Brain className="mb-2 text-pink-500" />
            <h3 className="text-xl font-semibold mb-2">AI That Understands You</h3>
            <p>Leverage state-of-the-art models that create images aligned with your creative vision.</p>
          </div>

          <div className="p-6 rounded-2xl bg-background shadow hover:shadow-lg transition-shadow duration-300">
            <ImageIcon className="mb-2 text-green-500" />
            <h3 className="text-xl font-semibold mb-2">Download Your Image</h3>
            <p>Instantly download the final transformed image in high quality to your device.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center animate-fade-in delay-200">
        <h2 className="text-3xl font-bold mb-4">Start Your Image Transformation Now</h2>
        <p className="text-lg mb-6">Sign in to access our AI-powered tools for stunning image transformations.</p>
        <SignInButton><Button size="lg" className="hover:scale-105 transition-transform duration-200">Sign In</Button></SignInButton> 
      </section>

      {/* Footer */}
      <footer className="w-full p-4 text-center border-t text-sm">
        &copy; {new Date().getFullYear()} Image2Image AI. All rights reserved.
      </footer>
    </div>
  );
}
