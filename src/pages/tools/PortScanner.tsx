
import ToolLayout from "@/components/ToolLayout";
import { Wifi } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const PortScanner = () => {
  const [isComingSoon] = useState(true);

  return (
    <ToolLayout
      title="Port Scanner"
      description="Check for open ports on a server"
      icon={Wifi}
    >
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-cyber-muted/30 p-6 rounded-full mb-6">
          <Wifi className="h-12 w-12 text-cyber-primary" />
        </div>
        <h3 className="text-xl font-bold text-cyber-foreground mb-2">Coming Soon</h3>
        <p className="text-cyber-foreground/70 max-w-md mb-6">
          Our Port Scanner tool is currently under development. It will allow you to check for open ports on a server or network device.
        </p>
        <Button
          variant="outline"
          className="border-cyber-border text-cyber-foreground hover:bg-cyber-muted"
          disabled
        >
          Port Scanner Coming Soon
        </Button>
      </div>
    </ToolLayout>
  );
};

export default PortScanner;
