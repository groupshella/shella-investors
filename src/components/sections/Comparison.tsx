/**
 * Comparison Section - VS table comparing traditional Jameyya vs Shella
 * with highlighted Shella column and animated difference banner.
 * @module components/sections/Comparison
 */

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check, ArrowLeft } from "lucide-react";

interface ComparisonRow {
    feature: string;
    jameyya: string;
    shella: string;
    shellaBetter: boolean;
}

const rows: ComparisonRow[] = [
    { feature: "الملكية", jameyya: "لا يوجد", shella: "بضاعة حقيقية بفاتورة", shellaBetter: true },
    { feature: "العائد", jameyya: "0%", shella: "4.5% شهرياً مستهدف", shellaBetter: true },
    { feature: "المخاطر", jameyya: "تجميد الأموال", shella: "بضاعة مؤمنة قابلة للاسترداد", shellaBetter: true },
    { feature: "الشفافية", jameyya: "محدودة", shella: "تقارير دورية كاملة", shellaBetter: true },
    { feature: "المرونة", jameyya: "لا يوجد", shella: "استرداد مرن عيناً أو نقداً", shellaBetter: true },
    { feature: "المجتمع", jameyya: "فردي", shella: "شبكة شركاء ناجحين", shellaBetter: true },
];

export default function Comparison() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const jameyyaTotal = 12000;
    const shellaTotal = 16148;
    const difference = shellaTotal - jameyyaTotal;

    return (
        <section id="comparison" className="section-padding bg-dark-50">
            <div className="container-custom" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <span className="section-eyebrow">
                        المقارنة
                    </span>
                    <h2 className="section-title">
                        لماذا <span className="text-gradient">شِلّة أفضل</span>؟
                    </h2>
                </motion.div>

                {/* Difference Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-3xl mx-auto mb-12 text-center"
                >
                    <div className="card-glass p-8 border-gold/30 bg-gold/5">
                        <p className="text-muted mb-4">الفرق في العائد على 12 شهراً</p>
                        <div className="flex items-center justify-center gap-6 mb-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-muted">{jameyyaTotal.toLocaleString("ar-SA")} ريال</div>
                                <div className="text-sm text-muted">الجمعية التقليدية</div>
                            </div>
                            <ArrowLeft className="w-6 h-6 text-gold" />
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gold">{shellaTotal.toLocaleString("ar-SA")} ريال</div>
                                <div className="text-sm text-gold">شِلّة</div>
                            </div>
                        </div>
                        <div className="text-4xl font-black text-gold">
                            +{difference.toLocaleString("ar-SA")} ريال
                        </div>
                    </div>
                </motion.div>

                {/* Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="max-w-4xl mx-auto overflow-x-auto"
                >
                    <table className="w-full text-right">
                        <thead>
                            <tr className="border-b border-dark-200/30">
                                <th className="pb-4 text-muted font-medium">الميزة</th>
                                <th className="pb-4 text-muted font-medium text-center">الجمعية التقليدية</th>
                                <th className="pb-4 text-primary font-bold text-center">شِلّة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                                    className="border-b border-dark-200/20 hover:bg-primary/5 transition-colors"
                                >
                                    <td className="py-4 text-foreground font-medium">{row.feature}</td>
                                    <td className="py-4 text-center">
                                        <div className="flex items-center justify-center gap-2 text-muted">
                                            <X className="w-4 h-4 text-danger" />
                                            <span>{row.jameyya}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-center">
                                        <div className="flex items-center justify-center gap-2 text-foreground">
                                            <Check className="w-4 h-4 text-primary" />
                                            <span className={row.shellaBetter ? "text-primary font-medium" : ""}>
                                                {row.shella}
                                            </span>
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