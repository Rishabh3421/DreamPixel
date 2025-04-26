
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  buttonText, 
  isPopular = false,
  onClick
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  onClick: () => void;
}) => {
  return (
    <div className={`
      glass-card p-6 md:p-8
      ${isPopular ? 'border-2 border-purple-400 relative animate-pulse-glow' : 'border border-white/10'}
    `}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {price !== "Free" && <span className="text-muted-foreground ml-1">/month</span>}
      </div>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <ul className="mb-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="mr-3 h-5 w-5 shrink-0 rounded-full bg-purple-500/20 flex items-center justify-center pt-0.5">
              <CheckIcon size={14} className="text-purple-400" />
            </div>
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        onClick={onClick}
        className={`w-full ${
          isPopular 
            ? 'bg-purple-600 hover:bg-purple-700 text-white' 
            : 'bg-white/5 hover:bg-white/10 border border-white/10'
        }`}
      >
        {buttonText}
      </Button>
    </div>
  );
};

const Pricing = () => {
  // This would be updated in a real app with Stripe and Supabase integration
  const handleSubscribe = (tier: string) => {
    console.log(`Subscribing to ${tier} tier`);
    // Here we would redirect to Stripe checkout in a real implementation
    alert(`In a complete implementation, you would be redirected to Stripe checkout for the ${tier} plan`);
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for you and start creating amazing images today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <PricingTier
            name="Free"
            price="Free"
            description="Perfect for trying out the platform and occasional use."
            features={[
              "3 images per day",
              "Standard resolution",
              "Community access",
              "Basic prompt assistance"
            ]}
            buttonText="Sign Up for Free"
            onClick={() => handleSubscribe('free')}
          />
          
          <PricingTier
            name="Premium"
            price="$9.99"
            description="Great for hobbyists and regular creators."
            features={[
              "10 images per day",
              "High resolution downloads",
              "Priority processing",
              "Advanced prompt assistance",
              "Download history"
            ]}
            buttonText="Subscribe to Premium"
            isPopular={true}
            onClick={() => handleSubscribe('premium')}
          />
          
          <PricingTier
            name="Pro"
            price="$19.99"
            description="Built for professionals and serious creators."
            features={[
              "100 images per day",
              "Maximum resolution downloads",
              "Fastest processing speed",
              "Expert prompt assistance",
              "Commercial licensing",
              "API access",
              "Remove DreamPixel watermark"
            ]}
            buttonText="Subscribe to Pro"
            onClick={() => handleSubscribe('pro')}
          />
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-6 rounded-lg border border-white/10">
              <h3 className="text-lg font-medium mb-3">Can I cancel my subscription anytime?</h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. Your access will remain until the end of your current billing period.
              </p>
            </div>
            
            <div className="glass p-6 rounded-lg border border-white/10">
              <h3 className="text-lg font-medium mb-3">How does the daily image limit work?</h3>
              <p className="text-muted-foreground">
                Image limits reset at midnight UTC. Unused images do not roll over to the next day.
              </p>
            </div>
            
            <div className="glass p-6 rounded-lg border border-white/10">
              <h3 className="text-lg font-medium mb-3">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, PayPal, and select cryptocurrencies through our secure payment processor.
              </p>
            </div>
            
            <div className="glass p-6 rounded-lg border border-white/10">
              <h3 className="text-lg font-medium mb-3">Do you offer refunds?</h3>
              <p className="text-muted-foreground">
                We offer a 7-day money-back guarantee if you're not satisfied with our services. Contact our support team for assistance.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="glass p-8 md:p-12 rounded-lg border border-white/10 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to create amazing images?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start with our free plan or choose a premium option to unlock more features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg animate-pulse-glow"
                onClick={() => handleSubscribe('premium')}
              >
                Get Started Now
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 hover:bg-white/5 px-8 py-6 text-lg"
                onClick={() => window.location.href = '/create'}
              >
                Try Free First
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
