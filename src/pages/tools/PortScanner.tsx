
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wifi, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ToolLayout from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

const formSchema = z.object({
  host: z.string().min(1, "Please enter a hostname or IP address"),
  ports: z.string().min(1, "Please enter port numbers to scan")
});

interface PortResult {
  port: number;
  status: "open" | "closed" | "filtered";
  service?: string;
}

const PortScanner = () => {
  const [results, setResults] = useState<PortResult[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      host: "",
      ports: "80,443,8080,22,21"
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setResults([]);

    try {
      // For demonstration purposes, we're simulating port scanning
      // In a real app, this would be done via a backend service
      
      const ports = values.ports.split(",").map(p => parseInt(p.trim())).filter(p => !isNaN(p));
      
      if (ports.length === 0) {
        throw new Error("No valid ports provided");
      }
      
      const commonServices: Record<number, string> = {
        21: "FTP",
        22: "SSH",
        23: "Telnet",
        25: "SMTP",
        53: "DNS",
        80: "HTTP",
        443: "HTTPS",
        3306: "MySQL",
        5432: "PostgreSQL",
        8080: "HTTP Alternate",
        8443: "HTTPS Alternate"
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResults: PortResult[] = ports.map(port => {
        // Randomly determine if port is open (for demo)
        const isOpen = Math.random() > 0.6;
        
        return {
          port,
          status: isOpen ? "open" : "closed",
          service: commonServices[port]
        };
      });
      
      setResults(mockResults);
      toast.success("Port scan completed!");
    } catch (error) {
      console.error("Port scanning error:", error);
      toast.error("Failed to scan ports. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Port Scanner"
      description="Check for open ports on a server"
      icon={Wifi}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="host"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-cyber-foreground">Host</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter hostname or IP (e.g. example.com)"
                    className="bg-cyber-background border-cyber-border text-cyber-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="ports"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-cyber-foreground">Ports</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter ports to scan (e.g. 80,443,8080)"
                    className="bg-cyber-background border-cyber-border text-cyber-foreground"
                    {...field}
                  />
                </FormControl>
                <p className="text-xs text-cyber-foreground/60 mt-1">
                  Comma separated list of ports to scan
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            className="bg-cyber-primary hover:bg-cyber-secondary"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scanning...
              </>
            ) : (
              "Scan Ports"
            )}
          </Button>
        </form>
      </Form>

      {results.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-cyber-foreground mb-4">Port Scan Results</h3>
          <Card className="border border-cyber-border bg-cyber-muted/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyber-border">
                    <th className="px-4 py-3 text-left text-cyber-foreground font-medium">Port</th>
                    <th className="px-4 py-3 text-left text-cyber-foreground font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-cyber-foreground font-medium">Service</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr 
                      key={index} 
                      className={`
                        ${index !== results.length - 1 ? 'border-b border-cyber-border/50' : ''}
                        ${result.status === 'open' ? 'bg-green-500/10' : ''}
                      `}
                    >
                      <td className="px-4 py-3 text-cyber-foreground">{result.port}</td>
                      <td className="px-4 py-3">
                        <span 
                          className={`px-2 py-1 text-xs rounded-full ${
                            result.status === 'open' 
                              ? 'bg-green-500/20 text-green-500' 
                              : 'bg-red-500/20 text-red-500'
                          }`}
                        >
                          {result.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-cyber-foreground">{result.service || 'Unknown'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <p className="text-xs text-cyber-foreground/60 mt-2">
            Note: This is a simulated scan for demonstration purposes.
          </p>
        </div>
      )}
    </ToolLayout>
  );
};

export default PortScanner;
