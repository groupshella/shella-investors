/**
 * About Section - Split storytelling layout with geometric network visual,
 * feature pills, and section watermark.
 * @module components/sections/About
 */

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Shield, TrendingUp } from "lucide-react";

const features = [
    { icon: Target, text: "نموذج تجاري مبتكر" },
    { icon: Shield, text: "حماية تأمينية كاملة" },
    { icon: TrendingUp, text: "عوائد مجزية ومستدامة" },
];

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="section-padding relative overflow-hidden bg-dark">
            {/* Section watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-foreground/5 select-none pointer-events-none hidden sm:block">
                01
            </div>

            <div className="container-custom" ref={ref}>
                <motion.div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Visual - Geometric Network */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="relative h-80 lg:h-[500px] flex items-center justify-center order-2 lg:order-1"
                    >
                        <svg viewBox="0 0 400 400" className="w-full h-full max-w-md">
                            {/* Network nodes and connections */}
                            <defs>
                                <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#007a3d" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#c9972b" stopOpacity="0.8" />
                                </linearGradient>
                            </defs>

                            {/* Connection lines */}
                            <g stroke="url(#nodeGrad)" strokeWidth="1" opacity="0.3">
                                <line x1="200" y1="80" x2="120" y2="160" />
                                <line x1="200" y1="80" x2="280" y2="160" />
                                <line x1="200" y1="80" x2="200" y2="240" />
                                <line x1="120" y1="160" x2="200" y2="240" />
                                <line x1="280" y1="160" x2="200" y2="240" />
                                <line x1="120" y1="160" x2="280" y2="160" />
                                <line x1="200" y1="240" x2="120" y2="320" />
                                <line x1="200" y1="240" x2="280" y2="320" />
                                <line x1="120" y1="320" x2="280" y2="320" />
                            </g>

                            {/* Nodes */}
                            <circle cx="200" cy="80" r="12" fill="url(#nodeGrad)" className="animate-pulse" />
                            <circle cx="120" cy="160" r="8" fill="#007a3d" opacity="0.8" />
                            <circle cx="280" cy="160" r="8" fill="#c9972b" opacity="0.8" />
                            <circle cx="200" cy="240" r="16" fill="url(#nodeGrad)" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
                            <circle cx="120" cy="320" r="8" fill="#007a3d" opacity="0.6" />
                            <circle cx="280" cy="320" r="8" fill="#c9972b" opacity="0.6" />

                            {/* Animated pulse rings */}
                            <circle cx="200" cy="240" r="24" stroke="url(#nodeGrad)" strokeWidth="1" fill="none" opacity="0.4">
                                <animate attributeName="r" from="20" to="40" dur="2s" repeatCount="indefinite" />
                                <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                            </circle>
                        </svg>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="order-1 lg:order-2"
                    >
                        <span className="section-eyebrow">من نحن</span>
                        <h2 className="section-title">
                            منصة تجارية{" "}
                            <span className="text-gradient">مبتكرة وموثوقة</span>
                        </h2>
                        <p className="text-muted text-lg leading-relaxed mb-8">
                            شِلّة ليست مجرد تطبيق توصيل، بل منصة تجارية مبتكرة صُمّمت لتمكينك
                            من دخول عالم التجارة الحقيقية بثقة وأمان. نؤمن بقوة الاقتصاد التشاركي
                            ونسعى لخلق فرص تجارية فريدة تتيح لك تملّك بضاعة حقيقية في قطاع
                            المواد الغذائية والاستهلاكية.
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary/5 border border-dark-200/30 hover:border-gold/30 transition-colors"
                                >
                                    <feature.icon className="w-5 h-5 text-gold" />
                                    <span className="text-foreground text-sm font-medium">{feature.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}