
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key, Loader2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import ToolLayout from "@/components/ToolLayout";

const hashSchema = z.object({
  text: z.string().min(1, "Please enter text to hash"),
});

interface HashResult {
  md5: string;
  sha1: string;
  sha256: string;
  sha512: string;
}

const HashGenerator = () => {
  const [result, setResult] = useState<HashResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const form = useForm<z.infer<typeof hashSchema>>({
    resolver: zodResolver(hashSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof hashSchema>) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock hash generation
      const mockResult: HashResult = {
        md5: Array(32).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
        sha1: Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
        sha256: Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
        sha512: Array(128).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
      };
      
      setResult(mockResult);
      toast.success("Hash values generated!");
    } catch (error) {
      console.error("Hash generation error:", error);
      toast.error("Failed to generate hash values.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, hashType: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(hashType);
    setTimeout(() => setCopiedHash(null), 2000);
    toast.success(`${hashType} hash copied to clipboard!`);
  };

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate MD5, SHA1, SHA256, and SHA512 hash values"
      icon={Key}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-cyber-foreground">Text to Hash</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter text to generate hash values"
                    className="min-h-32 bg-cyber-background border-cyber-border text-cyber-foreground"
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
                Generating...
              </>
            ) : (
              "Generate Hash Values"
            )}
          </Button>
        </form>
      </Form>

      {result && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-cyber-foreground mb-4">Hash Results</h3>
          
          <Tabs defaultValue="md5" className="w-full">
            <TabsList className="bg-cyber-muted grid grid-cols-4 mb-4">
              <TabsTrigger value="md5">MD5</TabsTrigger>
              <TabsTrigger value="sha1">SHA1</TabsTrigger>
              <TabsTrigger value="sha256">SHA256</TabsTrigger>
              <TabsTrigger value="sha512">SHA512</TabsTrigger>
            </TabsList>
            
            <TabsContent value="md5">
              <HashDisplay 
                hash={result.md5} 
                type="MD5" 
                onCopy={() => copyToClipboard(result.md5, "MD5")} 
                isCopied={copiedHash === "MD5"} 
              />
            </TabsContent>
            
            <TabsContent value="sha1">
              <HashDisplay 
                hash={result.sha1} 
                type="SHA1" 
                onCopy={() => copyToClipboard(result.sha1, "SHA1")} 
                isCopied={copiedHash === "SHA1"} 
              />
            </TabsContent>
            
            <TabsContent value="sha256">
              <HashDisplay 
                hash={result.sha256} 
                type="SHA256" 
                onCopy={() => copyToClipboard(result.sha256, "SHA256")} 
                isCopied={copiedHash === "SHA256"} 
              />
            </TabsContent>
            
            <TabsContent value="sha512">
              <HashDisplay 
                hash={result.sha512} 
                type="SHA512" 
                onCopy={() => copyToClipboard(result.sha512, "SHA512")} 
                isCopied={copiedHash === "SHA512"} 
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </ToolLayout>
  );
};

interface HashDisplayProps {
  hash: string;
  type: string;
  onCopy: () => void;
  isCopied: boolean;
}

const HashDisplay = ({ hash, type, onCopy, isCopied }: HashDisplayProps) => {
  return (
    <Card className="border border-cyber-border bg-cyber-muted/50 p-4">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-medium text-cyber-foreground">{type} Hash</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopy}
          className="h-8 px-2 text-cyber-foreground hover:bg-cyber-muted"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="ml-2">{isCopied ? "Copied!" : "Copy"}</span>
        </Button>
      </div>
      <div className="bg-cyber-background border border-cyber-border rounded-md p-3">
        <p className="text-sm font-mono text-cyber-foreground break-all">{hash}</p>
      </div>
    </Card>
  );
};

export default HashGenerator;
