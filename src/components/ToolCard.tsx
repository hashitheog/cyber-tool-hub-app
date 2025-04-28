
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

const ToolCard = ({ title, description, icon: Icon, path }: ToolCardProps) => {
  return (
    <Card className="tool-card border border-cyber-border bg-gradient-to-br from-cyber-muted to-cyber-background">
      <CardHeader className="pb-2">
        <div className="mb-2 inline-flex p-2 bg-cyber-muted/30 rounded-md">
          <Icon className="h-6 w-6 text-cyber-primary" />
        </div>
        <CardTitle className="text-cyber-foreground">{title}</CardTitle>
        <CardDescription className="text-cyber-foreground/70">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-2">
        <Button asChild variant="default" className="w-full bg-cyber-primary hover:bg-cyber-secondary">
          <Link to={path}>Launch Tool</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
