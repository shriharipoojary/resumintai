'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const features = [
  {
    icon: '🤖',
    title: 'AI-Powered Writing',
    description: 'Transform plain English into professional, ATS-optimized bullet points with one click.',
  },
  {
    icon: '🎨',
    title: '5+ Premium Templates',
    description: 'Choose from Minimal, Corporate, Creative, Tech, and Executive designs.',
  },
  {
    icon: '📊',
    title: 'ATS Score Checker',
    description: 'Real-time scoring ensures your resume passes Applicant Tracking Systems.',
  },
  {
    icon: '🌐',
    title: 'Portfolio Generator',
    description: 'Automatically create a stunning portfolio website from your resume data.',
  },
  {
    icon: '📄',
    title: 'PDF Export',
    description: 'Download pixel-perfect PDFs that maintain formatting across all devices.',
  },
  {
    icon: '⚡',
    title: 'Live Preview',
    description: 'See changes in real-time with split-screen editing and instant preview.',
  },
];

const templates = [
  { name: 'Minimal', color: 'from-slate-500 to-slate-700', tag: 'Popular' },
  { name: 'Corporate', color: 'from-blue-500 to-blue-700', tag: 'Professional' },
  { name: 'Creative', color: 'from-pink-500 to-purple-600', tag: 'Trending' },
  { name: 'Tech', color: 'from-emerald-500 to-teal-600', tag: 'Developer' },
  { name: 'Executive', color: 'from-amber-500 to-orange-600', tag: 'Premium' },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    avatar: 'SC',
    content: 'Resumint AI helped me land interviews at 5 FAANG companies. The AI suggestions were incredibly accurate and improved my bullet points dramatically.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Product Manager at Stripe',
    avatar: 'MJ',
    content: 'The portfolio generator is a game-changer. I had a professional website in minutes, not days. My hiring manager actually complimented it during the interview!',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'UX Designer at Apple',
    avatar: 'PP',
    content: 'Finally a resume builder that understands design. The Creative template is stunning and the AI helped me express my work experience brilliantly.',
    rating: 5,
  },
];

const pricing = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    features: ['1 Resume', '2 Basic Templates', 'PDF Export', 'Basic AI Suggestions'],
    highlighted: false,
    cta: 'Get Started Free',
  },
  {
    name: 'Pro',
    price: 12,
    period: '/month',
    features: [
      'Unlimited Resumes',
      'All 5+ Templates',
      'Advanced AI Enhancement',
      'Portfolio Generator',
      'ATS Score Checker',
      'Priority Support',
    ],
    highlighted: true,
    cta: 'Start Pro Trial',
  },
  {
    name: 'Enterprise',
    price: 29,
    period: '/month',
    features: [
      'Everything in Pro',
      'Team Collaboration',
      'Custom Branding',
      'API Access',
      'Dedicated Manager',
      'SLA Guarantee',
    ],
    highlighted: false,
    cta: 'Contact Sales',
  },
];

