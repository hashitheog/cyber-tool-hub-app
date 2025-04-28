
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/sonner";
import ToolLayout from "@/components/ToolLayout";

const sslSchema = z.object({
  domain: z.string().min(1, "Please enter a domain name"),
});

interface SSLResult {
  domain: string;
  valid: boolean;
  issuer: string;
  subject: string;
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  grade: string;
  protocols: string[];
  ciphers: number;
}

const SSLChecker = () => {
  const [result, setResult] = useState<SSLResult | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof sslSchema>>({
    resolver: zodResolver(sslSchema),
    defaultValues: {
      domain: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof sslSchema>) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // For demo purposes, let's create a mock result
      const daysRemaining = Math.floor(Math.random() * 365);
      const isValid = daysRemaining > 0;
      
      // Mock data
      const mockResult: SSLResult = {
        domain: values.domain,
        valid: isValid,
        issuer: "DigiCert Inc",
        subject: `CN=${values.domain}`,
        validFrom: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        validTo: new Date(Date.now() + daysRemaining * 24 * 60 * 60 * 1000).toISOString(),
        daysRemaining: daysRemaining,
        grade: daysRemaining > 180 ? "A+" : daysRemaining > 90 ? "A" : daysRemaining > 30 ? "B" : "C",
        protocols: ["TLSv1.2", "TLSv1.3"],
        ciphers: 4,
      };
      
      setResult(mockResult);
      toast.success("SSL certificate check completed!");
    } catch (error) {
      console.error("SSL checking error:", error);
      toast.error("Failed to check SSL certificate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="SSL Checker"
      description="Verify SSL certificate details and expiration"
      icon={Lock}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-cyber-foreground">Domain Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example.com"
                    className="bg-cyber-background border-cyber-border text-cyber-foreground"
                    {...field}
                  />
                </FormControl>
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
                Checking...
              </>
            ) : (
              "Check SSL Certificate"
            )}
          </Button>
        </form>
      </Form>

      {result && (
        <div className="mt-8">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-medium text-cyber-foreground">SSL Certificate Results</h3>
            <div className="ml-auto">
              {result.valid ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Valid
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                  <XCircle className="mr-1 h-3 w-3" />
                  Invalid
                </span>
              )}
            </div>
          </div>
          
          <Card className="border border-cyber-border bg-cyber-muted/50 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-cyber-foreground/70">Domain</p>
                    <p className="text-cyber-foreground font-medium">{result.domain}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-cyber-foreground/70">Issuer</p>
                    <p className="text-cyber-foreground font-medium">{result.issuer}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-cyber-foreground/70">Subject</p>
                    <p className="text-cyber-foreground font-medium">{result.subject}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-cyber-foreground/70">Security Grade</p>
                    <p className="text-cyber-foreground font-medium">{result.grade}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-cyber-foreground/70">Valid From</p>
                    <p className="text-cyber-foreground font-medium">
                      {new Date(result.validFrom).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-cyber-foreground/70">Valid To</p>
                    <p className="text-cyber-foreground font-medium">
                      {new Date(result.validTo).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-cyber-foreground/70">Days Remaining</span>
                      <span className="text-cyber-foreground font-medium">
                        {result.daysRemaining} days
                      </span>
                    </div>
                    <Progress 
                      value={Math.min((result.daysRemaining / 365) * 100, 100)} 
                      className="h-2 bg-cyber-muted"
                    />
                  </div>
                  
                  <div>
                    <p className="text-sm text-cyber-foreground/70">Supported Protocols</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {result.protocols.map((protocol, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-cyber-muted text-cyber-foreground"
                        >
                          {protocol}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </ToolLayout>
  );
};

export default SSLChecker;
