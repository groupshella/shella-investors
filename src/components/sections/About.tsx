"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Shield, TrendingUp, Award } from "lucide-react";

const features = [
    { icon: Target, text: "نموذج تجاري مبتكر", color: "bg-primary/10 text-primary" },
    { icon: Shield, text: "حماية تأمينية كاملة", color: "bg-teal/10 text-teal" },
    { icon: TrendingUp, text: "عوائد مجزية ومستدامة", color: "bg-gold/10 text-gold" },
    { icon: Award, text: "منصة موثّقة وموثوقة", color: "bg-primary/10 text-primary" },
];

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="about" className="section-padding bg-white relative overflow-hidden">
            {/* Watermark number */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[16rem] font-black text-primary/4 select-none pointer-events-none hidden sm:block leading-none">
                01
            </div>

            <div className="container-custom" ref={ref}>
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.65 }}
                        className="relative h-72 lg:h-[480px] flex items-center justify-center order-2 lg:order-1"
                    >
                        {/* Background blob */}
                        <div className="absolute inset-8 rounded-3xl bg-gradient-to-br from-primary/8 via-teal/5 to-gold/8" />

                        <svg viewBox="0 0 400 400" className="w-full h-full max-w-sm relative z-10">
                            <defs>
                                <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00b060" stopOpacity="0.9" />
                                    <stop offset="100%" stopColor="#00b8a0" stopOpacity="0.9" />
                                </linearGradient>
                                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#e8a020" stopOpacity="0.9" />
                                    <stop offset="100%" stopColor="#ffbe40" stopOpacity="0.7" />
                                </linearGradient>
                                <filter id="shadow">
                                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#00b060" floodOpacity="0.3" />
                                </filter>
                            </defs>

                            {/* Connection lines */}
                            <g stroke="#00b060" strokeWidth="1.5" opacity="0.2" strokeDasharray="4,4">
                                <line x1="200" y1="80" x2="120" y2="170" />
                                <line x1="200" y1="80" x2="280" y2="170" />
                                <line x1="200" y1="80" x2="200" y2="240" />
                                <line x1="120" y1="170" x2="200" y2="240" />
                                <line x1="280" y1="170" x2="200" y2="240" />
                                <line x1="120" y1="170" x2="280" y2="170" />
                                <line x1="200" y1="240" x2="120" y2="325" />
                                <line x1="200" y1="240" x2="280" y2="325" />
                            </g>

                            {/* Center main node */}
                            <circle cx="200" cy="240" r="28" fill="url(#nodeGrad)" filter="url(#shadow)" />
                            <circle cx="200" cy="240" r="18" fill="white" opacity="0.3" />

                            {/* Top node */}
                            <circle cx="200" cy="80" r="18" fill="url(#nodeGrad)" filter="url(#shadow)" />
                            <circle cx="200" cy="80" r="11" fill="white" opacity="0.4" />

                            {/* Mid nodes */}
                            <circle cx="120" cy="170" r="12" fill="url(#goldGrad)" />
                            <circle cx="280" cy="170" r="12" fill="#00b8a0" opacity="0.9" />

                            {/* Bottom nodes */}
                            <circle cx="120" cy="325" r="9" fill="url(#nodeGrad)" opacity="0.7" />
                            <circle cx="280" cy="325" r="9" fill="url(#goldGrad)" opacity="0.7" />

                            {/* Pulse rings */}
                            <circle cx="200" cy="240" r="36" stroke="#00b060" strokeWidth="1.5" fill="none" opacity="0.3">
                                <animate attributeName="r" from="28" to="52" dur="2.5s" repeatCount="indefinite" />
                                <animate attributeName="opacity" from="0.5" to="0" dur="2.5s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="200" cy="80" r="24" stroke="#00b060" strokeWidth="1" fill="none" opacity="0.2">
                                <animate attributeName="r" from="18" to="34" dur="2s" repeatCount="indefinite" begin="0.5s" />
                                <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" begin="0.5s" />
                            </circle>
                        </svg>
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.65, delay: 0.15 }}
                        className="order-1 lg:order-2"
                    >
                        <span className="section-eyebrow">من نحن</span>
                        <h2 className="section-title">
                            منصة تجارية{" "}
                            <span className="text-gradient">مبتكرة وموثوقة</span>
                        </h2>
                        <p className="text-muted text-base md:text-lg leading-relaxed mb-8">
                            شِلّة ليست مجرد تطبيق توصيل، بل منصة تجارية مبتكرة صُمّمت لتمكينك
                            من دخول عالم التجارة الحقيقية بثقة وأمان. نؤمن بقوة الاقتصاد التشاركي
                            ونسعى لخلق فرص تجارية فريدة تتيح لك تملّك بضاعة حقيقية في قطاع
                            المواد الغذائية والاستهلاكية.
                        </p>

                        {/* Feature pills */}
                        <div className="flex flex-wrap gap-3">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.35 + index * 0.08 }}
                                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-dark-200/60 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200"
                                >
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${feature.color.split(" ")[0]}`}>
                                        <feature.icon className={`w-4 h-4 ${feature.color.split(" ")[1]}`} />
                                    </div>
                                    <span className="text-foreground text-sm font-semibold">{feature.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}