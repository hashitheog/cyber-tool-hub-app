
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ToolLayout from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

const ipSchema = z.object({
  ip: z.string().min(1, "Please enter an IP address"),
});

interface GeoLocation {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

const IPGeolocator = () => {
  const [result, setResult] = useState<GeoLocation | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof ipSchema>>({
    resolver: zodResolver(ipSchema),
    defaultValues: {
      ip: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ipSchema>) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock data for demo purposes
      const mockResult: GeoLocation = {
        ip: values.ip,
        city: "San Francisco",
        region: "California",
        country: "US",
        loc: "37.7749,-122.4194",
        org: "AS14618 Amazon.com, Inc.",
        postal: "94107",
        timezone: "America/Los_Angeles",
      };
      
      setResult(mockResult);
      toast.success("IP geolocation completed successfully!");
    } catch (error) {
      console.error("IP geolocation error:", error);
      toast.error("Failed to get IP geolocation information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="IP Geolocation"
      description="Locate the geographical position of an IP address"
      icon={Globe}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="ip"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-cyber-foreground">IP Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter an IP address (e.g. 8.8.8.8)"
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
                Locating...
              </>
            ) : (
              "Locate IP"
            )}
          </Button>
        </form>
      </Form>

      {result && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-cyber-foreground mb-4">Geolocation Results</h3>
          <Card className="border border-cyber-border bg-cyber-muted/50 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-cyber-foreground/70">IP Address</p>
                  <p className="text-cyber-foreground font-medium">{result.ip}</p>
                </div>
                <div>
                  <p className="text-sm text-cyber-foreground/70">Location</p>
                  <p className="text-cyber-foreground font-medium">
                    {result.city}, {result.region}, {result.country}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-cyber-foreground/70">Postal Code</p>
                  <p className="text-cyber-foreground font-medium">{result.postal}</p>
                </div>
                <div>
                  <p className="text-sm text-cyber-foreground/70">Timezone</p>
                  <p className="text-cyber-foreground font-medium">{result.timezone}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-cyber-foreground/70">Coordinates</p>
                  <p className="text-cyber-foreground font-medium">{result.loc}</p>
                </div>
                <div>
                  <p className="text-sm text-cyber-foreground/70">Organization</p>
                  <p className="text-cyber-foreground font-medium">{result.org}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </ToolLayout>
  );
};

export default IPGeolocator;
