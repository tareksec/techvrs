import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, ShieldCheck, X } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const GREETING =
  "Hi, I'm the techvrs assistant. I can help you with the website or put you in touch with the team. How can I help?";

const QUICK_REPLIES = ["Website Help", "Contact Support", "Hi/Hello"];

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const history = messages.slice(1); // exclude the static greeting
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: trimmed, history }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      const reply =
        res.ok && data.reply
          ? data.reply
          : (data.error ?? "Sorry, something went wrong. Please try again.");
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't reach the server. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) {
      e.preventDefault();
      void sendMessage(input);
    }
  };

  const showQuickReplies = messages.length === 1 && !isLoading;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-3">
      {/* Chat window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="techvrs support assistant"
          className="flex w-[calc(100vw-2.5rem)] max-w-[380px] h-[min(550px,calc(100dvh-7rem))] flex-col overflow-hidden rounded-3xl border border-hairline bg-card shadow-2xl shadow-signal/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-hairline bg-background/60 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-signal text-signal-foreground">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">
                  techvrs Assistant
                </p>
                <p className="mono text-[10px] uppercase tracking-widest text-signal">
                  Online // Support
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, i) => (
              <div key={i} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    message.role === "user"
                      ? "max-w-[85%] rounded-2xl rounded-br-md bg-signal px-3.5 py-2.5 text-sm leading-relaxed text-signal-foreground"
                      : "max-w-[85%] rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5 text-sm leading-relaxed text-foreground"
                  }
                >
                  {message.content}
                </div>
              </div>
            ))}

            {showQuickReplies && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_REPLIES.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => void sendMessage(label)}
                    className="mono rounded-full border border-signal/50 px-3 py-1.5 text-[11px] uppercase tracking-wider text-signal transition-colors hover:bg-signal hover:text-signal-foreground"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-muted px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-signal [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-signal [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-signal" />
                  <span className="sr-only">Assistant is thinking</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-hairline bg-background/60 p-3">
            <div className="flex items-center gap-2 rounded-full border border-hairline bg-card px-4 py-1.5 focus-within:border-signal/60">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message…"
                aria-label="Chat message"
                disabled={isLoading}
                className="flex-1 bg-transparent py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => void sendMessage(input)}
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal text-signal-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close support chat" : "Open support chat"}
        aria-expanded={isOpen}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-signal text-signal-foreground shadow-lg shadow-signal/30 transition-transform hover:scale-105"
      >
        {!isOpen && (
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 animate-ping rounded-full bg-signal/40 [animation-duration:2.5s]"
          />
        )}
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
