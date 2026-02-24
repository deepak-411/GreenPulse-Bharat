
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
      <div className="container max-w-5xl flex flex-col items-center text-center gap-8">
        {/* Hackathon Header */}
        <Badge variant="outline" className="border-accent text-accent bg-accent/5 px-6 py-1 text-sm font-bold uppercase tracking-widest">
          Hack For Green Bharat Hackathon
        </Badge>

        {/* Hackathon Banner Image */}
        <div className="w-full aspect-[3/1] relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <Image 
            src={banner?.imageUrl || "https://picsum.photos/seed/greenbharat/1200/400"} 
            alt="Hack For Green Bharat" 
            fill
            className="object-cover"
            data-ai-hint="hackathon sustainability"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>

        {/* Team Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-2 border-accent/20">
            <Users className="h-8 w-8 text-accent mb-2" />
            <p className="text-xs uppercase font-bold text-muted-foreground">Team</p>
            <h2 className="text-2xl font-bold">ERROR404</h2>
          </div>
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-2 border-accent/20">
            <User className="h-8 w-8 text-accent mb-2" />
            <p className="text-xs uppercase font-bold text-muted-foreground">Leader</p>
            <h2 className="text-2xl font-bold">Deepak Kumar</h2>
          </div>
        </div>

        {/* Next Button */}
        <Button size="lg" className="h-16 px-12 emerald-gradient border-0 text-xl font-bold shadow-xl shadow-accent/20 group" asChild>
          <Link href="/dashboard">
            Next: Enter Working Model <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
