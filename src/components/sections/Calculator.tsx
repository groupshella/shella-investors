"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Calculator, TrendingUp, Calendar, Package } from "lucide-react";
import { calculateGrowth, formatCurrency } from "@/lib/utils";

type ModelType = "horizontal" | "vertical";

export default function CalculatorSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const [amount, setAmount] = useState(1000);
    const [months, setMonths] = useState(12);
    const [model, setModel] = useState<ModelType>("vertical");
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        if (model === "vertical") {
            setResults(calculateGrowth(amount, months));
        } else {
            // Horizontal model - fixed monthly profit
            const monthlyProfit = Math.round(amount * 0.045);
            const data = [];
            for (let i = 1; i <= months; i++) {
                data.push({
                    month: i,
                    value: amount,
                    profit: monthlyProfit,
                    total: amount,
                });
            }
            setResults(data);
        }
    }, [amount, months, model]);

    const totalProfit = results.reduce((sum, r) => sum + r.profit, 0);
    const finalValue = model === "vertical"
        ? results[results.length - 1]?.total || 0
        : amount;

    return (
        <section id="calculator" className="section-padding bg-dark-50/30">
            <div className="container-custom mx-auto" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="text-gold font-semibold text-sm mb-4 block">
                        الحاسبة الذكية
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                        احسب <span className="text-gradient">حصّتك المستهدفة</span>
                    </h2>
                    <p className="text-muted text-lg">
                        حدّد فترة شراكتك وقيمة البضاعة، وستحسب الحاسبة تلقائياً الحصص
                        الشهرية المستهدفة
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Inputs */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="card-glass p-8"
                    >
                        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-gold" />
                            بيانات الشراكة
                        </h3>

                        {/* Model Selection */}
                        <div className="mb-6">
                            <label className="block text-muted text-sm mb-3">نوع النموذج</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setModel("horizontal")}
                                    className={`p-4 rounded-xl border transition-all ${model === "horizontal"
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-dark-100/20 text-muted hover:border-primary/30"
                                        }`}
                                >
                                    <div className="font-semibold mb-1">النموذج الأفقي</div>
                                    <div className="text-xs opacity-80">حصص شهرية ثابتة</div>
                                </button>
                                <button
                                    onClick={() => setModel("vertical")}
                                    className={`p-4 rounded-xl border transition-all ${model === "vertical"
                                        ? "border-gold bg-gold/10 text-gold"
                                        : "border-dark-100/20 text-muted hover:border-gold/30"
                                        }`}
                                >
                                    <div className="font-semibold mb-1">النموذج الرأسي</div>
                                    <div className="text-xs opacity-80">نمو تراكمي</div>
                                </button>
                            </div>
                        </div>

                        {/* Amount Input */}
                        <div className="mb-6">
                            <label className="block text-muted text-sm mb-3">
                                قيمة البضاعة (ريال)
                            </label>
                            <input
                                type="range"
                                min="1000"
                                max="100000"
                                step="1000"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full h-2 bg-dark-100 rounded-lg appearance-none cursor-pointer accent-primary mb-3"
                            />
                            <div className="flex items-center justify-between">
                                <span className="text-muted text-sm">1,000 ريال</span>
                                <span className="text-2xl font-bold text-gold">
                                    {formatCurrency(amount)}
                                </span>
                                <span className="text-muted text-sm">100,000 ريال</span>
                            </div>
                        </div>

                        {/* Months Input */}
                        <div className="mb-6">
                            <label className="block text-muted text-sm mb-3">
                                فترة الشراكة (شهر)
                            </label>
                            <input
                                type="range"
                                min="3"
                                max="39"
                                step="1"
                                value={months}
                                onChange={(e) => setMonths(Number(e.target.value))}
                                className="w-full h-2 bg-dark-100 rounded-lg appearance-none cursor-pointer accent-primary mb-3"
                            />
                            <div className="flex items-center justify-between">
                                <span className="text-muted text-sm">3 أشهر</span>
                                <span className="text-2xl font-bold text-primary">
                                    {months} شهر
                                </span>
                                <span className="text-muted text-sm">39 شهر</span>
                            </div>
                        </div>

                        {/* Quick Presets */}
                        <div className="flex flex-wrap gap-2">
                            {[1000, 5000, 10000, 50000].map((preset) => (
                                <button
                                    key={preset}
                                    onClick={() => setAmount(preset)}
                                    className="px-4 py-2 rounded-lg bg-dark-50 text-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm"
                                >
                                    {formatCurrency(preset)}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Results */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="card-glass p-8"
                    >
                        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            النتائج المتوقعة
                        </h3>

                        <div className="space-y-6 mb-8">
                            <div className="p-5 rounded-xl bg-dark-100/80">
                                <div className="text-sm text-muted mb-2">إجمالي الأرباح المستهدفة</div>
                                <div className="text-3xl font-bold text-gold">
                                    {formatCurrency(totalProfit)}
                                </div>
                            </div>

                            <div className="p-5 rounded-xl bg-primary/10 border border-primary/20">
                                <div className="text-sm text-primary-light mb-2">
                                    {model === "vertical" ? "القيمة النهائية للبضاعة" : "قيمة البضاعة الثابتة"}
                                </div>
                                <div className="text-3xl font-bold text-primary">
                                    {formatCurrency(finalValue)}
                                </div>
                            </div>

                            <div className="p-5 rounded-xl bg-gold/10 border border-gold/20">
                                <div className="text-sm text-gold mb-2">العائد المستهدف</div>
                                <div className="text-3xl font-bold text-gold">
                                    {model === "vertical"
                                        ? `${Math.round((finalValue - amount) / amount * 100)}%`
                                        : `${Math.round(totalProfit / amount * 100)}%`
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Mini Chart */}
                        <div className="h-32 flex items-end gap-1">
                            {results.slice(0, 12).map((r, i) => (
                                <div
                                    key={i}
                                    className="flex-1 bg-primary/30 rounded-t hover:bg-primary/50 transition-colors"
                                    style={{
                                        height: `${(r.profit / Math.max(...results.map(x => x.profit))) * 100}%`,
                                        minHeight: "10%",
                                    }}
                                    title={`شهر ${r.month}: ${formatCurrency(r.profit)}`}
                                />
                            ))}
                        </div>
                        <div className="text-center text-muted text-xs mt-2">
                            توزيع الحصص الشهرية (أول 12 شهر)
                        </div>
                    </motion.div>
                </div>

                {/* Examples */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="max-w-4xl mx-auto mt-12"
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="card-glass p-6 border-primary/20">
                            <div className="flex items-center gap-2 mb-4">
                                <Package className="w-5 h-5 text-primary" />
                                <h4 className="font-bold text-foreground">النموذج الأفقي</h4>
                            </div>
                            <p className="text-muted text-sm mb-4">
                                لو تملّكتَ بضاعة بـ 10,000 ريال، تستهدف الحصول على حصة شهرية
                                قدرها 450 ريالاً*، بمتوسط هامش ربح 4.5% شهرياً
                            </p>
                            <div className="text-primary font-semibold">
                                {formatCurrency(450)} / شهر
                            </div>
                        </div>

                        <div className="card-glass p-6 border-gold/20">
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="w-5 h-5 text-gold" />
                                <h4 className="font-bold text-foreground">النموذج الرأسي</h4>
                            </div>
                            <p className="text-muted text-sm mb-4">
                                لو بدأتَ شراكتك بـ 1,000 ريال بضاعة، تستهدف حصة 45 ريالاً شهرياً*.
                                في الشهر التالي، تصبح قيمة بضاعتك 1,045 ريالاً
                            </p>
                            <div className="text-gold font-semibold">
                                نمو مركب شهري
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}