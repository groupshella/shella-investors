"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check, ArrowLeft, Trophy } from "lucide-react";

interface ComparisonRow {
    feature: string;
    jameyya: string;
    shella: string;
}

const rows: ComparisonRow[] = [
    { feature: "الملكية", jameyya: "لا يوجد", shella: "بضاعة حقيقية بفاتورة رسمية" },
    { feature: "العائد المستهدف", jameyya: "0%", shella: "4.5% شهرياً مستهدف" },
    { feature: "المخاطر", jameyya: "تجميد الأموال", shella: "بضاعة مؤمنة قابلة للاسترداد" },
    { feature: "الشفافية", jameyya: "محدودة", shella: "تقارير دورية كاملة" },
    { feature: "المرونة", jameyya: "لا يوجد", shella: "استرداد مرن عيناً أو نقداً" },
    { feature: "المجتمع", jameyya: "فردي", shella: "شبكة شركاء ناجحين" },
];

export default function Comparison() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    // Correct numbers from document: 12,000 vs 16,148 (+4,148)
    const jameyyaTotal = 12000;
    const shellaTotal = 16148;
    const difference = shellaTotal - jameyyaTotal; // 4,148

    return (
        <section id="comparison" className="section-padding bg-dark-100/50 relative overflow-hidden">
            <div className="absolute inset-0 gradient-mesh pointer-events-none" />

            <div className="container-custom" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="section-header"
                >
                    <span className="section-eyebrow">المقارنة</span>
                    <h2 className="section-title">
                        لماذا <span className="text-gradient">شِلّة أفضل</span>؟
                    </h2>
                </motion.div>

                {/* Difference Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="max-w-3xl mx-auto mb-10"
                >
                    <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/8 to-primary/5 p-6 sm:p-8">
                        <div className="flex items-center justify-center gap-2 mb-5">
                            <Trophy className="w-5 h-5 text-gold" />
                            <p className="text-muted text-sm font-medium">الفرق في العائد — دفع 1,000 ريال شهرياً لمدة 12 شهراً</p>
                        </div>
                        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-5">
                            <div className="text-center">
                                <div className="text-xl sm:text-2xl font-black text-muted/70 line-through">
                                    {jameyyaTotal.toLocaleString("ar-SA")} ريال
                                </div>
                                <div className="text-xs text-muted mt-1">الجمعية التقليدية</div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                                <ArrowLeft className="w-4 h-4 text-gold" />
                            </div>
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl font-black text-primary">
                                    {shellaTotal.toLocaleString("ar-SA")} ريال
                                </div>
                                <div className="text-xs text-primary mt-1 font-semibold">شِلّة*</div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/15 border border-gold/30">
                                <span className="text-2xl sm:text-3xl font-black text-gold">
                                    +{difference.toLocaleString("ar-SA")} ريال
                                </span>
                            </div>
                            <p className="text-xs text-muted mt-2">* أرقام مستهدفة بناءً على نموذج تراكمي بمعدل 4.5% شهرياً</p>
                        </div>
                    </div>
                </motion.div>

                {/* Table */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-dark-200/40 bg-white shadow-sm"
                >
                    <table className="w-full text-right min-w-[520px]">
                        <thead>
                            <tr className="border-b border-dark-200/40">
                                <th className="p-4 sm:p-5 text-muted font-semibold text-sm">الميزة</th>
                                <th className="p-4 sm:p-5 text-muted font-semibold text-sm text-center">الجمعية التقليدية</th>
                                <th className="p-4 sm:p-5 text-primary font-bold text-sm text-center bg-primary/3">شِلّة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.35, delay: 0.35 + index * 0.07 }}
                                    className="border-b border-dark-200/25 last:border-0 hover:bg-primary/2 transition-colors"
                                >
                                    <td className="p-4 sm:p-5 text-foreground font-semibold text-sm">{row.feature}</td>
                                    <td className="p-4 sm:p-5 text-center">
                                        <div className="flex items-center justify-center gap-1.5 text-muted text-sm">
                                            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                                <X className="w-2.5 h-2.5 text-red-500" />
                                            </div>
                                            <span>{row.jameyya}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 sm:p-5 text-center bg-primary/3">
                                        <div className="flex items-center justify-center gap-1.5 text-sm">
                                            <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                                                <Check className="w-2.5 h-2.5 text-primary" />
                                            </div>
                                            <span className="text-primary font-semibold">{row.shella}</span>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </div>
        </section>
    );
}