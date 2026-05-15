"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check, AlertTriangle, TrendingUp } from "lucide-react";

const problems = [
    "محدودية رأس المال الأولي للاستثمار",
    "ارتفاع تكاليف التشغيل والتخزين",
    "مخاطر عدم الإلمام بأنظمة السوق",
    "صعوبة دخول سوق التجارة الحقيقي",
];

const solutions = [
    "استثمار يبدأ من 1,000 ريال فقط",
    "إدارة احترافية للتخزين والتوزيع",
    "فريق خبراء يدير استثمارك نيابة عنك",
    "بوابة سهلة لدخول عالم التجارة",
];

export default function Challenges() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="challenges" className="section-padding bg-surface relative overflow-hidden">
            <div className="container-custom" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="section-header"
                >
                    <span className="section-eyebrow">التحديات والحلول</span>
                    <h2 className="section-title">
                        نحو <span className="text-gradient">استثمار أسهل</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 lg:gap-12 max-w-5xl mx-auto">
                    {/* Problems */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                            </div>
                            <h3 className="text-lg font-bold text-red-600">تحديات التجارة التقليدية</h3>
                        </div>
                        <div className="space-y-3">
                            {problems.map((problem, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -15 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
                                    className="flex items-center gap-3 p-4 rounded-xl bg-red-50/50 border border-red-100"
                                >
                                    <X className="w-5 h-5 text-red-400 shrink-0" />
                                    <span className="text-text-secondary text-sm">{problem}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Solutions */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold text-primary">حلول شِلّة المبتكرة</h3>
                        </div>
                        <div className="space-y-3">
                            {solutions.map((solution, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 15 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
                                    className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10"
                                >
                                    <Check className="w-5 h-5 text-primary shrink-0" />
                                    <span className="text-text-primary text-sm font-medium">{solution}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}