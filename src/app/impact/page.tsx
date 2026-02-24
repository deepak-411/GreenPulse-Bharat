
"use client"

import { useState } from "react"
import { Sprout, TrendingDown, IndianRupee, TreeDeciduous, Zap, ArrowUpRight, BarChart3, Activity, Play, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function ImpactVisualization() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded'>('idle')

  const handleGenerate = () => {
    setStatus('loading')
    setTimeout(() => setStatus('loaded'), 2500)
  }

  return (
    <div className="container px-4 md:px-8 py-8 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Sprout className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Sustainable Impact Dashboard</h1>
            <p className="text-muted-foreground">Quantifying green savings and environmental health</p>
          </div>
        </div>
        {status === 'loaded' && (
          <div className="flex gap-2">
            <Badge variant="outline">Verified Impact</Badge>
            <Badge variant="outline" className="border-accent text-accent">ESG Score: 88/100</Badge>
          </div>
        )}
      </div>

      {status === 'idle' ? (
        <div className="flex-1 flex flex-col items-center justify-center py-32 glass-card rounded-3xl border-dashed border-2 border-white/10">
          <Activity className="h-16 w-16 text-muted-foreground mb-6 opacity-20" />
          <h2 className="text-2xl font-bold text-muted-foreground">Impact Analysis Offline</h2>
          <p className="text-muted-foreground mb-8 text-center max-w-md px-6">
            Generate your environmental performance report to see verified carbon offsets and energy savings.
          </p>
          <Button onClick={handleGenerate} size="lg" className="emerald-gradient border-0 font-bold px-12 h-14 text-lg shadow-xl shadow-accent/20">
            <Play className="mr-2 h-5 w-5" /> Generate Impact Report
          </Button>
        </div>
      ) : status === 'loading' ? (
        <div className="flex-1 flex flex-col items-center justify-center py-32 gap-6 glass-card rounded-3xl">
          <Loader2 className="h-14 w-14 animate-spin text-accent" />
          <div className="text-center">
            <p className="text-xl font-medium text-foreground">Processing ESG Telemetry...</p>
            <p className="text-sm text-muted-foreground mt-2">Aggregating national carbon credits and offset data</p>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-700 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card border-0 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <IndianRupee className="h-24 w-24 text-accent" />
              </div>
              <CardHeader>
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Total Carbon Savings</CardTitle>
                <div className="text-4xl font-bold text-accent mt-2">₹12.4M</div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">Saved through route optimization & fuel efficiency in Q3.</p>
                <div className="flex items-center gap-2 text-xs font-bold text-accent">
                  <TrendingDown className="h-4 w-4" />
                  18% efficiency increase
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <TreeDeciduous className="h-24 w-24 text-accent" />
              </div>
              <CardHeader>
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Environmental Equivalent</CardTitle>
                <div className="text-4xl font-bold text-accent mt-2">15,240</div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">Equivalent number of mature trees planted based on carbon offset.</p>
                <div className="flex items-center gap-2 text-xs font-bold text-accent">
                  <Sprout className="h-4 w-4" />
                  Impact of 42 forests
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="h-24 w-24 text-accent" />
              </div>
              <CardHeader>
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Energy Saved</CardTitle>
                <div className="text-4xl font-bold text-accent mt-2">842 MWh</div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">Renewable transition impact across all industrial zones.</p>
                <div className="flex items-center gap-2 text-xs font-bold text-accent">
                  <Activity className="h-4 w-4" />
                  Powering 2,500 homes
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Impact Contribution Analysis</CardTitle>
                <CardDescription>Where the green gains are coming from</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {[
                  { label: "Route Optimization", value: 85, color: "bg-accent", sub: "Reduced fuel waste by 24%" },
                  { label: "Predictive Maintenance", value: 62, color: "bg-primary", sub: "Fewer emission spikes due to hardware" },
                  { label: "Intermodal Logistics", value: 48, color: "bg-accent", sub: "Transitioning road to rail cargo" },
                  { label: "Renewable Integration", value: 35, color: "bg-primary", sub: "Factory solar adoption tracking" },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <div>
                        <h4 className="text-sm font-bold">{item.label}</h4>
                        <p className="text-[10px] text-muted-foreground">{item.sub}</p>
                      </div>
                      <span className="text-sm font-bold text-accent">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex flex-col gap-6">
               <Card className="glass-card border-0 bg-primary/5">
                 <CardHeader>
                    <div className="flex justify-between items-start">
                       <div>
                         <CardTitle className="text-lg">Sustainable Logistics Report</CardTitle>
                         <CardDescription>Q3 2024 Performance</CardDescription>
                       </div>
                       <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <ArrowUpRight className="h-4 w-4" />
                       </Button>
                    </div>
                 </CardHeader>
                 <CardContent>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-background/50 border border-white/5 text-center">
                        <span className="text-xs text-muted-foreground">Emission/KM</span>
                        <div className="text-xl font-bold mt-1 text-accent">-12.4%</div>
                      </div>
                      <div className="p-4 rounded-xl bg-background/50 border border-white/5 text-center">
                        <span className="text-xs text-muted-foreground">Fuel Usage</span>
                        <div className="text-xl font-bold mt-1 text-accent">-8.5%</div>
                      </div>
                   </div>
                   <div className="mt-6 p-4 rounded-xl border-2 border-dashed border-white/10 text-center">
                      <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">Detailed modal comparison available for download.</p>
                      <Button variant="link" className="text-accent text-xs mt-1">Download Full ESG Audit (PDF)</Button>
                   </div>
                 </CardContent>
               </Card>

               <Card className="glass-card border-0 emerald-gradient text-white">
                 <CardContent className="p-6">
                   <h3 className="text-xl font-bold mb-2">Join the Carbon Credits Network</h3>
                   <p className="text-sm opacity-90 mb-4">
                     Your current performance qualifies you for a 5% Green Tax Rebate under the new 2024 Ministry Guidelines.
                   </p>
                   <Button className="w-full bg-white text-primary hover:bg-white/90 border-0">Claim Green Rebate</Button>
                 </CardContent>
               </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
