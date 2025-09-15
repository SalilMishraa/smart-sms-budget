import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MessageSquare, Target, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/smartspend-hero.png";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    monthlyBudget: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      localStorage.setItem("smartspend_onboarded", "true");
      toast({
        title: "Welcome to SmartSpend! 🎉",
        description: "Your account has been set up successfully.",
      });
      navigate("/");
    }
  };

  const handlePermissionGrant = () => {
    toast({
      title: "Permissions Granted",
      description: "SMS access enabled for automatic expense tracking.",
    });
    handleNext();
  };

  const features = [
    {
      icon: MessageSquare,
      title: "AI-Powered Insights",
      description: "Get personalized financial advice from your AI assistant",
    },
    {
      icon: Target,
      title: "Smart Budgeting",
      description: "Set goals and track your spending automatically",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your financial data is encrypted and protected",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {step === 1 && (
        <div className="min-h-screen gradient-hero text-white flex flex-col">
          <div className="flex-1 flex flex-col justify-center px-6">
            <div className="text-center mb-12">
              <img 
                src={heroImage} 
                alt="SmartSpend Financial AI Assistant" 
                className="w-32 h-32 mx-auto mb-6 rounded-2xl shadow-lg"
              />
              <h1 className="text-4xl font-bold mb-4">Welcome to SmartSpend</h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Your AI financial assistant for real-time expense tracking and smart budgeting
              </p>
            </div>

            <div className="space-y-6 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4 animate-fade-in">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-white/80">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 pb-12">
            <Button
              onClick={handleNext}
              className="w-full bg-white text-primary hover:bg-white/90 py-4 text-lg font-semibold"
            >
              Get Started
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="min-h-screen flex flex-col justify-center px-6">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-bold text-center mb-8">Create Your Account</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
              </div>

              <Button onClick={handleNext} className="w-full py-4 text-lg">
                Continue
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="min-h-screen flex flex-col justify-center px-6">
          <div className="max-w-md mx-auto w-full text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageSquare size={32} className="text-primary" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Enable SMS Tracking</h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              SmartSpend needs access to your SMS messages to automatically track UPI transactions and provide real-time expense insights.
            </p>

            <div className="bg-muted/50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold mb-2">Why SMS access?</h3>
              <ul className="text-left space-y-2 text-sm text-muted-foreground">
                <li>• Automatically detect UPI transaction messages</li>
                <li>• Categorize expenses in real-time</li>
                <li>• No manual entry required</li>
                <li>• Your messages are processed locally</li>
              </ul>
            </div>

            <Button onClick={handlePermissionGrant} className="w-full py-4 text-lg mb-4">
              Grant SMS Permission
              <Shield size={20} className="ml-2" />
            </Button>
            
            <Button variant="ghost" onClick={handleNext} className="w-full">
              Skip for now
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="min-h-screen flex flex-col justify-center px-6">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-bold text-center mb-8">Set Your Budget</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="budget">Monthly Spending Goal (₹)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="15000"
                  value={userData.monthlyBudget}
                  onChange={(e) => setUserData({ ...userData, monthlyBudget: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">
                  Don't worry, you can change this later
                </p>
              </div>

              <Button onClick={handleNext} className="w-full py-4 text-lg">
                Complete Setup
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;