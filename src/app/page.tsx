
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
      <div className="container max-w-4xl flex flex-col items-center text-center gap-10">
        {/* Banner Section */}
        <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[16/7] md:aspect-[3/1]">
          <Image 
            src={banner?.imageUrl || "https://s3.in-west2.purestore.io/uptoskills/events/banners/1771332247613-582381278-cropped-banner.jpg"} 
            alt="Hack For Green Bharat Hackathon" 
            fill
            className="object-cover"
            priority
            data-ai-hint="hackathon banner"
          />
        </div>

        {/* Branding & Team Section */}
        <div className="space-y-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-headline">
            Hack For Green Bharat Hackathon
          </h1>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center">
              <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold opacity-60 mb-1">Team</span>
              <span className="text-4xl md:text-6xl font-bold text-white tracking-tight">ERROR404</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold opacity-60 mb-1">Leader</span>
              <span className="text-3xl md:text-5xl font-bold text-foreground font-headline">Deepak Kumar</span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="mt-4 flex flex-col items-center gap-3">
          <Button size="lg" className="h-16 px-12 emerald-gradient border-0 text-xl font-bold shadow-2xl shadow-accent/20 group rounded-full" asChild>
            <Link href="/dashboard">
              Next <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
          <p className="text-muted-foreground text-[10px] font-bold tracking-[0.4em] uppercase opacity-30">
            Enter Working Model
          </p>
        </div>
      </div>
    </div>
  )
}
