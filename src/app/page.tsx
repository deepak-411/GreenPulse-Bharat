
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
  CheckCircle2,
  Users,
  User
} from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function LandingPage() {
  const banner = PlaceHolderImages.find(img => img.id === 'hackathon-banner')

  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        <div className="container px-4 md:px-8 flex flex-col items-center text-center">
          <Badge variant="outline" className="mb-8 border-accent/50 text-accent bg-accent/5 px-4 py-1 animate-pulse-subtle">
            Official Entry: Hack For Green Bharat 2024
          </Badge>

          {/* Hackathon Banner */}
          <div className="w-full max-w-5xl aspect-[3/1] relative rounded-3xl overflow-hidden mb-12 shadow-2xl border border-white/10 group">
            <Image 
              src={banner?.imageUrl || "https://picsum.photos/seed/1/1200/400"} 
              alt="Hack For Green Bharat" 
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              data-ai-hint="hackathon sustainability"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-8">
              <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
                <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Team</p>
                    <p className="text-lg font-bold text-white">ERROR404</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <User className="h-5 w-5 text-accent" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Leader</p>
                    <p className="text-lg font-bold text-white">Deepak Kumar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl">
            Real-Time Intelligence for a <span className="text-gradient">Sustainable Bharat</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
            Empowering India's green goals with Pathway-driven streaming analytics and sovereign AI compliance auditing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="h-14 px-10 emerald-gradient border-0 text-lg font-bold shadow-lg shadow-accent/20" asChild>
              <Link href="/dashboard">
                Enter Working Model <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg bg-white/5 border-white/10" asChild>
              <Link href="/compliance">AI Policy Auditor</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="container px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            label: "Sovereign RAG Auditor", 
            value: "100%", 
            desc: "Policy-backed AI compliance reasoning.",
            icon: ShieldCheck 
          },
          { 
            label: "Streaming Ingestion", 
            value: "Pathway", 
            desc: "Real-time IoT data processing engine.",
            icon: Zap 
          },
          { 
            label: "Carbon Forecasting", 
            value: "72h", 
            desc: "Predictive risk radar for emission spikes.",
            icon: Activity 
          },
        ].map((stat, i) => (
          <div key={stat.label} className="glass-card p-8 rounded-3xl flex flex-col gap-4 border-white/5">
            <div className="p-3 bg-primary/20 rounded-xl w-fit">
              <stat.icon className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-sm font-bold uppercase text-accent tracking-tighter mb-2">{stat.label}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{stat.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer Info */}
      <section className="container px-4 md:px-8 text-center mt-12">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 max-w-2xl mx-auto">
          <p className="text-muted-foreground text-sm">
            Developed by <span className="text-white font-bold">Deepak Kumar</span> (Team ERROR404) for the <span className="text-accent font-bold italic">Hack For Green Bharat</span> national challenge.
          </p>
        </div>
      </section>
    </div>
  )
}
