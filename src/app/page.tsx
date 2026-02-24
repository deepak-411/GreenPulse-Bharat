
"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function LandingPage() {
  const banner = PlaceHolderImages.find(img => img.id === 'hackathon-banner')

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-background p-6">
      <div className="container max-w-4xl flex flex-col items-center text-center gap-12">
        {/* Banner Section */}
        <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[16/6] md:aspect-[3/1]">
          <Image 
            src={banner?.imageUrl || "https://picsum.photos/seed/green-bharat-2024/1200/400"} 
            alt="Hack For Green Bharat Hackathon" 
            fill
            className="object-cover"
            priority
            data-ai-hint="hackathon banner"
          />
        </div>

        {/* Branding & Team Section */}
        <div className="space-y-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground font-headline">
            Hack For Green Bharat Hackathon
          </h1>
          
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-accent uppercase tracking-[0.3em] text-sm font-bold opacity-80">Team</span>
              <span className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">ERROR404</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-accent uppercase tracking-[0.3em] text-sm font-bold opacity-80">Leader</span>
              <span className="text-4xl md:text-6xl font-bold text-foreground font-headline">Deepak Kumar</span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <Button size="lg" className="h-20 px-16 emerald-gradient border-0 text-2xl font-bold shadow-2xl shadow-accent/30 group rounded-full" asChild>
            <Link href="/dashboard">
              Next <ArrowRight className="ml-4 h-8 w-8 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
          <p className="text-muted-foreground text-xs font-bold tracking-[0.4em] uppercase opacity-40">
            Enter Working Model
          </p>
        </div>
      </div>
    </div>
  )
}
