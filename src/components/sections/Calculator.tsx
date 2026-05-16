"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Calculator, TrendingUp, Package, ArrowRightLeft, Info } from "lucide-react";

type ModelType = "horizontal" | "vertical";

function formatCurrency(n: number) {
    return n.toLocaleString("ar-SA") + " ر";
}

function calcResults(amount: number, months: number, model: ModelType) {
    if (model === "horizontal") {
        const monthlyProfit = Math.round(amount * 0.045);
        return Array.from({ length: months }, (_, i) => ({
            month: i + 1,
            profit: monthlyProfit,
            total: amount,
            cumProfit: monthlyProfit * (i + 1),
        }));
    } else {
        const results = [];
        let value = amount;
        for (let i = 1; i <= months; i++) {
            const profit = Math.round(value * 0.045);
            const newValue = value + profit;
            results.push({ month: i, profit, total: newValue, cumProfit: newValue - amount });
            value = newValue;
        }
        return results;
    }
}

const PRESETS = [1000, 5000, 10000, 50000];

export default function CalculatorSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    const [amount, setAmount] = useState(10000);
    const [months, setMonths] = useState(12);
    const [model, setModel] = useState<ModelType>("horizontal");
    const [results, setResults] = useState(() => calcResults(10000, 12, "horizontal"));

    useEffect(() => {
        setResults(calcResults(amount, months, model));
    }, [amount, months, model]);

    const totalProfit = results.reduce((s, r) => s + r.profit, 0);
    const finalValue = model === "vertical" ? results[results.length - 1]?.total ?? amount : amount;
    const returnPct = Math.round((totalProfit / amount) * 100);
    const maxBar = Math.max(...results.slice(0, 12).map((r) => r.profit));

    return (
        <section id="calculator" className="section-padding bg-white">
            <div className="container-custom mx-auto" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="section-header"
                >
                    <span className="section-eyebrow">الحاسبة الذكية</span>
                    <h2 className="section-title">
                        احسب <span className="text-gradient">حصّتك المستهدفة</span>
                    </h2>
                    <p className="text-muted">حدّد قيمة البضاعة وفترة شراكتك لحساب الحصص المستهدفة تلقائياً</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
                    {/* Inputs */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-dark-200/50 bg-white shadow-sm p-6 sm:p-7"
                    >
                        <h3 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-primary" />
                            بيانات الشراكة
                        </h3>

                        {/* Model */}
                        <div className="mb-5">
                            <label className="block text-muted text-xs font-semibold mb-2.5 uppercase tracking-wider">نوع النموذج</label>
                            <div className="grid grid-cols-2 gap-2.5">
                                {([
                                    { id: "horizontal" as const, label: "الأفقي", sub: "حصص ثابتة", icon: ArrowRightLeft },
                                    { id: "vertical" as const, label: "الرأسي", sub: "نمو تراكمي", icon: TrendingUp },
                                ]).map((m) => (
                                    <button
                                        key={m.id}
                                        onClick={() => setModel(m.id)}
                                        className={`p-4 rounded-xl border-2 transition-all text-right ${model === m.id
                                                ? m.id === "horizontal"
                                                    ? "border-primary bg-primary/8 text-primary"
                                                    : "border-gold bg-gold/8 text-gold"
                                                : "border-dark-200/50 text-muted hover:border-dark-200"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <m.icon className="w-4 h-4" />
                                            <span className="font-bold text-sm">{m.label}</span>
                                        </div>
                                        <div className="text-xs opacity-75">{m.sub}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Amount slider */}
                        <div className="mb-5">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-muted text-xs font-semibold uppercase tracking-wider">قيمة البضاعة</label>
                                <span className="text-xl font-black text-gold">{formatCurrency(amount)}</span>
                            </div>
                            <input
                                type="range" min="1000" max="100000" step="1000" value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full h-2 bg-dark-100 rounded-full appearance-none cursor-pointer accent-primary mb-2"
                                style={{ direction: "ltr" }}
                            />
                            <div className="flex justify-between text-xs text-muted">
                                <span>100,000 ر</span>
                                <span>1,000 ر</span>
                            </div>
                            {/* Presets */}
                            <div className="flex flex-wrap gap-2 mt-3">
                                {PRESETS.map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setAmount(p)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${amount === p ? "bg-primary text-white" : "bg-dark-100 text-muted hover:bg-primary/10 hover:text-primary"
                                            }`}
                                    >
                                        {p.toLocaleString("ar-SA")}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Months slider */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-muted text-xs font-semibold uppercase tracking-wider">فترة الشراكة</label>
                                <span className="text-xl font-black text-primary">{months} شهر</span>
                            </div>
                            <input
                                type="range" min="3" max="39" step="1" value={months}
                                onChange={(e) => setMonths(Number(e.target.value))}
                                className="w-full h-2 bg-dark-100 rounded-full appearance-none cursor-pointer accent-primary mb-2"
                                style={{ direction: "ltr" }}
                            />
                            <div className="flex justify-between text-xs text-muted">
                                <span>39 شهراً</span>
                                <span>3 أشهر</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Results */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="rounded-2xl border border-dark-200/50 bg-white shadow-sm p-6 sm:p-7"
                    >
                        <h3 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            النتائج المستهدفة
                        </h3>

                        <div className="space-y-3 mb-6">
                            <div className="p-4 rounded-xl bg-gold/8 border border-gold/20">
                                <div className="text-xs text-muted mb-1 font-medium">إجمالي الأرباح المستهدفة</div>
                                <div className="text-2xl font-black text-gold">{formatCurrency(totalProfit)}</div>
                            </div>

                            <div className="p-4 rounded-xl bg-primary/8 border border-primary/20">
                                <div className="text-xs text-primary mb-1 font-medium">
                                    {model === "vertical" ? "القيمة النهائية للبضاعة" : "قيمة البضاعة الأصلية"}
                                </div>
                                <div className="text-2xl font-black text-primary">{formatCurrency(finalValue)}</div>
                            </div>

                            <div className="p-4 rounded-xl bg-dark-100 border border-dark-200/40">
                                <div className="text-xs text-muted mb-1 font-medium">العائد الإجمالي المستهدف</div>
                                <div className="text-2xl font-black text-foreground">{returnPct}%</div>
                            </div>
                        </div>

                        {/* Bar chart */}
                        <div className="h-24 flex items-end gap-1 mb-1">
                            {results.slice(0, 12).map((r, i) => (
                                <div
                                    key={i}
                                    className="flex-1 rounded-t bg-primary/30 hover:bg-primary/60 transition-colors"
                                    style={{
                                        height: `${Math.max((r.profit / maxBar) * 100, 8)}%`,
                                    }}
                                    title={`شهر ${r.month}: ${formatCurrency(r.profit)}`}
                                />
                            ))}
                        </div>
                        <div className="text-center text-muted text-xs">توزيع الحصص الشهرية (أول 12 شهراً)</div>
                    </motion.div>
                </div>

                {/* Examples */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="max-w-4xl mx-auto mt-8"
                >
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <Package className="w-4 h-4 text-primary" />
                                <h4 className="font-bold text-foreground text-sm">النموذج الأفقي</h4>
                            </div>
                            <p className="text-muted text-xs leading-relaxed mb-3">
                                تملّك بضاعة بـ 10,000 ريال، تستهدف حصة شهرية ثابتة قدرها 450 ريالاً*، بمتوسط هامش ربح 4.5% شهرياً
                            </p>
                            <div className="text-primary font-black text-lg">450 ريال / شهر</div>
                        </div>
                        <div className="rounded-2xl border border-gold/25 bg-gold/5 p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <TrendingUp className="w-4 h-4 text-gold" />
                                <h4 className="font-bold text-foreground text-sm">النموذج الرأسي</h4>
                            </div>
                            <p className="text-muted text-xs leading-relaxed mb-3">
                                بدأت بـ 1,000 ريال بضاعة، تستهدف حصة 45 ريالاً شهرياً*. في الشهر التالي تصبح 1,045 ريالاً — وهكذا تنمو دورة التراكم
                            </p>
                            <div className="text-gold font-black text-lg">نمو مركب شهري</div>
                        </div>
                    </div>
                    <p className="text-center text-muted/60 text-xs mt-4">
                        * أرقام مستهدفة وليست ضماناً — العائد الفعلي ضمن نطاق 3.5%–5.5% شهرياً حسب حركة السوق
                    </p>
                </motion.div>
            </div>
        </section>
    );
}