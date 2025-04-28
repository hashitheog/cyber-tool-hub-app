
import { useEffect } from "react";
import { useAuth } from "@/components/AuthContext";
import Navigation from "@/components/Navigation";
import ToolCard from "@/components/ToolCard";
import { Globe, Link, FileSearch, Database, Lock, Wifi, Key, Search, Code, FileVideo } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  
  const tools = [
    {
      title: "IP Geolocation",
      description: "Locate the geographical position of an IP address",
      icon: Globe,
      path: "/tools/ip-geolocator",
    },
    {
      title: "URL Scanner",
      description: "Analyze a URL for potential security threats",
      icon: Link,
      path: "/tools/url-scanner",
    },
    {
      title: "WHOIS Lookup",
      description: "Retrieve domain registration information",
      icon: Database,
      path: "/tools/whois-lookup",
    },
    {
      title: "Port Scanner",
      description: "Check for open ports on a server",
      icon: Wifi,
      path: "/tools/port-scanner",
    },
    {
      title: "DNS Lookup",
      description: "Query DNS records for a domain name",
      icon: Search,
      path: "/tools/dns-lookup",
    },
    {
      title: "SSL Checker",
      description: "Verify SSL certificate details and expiration",
      icon: Lock,
      path: "/tools/ssl-checker",
    },
    {
      title: "Hash Generator",
      description: "Generate MD5, SHA1, SHA256, and other hash values",
      icon: Key,
      path: "/tools/hash-generator",
    },
    {
      title: "Password Strength",
      description: "Check the strength of your password",
      icon: Key,
      path: "/tools/password-strength",
    },
    {
      title: "Subdomain Finder",
      description: "Discover subdomains of a given domain",
      icon: Code,
      path: "/tools/subdomain-finder",
    },
    {
      title: "Network Calculator",
      description: "Calculate subnet masks, CIDR notation, and IP ranges",
      icon: FileVideo,
      path: "/tools/network-calculator",
    },
  ];

  useEffect(() => {
    document.title = "CyberToolHub - Dashboard";
  }, []);

  return (
    <div className="min-h-screen bg-cyber-background">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-cyber-foreground">Welcome to CyberToolHub</h1>
          <p className="text-cyber-foreground/70">
            Your comprehensive suite of cybersecurity tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <ToolCard
              key={tool.title}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              path={tool.path}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
