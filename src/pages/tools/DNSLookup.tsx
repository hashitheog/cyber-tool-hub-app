
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import ToolLayout from "@/components/ToolLayout";

const dnsSchema = z.object({
  domain: z.string().min(1, "Please enter a domain name"),
});

interface DNSRecord {
  type: string;
  name: string;
  value: string;
  ttl: number;
}

const DNSLookup = () => {
  const [records, setRecords] = useState<DNSRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof dnsSchema>>({
    resolver: zodResolver(dnsSchema),
    defaultValues: {
      domain: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof dnsSchema>) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock DNS records
      const mockRecords: DNSRecord[] = [
        { type: "A", name: values.domain, value: "192.168.1.1", ttl: 3600 },
        { type: "CNAME", name: `www.${values.domain}`, value: values.domain, ttl: 3600 },
        { type: "MX", name: values.domain, value: `mail.${values.domain}`, ttl: 3600 },
        { type: "TXT", name: values.domain, value: "v=spf1 include:_spf.google.com ~all", ttl: 3600 },
        { type: "NS", name: values.domain, value: `ns1.${values.domain}`, ttl: 86400 },
      ];
      
      setRecords(mockRecords);
      toast.success("DNS lookup successful!");
    } catch (error) {
      console.error("DNS lookup error:", error);
      toast.error("Failed to look up DNS records.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="DNS Lookup"
      description="Query DNS records for a domain name"
      icon={Search}
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
                Looking up...
              </>
            ) : (
              "Lookup DNS Records"
            )}
          </Button>
        </form>
      </Form>

      {records.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-cyber-foreground mb-4">DNS Records</h3>
          
          <Card className="border border-cyber-border bg-cyber-background p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cyber-border">
                    <th className="text-left py-2 px-4 text-cyber-foreground/70">Type</th>
                    <th className="text-left py-2 px-4 text-cyber-foreground/70">Name</th>
                    <th className="text-left py-2 px-4 text-cyber-foreground/70">Value</th>
                    <th className="text-left py-2 px-4 text-cyber-foreground/70">TTL</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr key={index} className="border-b border-cyber-border">
                      <td className="py-2 px-4 text-cyber-primary font-medium">{record.type}</td>
                      <td className="py-2 px-4 text-cyber-foreground">{record.name}</td>
                      <td className="py-2 px-4 text-cyber-foreground break-all">{record.value}</td>
                      <td className="py-2 px-4 text-cyber-foreground">{record.ttl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </ToolLayout>
  );
};

export default DNSLookup;
