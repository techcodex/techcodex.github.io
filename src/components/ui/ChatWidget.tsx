import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, LoaderCircle, MessageCircle, Send, X } from "lucide-react";
import clsx from "clsx";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Public Worker URL — not a secret (see worker/README.md). Defaults to the
// deployed Worker so production builds (GitHub Actions, Docker) work with no
// extra config; override via .env locally to point at `wrangler dev` instead.
const CHAT_API_URL =
  (import.meta.env.VITE_CHAT_API_URL as string | undefined) ||
  "https://portfolio-chatbot.sohaibamjad4212.workers.dev";

let nextMessageId = 0;
function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  nextMessageId += 1;
  return { id: `msg-${nextMessageId}`, role, content };
}

const GREETING = createMessage(
  "assistant",
  "Hi! Ask me anything about Sohaib's experience, skills, or projects.",
);

const FALLBACK_ERROR =
  "Sorry, I'm having trouble connecting right now — please try again in a moment, or reach out directly via email.";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const history = messages
      .filter((m) => m.id !== GREETING.id)
      .map(({ role, content }) => ({ role, content }));
    setMessages((prev) => [...prev, createMessage("user", trimmed)]);
    setInput("");
    setIsLoading(true);

    try {
      if (!CHAT_API_URL) throw new Error("Chat API URL is not configured");

      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      if (!response.ok) throw new Error(`Chat API responded with ${response.status}`);

      const data = (await response.json()) as { reply?: string };
      setMessages((prev) => [...prev, createMessage("assistant", data.reply ?? FALLBACK_ERROR)]);
    } catch {
      setMessages((prev) => [...prev, createMessage("assistant", FALLBACK_ERROR)]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-80 flex-col rounded-2xl border border-border bg-paper shadow-xl shadow-black/30 sm:w-96">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <Bot size={18} className="text-accent" />
            <span className="font-heading text-sm font-medium text-ink">Ask about Sohaib</span>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={clsx(
                  "max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed",
                  m.role === "user"
                    ? "ml-auto bg-accent-soft text-paper"
                    : "bg-paper-dim text-ink-soft",
                )}
              >
                {m.content}
              </div>
            ))}
            {isLoading && (
              <div className="flex w-fit items-center gap-2 rounded-xl bg-paper-dim px-3 py-2 text-sm text-ink-soft">
                <LoaderCircle size={14} className="animate-spin" />
                Thinking…
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              aria-label="Ask a question"
              className="flex-1 rounded-full border border-border bg-paper px-4 py-2 text-sm text-ink outline-none focus:border-accent/40"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-paper transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-paper shadow-lg shadow-black/30 transition-transform duration-200 hover:-translate-y-1"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}
