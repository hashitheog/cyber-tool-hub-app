
import ToolLayout from "@/components/ToolLayout";
import { Key } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const PasswordStrength = () => {
  const [isComingSoon] = useState(true);

  return (
    <ToolLayout
      title="Password Strength"
      description="Check the strength of your password"
      icon={Key}
    >
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-cyber-muted/30 p-6 rounded-full mb-6">
          <Key className="h-12 w-12 text-cyber-primary" />
        </div>
        <h3 className="text-xl font-bold text-cyber-foreground mb-2">Coming Soon</h3>
        <p className="text-cyber-foreground/70 max-w-md mb-6">
          Our Password Strength tool is currently under development. It will help you evaluate the security of your passwords.
        </p>
        <Button
          variant="outline"
          className="border-cyber-border text-cyber-foreground hover:bg-cyber-muted"
          disabled
        >
          Password Strength Tool Coming Soon
        </Button>
      </div>
    </ToolLayout>
  );
};

export default PasswordStrength;
