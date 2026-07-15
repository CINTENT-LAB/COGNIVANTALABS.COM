import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MessageSquareCode, FileSearch, X, Sparkles, Send, Mic, MicOff } from "lucide-react";

const ASKCOGNI_URL = "https://cognivantalabs.com/askcogni/index.html";

// Capability tags as described on the real AskCOGNI surface.
const capabilities = [
  "Reasoning Loop",
  "Knowledge Graph",
  "Visitor Intelligence",
  "Simulation Layers",
  "Voice Input",
];

type SpeechResultEvent = {
  results?: ArrayLike<ArrayLike<{ transcript: string }>>;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort?: () => void;
};

type SpeechRecognitionWindow = Window & {
  SpeechRecognition?: new () => SpeechRecognitionLike;
  webkitSpeechRecognition?: new () => SpeechRecognitionLike;
};

/**
 * Thin wrapper around the browser's native Web Speech API (SpeechRecognition).
 * No backend involved — this runs entirely client-side wherever the browser
 * supports it (Chrome, Edge, Safari; not Firefox as of this writing).
 */
function useVoiceInput(onResult: (text: string) => void) {
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const speechWindow = window as SpeechRecognitionWindow;
    const SpeechRecognition =
      speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    setSupported(true);
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";
    recognition.onresult = (e) => {
      const transcript = e.results?.[0]?.[0]?.transcript ?? "";
      if (transcript) onResult(transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    return () => recognition.abort?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  return { listening, supported, toggle };
}

/**
 * Persistent, site-wide launcher for the two live AI entry points —
 * AskCOGNI (interactive playground) and COGNI Doc (document intelligence).
 * Rendered once in __root.tsx so it's reachable from every page.
 *
 * The panel mirrors the look of the real COGNI assistant on cognivantalabs.com,
 * but doesn't run a local model — typing a message and hitting Send hands off
 * to the real playground (new tab), since there's no chat backend in this
 * static site to answer in-panel.
 */
export function CogniLauncher() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const {
    listening,
    supported: voiceSupported,
    toggle: toggleVoice,
  } = useVoiceInput((text) => setMessage((prev) => (prev ? `${prev} ${text}` : text)));

  const handleSend = () => {
    const trimmed = message.trim();
    const url = trimmed ? `${ASKCOGNI_URL}?q=${encodeURIComponent(trimmed)}` : ASKCOGNI_URL;
    window.open(url, "_blank", "noreferrer noopener");
    setMessage("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="glass w-80 overflow-hidden rounded-2xl shadow-[var(--shadow-glow-electric)]">
          <div className="flex items-start gap-3 border-b border-white/10 p-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-white/95">
              <img src="/logos/cintent-icon.png" alt="" className="h-6 w-6 object-contain" />
            </span>
            <div>
              <div className="font-display text-sm font-bold">Ask COGNI</div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                Knowledge interaction for cognitive systems
              </div>
            </div>
          </div>

          <div className="max-h-56 overflow-y-auto p-3">
            <div className="rounded-xl rounded-tl-sm bg-white/5 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
              Ask COGNI isn't a chatbot — it's a cognitive knowledge interaction system for
              navigating CINTENT architecture, research, and pilot platforms. Ask a question and
              I'll hand you off to the full reasoning surface for a live, structured answer.
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {capabilities.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-wide text-electric-soft"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1 border-t border-white/10 p-2">
            <a
              href={ASKCOGNI_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/5"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--gradient-electric)]">
                <MessageSquareCode className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold">AskCOGNI</span>
                <span className="block text-xs text-muted-foreground">
                  Open the reasoning playground
                </span>
              </span>
            </a>
            <Link
              to="/products"
              hash="cogni-doc"
              className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--gradient-gold)]">
                <FileSearch className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold">COGNI Doc</span>
                <span className="block text-xs text-muted-foreground">
                  Document intelligence (in draft)
                </span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 border-t border-white/10 p-3">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={listening ? "Listening…" : "Type or speak your question…"}
              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs outline-none placeholder:text-muted-foreground focus:border-electric/40"
            />
            {voiceSupported && (
              <button
                onClick={toggleVoice}
                aria-label={listening ? "Stop voice input" : "Ask by voice"}
                title={listening ? "Stop voice input" : "Ask by voice"}
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-colors ${
                  listening
                    ? "border-electric/50 bg-[color-mix(in_oklab,var(--electric)_20%,transparent)] text-electric-soft animate-pulse-glow"
                    : "border-white/10 bg-white/5 text-muted-foreground hover:text-electric-soft hover:border-electric/40"
                }`}
              >
                {listening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
              </button>
            )}
            <button
              onClick={handleSend}
              aria-label="Send to AskCOGNI"
              className="btn-electric grid h-8 w-8 shrink-0 place-items-center rounded-lg"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close COGNI assistant" : "Ask COGNI"}
        aria-expanded={open}
        className="group inline-flex items-center gap-2 rounded-full bg-[var(--gradient-electric)] py-3 pl-4 pr-5 shadow-[var(--shadow-glow-electric)] transition-transform hover:scale-105"
      >
        {open ? <X className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
        <span className="text-sm font-semibold">{open ? "Close" : "Ask COGNI"}</span>
      </button>
    </div>
  );
}
