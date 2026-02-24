
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
        <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/1]">
          <Image 
            src={banner?.imageUrl || "https://picsum.photos/seed/green-bharat-banner-2024/1200/300"} 
            alt="Hack For Green Bharat Hackathon" 
            fill
            className="object-cover"
            priority
            data-ai-hint="hackathon banner"
          />
        </div>

        {/* Branding Section */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Hack For Green Bharat Hackathon
          </h1>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-muted-foreground uppercase tracking-[0.2em] text-xs font-bold">Team</span>
              <span className="text-3xl md:text-5xl font-bold text-accent">ERROR404</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-muted-foreground uppercase tracking-[0.2em] text-xs font-bold">Leader</span>
              <span className="text-3xl md:text-5xl font-bold text-foreground font-headline">Deepak Kumar</span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <Button size="lg" className="h-20 px-16 emerald-gradient border-0 text-2xl font-bold shadow-2xl shadow-accent/20 group rounded-full" asChild>
            <Link href="/dashboard">
              Next <ArrowRight className="ml-4 h-8 w-8 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
          <p className="text-muted-foreground text-sm font-medium tracking-widest opacity-60">
            ENTER WORKING MODEL
          </p>
        </div>
      </div>
    </div>
  )
}
