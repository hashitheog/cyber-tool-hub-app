
import ToolLayout from "@/components/ToolLayout";
import { Code } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const SubdomainFinder = () => {
  const [isComingSoon] = useState(true);

  return (
    <ToolLayout
      title="Subdomain Finder"
      description="Discover subdomains of a given domain"
      icon={Code}
    >
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-cyber-muted/30 p-6 rounded-full mb-6">
          <Code className="h-12 w-12 text-cyber-primary" />
        </div>
        <h3 className="text-xl font-bold text-cyber-foreground mb-2">Coming Soon</h3>
        <p className="text-cyber-foreground/70 max-w-md mb-6">
          Our Subdomain Finder tool is currently under development. It will help you discover all subdomains associated with a main domain.
        </p>
        <Button
          variant="outline"
          className="border-cyber-border text-cyber-foreground hover:bg-cyber-muted"
          disabled
        >
          Subdomain Finder Coming Soon
        </Button>
      </div>
    </ToolLayout>
  );
};

export default SubdomainFinder;
