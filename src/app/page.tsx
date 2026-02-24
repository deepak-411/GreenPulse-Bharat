
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function LandingPage() {
  const banner = PlaceHolderImages.find(img => img.id === 'hackathon-banner')

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-background p-6">
      <div className="container max-w-4xl flex flex-col items-center text-center gap-10">
        {/* Banner Section */}
        <div className="w-full relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[21/9]">
          <Image 
            src={banner?.imageUrl || "https://picsum.photos/seed/green-bharat-2024/1200/500"} 
            alt="Hack For Green Bharat Hackathon" 
            fill
            className="object-cover"
            priority
            data-ai-hint="hackathon banner"
          />
        </div>

        {/* Branding Section */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Hack For Green Bharat Hackathon
          </h1>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2">
              <span className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Team:</span>
              <span className="text-2xl font-bold text-accent">ERROR404</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Leader:</span>
              <span className="text-2xl font-bold text-foreground">Deepak Kumar</span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="mt-4">
          <Button size="lg" className="h-16 px-12 emerald-gradient border-0 text-xl font-bold shadow-xl group" asChild>
            <Link href="/dashboard">
              Next <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
          <p className="mt-4 text-muted-foreground text-sm font-medium">
            Enter Working Model
          </p>
        </div>
      </div>
    </div>
  )
}
