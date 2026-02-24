
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function LandingPage() {
  const banner = PlaceHolderImages.find(img => img.id === 'hackathon-banner')

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-background p-4 py-12">
      <div className="container max-w-4xl flex flex-col items-center text-center gap-12">
        {/* Banner Section */}
        <div className="w-full flex flex-col gap-6">
          <div className="w-full aspect-[21/9] relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <Image 
              src={banner?.imageUrl || "https://picsum.photos/seed/green-bharat-2024/1200/500"} 
              alt="Hack For Green Bharat" 
              fill
              className="object-cover"
              priority
              data-ai-hint="hackathon banner"
            />
          </div>
        </div>

        {/* Team Details Section */}
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <p className="text-sm uppercase font-bold text-accent tracking-[0.3em]">Team</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gradient">
              ERROR404
            </h1>
          </div>
          <div className="space-y-2 mt-4">
            <p className="text-sm uppercase font-bold text-muted-foreground tracking-[0.3em]">Leader</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground/90">
              Deepak Kumar
            </h2>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="mt-8">
          <Button size="lg" className="h-16 px-16 emerald-gradient border-0 text-2xl font-bold shadow-2xl shadow-accent/30 group transition-all hover:scale-105 active:scale-95" asChild>
            <Link href="/dashboard">
              Next <ArrowRight className="ml-4 h-8 w-8 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
          <p className="mt-6 text-muted-foreground text-sm font-medium animate-pulse">
            Enter Working Model
          </p>
        </div>
      </div>
    </div>
  )
}
