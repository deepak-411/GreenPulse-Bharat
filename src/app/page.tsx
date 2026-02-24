
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, User } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function LandingPage() {
  const banner = PlaceHolderImages.find(img => img.id === 'hackathon-banner')

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-background p-4">
      <div className="container max-w-5xl flex flex-col items-center text-center gap-10">
        {/* Hackathon Banner Image */}
        <div className="w-full aspect-[3/1] relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <Image 
            src={banner?.imageUrl || "https://picsum.photos/seed/green-bharat-banner/1200/400"} 
            alt="Hack For Green Bharat" 
            fill
            className="object-cover"
            priority
            data-ai-hint="sustainability nature"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </div>

        {/* Team Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
          <div className="glass-card p-8 rounded-2xl flex flex-col items-center gap-3 border-accent/20">
            <Users className="h-10 w-10 text-accent mb-2" />
            <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Team Name</p>
            <h2 className="text-3xl font-bold tracking-tight">ERROR404</h2>
          </div>
          <div className="glass-card p-8 rounded-2xl flex flex-col items-center gap-3 border-accent/20">
            <User className="h-10 w-10 text-accent mb-2" />
            <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Team Leader</p>
            <h2 className="text-3xl font-bold tracking-tight">Deepak Kumar</h2>
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-4">
          <Button size="lg" className="h-16 px-16 emerald-gradient border-0 text-2xl font-bold shadow-2xl shadow-accent/30 group transition-all hover:scale-105" asChild>
            <Link href="/dashboard">
              Enter Working Model <ArrowRight className="ml-3 h-8 w-8 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
