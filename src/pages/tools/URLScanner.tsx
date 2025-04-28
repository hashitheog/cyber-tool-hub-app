
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Loader2, ShieldCheck, ShieldAlert, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ToolLayout from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const urlSchema = z.object({
  url: z
    .string()
    .url("Please enter a valid URL")
    .min(1, "Please enter a URL"),
});

interface ScanResult {
  url: string;
  safe: boolean;
  malware: boolean;
  phishing: boolean;
  suspicious: boolean;
  lastScanned: string;
}

const URLScanner = () => {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof urlSchema>) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // For demo purposes, let's randomize the result
      const isSafe = Math.random() > 0.3;
      
      // Mock data
      const mockResult: ScanResult = {
        url: values.url,
        safe: isSafe,
        malware: !isSafe && Math.random() > 0.5,
        phishing: !isSafe && Math.random() > 0.5,
        suspicious: !isSafe && Math.random() > 0.7,
        lastScanned: new Date().toISOString(),
      };
      
      setResult(mockResult);
      toast.success("URL scan completed!");
    } catch (error) {
      console.error("URL scanning error:", error);
      toast.error("Failed to scan URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="URL Scanner"
      description="Analyze a URL for potential security threats"
      icon={Link}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-cyber-foreground">URL to Scan</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com"
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
                Scanning...
              </>
            ) : (
              "Scan URL"
            )}
          </Button>
        </form>
      </Form>

      {result && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-cyber-foreground mb-4">Scan Results</h3>
          
          <Alert className={result.safe ? "bg-green-900/20 border-green-700" : "bg-red-900/20 border-red-700"}>
            {result.safe ? (
              <ShieldCheck className="h-4 w-4 text-green-500" />
            ) : (
              <ShieldAlert className="h-4 w-4 text-red-500" />
            )}
            <AlertTitle className={result.safe ? "text-green-500" : "text-red-500"}>
              {result.safe ? "Safe URL" : "Potentially Unsafe URL"}
            </AlertTitle>
            <AlertDescription className="text-cyber-foreground/70">
              {result.safe 
                ? "This URL appears to be safe based on our security checks." 
                : "This URL may pose security risks. Exercise caution."}
            </AlertDescription>
          </Alert>
          
          <Card className="mt-4 border border-cyber-border bg-cyber-muted/50 p-4">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-cyber-foreground/70">URL</p>
                <p className="text-cyber-foreground font-medium break-words">{result.url}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-cyber-foreground/70">Malware Detection</p>
                  <div className="flex items-center mt-1">
                    {result.malware ? (
                      <div className="flex items-center text-red-500">
                        <ShieldAlert className="h-4 w-4 mr-1" />
                        <span>Detected</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-green-500">
                        <ShieldCheck className="h-4 w-4 mr-1" />
                        <span>Clean</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-cyber-foreground/70">Phishing Detection</p>
                  <div className="flex items-center mt-1">
                    {result.phishing ? (
                      <div className="flex items-center text-red-500">
                        <ShieldAlert className="h-4 w-4 mr-1" />
                        <span>Detected</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-green-500">
                        <ShieldCheck className="h-4 w-4 mr-1" />
                        <span>Clean</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-cyber-foreground/70">Last Scanned</p>
                <p className="text-cyber-foreground font-medium">
                  {new Date(result.lastScanned).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
          
          <div className="mt-4 flex items-center text-sm text-cyber-foreground/70">
            <Info className="h-4 w-4 mr-2" />
            <span>Results are simulated for demonstration purposes.</span>
          </div>
        </div>
      )}
    </ToolLayout>
  );
};

export default URLScanner;
