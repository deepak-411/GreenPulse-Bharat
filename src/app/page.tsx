
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, User } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function LandingPage() {
  const banner = PlaceHolderImages.find(img => img.id === 'hackathon-banner')

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-background p-4 py-12">
      <div className="container max-w-4xl flex flex-col items-center text-center gap-12">
        {/* Banner Section */}
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient">
            Hack For Green Bharat Hackathon
          </h1>
          <div className="w-full aspect-[21/9] relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <Image 
              src={banner?.imageUrl || "https://picsum.photos/seed/green-bharat-2024/1200/500"} 
              alt="Hack For Green Bharat" 
              fill
              className="object-cover"
              priority
              data-ai-hint="sustainability nature"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
        </div>

        {/* Team Details Section */}
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

        {/* Navigation Section */}
        <div className="mt-8">
          <Button size="lg" className="h-20 px-12 emerald-gradient border-0 text-2xl font-bold shadow-2xl shadow-accent/30 group transition-all hover:scale-105 active:scale-95" asChild>
            <Link href="/dashboard">
              Enter Working Model <ArrowRight className="ml-4 h-8 w-8 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
          <p className="mt-6 text-muted-foreground text-sm font-medium animate-pulse">
            Click to launch the sovereign intelligence console
          </p>
        </div>
      </div>
    </div>
  )
}
