import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Menu,
  X,
  Compass,
  Users,
  BookOpen,
  Star,
  Lock,
  CheckCircle,
  Infinity as InfinityIcon,
  Orbit,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'community', 'wisdom', 'cta'];
      let current = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#features', label: 'Path Mapping', id: 'features' },
    { href: '#community', label: 'Source Connection', id: 'community' },
    { href: '#wisdom', label: 'Expansion Lab', id: 'wisdom' },
  ];

  return (
    <nav className="bg-background/80 border-border/40 relative sticky top-0 z-50 flex w-full items-center justify-between border-b px-6 py-6 shadow-sm backdrop-blur-lg md:px-12">
      <a
        href="/"
        className="text-primary flex items-center gap-3 transition-opacity hover:opacity-80"
      >
        <Compass className="h-8 w-8 animate-spin-slow text-red-400" />
        <span className="font-heading text-foreground text-2xl font-bold">
          qSpirit Guide
        </span>
      </a>

      {/* Desktop Nav */}
      <div className="hidden items-center gap-8 font-medium md:flex">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            data-testid={`link-${link.id}`}
            className={`relative w-fit transition-colors ${
              activeSection === link.id
                ? 'text-primary font-bold'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="bg-primary absolute right-0 bottom-0 left-0 h-1 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.div>
          </a>
        ))}
        <a href="/join">
          <button
            data-testid="button-join-nav"
            className="font-heading bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-2 font-bold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Begin Your Leap
          </button>
        </a>
      </div>

      {/* Mobile Nav Toggle */}
      <button
        className="text-foreground bg-primary/10 hover:bg-primary/25 rounded-full p-2 transition-colors md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="button-menu-toggle"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Nav Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-card border-border/60 absolute top-full right-4 left-4 z-50 mt-2 flex w-[calc(100%-2rem)] flex-col gap-6 rounded-2xl border p-8 shadow-2xl md:hidden"
          >
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.id}
                href={link.href}
                onClick={() => setIsOpen(false)}
                data-testid={`link-${link.id}-mobile`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  delay: idx * 0.08,
                  duration: 0.25,
                  ease: 'easeOut',
                }}
                whileHover={{ x: 4 }}
                className={`w-fit text-center text-lg font-medium transition-colors duration-300 ${
                  activeSection === link.id
                    ? 'text-primary font-bold'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              className="border-border/40 border-t pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: navLinks.length * 0.08 + 0.1,
                duration: 0.25,
              }}
            >
              <a
                href="/join"
                className="block w-full"
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    data-testid="button-join-mobile"
                    className="font-heading bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-full py-4 font-medium shadow-lg transition-all hover:shadow-xl"
                  >
                    Begin Your Leap
                  </button>
                </motion.div>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] flex-col items-center overflow-hidden px-6 py-12 md:flex-row md:px-12 lg:px-24"
    >
      {/* Decorative Blobs */}
      <div className="bg-primary/10 absolute top-[-10%] left-[-10%] -z-10 h-[500px] w-[500px] rounded-full blur-3xl" />
      <div className="bg-accent/30 absolute right-[-5%] bottom-[10%] -z-10 h-[400px] w-[400px] rounded-full blur-3xl" />

      <div className="relative z-10 w-full space-y-8 md:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-hand text-primary mb-4 inline-block -rotate-2 text-2xl">
            Welcome back, traveler!
          </span>
          <h1 className="font-heading text-foreground mb-6 text-5xl leading-[1.1] font-bold md:text-7xl">
            Navigate the{' '}
            <span className="text-primary relative inline-block">
              Multiverse
              <svg
                className="text-accent absolute -bottom-1 left-0 -z-10 h-3 w-full"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                />
              </svg>
            </span>{' '}
            <br />
            expand your essence!
          </h1>
          <p className="text-muted-foreground max-w-md text-lg leading-relaxed md:text-xl">
            The gateway to crossing paths, entanglement alignment, and understanding your unique trajectory in the cosmic web.
          </p>

          {/* Trust Badges */}
          <motion.div
            className="flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              { icon: Orbit, label: 'Infinite Paths', color: 'text-indigo-600' },
              { icon: Lock, label: 'Secure Session', color: 'text-green-600' },
              {
                icon: CheckCircle,
                label: 'Entanglement-Verified',
                color: 'text-purple-600',
              },
              { icon: Heart, label: 'Source-Connected', color: 'text-red-600' },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="bg-secondary/30 border-border/40 flex items-center justify-center gap-2 rounded-full border px-3 py-2"
              >
                <badge.icon
                  className={`h-4 w-4 flex-shrink-0 ${badge.color}`}
                />
                <span className="text-foreground text-xs font-semibold">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="relative mt-12 w-full md:mt-0 md:w-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10"
        >
          <img
            src="/images/w6fBE5m6WYpbmECpuglt--1--kehj7.jpg"
            alt="Person standing on a peak looking at a cosmic sphere"
            className="h-auto w-full transform rounded-[3rem] shadow-2xl transition-transform duration-700 hover:rotate-0 md:rotate-3"
          />

          {/* Floating Cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="bg-card absolute -bottom-8 -left-4 flex max-w-[200px] items-center gap-3 rounded-2xl p-4 shadow-lg md:left-10"
          >
            <div className="rounded-full bg-indigo-100 p-2 text-indigo-600">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-sm font-bold">99% Entangled</p>
              <p className="text-muted-foreground text-xs">Real-time sync</p>
            </div>
          </motion.div>

          {/* Second Badge */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="bg-card absolute -top-4 -right-4 flex max-w-[200px] items-center gap-3 rounded-2xl p-4 shadow-lg md:-right-8"
          >
            <div className="rounded-full bg-purple-100 p-2 text-purple-600">
              <Users size={20} />
            </div>
            <div>
              <p className="text-sm font-bold">500K+ Explorers</p>
              <p className="text-muted-foreground text-xs">Vast web network</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({
  title,
  desc,
  img,
  delay,
  testId,
}: {
  title: string;
  desc: string;
  img: string;
  delay: number;
  testId: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -10 }}
    data-testid={testId}
  >
    <div className="bg-card h-full overflow-hidden rounded-[2rem] border-none shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <div className="flex h-full flex-col p-0">
        <div className="bg-secondary/30 relative flex h-56 items-center justify-center overflow-hidden">
          <motion.img
            src={img}
            alt={title}
            className="absolute h-full w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="flex flex-1 flex-col items-center p-8 text-center">
          <h3 className="font-heading text-foreground mb-3 text-2xl font-bold">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Features = () => {
  return (
    <section
      id="features"
      className="relative bg-white/50 px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <span className="font-hand text-primary text-xl">
            Pillars of Navigation
          </span>
          <h2 className="font-heading text-foreground text-4xl font-bold md:text-5xl">
            How You Align
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FeatureCard
            title="Quantum Entanglement"
            desc="Realize the eternal connection between your consciousness and the cosmic source, anchoring your presence in any reality."
            img="/images/NL8zWQFTQVTHFOOt8eXa--1--e7nx1.jpg"
            delay={0.1}
            testId="card-feature-entanglement"
          />
          <FeatureCard
            title="Multiverse Navigation"
            desc="Chart your choices across infinite paths of existence, mapping out the trajectories that best serve your evolutionary path."
            img="/images/ZwneXb9zz4enzOrls4Oe--0--TbJ-B.jpg"
            delay={0.2}
            testId="card-feature-navigation"
          />
          <FeatureCard
            title="Consciousness Expansion"
            desc="Connect with high-frequency teachings and spirit guides to navigate your daily life transformations with ease and clarity."
            img="/images/XgvaNt4mLyNZ5hKcAKa9--0--IRX1A.jpg"
            delay={0.3}
            testId="card-feature-expansion"
          />
        </div>
      </div>
    </section>
  );
};

const Community = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Meditation Teacher',
      quote:
        'qSpirit Guide completely transformed how I view choice and decision-making. I feel deeply aligned with my true trajectory.',
      initials: 'SC',
      bgColor: 'bg-red-100 text-red-600',
    },
    {
      name: 'Marcus Johnson',
      role: 'Wellness Coach',
      quote:
        'The quantum navigation tools here resonate deeply. The maps and daily principles helped me anchor my daily consciousness.',
      initials: 'MJ',
      bgColor: 'bg-indigo-100 text-indigo-600',
    },
    {
      name: 'Elena Rodriguez',
      role: 'Creative Director',
      quote:
        "I've never felt more connected to my choices. The community here truly understands the expansion of human consciousness.",
      initials: 'ER',
      bgColor: 'bg-emerald-100 text-emerald-600',
    },
  ];

  return (
    <section id="community" className="relative px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <span className="font-hand text-primary text-xl">
            Traverse together
          </span>
          <h2 className="font-heading text-foreground text-4xl font-bold md:text-5xl">
            Source Connection Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((person, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="bg-card h-full rounded-[2rem] border-none shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <div className="flex h-full flex-col p-8">
                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full font-heading text-lg font-bold ${person.bgColor}`}
                    >
                      {person.initials}
                    </div>
                    <div>
                      <p className="font-heading text-foreground font-bold">
                        {person.name}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {person.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground flex-1 leading-relaxed italic">
                    "{person.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const QuoteSection = () => {
  return (
    <section
      id="wisdom"
      className="bg-secondary/20 flex items-center justify-center px-6 py-24 text-center"
    >
      <motion.div
        className="relative max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3
          data-testid="text-quote"
          className="font-hand text-foreground/80 text-3xl leading-relaxed md:text-5xl"
        >
          We are not human beings having a spiritual experience. We are spiritual beings having a human experience, navigating infinite quantum realities.
        </h3>

        <div className="font-heading text-primary mt-8 font-bold">
          — Pierre Teilhard de Chardin
        </div>
      </motion.div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="from-secondary/5 via-background to-primary/5 border-border/40 relative border-t bg-gradient-to-br px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
          {/* Left Column: Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-3"
          >
            <div className="flex items-center gap-3">
              <Compass className="text-primary h-7 w-7" />
              <h3 className="font-heading text-foreground text-lg font-bold">
                qSpirit Guide
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Navigate the Multiverse. Expand your Essence. Realize your entanglement and align with your highest path.
            </p>
          </motion.div>

          {/* Center Column: Links by Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Learn */}
            <div className="space-y-3">
              <div className="text-primary flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span className="font-heading text-sm font-bold">Learn</span>
              </div>
              <div className="flex flex-col gap-2 pl-7">
                <a
                  href="/guide"
                  data-testid="link-footer-guide"
                  className="text-muted-foreground hover:text-primary w-fit text-sm transition-colors"
                >
                  Core Principles
                </a>
                <a
                  href="/faq"
                  data-testid="link-footer-faq"
                  className="text-muted-foreground hover:text-primary w-fit text-sm transition-colors"
                >
                  FAQ
                </a>
              </div>
            </div>

            {/* Community */}
            <div className="space-y-3">
              <div className="text-primary flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="font-heading text-sm font-bold">
                  Network
                </span>
              </div>
              <div className="flex flex-col gap-2 pl-7">
                <a
                  href="/contact"
                  data-testid="link-footer-contact"
                  className="text-muted-foreground hover:text-primary w-fit text-sm transition-colors"
                >
                  Connection Portal
                </a>
                <a
                  href="/about"
                  data-testid="link-footer-about-community"
                  className="text-muted-foreground hover:text-primary w-fit text-sm transition-colors"
                >
                  About Our Vision
                </a>
              </div>
            </div>

            {/* Legal */}
            <div className="space-y-3">
              <div className="text-primary flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <span className="font-heading text-sm font-bold">Privacy</span>
              </div>
              <div className="flex flex-col gap-2 pl-7">
                <a
                  href="/privacy"
                  data-testid="link-footer-privacy"
                  className="text-muted-foreground hover:text-primary w-fit text-sm transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-2">
              <h4 className="font-heading text-foreground font-bold">
                Join the Network
              </h4>
              <p className="text-muted-foreground text-sm">
                Connect with thousands of travellers on their alignment journey.
              </p>
            </div>
            <a href="/join" className="w-full">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="button-footer-cta"
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-full px-6 py-3 font-bold shadow-lg transition-all hover:shadow-xl"
              >
                Begin Your Leap
              </motion.button>
            </a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-border/40 my-8 border-t" />

        {/* Bottom: Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground/60 flex flex-col items-center justify-between gap-4 text-center text-xs md:flex-row"
        >
          <p>
            &copy; {new Date().getFullYear()} qSpirit Guide. All rights
            reserved.
          </p>
          <p className="flex items-center justify-center gap-1">
            Traversing the cosmic web <Heart className="h-3 w-3 text-red-400" /> in alignment
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="bg-background selection:bg-primary/20 selection:text-primary-foreground min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Community />
      <QuoteSection />
      <section id="cta" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 space-y-4 text-center"
          >
            <h2 className="font-heading text-foreground text-4xl font-bold md:text-5xl">
              Ready to find your alignment?
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Choose your portal and start your navigation journey today.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                id: 'cta-start-app',
                title: 'Start Navigating',
                description:
                  'Access the multiverse portal. Track your path choices and check your alignment coefficients.',
                href: '/app',
                testId: 'button-cta-app',
                icon: <Compass className="text-primary h-8 w-8 animate-spin-slow" />,
              },
              {
                id: 'cta-guide',
                title: 'Core Principles',
                description:
                  'Learn the fundamentals of quantum alignment. A structured guide to traversing existence paths.',
                href: '/guide',
                testId: 'button-cta-guide',
                icon: <BookOpen className="text-primary h-8 w-8" />,
              },
              {
                id: 'cta-explore',
                title: 'Explore More',
                description:
                  'Discover path alignment metrics, high-frequency focus exercises, and daily guidance.',
                href: '/explore',
                testId: 'button-cta-explore',
                icon: <Sparkles className="text-primary h-8 w-8 animate-pulse" />,
              },
            ].map((cta, idx) => (
              <motion.div
                key={cta.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="bg-card flex h-full flex-col items-center gap-4 rounded-[2rem] p-8 text-center shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="bg-primary/15 flex h-16 w-16 items-center justify-center rounded-full">
                  {cta.icon}
                </div>
                <h3 className="font-heading text-foreground text-2xl font-bold">
                  {cta.title}
                </h3>
                <p className="text-muted-foreground flex-1">
                  {cta.description}
                </p>
                <a href={cta.href}>
                  <button
                    data-testid={cta.testId}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer rounded-full px-6 py-2 text-sm font-bold shadow-md transition-colors"
                  >
                    Open Portal
                  </button>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
