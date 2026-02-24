"use client"

import { useState, useRef, useEffect } from "react"
import { ShieldCheck, Send, Bot, User, Loader2, Info, Sparkles, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { aiComplianceAssistant, type ComplianceAssistantOutput } from "@/ai/flows/ai-compliance-assistant-flow"
import { suggestComplianceQuestions } from "@/ai/flows/suggest-compliance-questions-flow"

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
      content: "Hello! I am GreenPulse Bharat AI. I can audit your shipments or factory compliance based on live regulatory data. What would you like to check?" 
    }
  ])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSuggesting, setIsSuggesting] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    async function loadSuggestions() {
      setIsSuggesting(true)
      try {
        const res = await suggestComplianceQuestions()
        setSuggestions(res.suggestions)
      } catch (err) {
        setSuggestions([
          "Is Shipment-45 compliant?",
          "Check PM2.5 limits for Factory-21",
          "What are the 2024 emission norms?"
        ])
      } finally {
        setIsSuggesting(false)
      }
    }
    loadSuggestions()
  }, [])

  const handleSend = async (query?: string) => {
    const userMsg = query || input
    if (!userMsg.trim() || isLoading) return

    setInput("")
    setMessages(prev => [...prev, { role: "user", content: userMsg }])
    setIsLoading(true)

    try {
      const shipmentMatch = userMsg.match(/Shipment-(\d+)/i) || userMsg.match(/shipment id (\d+)/i)
      const factoryMatch = userMsg.match(/Factory-(\d+)/i) || userMsg.match(/factory id (\d+)/i)
      
      const res = await aiComplianceAssistant({
        query: userMsg,
        shipmentId: shipmentMatch ? `Shipment-${shipmentMatch[1]}` : undefined,
        factoryId: factoryMatch ? `Factory-${factoryMatch[1]}` : undefined,
      })

      setMessages(prev => [...prev, { role: "assistant", content: res.answer, data: res }])
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "I encountered an error while analyzing the compliance data. Please check the ID and try again." }])
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
            <p className="text-sm text-muted-foreground">Real-time regulatory auditor</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">CPCB 2024 Norms</Badge>
          <Badge variant="outline" className="text-xs">Live RAG Status: Active</Badge>
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
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Verification:</span>
                            <Badge className={`${msg.data.isCompliant ? 'bg-accent/20 text-accent' : 'bg-red-500/20 text-red-400'} border-0`}>
                              {msg.data.isCompliant ? 'Compliant' : 'Non-Compliant'}
                            </Badge>
                          </div>
                          {msg.data.citations.length > 0 && (
                            <div className="flex flex-col gap-1">
                              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Verified References:</span>
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
                    <span className="text-sm italic text-muted-foreground">Verifying against regulatory database...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 bg-white/5 border-t border-white/10">
            {suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {isSuggesting ? (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
                    <Sparkles className="h-3 w-3" /> Generating suggestions...
                  </div>
                ) : (
                  suggestions.map((suggestion, idx) => (
                    <Button 
                      key={idx} 
                      variant="outline" 
                      size="sm" 
                      className="text-[10px] h-7 bg-white/5 border-white/10 hover:bg-accent/10 hover:border-accent/30"
                      onClick={() => handleSend(suggestion)}
                      disabled={isLoading}
                    >
                      {suggestion}
                    </Button>
                  ))
                )}
              </div>
            )}
            
            <div className="relative flex items-center">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a compliance query..."
                className="pr-12 h-12 bg-background border-border focus-visible:ring-accent"
              />
              <Button 
                onClick={() => handleSend()}
                size="icon" 
                className="absolute right-1 top-1 h-10 w-10 emerald-gradient border-0"
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden md:flex flex-col gap-6 w-80">
          <div className="glass-card p-6 rounded-2xl border-0">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              AI Insights
            </h3>
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our auditor uses Retrieval-Augmented Generation (RAG) to ensure every answer is backed by verified government policy documents.
              </p>
              <div className="pt-4 border-t border-white/10">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-2">Live Policy Sources</span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    CPCB Emission Norms 2024
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Ministry of Transport Guidelines
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border-0 flex-1">
            <h3 className="font-bold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                "Policy Impact Simulation",
                "Export Audit Logs",
                "Request Manual Review"
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
