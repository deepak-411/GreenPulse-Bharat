"use client"

import { useState } from "react"
import { 
  Radar, 
  Search, 
  Activity, 
  Map as MapIcon, 
  ShieldAlert, 
  Clock, 
  TrendingUp,
  BrainCircuit,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { predictiveCarbonRiskRadar, type PredictiveCarbonRiskRadarOutput } from "@/ai/flows/predictive-carbon-risk-radar-flow"

export default function RiskRadar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [prediction, setPrediction] = useState<PredictiveCarbonRiskRadarOutput | null>(null)

  const handlePredict = async () => {
    if (!searchQuery.trim()) return
    setIsAnalyzing(true)
    try {
      // Simulate analysis of zone or supply chain
      const res = await predictiveCarbonRiskRadar({
        zoneId: searchQuery.includes('zone') || !searchQuery.includes('chain') ? searchQuery : undefined,
        supplyChainId: searchQuery.includes('chain') ? searchQuery : undefined,
        timeframeHours: 72
      })
      setPrediction(res)
    } catch (error) {
      console.error(error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="container px-4 md:px-8 py-8 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Radar className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Predictive Risk Radar</h1>
            <p className="text-muted-foreground">72-Hour forecasting using Pathway temporal logic</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <Badge variant="outline" className="border-accent/50">ML Drift: 0.02%</Badge>
           <Badge variant="outline" className="border-accent/50">Active Sensors: 10M+</Badge>
        </div>
      </div>

      <Card className="glass-card border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Industrial Zone ID (e.g. Zone-A1) or Supply Chain ID..." 
                className="pl-10 h-12 bg-background/50 border-border"
              />
            </div>
            <Button onClick={handlePredict} disabled={isAnalyzing} className="h-12 px-8 emerald-gradient border-0 text-white font-bold">
              {isAnalyzing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Stream...</> : "Run Forecast Analysis"}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs text-muted-foreground mr-2">Quick Shortcuts:</span>
            {["Mumbai Zone-4", "Gujarat-Corridor-Alpha", "NH-48 Logistics", "Haldia Industrial"].map(tag => (
              <button key={tag} onClick={() => setSearchQuery(tag)} className="text-[10px] px-2 py-1 rounded-full bg-white/5 border border-white/10 hover:border-accent/50 transition-colors">
                {tag}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Prediction */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {prediction ? (
            <Card className="glass-card border-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">Forecasting Report: {prediction.entityId}</CardTitle>
                  <CardDescription>Generated for the next {prediction.timeframeHours} hours</CardDescription>
                </div>
                <Badge className={`${prediction.likelihoodPercentage > 60 ? 'bg-red-500' : 'bg-accent'} text-white`}>
                  {prediction.predictionType.replace('_', ' ').toUpperCase()}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center gap-2">
                    <span className="text-sm text-muted-foreground font-medium">Likelihood Probability</span>
                    <span className="text-5xl font-bold text-accent">{prediction.likelihoodPercentage}%</span>
                    <div className="w-full h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                       <div className="h-full bg-accent" style={{ width: `${prediction.likelihoodPercentage}%` }} />
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center gap-2">
                    <span className="text-sm text-muted-foreground font-medium">Risk Priority</span>
                    <span className="text-4xl font-bold uppercase tracking-tight">
                      {prediction.likelihoodPercentage > 75 ? "CRITICAL" : prediction.likelihoodPercentage > 40 ? "ELEVATED" : "STABLE"}
                    </span>
                    <Badge variant="outline" className="mt-2 border-accent/20">Action Required</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-500/10 rounded-lg shrink-0">
                      <ShieldAlert className="h-6 w-6 text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Predicted Causes</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                        {prediction.predictedCauses}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/20 rounded-lg shrink-0">
                      <BrainCircuit className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Recommended Interventions</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                        {prediction.recommendedActions}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-white/10 rounded-3xl text-center gap-4">
              <div className="p-4 bg-white/5 rounded-full">
                <MapIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">No Active Analysis</h3>
                <p className="text-sm text-muted-foreground max-w-xs">Enter a zone or supply chain ID above to run a real-time carbon risk forecast.</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Context & Sidebar */}
        <div className="flex flex-col gap-6">
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">Risk Hotspots</CardTitle>
              <CardDescription>Live regional risk levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "NCR Industrial", level: 82, trend: "up" },
                { name: "Mumbai Corridor", level: 45, trend: "down" },
                { name: "Gujarat Petro", level: 68, trend: "stable" },
                { name: "Kolkata Port", level: 12, trend: "down" },
              ].map((loc, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">{loc.name}</span>
                    <span className={loc.level > 70 ? 'text-red-400' : 'text-accent'}>{loc.level}% Risk</span>
                  </div>
                  <Progress value={loc.level} className="h-1" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card border-0 bg-primary/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                Historical Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Emission spike in Vapi Zone detected 4h ago",
                "Logistics bottleneck NH-48 cleared",
                "PM2.5 threshold warning Noida (resolved)",
              ].map((msg, i) => (
                <div key={i} className="text-[11px] p-2 bg-background/50 rounded-lg border border-white/5 opacity-80">
                  {msg}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
