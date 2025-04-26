import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        <div className="hero-gradient"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient mb-6">
              Transform Text Into Stunning Images
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              DreamPixel uses AI to turn your ideas into beautiful visuals. Unleash your creativity with just a few words — no design skills needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg animate-pulse-glow" asChild>
                <Link to="/create" className="flex items-center gap-2">
                  Get Started <ArrowRight size={18} />
                </Link>
              </Button>
              <Button variant="outline" className="border-white/20 hover:bg-white/5 px-8 py-6 text-lg" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>

          {/* Example Images */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="glass-card p-4 rounded-2xl glow animate-float">
              <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-purple-400/20 via-blue-500/20 to-purple-500/20">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?fit=crop&w=800&q=80"
                  alt="Magical forest"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-4 p-2">
                <div className="text-sm text-muted-foreground">Prompt:</div>
                <p className="text-sm">"A magical forest with glowing mushrooms and floating lights"</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="glass-card p-4 rounded-2xl glow animate-float" style={{ animationDelay: "1s" }}>
              <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20">
                <img
                  src="https://images.unsplash.com/photo-1470217957101-da7150b9b681?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Futuristic city"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-4 p-2">
                <div className="text-sm text-muted-foreground">Prompt:</div>
                <p className="text-sm">"A futuristic city at sunset with flying cars"</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-card p-4 rounded-2xl glow animate-float" style={{ animationDelay: "2s" }}>
              <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-pink-400/20 via-purple-500/20 to-blue-500/20">
                <img
                  src="https://images.unsplash.com/photo-1585732436636-f786c52696d6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Cyberpunk portrait"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-4 p-2">
                <div className="text-sm text-muted-foreground">Prompt:</div>
                <p className="text-sm">"A cyberpunk portrait with neon accents and rain"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">How DreamPixel Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform makes it easy to create stunning visuals in seconds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-purple-400">1</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Describe Your Vision</h3>
              <p className="text-muted-foreground">
                Enter a detailed text prompt describing the image you want to create
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-purple-400">2</span>
              </div>
              <h3 className="text-xl font-medium mb-3">AI Generation</h3>
              <p className="text-muted-foreground">
                Our advanced AI processes your prompt and generates high-quality images
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-purple-400">3</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Download & Share</h3>
              <p className="text-muted-foreground">
                Save your creation, share it on social media, or use it in your projects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section Preview */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Choose Your Plan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start for free or upgrade for more creations and premium features
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6" asChild>
              <Link to="/pricing" className="flex items-center gap-2">
                View Pricing Plans <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="animated-border rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Ready to Create?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of creators who are already using DreamPixel to bring their ideas to life
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg animate-pulse-glow" asChild>
              <Link to="/create" className="flex items-center gap-2">
                Start Creating Now <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
