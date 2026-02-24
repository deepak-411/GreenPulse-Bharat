
"use client"

import { useState, useRef, useEffect } from "react"
import { ShieldCheck, Send, Bot, User, Loader2, Info, Sparkles, MessageSquare } from "lucide-react"
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
  const [messages, setMessages] = useState<Message[]>([])
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
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        <div className="flex-1 flex flex-col glass-card rounded-2xl border-0 overflow-hidden">
          <ScrollArea ref={scrollRef} className="flex-1 p-6">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 gap-6">
                <div className="p-6 bg-accent/10 rounded-full animate-pulse">
                  <Bot className="h-16 w-16 text-accent" />
                </div>
                <div className="max-w-md">
                  <h3 className="text-2xl font-bold mb-2">Policy Auditor Ready</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ask any question about environmental compliance, shipment tracking, or factory emission limits.
                  </p>
                </div>
                
                {suggestions.length > 0 && (
                  <div className="w-full max-w-lg mt-4">
                    <p className="text-xs font-bold uppercase text-accent mb-3 tracking-widest flex items-center justify-center gap-2">
                      <Sparkles className="h-4 w-4" /> AI Suggested Questions
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {suggestions.map((suggestion, idx) => (
                        <Button 
                          key={idx} 
                          variant="outline" 
                          className="justify-start h-auto py-3 px-4 text-sm bg-white/5 border-white/10 hover:border-accent/50 text-left whitespace-normal"
                          onClick={() => handleSend(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`h-10 w-10 shrink-0 rounded-lg flex items-center justify-center ${msg.role === 'assistant' ? 'bg-primary/20' : 'bg-accent/20'}`}>
                      {msg.role === 'assistant' ? <Bot className="h-6 w-6 text-primary" /> : <User className="h-6 w-6 text-accent" />}
                    </div>
                    <div className={`flex flex-col gap-2 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'assistant' ? 'bg-white/5 border border-white/10' : 'emerald-gradient text-white shadow-lg'}`}>
                        {msg.content}
                        
                        {msg.data && (
                          <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold uppercase tracking-wider opacity-60">Status:</span>
                              <Badge className={`${msg.data.isCompliant ? 'bg-accent/20 text-accent' : 'bg-red-500/20 text-red-400'} border-0`}>
                                {msg.data.isCompliant ? 'Verified Compliant' : 'Non-Compliant Alert'}
                              </Badge>
                            </div>
                            {msg.data.citations.length > 0 && (
                              <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold uppercase tracking-wider opacity-60">Policy Citations:</span>
                                {msg.data.citations.map((cite, j) => (
                                  <div key={j} className="text-xs flex items-center gap-2 opacity-80 italic bg-black/20 p-2 rounded">
                                    <Info className="h-3 w-3 shrink-0" /> {cite}
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
                      <span className="text-sm italic text-muted-foreground">Running AI Policy Audit...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          <div className="p-4 bg-white/5 border-t border-white/10">
            <div className="relative flex items-center">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a compliance question..."
                className="pr-12 h-14 bg-background border-border text-lg"
              />
              <Button 
                onClick={() => handleSend()}
                size="icon" 
                className="absolute right-1.5 top-1.5 h-11 w-11 emerald-gradient border-0"
                disabled={isLoading}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col gap-6 w-80">
          <div className="glass-card p-6 rounded-2xl border-0">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-accent" />
              Intelligence Source
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Answers are generated using **Sovereign RAG** (Retrieval-Augmented Generation) based on the latest 2024 CPCB and Ministry notifications.
            </p>
            <div className="pt-4 border-t border-white/10 space-y-2">
              <Badge variant="outline" className="w-full justify-start text-[10px] py-1 border-accent/20">
                • 2024 National Emission Norms
              </Badge>
              <Badge variant="outline" className="w-full justify-start text-[10px] py-1 border-accent/20">
                • Logistics Efficiency Standards v2
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
