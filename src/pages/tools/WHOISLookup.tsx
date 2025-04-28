
import ToolLayout from "@/components/ToolLayout";
import { Database } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const WHOISLookup = () => {
  const [isComingSoon] = useState(true);

  return (
    <ToolLayout
      title="WHOIS Lookup"
      description="Retrieve domain registration information"
      icon={Database}
    >
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-cyber-muted/30 p-6 rounded-full mb-6">
          <Database className="h-12 w-12 text-cyber-primary" />
        </div>
        <h3 className="text-xl font-bold text-cyber-foreground mb-2">Coming Soon</h3>
        <p className="text-cyber-foreground/70 max-w-md mb-6">
          Our WHOIS Lookup tool is currently under development. It will provide detailed domain registration information including owner, registration date, and more.
        </p>
        <Button
          variant="outline"
          className="border-cyber-border text-cyber-foreground hover:bg-cyber-muted"
          disabled
        >
          WHOIS Lookup Coming Soon
        </Button>
      </div>
    </ToolLayout>
  );
};

export default WHOISLookup;
