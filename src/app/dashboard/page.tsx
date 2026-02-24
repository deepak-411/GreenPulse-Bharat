
"use client"

import { useState, useEffect } from "react"
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Truck, 
  Factory, 
  AlertTriangle,
  Loader2,
  Play
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts"
import { 
  ChartContainer, 
  ChartTooltipContent 
} from "@/components/ui/chart"

const liveData = [
  { time: "10:00", value: 65 },
  { time: "10:05", value: 68 },
  { time: "10:10", value: 62 },
  { time: "10:15", value: 72 },
  { time: "10:20", value: 85 },
  { time: "10:25", value: 78 },
  { time: "10:30", value: 82 },
  { time: "10:35", value: 75 },
  { time: "10:40", value: 68 },
  { time: "10:45", value: 64 },
]

const chartConfig = {
  value: {
    label: "Carbon Index",
    color: "hsl(var(--accent))",
  },
}

export default function Dashboard() {
  const [cci, setCci] = useState(74.8)
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected'>('idle')

  const handleConnect = () => {
    setStatus('connecting')
    setTimeout(() => setStatus('connected'), 2000)
  }

  useEffect(() => {
    if (status !== 'connected') return
    const interval = setInterval(() => {
      setCci(prev => +(prev + (Math.random() * 2 - 1)).toFixed(1))
    }, 5000)
    return () => clearInterval(interval)
  }, [status])

  return (
    <div className="container px-4 md:px-8 py-8 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Intelligence Console</h1>
          <p className="text-muted-foreground">National Real-Time Environmental Status</p>
        </div>
        <div className="flex items-center gap-2">
          {status === 'idle' ? (
            <Button onClick={handleConnect} className="emerald-gradient border-0">
              <Play className="mr-2 h-4 w-4" /> Start Live Stream
            </Button>
          ) : (
            <Badge variant="outline" className={`px-3 py-1 transition-colors ${status === 'connected' ? 'border-accent text-accent bg-accent/5' : 'border-muted text-muted'}`}>
              <div className={`h-2 w-2 rounded-full mr-2 ${status === 'connected' ? 'bg-accent animate-pulse' : 'bg-muted'}`} />
              {status === 'connected' ? 'Live Stream Connected' : 'Connecting to Pathway...'}
            </Badge>
          )}
        </div>
      </div>

      {status === 'idle' ? (
        <div className="flex-1 flex flex-col items-center justify-center py-24 glass-card rounded-3xl border-dashed border-2 border-white/10">
          <Zap className="h-16 w-16 text-muted-foreground mb-4 opacity-20" />
          <h2 className="text-2xl font-bold text-muted-foreground">Data Stream Inactive</h2>
          <p className="text-muted-foreground mb-6 text-center max-w-md px-6">Connect to the national sovereign stream to view real-time metrics and manual sensor analysis.</p>
          <Button onClick={handleConnect} size="lg" className="emerald-gradient border-0 font-bold px-10">
            Initialize Real-time Ingestion
          </Button>
        </div>
      ) : status === 'connecting' ? (
        <div className="flex-1 flex flex-col items-center justify-center py-24 gap-4 glass-card rounded-3xl border-white/5">
          <Loader2 className="h-12 w-12 animate-spin text-accent" />
          <p className="text-lg font-medium text-muted-foreground">Establishing Live Sovereign Stream...</p>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card border-0">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Continuous Carbon Index (CCI™)</CardTitle>
                <Activity className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{cci}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <TrendingDown className="h-3 w-3 text-accent mr-1" />
                  -2.1% from previous window
                </p>
                <Progress value={cci} className="h-1 mt-4" />
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Logistics Units</CardTitle>
                <Truck className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 text-red-400 mr-1" />
                  +14 new units detected
                </p>
                <div className="flex items-center gap-1 mt-4">
                  {[1, 2, 3, 4, 5, 6, 7].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i < 6 ? 'bg-accent' : 'bg-muted'}`} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Industrial Zone Health</CardTitle>
                <Factory className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  Within regulatory thresholds
                </p>
                <Progress value={92} className="h-1 mt-4" />
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">National Green Credits</CardTitle>
                <Zap className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4.2M</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  Verified via smart contracts
                </p>
                <div className="flex gap-2 mt-4">
                   <Badge className="bg-accent/20 text-accent hover:bg-accent/30 border-0">Tier A</Badge>
                   <Badge variant="outline" className="border-accent/20">Tax Eligible</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 glass-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Emission Trends</CardTitle>
                    <CardDescription>Live telemetry across top industrial corridors</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={liveData}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="value" stroke="hsl(var(--accent))" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  Live Anomaly Radar
                </CardTitle>
                <CardDescription>Event-driven detections (Pathway Engine)</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {[
                  { id: 1, type: "Emission Spike", zone: "Taloja MIDC", risk: "High", time: "2m ago" },
                  { id: 2, type: "Route Deviation", zone: "NH-48 Corridor", risk: "Med", time: "8m ago" },
                  { id: 3, type: "Policy Threshold", zone: "Noida Industrial", risk: "High", time: "15m ago" },
                  { id: 4, type: "Fuel Inefficiency", zone: "Vapi Supply Chain", risk: "Low", time: "22m ago" },
                ].map(alert => (
                  <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{alert.type}</span>
                      <span className="text-xs text-muted-foreground">{alert.zone}</span>
                    </div>
                    <Badge className={`${alert.risk === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'} border-0`}>
                      {alert.risk}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
