/**
 * Growth Model Section - Interactive toggle between horizontal and vertical models
 * with CSS mini-charts, animated counters, and disclaimer.
 * @module components/sections/GrowthModel
 */

"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRightLeft, TrendingUp, Info } from "lucide-react";
import { calculateHorizontal, formatCurrency } from "@/lib/utils";

interface ModelData {
    id: "horizontal" | "vertical";
    name: string;
    arabicName: string;
    description: string;
    rate: string;
    profitExample: string;
    bars: number[];
    color: string;
}

const models: ModelData[] = [
    {
        id: "horizontal",
        name: "النموذج الأفقي",
        arabicName: "الحصة الثابتة",
        description: "حصة شهرية ثابتة من قيمة البضاعة مع الحفاظ على رأس المال الأصلي",
        rate: "4.5%",
        profitExample: "450 ريال شهرياً لكل 10,000 ريال",
        bars: [40, 40, 40, 40, 40, 40],
        color: "bg-primary",
    },
    {
        id: "vertical",
        name: "النموذج الرأسي",
        arabicName: "التراكمي",
        description: "إعادة استثمار الأرباح لزيادة حجم البضاعة وتحقيق نمو مركب",
        rate: "4.5% مركب",
        profitExample: "تضاعف رأس المال خلال 39 شهراً",
        bars: [30, 35, 42, 50, 60, 75],
        color: "bg-gold",
    },
];

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        const duration = 1500;
        const steps = 40;
        const increment = value / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {count.toLocaleString("ar-SA")}
            {suffix}
        </span>
    );
}

export default function GrowthModel() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeModel, setActiveModel] = useState<"horizontal" | "vertical">("horizontal");

    const compoundData = calculateHorizontal(10000, 12);
    const finalAmount = compoundData[compoundData.length - 1].cumulative;
    const totalProfit = finalAmount - 10000;

    return (
        <section id="growth-model" className="section-padding bg-dark">
            <div className="container-custom" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <span className="section-eyebrow">
                        نماذج النمو
                    </span>
                    <h2 className="section-title">
                        اختر <span className="text-gradient">نموذج استثمارك</span>
                    </h2>
                </motion.div>

                {/* Model Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex p-1 rounded-xl bg-primary/5 border border-dark-200/30">
                        {models.map((model) => (
                            <button
                                key={model.id}
                                onClick={() => setActiveModel(model.id)}
                                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${activeModel === model.id
                                    ? "bg-gold text-foreground"
                                    : "text-muted hover:text-foreground"
                                    }`}
                            >
                                {model.arabicName}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Model Cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeModel}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12"
                    >
                        {models.map((model) => (
                            <div
                                key={model.id}
                                className={`card-glass p-8 relative overflow-hidden ${activeModel === model.id ? "border-gold/30" : "opacity-60"
                                    } transition-all duration-300`}
                            >
                                {activeModel === model.id && (
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gold/10 rounded-bl-full" />
                                )}

                                <div className="flex items-center gap-3 mb-6">
                                    {model.id === "horizontal" ? (
                                        <ArrowRightLeft className="w-6 h-6 text-primary" />
                                    ) : (
                                        <TrendingUp className="w-6 h-6 text-gold" />
                                    )}
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">{model.name}</h3>
                                        <span className="text-sm text-muted">{model.arabicName}</span>
                                    </div>
                                </div>

                                <p className="text-muted mb-6 leading-relaxed">{model.description}</p>

                                {/* Mini Chart */}
                                <div className="flex items-end gap-2 h-24 mb-6">
                                    {model.bars.map((height, i) => (
                                        <div
                                            key={i}
                                            className={`flex-1 rounded-t ${model.color} opacity-60 hover:opacity-100 transition-opacity`}
                                            style={{ height: `${height}%` }}
                                        />
                                    ))}
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted text-sm">معدل العائد</span>
                                        <span className="text-foreground font-bold">{model.rate}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted text-sm">مثال الأرباح</span>
                                        <span className="text-gold text-sm font-medium">{model.profitExample}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Live Calculation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <div className="card-glass p-8 border-gold/20">
                        <h4 className="text-lg font-semibold text-foreground mb-4">حساب مباشر</h4>
                        <p className="text-muted mb-6">
                            استثمار <span className="text-foreground font-bold">10,000 ريال</span> لمدة 12 شهراً
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <div>
                                <div className="text-2xl font-bold text-foreground">
                                    <AnimatedNumber value={10000} suffix=" ريال" />
                                </div>
                                <div className="text-xs text-muted">رأس المال</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gold">
                                    <AnimatedNumber value={totalProfit} suffix=" ريال" />
                                </div>
                                <div className="text-xs text-muted">الأرباح المستهدفة</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-primary">
                                    <AnimatedNumber value={finalAmount} suffix=" ريال" />
                                </div>
                                <div className="text-xs text-muted">الإجمالي</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-warning/80 text-sm">
                            <Info className="w-4 h-4" />
                            <span>* الأرقام تقديرية وليست ضماناً للربح</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}