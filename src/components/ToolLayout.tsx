
import { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ToolLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  icon: LucideIcon;
}

const ToolLayout = ({ children, title, description, icon: Icon }: ToolLayoutProps) => {
  return (
    <div className="min-h-screen bg-cyber-background">
      <Navigation showBackButton={true} />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center">
          <div className="mr-4 inline-flex p-2 bg-cyber-muted/30 rounded-md">
            <Icon className="h-6 w-6 text-cyber-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-cyber-foreground">{title}</h1>
            <p className="text-cyber-foreground/70">{description}</p>
          </div>
        </div>
        
        <Card className="border border-cyber-border bg-cyber-muted/30">
          <CardContent className="pt-6">
            {children}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ToolLayout;
