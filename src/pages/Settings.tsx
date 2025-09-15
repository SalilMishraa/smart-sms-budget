import { useState } from "react";
import { 
  User, 
  Target, 
  Upload, 
  Shield, 
  LogOut, 
  ChevronRight,
  MessageSquare,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [userName, setUserName] = useState("Priya Singh");
  const [email, setEmail] = useState("priya.singh@example.com");
  const [monthlyBudget, setMonthlyBudget] = useState("15000");
  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleBudgetUpdate = () => {
    toast({
      title: "Budget Updated",
      description: `Your monthly budget has been set to ₹${monthlyBudget}.`,
    });
  };

  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Profile",
          description: "Manage your personal information",
          action: "profile",
        },
        {
          icon: Target,
          label: "Budget Goals",
          description: "Set and manage spending limits",
          action: "budget",
        },
      ],
    },
    {
      title: "Data & Permissions",
      items: [
        {
          icon: Upload,
          label: "Upload Statement",
          description: "Import your transaction history",
          action: "upload",
        },
        {
          icon: Shield,
          label: "SMS Permissions",
          description: "Manage transaction tracking access",
          action: "permissions",
        },
      ],
    },
    {
      title: "App Settings",
      items: [
        {
          icon: Bell,
          label: "Notifications",
          description: "Control alerts and reminders",
          action: "notifications",
        },
        {
          icon: MessageSquare,
          label: "AI Assistant",
          description: "Configure your AI preferences",
          action: "ai",
        },
      ],
    },
  ];

  const handleSettingClick = (action: string) => {
    switch (action) {
      case "upload":
        toast({
          title: "File Upload",
          description: "Select an Excel file to import your transaction history.",
        });
        break;
      case "permissions":
        toast({
          title: "SMS Permissions",
          description: "Manage your SMS access permissions for transaction tracking.",
        });
        break;
      default:
        toast({
          title: "Coming Soon",
          description: "This feature will be available in the next update.",
        });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 pt-12 pb-6 bg-white border-b border-border">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your SmartSpend preferences</p>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Section */}
        <div className="financial-card">
          <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button onClick={handleSaveProfile} className="w-full">
              Save Profile
            </Button>
          </div>
        </div>

        {/* Budget Goal Section */}
        <div className="financial-card">
          <h2 className="text-lg font-semibold mb-4">Monthly Budget</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Amount (₹)</Label>
              <Input
                id="budget"
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                placeholder="15000"
              />
            </div>
            <Button onClick={handleBudgetUpdate} className="w-full">
              Update Budget
            </Button>
          </div>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <div key={section.title} className="financial-card">
            <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
            <div className="space-y-2">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleSettingClick(item.action)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon size={16} className="text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <Button
          variant="destructive"
          className="w-full"
          onClick={() =>
            toast({
              title: "Logged Out",
              description: "You have been successfully logged out.",
            })
          }
        >
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Settings;