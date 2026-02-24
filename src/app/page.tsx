import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Globe, 
  CheckCircle2,
  Server
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container px-4 md:px-8 flex flex-col items-center text-center">
          <Badge variant="outline" className="mb-6 border-accent/50 text-accent bg-accent/5 px-4 py-1 animate-pulse-subtle">
            Hack For Green Bharat 2024 Innovation
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl">
            Real-Time Intelligence for a <span className="text-gradient">Greener Bharat</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
            GreenPulse AI is a sovereign regulatory and sustainability platform powered by Pathway streaming architecture. Live IoT monitoring, RAG-based compliance, and carbon forecasting for a sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="h-12 px-8 emerald-gradient border-0 text-lg font-semibold" asChild>
              <Link href="/dashboard">
                Explore Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-lg" asChild>
              <Link href="/compliance">AI Assistant</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats/Metrics Preview */}
      <section className="container px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "National Carbon Health", value: "84.2", unit: "/100", trend: "+2.4%", icon: Activity },
            { label: "Active Monitored Shipments", value: "12,480", unit: "", trend: "Live", icon: Zap },
            { label: "Compliance Accuracy", value: "99.8", unit: "%", trend: "RAG Powered", icon: ShieldCheck },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <stat.icon className="h-6 w-6 text-accent" />
                </div>
                <Badge variant="secondary" className="bg-white/5 border-white/10 text-accent">
                  {stat.trend}
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                <h3 className="text-4xl font-bold mt-1">
                  {stat.value}<span className="text-lg font-medium text-muted-foreground ml-1">{stat.unit}</span>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* System Architecture */}
      <section className="container px-4 md:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sovereign Architecture</h2>
          <p className="text-muted-foreground max-w-2xl">
            Our multi-layered system handles millions of IoT streams with government-grade security and explainable AI reasoning.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: "Live Ingestion", 
              desc: "Streaming connectors for CO2 sensors, GPS, and factory PLC systems via Pathway.",
              icon: Server 
            },
            { 
              title: "Streaming Engine", 
              desc: "Incremental joins and rolling windows for real-time Continuous Carbon Index (CCI™).",
              icon: Zap 
            },
            { 
              title: "RAG Intelligence", 
              desc: "AI policy auditor querying live compliance against CPCB and Ministry norms.",
              icon: ShieldCheck 
            },
            { 
              title: "Impact Analysis", 
              desc: "Automated green credit scoring and fuel optimization using temporal logic.",
              icon: BarChart3 
            }
          ].map((feature, i) => (
            <div key={i} className="p-6 border border-border rounded-xl hover:border-accent/50 transition-colors bg-card/40">
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 md:px-8">
        <div className="emerald-gradient p-8 md:p-16 rounded-3xl text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to empower India's sustainability goals?</h2>
            <p className="text-lg opacity-90 mb-8">
              Join the GreenPulse network today and gain immediate access to national environmental intelligence and real-time compliance tracking.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/dashboard">Launch Control Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Technical Team
              </Button>
            </div>
          </div>
          <div className="relative w-full max-w-xs aspect-square md:max-w-sm">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl" />
            <div className="relative glass-card border-white/20 p-6 rounded-3xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="h-6 w-6 text-white" />
                <span className="font-bold">Active ESG Audit</span>
              </div>
              <div className="space-y-3">
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-white rounded-full" />
                </div>
                <p className="text-xs opacity-80">Shipment ID 45: Compliant with latest Ministry standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}