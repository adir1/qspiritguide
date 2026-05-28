import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Compass } from 'lucide-react';

export default function About() {
  return (
    <div className="from-primary/5 via-background to-secondary/5 min-h-screen bg-gradient-to-br p-6">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <a href="/">
            <button
              data-testid="button-back-about"
              className="hover:bg-secondary/20 mb-4 rounded-full p-2 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
        >
          <div className="space-y-4 text-center">
            <Compass className="text-primary mx-auto h-12 w-12 animate-spin-slow" />
            <h1 className="font-heading text-foreground text-4xl font-bold md:text-5xl">
              About qSpirit Guide
            </h1>
          </div>

          <div className="bg-card rounded-[2rem] border-none shadow-lg">
            <div className="space-y-6 p-8 md:p-12">
              <div className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-bold">
                  Our Mission
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  At qSpirit Guide, we believe that understanding quantum entanglement and consciousness is the ultimate path to personal alignment. Our mission is to provide the navigational tools and high-frequency teachings necessary to traverse the infinite paths of the multiverse—assuring you that you are eternally connected to Source.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-bold">
                  Why Quantum Navigation?
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Every decision you make represents a branching choice in the multiverse. By aligning your daily thoughts and energy, you choose which realities you entangle with. qSpirit Guide helps you approach life as a deliberate navigator, utilizing science-backed mindfulness and spiritual clarity to take conscious leaps in evolution.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-bold">
                  About Our Name
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  The <span className="text-primary font-semibold">"q"</span> stands for Quantum—representing the infinite superposition of possibilities, choices, and connection. <span className="text-foreground font-semibold">"Spirit"</span> is the core observer or consciousness that navigates this expanse. Together as the <span className="text-foreground font-semibold">"Guide"</span>, we provide a cosmic compass to help you align your essence with your desired paths.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-bold">
                  What We Offer
                </h2>
                <ul className="space-y-3">
                  {[
                    'Interactive multiverse alignment trackers and decision portals',
                    'Mindfulness guidelines based on quantum focus pillars',
                    'Daily alignment logs, insights, and high-frequency guidance',
                    'A supportive community of conscious multiverse travelers',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Heart className="text-primary mt-1 h-5 w-5 flex-shrink-0 fill-current" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-border/40 border-t pt-4">
                <p className="text-muted-foreground text-center italic">
                  Navigate your multiverse. One conscious choice, one alignment at a time. 🌌✨
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a href="/">
              <button
                data-testid="button-back-home-about"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-2 font-bold"
              >
                Back to The Gateway
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
