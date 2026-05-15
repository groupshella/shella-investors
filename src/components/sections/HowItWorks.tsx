/**
 * How It Works Section - Numbered steps in zigzag layout with connecting lines,
 * large number watermarks, and alternating alignment.
 * @module components/sections/HowItWorks
 */

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Wallet, GitBranch, BarChart3, Banknote } from "lucide-react";

interface Step {
    number: string;
    icon: React.ElementType;
    title: string;
    description: string;
}

const steps: Step[] = [
    {
        number: "01",
        icon: UserPlus,
        title: "سجّل حسابك",
        description: "أنشئ حسابك في دقائق باستخدام رقم جوالك وبياناتك الأساسية",
    },
    {
        number: "02",
        icon: Wallet,
        title: "أودع رأس المال",
        description: "اختر مبلغ الاستثمار المناسب لك وادعه عبر وسائل دفع آمنة",
    },
    {
        number: "03",
        icon: GitBranch,
        title: "اختر النموذج",
        description: "اختار بين النموذج الأفقي للحصص الثابتة أو الرأسي للنمو التراكمي",
    },
    {
        number: "04",
        icon: BarChart3,
        title: "تابع أداءك",
        description: "راقب استثمارك لحظة بلحظة عبر لوحة التحكم التفاعلية",
    },
    {
        number: "05",
        icon: Banknote,
        title: "اسحب أرباحك",
        description: "استلم أرباحك شهرياً أو أعادة استثمارها بمرونة تامة",
    },
];

export default function HowItWorks() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="how-it-works" className="section-padding bg-dark-50 relative overflow-hidden">
            <div className="container-custom" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <span className="section-eyebrow">كيف تعمل</span>
                    <h2 className="section-title">
                        خطوات <span className="text-gradient">بسيطة للنجاح</span>
                    </h2>
                </motion.div>

                <motion.div className="relative max-w-4xl mx-auto">
                    <div className="hidden lg:block absolute top-0 bottom-0 right-1/2 w-px border-r-2 border-dashed border-dark-200/40" />

                    <div className="space-y-12 md:space-y-16 lg:space-y-20">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                                    className={`relative flex flex-col lg:flex-row items-center gap-6 lg:gap-8 ${
                                        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                                    }`}
                                >
                                    <div
                                        className={`absolute -top-6 lg:-top-10 text-6xl sm:text-7xl lg:text-8xl font-black text-primary/10 select-none pointer-events-none ${
                                            isEven ? "right-0 lg:right-auto lg:left-4" : "left-0 lg:left-auto lg:right-4"
                                        }`}
                                    >
                                        {step.number}
                                    </div>

                                    <div className={`flex-1 w-full ${isEven ? "lg:pl-12" : "lg:pr-12"}`}>
                                        <div className="card-interactive">
                                            <div className={`flex items-center gap-4 mb-4 ${isEven ? "" : "lg:flex-row-reverse"}`}>
                                                <div className="icon-box bg-gold/10">
                                                    <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
                                                </div>
                                                <div className={isEven ? "" : "lg:text-left"}>
                                                    <span className="text-gold text-sm font-medium">الخطوة {step.number}</span>
                                                    <h3 className="text-lg sm:text-xl font-bold text-foreground">{step.title}</h3>
                                                </div>
                                            </div>
                                            <p className="text-muted leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>

                                    <div className="hidden lg:flex w-14 h-14 rounded-full bg-dark-100 border-2 border-gold/30 items-center justify-center shrink-0 z-10">
                                        <span className="text-gold font-bold text-sm">{step.number}</span>
                                    </div>

                                    <div className="flex-1 hidden lg:block" />
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
