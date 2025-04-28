
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-background">
      <div className="text-center px-4">
        <div className="flex justify-center mb-6">
          <div className="bg-cyber-muted/30 p-4 rounded-full">
            <AlertTriangle className="h-12 w-12 text-cyber-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-cyber-foreground mb-2">404</h1>
        <p className="text-xl text-cyber-foreground/70 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-cyber-primary hover:bg-cyber-secondary"
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