const stats = [
  { value: '50K+', label: 'Resumes Created' },
  { value: '93%', label: 'Interview Rate' },
  { value: '4.9⭐', label: 'User Rating' },
  { value: '15sec', label: 'Avg. AI Enhancement' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 hero-bg overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-pink-500/8 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 px-4 py-1.5 text-sm">
                ✨ AI-Powered Resume Builder
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight"
            >
              Build Your{' '}
              <span className="gradient-text">Dream Resume</span>
              <br />
              in Minutes
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Transform your career story into an ATS-optimized, beautifully designed resume and portfolio — powered by AI that understands your industry.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/builder">
                <Button variant="gradient" size="lg" className="text-base px-10">
                  Build Your Resume — Free
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg" className="text-base">
                  See How It Works
                </Button>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-border">
              <div className="bg-card p-4 border-b border-border flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-lg bg-muted text-xs text-muted-foreground">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    resumint-ai.app/builder
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-8 sm:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Mock form side */}
                  <div className="space-y-4">
                    <div className="h-8 bg-card rounded-lg w-3/4 shadow-sm" />
                    <div className="space-y-3">
                      <div className="h-10 bg-card rounded-xl shadow-sm border border-border" />
                      <div className="h-10 bg-card rounded-xl shadow-sm border border-border" />
                      <div className="h-24 bg-card rounded-xl shadow-sm border border-border" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 w-20 rounded-lg bg-indigo-500/20" />
                      <div className="h-8 w-16 rounded-lg bg-purple-500/20" />
                      <div className="h-8 w-24 rounded-lg bg-pink-500/20" />
                    </div>
                    <div className="h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg" />
                  </div>
                  {/* Mock preview side */}
                  <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                    <div className="text-center space-y-2">
                      <div className="h-5 bg-slate-800 rounded w-1/2 mx-auto" />
                      <div className="h-3 bg-slate-400 rounded w-1/3 mx-auto" />
                    </div>
                    <div className="h-px bg-slate-200" />
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-600 rounded w-1/4" />
                      <div className="h-2 bg-slate-200 rounded w-full" />
                      <div className="h-2 bg-slate-200 rounded w-5/6" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-600 rounded w-1/3" />
                      <div className="h-2 bg-slate-200 rounded w-full" />
                      <div className="h-2 bg-slate-200 rounded w-3/4" />
                      <div className="h-2 bg-slate-200 rounded w-5/6" />
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      <div className="h-5 w-14 bg-indigo-100 rounded" />
                      <div className="h-5 w-12 bg-indigo-100 rounded" />
                      <div className="h-5 w-16 bg-indigo-100 rounded" />
                      <div className="h-5 w-10 bg-indigo-100 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4">Features</Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold">
              Everything You Need to{' '}
              <span className="gradient-text">Stand Out</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From AI-powered content to pixel-perfect exports, we have every tool to make your application shine.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card hover className="h-full">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 sm:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4">Templates</Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold">
              5 Stunning{' '}
              <span className="gradient-text">Professional Templates</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-lg text-muted-foreground">
              Each template is ATS-optimized and designed by industry experts.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {templates.map((template) => (
              <motion.div key={template.name} variants={fadeInUp}>
                <Link href={`/builder?template=${template.name.toLowerCase()}`}>
                  <div className="group relative rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300">
                    <div className={`aspect-[3/4] bg-gradient-to-br ${template.color} p-4 flex flex-col justify-between`}>
                      <Badge className="self-start bg-white/20 text-white border-white/30 text-xs">
                        {template.tag}
                      </Badge>
                      <div className="space-y-2">
                        <div className="h-2 bg-white/40 rounded w-3/4" />
                        <div className="h-1.5 bg-white/25 rounded w-1/2" />
                        <div className="h-px bg-white/20 my-2" />
                        <div className="h-1.5 bg-white/20 rounded w-full" />
                        <div className="h-1.5 bg-white/20 rounded w-5/6" />
                        <div className="h-1.5 bg-white/20 rounded w-2/3" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                        Use Template →
                      </span>
                    </div>
                  </div>
                  <p className="text-center text-sm font-medium mt-3 text-foreground">{template.name}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link href="/builder">
              <Button variant="gradient" size="lg">
                Try All Templates Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4">How It Works</Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold">
              Resume to Job Offer in{' '}
              <span className="gradient-text">3 Simple Steps</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                step: '01',
                title: 'Tell Us About You',
                description: 'Fill in your details using plain English. No need for fancy language — just be yourself.',
                icon: '✍️',
              },
              {
                step: '02',
                title: 'AI Enhances Everything',
                description: 'Our AI transforms your input into professional, ATS-optimized content with strong action verbs.',
                icon: '🪄',
              },
              {
                step: '03',
                title: 'Download & Apply',
                description: 'Pick a template, preview your resume, download as PDF, and generate your portfolio site.',
                icon: '🚀',
              },
            ].map((item, i) => (
              <motion.div key={item.step} variants={fadeInUp}>
                <div className="relative text-center">
                  {i < 2 && (
                    <div className="hidden md:block absolute top-12 left-[60%] right-0 h-px bg-gradient-to-r from-primary/30 to-transparent" />
                  )}
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent text-3xl mb-6">
                    {item.icon}
                  </div>
                  <div className="text-xs font-bold text-primary mb-2">STEP {item.step}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 sm:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4">Testimonials</Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold">
              Loved by{' '}
              <span className="gradient-text">50,000+ Professionals</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeInUp}>
                <Card hover className="h-full">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-amber-400 text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4">Pricing</Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold">
              Simple, Transparent{' '}
              <span className="gradient-text">Pricing</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-lg text-muted-foreground">
              Start free, upgrade when you need more power.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {pricing.map((plan) => (
              <motion.div key={plan.name} variants={fadeInUp}>
                <Card
                  className={`relative h-full ${
                    plan.highlighted
                      ? 'border-primary shadow-xl shadow-primary/10 scale-105'
                      : ''
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 px-4">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">
                        ${plan.price}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {plan.period}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/builder">
                    <Button
                      variant={plan.highlighted ? 'gradient' : 'outline'}
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
            <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center text-white">
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Land Your Dream Job?
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                Join 50,000+ professionals who built winning resumes with Resumint AI. Start building yours today — it&apos;s free.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link href="/builder">
                  <Button
                    size="lg"
                    className="bg-white text-indigo-600 hover:bg-white/90 shadow-xl text-base px-10"
                  >
                    Start Building — Free
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
