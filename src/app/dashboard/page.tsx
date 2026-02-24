
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
  Database
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

// Mock data for live charts
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
  const [isConnected, setIsConnected] = useState(false)

  // Simulate connection sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsConnected(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Simulate live CCI updates
  useEffect(() => {
    if (!isConnected) return
    const interval = setInterval(() => {
      setCci(prev => +(prev + (Math.random() * 2 - 1)).toFixed(1))
    }, 5000)
    return () => clearInterval(interval)
  }, [isConnected])

  return (
    <div className="container px-4 md:px-8 py-8 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Intelligence Console</h1>
          <p className="text-muted-foreground">National Real-Time Environmental Status</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`px-3 py-1 transition-colors ${isConnected ? 'border-accent text-accent bg-accent/5' : 'border-muted text-muted'}`}>
            <div className={`h-2 w-2 rounded-full mr-2 ${isConnected ? 'bg-accent animate-pulse' : 'bg-muted'}`} />
            {isConnected ? 'Live Stream Connected' : 'Connecting to Pathway...'}
          </Badge>
          <span className="text-xs text-muted-foreground">{isConnected ? 'Updated 2s ago' : 'Establishing...'}</span>
        </div>
      </div>

      {!isConnected ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 gap-4 glass-card rounded-3xl border-white/5">
          <Loader2 className="h-10 w-10 animate-spin text-accent" />
          <p className="text-lg font-medium text-muted-foreground">Establishing Live Sovereign Stream...</p>
        </div>
      ) : (
        <>
          {/* Main Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Live Chart */}
            <Card className="lg:col-span-2 glass-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Emission Trends</CardTitle>
                    <CardDescription>Live telemetry across top industrial corridors</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">Real-time</Badge>
                    <Badge variant="outline" className="text-xs">5 min windows</Badge>
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
                        <XAxis 
                          dataKey="time" 
                          stroke="rgba(255,255,255,0.4)" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false}
                        />
                        <YAxis 
                          stroke="rgba(255,255,255,0.4)" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false} 
                        />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="hsl(var(--accent))" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorValue)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Real-time Alerts */}
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
                    <div className="flex flex-col items-end">
                      <Badge className={`${alert.risk === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'} border-0 mb-1`}>
                        {alert.risk}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Shipment Tracking Table */}
          <Card className="glass-card border-0 mb-8">
            <CardHeader>
              <CardTitle>Active Logistics Telemetry</CardTitle>
              <CardDescription>Dynamic per-unit carbon footprint tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase border-b border-white/10">
                    <tr>
                      <th className="px-4 py-3">Shipment ID</th>
                      <th className="px-4 py-3">Route</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Live CCI</th>
                      <th className="px-4 py-3">Est. Delay</th>
                      <th className="px-4 py-3 text-right">Compliance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { id: "GP-45", route: "Mumbai - Bangalore", status: "In Transit", cci: 64.2, delay: "12m", compliance: "Compliant" },
                      { id: "GP-89", route: "Delhi - Jaipur", status: "Loading", cci: 42.1, delay: "0m", compliance: "Compliant" },
                      { id: "GP-12", route: "Chennai - Hyderabad", status: "Delayed", cci: 88.5, delay: "45m", compliance: "Warning" },
                      { id: "GP-77", route: "Kolkata - Haldia", status: "In Transit", cci: 55.4, delay: "5m", compliance: "Compliant" },
                    ].map((shipment) => (
                      <tr key={shipment.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-4 py-4 font-medium">{shipment.id}</td>
                        <td className="px-4 py-4 text-muted-foreground">{shipment.route}</td>
                        <td className="px-4 py-4">
                           <div className="flex items-center gap-2">
                             <div className={`h-2 w-2 rounded-full ${shipment.status === 'Delayed' ? 'bg-red-400' : 'bg-accent'}`} />
                             {shipment.status}
                           </div>
                        </td>
                        <td className="px-4 py-4">{shipment.cci}</td>
                        <td className="px-4 py-4 text-muted-foreground">{shipment.delay}</td>
                        <td className="px-4 py-4 text-right">
                          <Badge variant={shipment.compliance === 'Compliant' ? 'default' : 'destructive'} className="emerald-gradient border-0">
                            {shipment.compliance}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
