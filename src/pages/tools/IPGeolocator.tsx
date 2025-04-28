
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
  latitude?: string;
  longitude?: string;
  country_code?: string;
  country_name?: string;
  region_name?: string;
  isp?: string;
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
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'cf23166029mshf289eb37458e7b1p19c655jsn95f754264828',
          'x-rapidapi-host': 'ip-geo-location10.p.rapidapi.com'
        }
      };

      const response = await fetch(`https://ip-geo-location10.p.rapidapi.com/ip?ip=${values.ip}`, options);
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      
      // Transform API response to match our GeoLocation interface
      const geoData: GeoLocation = {
        ip: values.ip,
        city: data.city || 'Unknown',
        region: data.region_name || data.region || 'Unknown',
        country: data.country_name || data.country || 'Unknown',
        loc: data.latitude && data.longitude ? `${data.latitude},${data.longitude}` : 'Unknown',
        org: data.isp || data.org || 'Unknown',
        postal: data.postal || 'Unknown',
        timezone: data.timezone || 'Unknown',
        // Store additional fields
        latitude: data.latitude,
        longitude: data.longitude,
        country_code: data.country_code,
        country_name: data.country_name,
        region_name: data.region_name,
        isp: data.isp
      };
      
      setResult(geoData);
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
                  <p className="text-sm text-cyber-foreground/70">ISP/Organization</p>
                  <p className="text-cyber-foreground font-medium">{result.org}</p>
                </div>
                {result.country_code && (
                  <div>
                    <p className="text-sm text-cyber-foreground/70">Country Code</p>
                    <p className="text-cyber-foreground font-medium">{result.country_code}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </ToolLayout>
  );
};

export default IPGeolocator;
