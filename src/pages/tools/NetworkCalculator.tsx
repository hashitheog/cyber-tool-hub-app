
import ToolLayout from "@/components/ToolLayout";
import { FileVideo } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const NetworkCalculator = () => {
  const [isComingSoon] = useState(true);

  return (
    <ToolLayout
      title="Network Calculator"
      description="Calculate subnet masks, CIDR notation, and IP ranges"
      icon={FileVideo}
    >
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-cyber-muted/30 p-6 rounded-full mb-6">
          <FileVideo className="h-12 w-12 text-cyber-primary" />
        </div>
        <h3 className="text-xl font-bold text-cyber-foreground mb-2">Coming Soon</h3>
        <p className="text-cyber-foreground/70 max-w-md mb-6">
          Our Network Calculator tool is currently under development. It will help you calculate subnet masks, CIDR notation, and IP ranges.
        </p>
        <Button
          variant="outline"
          className="border-cyber-border text-cyber-foreground hover:bg-cyber-muted"
          disabled
        >
          Network Calculator Coming Soon
        </Button>
      </div>
    </ToolLayout>
  );
};

export default NetworkCalculator;
