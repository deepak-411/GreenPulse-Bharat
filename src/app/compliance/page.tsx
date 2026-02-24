"use client"

import { useState, useRef, useEffect } from "react"
import { ShieldCheck, Send, Bot, User, Loader2, Info, Paperclip, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { aiComplianceAssistant, type ComplianceAssistantOutput } from "@/ai/flows/ai-compliance-assistant-flow"

type Message = {
  role: "user" | "assistant"
  content: string
  data?: ComplianceAssistantOutput
}

export default function ComplianceAssistant() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hello! I am GreenPulse Bharat AI, your sovereign regulatory assistant. How can I help you audit your shipments or factory compliance today?" 
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMsg = input
    setInput("")
    setMessages(prev => [...prev, { role: "user", content: userMsg }])
    setIsLoading(true)

    try {
      // Basic heuristic to extract IDs from input for mock tool
      const shipmentMatch = userMsg.match(/Shipment-(\d+)/i) || userMsg.match(/shipment id (\d+)/i)
      const factoryMatch = userMsg.match(/Factory-(\d+)/i) || userMsg.match(/factory id (\d+)/i)
      
      const res = await aiComplianceAssistant({
        query: userMsg,
        shipmentId: shipmentMatch ? `Shipment-${shipmentMatch[1]}` : undefined,
        factoryId: factoryMatch ? `Factory-${factoryMatch[1]}` : undefined,
      })

      setMessages(prev => [...prev, { role: "assistant", content: res.answer, data: res }])
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "I encountered an error while analyzing the compliance data. Please try again." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container px-4 md:px-8 py-8 h-[calc(100vh-64px)] flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <ShieldCheck className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Policy Intelligence Engine</h1>
            <p className="text-sm text-muted-foreground">RAG-powered regulatory auditor</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">CPCB 2024 Norms Indexed</Badge>
          <Badge variant="outline" className="text-xs">Sovereign Data Storage</Badge>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col glass-card rounded-2xl border-0 overflow-hidden">
          <ScrollArea ref={scrollRef} className="flex-1 p-6">
            <div className="flex flex-col gap-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`h-10 w-10 shrink-0 rounded-lg flex items-center justify-center ${msg.role === 'assistant' ? 'bg-primary/20' : 'bg-accent/20'}`}>
                    {msg.role === 'assistant' ? <Bot className="h-6 w-6 text-primary" /> : <User className="h-6 w-6 text-accent" />}
                  </div>
                  <div className={`flex flex-col gap-2 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'assistant' ? 'bg-white/5 border border-white/10' : 'emerald-gradient text-white'}`}>
                      {msg.content}
                      
                      {msg.data && (
                        <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Compliance Status:</span>
                            <Badge className={`${msg.data.isCompliant ? 'bg-accent/20 text-accent' : 'bg-red-500/20 text-red-400'} border-0`}>
                              {msg.data.isCompliant ? 'Passed' : 'Non-Compliant'}
                            </Badge>
                          </div>
                          {msg.data.citations.length > 0 && (
                            <div className="flex flex-col gap-1">
                              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Policies Cited:</span>
                              {msg.data.citations.map((cite, j) => (
                                <div key={j} className="text-xs flex items-center gap-1 opacity-80 italic">
                                  <Info className="h-3 w-3" /> {cite}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <Loader2 className="h-4 w-4 animate-spin text-accent" />
                    <span className="text-sm italic text-muted-foreground">Analyzing regulatory logs...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 bg-white/5 border-t border-white/10">
            <div className="relative flex items-center">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about shipment compliance or factory emissions..."
                className="pr-12 h-12 bg-background border-border focus-visible:ring-accent"
              />
              <Button 
                onClick={handleSend}
                size="icon" 
                className="absolute right-1 top-1 h-10 w-10 emerald-gradient border-0"
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[10px] text-center mt-2 text-muted-foreground">
              Powered by Pathway RAG & Sovereign Environmental LLM. Citations are verified against CPCB datasets.
            </p>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="hidden md:flex flex-col gap-6 w-80">
          <div className="glass-card p-6 rounded-2xl border-0">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-accent" />
              Live Context
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Knowledge Base</span>
                <span className="text-sm font-medium">Ministry Notifications 2024</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Audit Engine Status</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-sm font-medium">Ready (Streaming RAG)</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Try asking: "Is shipment id 45 compliant with emission norms?" or "What are the latest PM2.5 limits for industrial zones?"
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border-0 flex-1">
            <h3 className="font-bold mb-4">Quick Audit Actions</h3>
            <div className="space-y-2">
              {[
                "Verify Recent Violations",
                "Export Compliance Report",
                "Update Policy Docs",
                "Policy Impact Simulation"
              ].map((action, i) => (
                <Button key={i} variant="ghost" className="w-full justify-between text-xs h-9 hover:bg-white/5">
                  {action} <ChevronRight className="h-3 w-3" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}