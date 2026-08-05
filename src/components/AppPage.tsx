import { motion } from 'framer-motion';
import { Sparkles, Cpu, ShieldCheck, Sliders, MessageSquare } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

export default function AppPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Navigation currentPath="/app" />

      <main className="flex-1 px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl space-y-12">
          {/* Header Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 text-center"
          >
            <div className="bg-primary/10 text-primary border-primary/20 mx-auto inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              100% Local & Off-Grid (Browser Engine)
            </div>
            <h1 className="font-heading text-4xl font-bold md:text-6xl">
              The Alignment Portal
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
              Your private space for browser-based AI path mapping. Configure your guide&apos;s archetype, tune its tone, and hold introspective dialogues without leaving your machine.
            </p>
          </motion.div>

          {/* Interactive Stub Preview Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border-border/60 relative overflow-hidden rounded-[2.5rem] border p-8 shadow-2xl md:p-12"
          >
            <div className="bg-primary/10 absolute -top-24 -right-24 -z-10 h-72 w-72 rounded-full blur-3xl" />
            <div className="bg-accent/20 absolute -bottom-24 -left-24 -z-10 h-72 w-72 rounded-full blur-3xl" />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="bg-background/60 border-border/40 flex flex-col items-start gap-4 rounded-2xl border p-6">
                <div className="bg-primary/15 text-primary rounded-xl p-3">
                  <Sliders className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold">1. Archetype Tuning</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Select symbolic elements to calibrate system parameters and fine-tune your guide&apos;s reflective persona.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-background/60 border-border/40 flex flex-col items-start gap-4 rounded-2xl border p-6">
                <div className="bg-primary/15 text-primary rounded-xl p-3">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold">2. Local WebGPU LLM</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The model loads asynchronously into browser WebGPU memory via transformers.js. Zero server API keys required.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-background/60 border-border/40 flex flex-col items-start gap-4 rounded-2xl border p-6">
                <div className="bg-primary/15 text-primary rounded-xl p-3">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold">3. Private Dialogue</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Chat freely about life, career transitions, and choices with complete privacy. Logs remain in your local storage.
                </p>
              </div>
            </div>

            {/* Launch Status Box */}
            <div className="border-border/60 bg-secondary/30 mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl border p-6 md:flex-row">
              <div className="flex items-center gap-4 text-left">
                <div className="bg-primary/20 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                  <Sparkles className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold">
                    App Portal Integration in Progress
                  </h4>
                  <p className="text-muted-foreground text-xs">
                    The browser LLM runtime interface is currently being assembled.
                  </p>
                </div>
              </div>
              <button
                disabled
                className="bg-primary/40 text-primary-foreground/70 cursor-not-allowed rounded-full px-6 py-2.5 text-sm font-bold shadow"
              >
                Initializing Engine...
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
