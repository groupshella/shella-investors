"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRightLeft, TrendingUp, Info } from "lucide-react";

// Utility: calculate horizontal model (fixed monthly profit)
function calcHorizontal(principal: number, months: number) {
    const data = [];
    let cumulative = principal;
    for (let i = 1; i <= months; i++) {
        const profit = Math.round(principal * 0.045);
        cumulative += profit;
        data.push({ month: i, profit, cumulative });
    }
    return data;
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        const duration = 1400;
        const steps = 40;
        const increment = value / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) { setCount(value); clearInterval(timer); }
            else setCount(Math.floor(current));
        }, duration / steps);
        return () => clearInterval(timer);
    }, [isInView, value]);

    return <span ref={ref}>{count.toLocaleString("ar-SA")}{suffix}</span>;
}

const models = [
    {
        id: "horizontal" as const,
        name: "النموذج الأفقي",
        label: "الحصة الثابتة",
        description: "حصة شهرية ثابتة من قيمة البضاعة مع الحفاظ على رأس المال الأصلي كاملاً",
        rate: "4.5% شهرياً",
        example: "450 ريال شهرياً لكل 10,000 ريال",
        bars: [60, 60, 60, 60, 60, 60, 60, 60],
        color: "bg-primary",
        icon: ArrowRightLeft,
        iconColor: "text-primary",
        accent: "border-primary/30 bg-primary/3",
    },
    {
        id: "vertical" as const,
        name: "النموذج الرأسي",
        label: "التراكمي",
        description: "إعادة استثمار الأرباح لزيادة حجم البضاعة وتحقيق نمو مركب متسارع",
        rate: "4.5% مركب شهرياً",
        example: "تضاعف أكثر من 5 مرات خلال 39 شهراً",
        bars: [30, 36, 43, 52, 62, 75, 90, 108],
        color: "bg-gold",
        icon: TrendingUp,
        iconColor: "text-gold",
        accent: "border-gold/30 bg-gold/3",
    },
];

export default function GrowthModel() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [activeModel, setActiveModel] = useState<"horizontal" | "vertical">("horizontal");

    // Live calc: 10,000 ريال × 12 months horizontal
    const horizData = calcHorizontal(10000, 12);
    const totalProfit = horizData.reduce((s, r) => s + r.profit, 0); // 5,400
    const finalAmount = 10000 + totalProfit; // 15,400

    return (
        <section id="growth-model" className="section-padding bg-white">
            <div className="container-custom" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="section-header"
                >
                    <span className="section-eyebrow">نماذج النمو</span>
                    <h2 className="section-title">
                        اختر <span className="text-gradient">نموذج استثمارك</span>
                    </h2>
                    <p className="text-muted">نموذجان مصمّمان لتناسب أهدافك المالية المختلفة</p>
                </motion.div>

                {/* Toggle */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex p-1 rounded-2xl bg-dark-100 border border-dark-200/50">
                        {models.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setActiveModel(m.id)}
                                className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${activeModel === m.id
                                    ? "bg-white text-foreground shadow-sm border border-dark-200/40"
                                    : "text-muted hover:text-foreground"
                                    }`}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Model Cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeModel}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                        className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-12"
                    >
                        {models.map((model) => {
                            const isActive = activeModel === model.id;
                            return (
                                <div
                                    key={model.id}
                                    onClick={() => setActiveModel(model.id)}
                                    className={`cursor-pointer rounded-2xl border-2 p-6 transition-all duration-250 ${isActive
                                        ? `${model.accent} shadow-md`
                                        : "border-dark-200/40 bg-white opacity-60 hover:opacity-80"
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? (model.id === "horizontal" ? "bg-primary/15" : "bg-gold/15") : "bg-dark-100"}`}>
                                            <model.icon className={`w-5 h-5 ${isActive ? model.iconColor : "text-muted"}`} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground text-base">{model.name}</h3>
                                            <span className="text-xs text-muted">{model.label}</span>
                                        </div>
                                        {isActive && (
                                            <div className={`mr-auto px-2 py-0.5 rounded-full text-xs font-bold ${model.id === "horizontal" ? "bg-primary/10 text-primary" : "bg-gold/10 text-gold"}`}>
                                                نشط
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-muted text-sm leading-relaxed mb-5">{model.description}</p>

                                    {/* Mini bar chart */}
                                    <div className="flex items-end gap-1.5 h-20 mb-5">
                                        {model.bars.map((h, i) => (
                                            <motion.div
                                                key={i}
                                                className={`flex-1 rounded-t ${model.color} ${isActive ? "opacity-75" : "opacity-30"}`}
                                                style={{ height: `${Math.min(h, 100)}%` }}
                                                initial={{ scaleY: 0 }}
                                                animate={{ scaleY: 1 }}
                                                transition={{ delay: i * 0.04, duration: 0.3 }}
                                            />
                                        ))}
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-muted">معدل العائد المستهدف</span>
                                            <span className="font-bold text-foreground">{model.rate}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-muted">مثال</span>
                                            <span className={`font-semibold ${model.iconColor}`}>{model.example}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* Live Calculation Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/5 to-primary/5 p-6 sm:p-8">
                        <h4 className="text-base font-bold text-foreground mb-1">حساب مباشر — النموذج الأفقي</h4>
                        <p className="text-muted text-sm mb-6">
                            استثمار <span className="font-bold text-foreground">10,000 ريال</span> لمدة{" "}
                            <span className="font-bold text-foreground">12 شهراً</span>
                        </p>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-3 bg-white rounded-xl border border-dark-200/40">
                                <div className="text-xl font-black text-foreground">
                                    <AnimatedNumber value={10000} suffix=" ر" />
                                </div>
                                <div className="text-xs text-muted mt-0.5">رأس المال</div>
                            </div>
                            <div className="text-center p-3 bg-white rounded-xl border border-gold/25">
                                <div className="text-xl font-black text-gold">
                                    <AnimatedNumber value={5400} suffix=" ر" />
                                </div>
                                <div className="text-xs text-muted mt-0.5">الأرباح المستهدفة</div>
                            </div>
                            <div className="text-center p-3 bg-white rounded-xl border border-primary/25">
                                <div className="text-xl font-black text-primary">
                                    <AnimatedNumber value={15400} suffix=" ر" />
                                </div>
                                <div className="text-xs text-muted mt-0.5">الإجمالي</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-warning/80 text-xs">
                            <Info className="w-3.5 h-3.5 shrink-0" />
                            <span>الأرقام تقديرية ومستهدفة وليست ضماناً للربح — نطاق العائد الفعلي 3.5%–5.5% شهرياً</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}