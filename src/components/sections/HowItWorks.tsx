"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Wallet, GitBranch, BarChart3, Banknote } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: UserPlus,
        title: "سجّل حسابك",
        description: "أنشئ حسابك في دقائق باستخدام رقم جوالك وبياناتك الأساسية",
        color: "bg-primary/10 text-primary border-primary/20",
        numColor: "text-primary",
    },
    {
        number: "02",
        icon: Wallet,
        title: "أودع رأس المال",
        description: "اختر مبلغ الاستثمار المناسب لك وادفعه عبر وسائل دفع آمنة — يبدأ من 1,000 ريال",
        color: "bg-gold/10 text-gold border-gold/20",
        numColor: "text-gold",
    },
    {
        number: "03",
        icon: GitBranch,
        title: "اختر النموذج",
        description: "اختر بين النموذج الأفقي للحصص الثابتة أو الرأسي للنمو التراكمي",
        color: "bg-teal/10 text-teal border-teal/20",
        numColor: "text-teal",
    },
    {
        number: "04",
        icon: BarChart3,
        title: "تابع أداءك",
        description: "راقب استثمارك لحظة بلحظة عبر لوحة التحكم وتقارير شهرية مفصّلة",
        color: "bg-primary/10 text-primary border-primary/20",
        numColor: "text-primary",
    },
    {
        number: "05",
        icon: Banknote,
        title: "اسحب أرباحك",
        description: "استلم حصتك شهرياً أو أعد استثمارها في بضاعة جديدة للنمو التراكمي",
        color: "bg-gold/10 text-gold border-gold/20",
        numColor: "text-gold",
    },
];

export default function HowItWorks() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="how-it-works" className="section-padding bg-dark-100/40 relative overflow-hidden">
            <div className="absolute inset-0 gradient-mesh pointer-events-none" />

            <div className="container-custom" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="section-header"
                >
                    <span className="section-eyebrow">كيف تعمل</span>
                    <h2 className="section-title">
                        خطوات <span className="text-gradient">بسيطة للنجاح</span>
                    </h2>
                    <p className="text-muted">ابدأ رحلتك التجارية في خمس خطوات سهلة</p>
                </motion.div>

                {/* Mobile: vertical list */}
                <div className="lg:hidden max-w-lg mx-auto space-y-4">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                            className="flex gap-4 bg-white rounded-2xl border border-dark-200/50 p-5 shadow-sm"
                        >
                            {/* Step number + icon */}
                            <div className="shrink-0 flex flex-col items-center gap-2">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${step.color}`}>
                                    <step.icon className="w-5 h-5" />
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="w-0.5 flex-1 bg-dark-200/50 min-h-[20px]" />
                                )}
                            </div>
                            <div className="pt-1">
                                <div className={`text-xs font-bold mb-1 ${step.numColor}`}>الخطوة {step.number}</div>
                                <h3 className="font-bold text-foreground text-base mb-1.5">{step.title}</h3>
                                <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Desktop: zigzag */}
                <div className="hidden lg:block relative max-w-4xl mx-auto">
                    {/* Center line */}
                    <div className="absolute top-8 bottom-8 right-1/2 w-px bg-gradient-to-b from-transparent via-dark-200 to-transparent" />

                    <div className="space-y-10">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.15 + index * 0.12 }}
                                    className={`relative flex items-center gap-8 ${isEven ? "flex-row" : "flex-row-reverse"}`}
                                >
                                    {/* Content */}
                                    <div className={`flex-1 ${isEven ? "text-right pl-8" : "text-right pr-8"}`}>
                                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${step.color} border`}>
                                            الخطوة {step.number}
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                                        <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                                    </div>

                                    {/* Center node */}
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 shrink-0 z-10 shadow-md ${step.color} bg-white`}>
                                        <step.icon className="w-6 h-6" />
                                    </div>

                                    <div className="flex-1" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}