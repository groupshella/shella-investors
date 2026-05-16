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
        <section id="challenges" className="section-padding bg-white relative overflow-hidden">
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

                <div className="grid md:grid-cols-2 gap-5 lg:gap-10 max-w-5xl mx-auto">
                    {/* Problems */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="rounded-2xl border border-red-100 overflow-hidden"
                    >
                        <div className="flex items-center gap-3 p-5 bg-red-50 border-b border-red-100">
                            <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                                <AlertTriangle className="w-4.5 h-4.5 text-red-500 w-[18px] h-[18px]" />
                            </div>
                            <h3 className="font-bold text-red-700">تحديات التجارة التقليدية</h3>
                        </div>
                        <div className="p-4 space-y-2.5 bg-white">
                            {problems.map((problem, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.3, delay: 0.2 + index * 0.07 }}
                                    className="flex items-center gap-3 p-3.5 rounded-xl bg-red-50/50 border border-red-100/70"
                                >
                                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                        <X className="w-3 h-3 text-red-500" />
                                    </div>
                                    <span className="text-foreground/80 text-sm">{problem}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Solutions */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="rounded-2xl border border-primary/20 overflow-hidden"
                    >
                        <div className="flex items-center gap-3 p-5 bg-primary/8 border-b border-primary/15">
                            <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                                <TrendingUp className="w-[18px] h-[18px] text-primary" />
                            </div>
                            <h3 className="font-bold text-primary">حلول شِلّة المبتكرة</h3>
                        </div>
                        <div className="p-4 space-y-2.5 bg-white">
                            {solutions.map((solution, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 12 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.3, delay: 0.3 + index * 0.07 }}
                                    className="flex items-center gap-3 p-3.5 rounded-xl bg-primary/5 border border-primary/10"
                                >
                                    <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                                        <Check className="w-3 h-3 text-primary" />
                                    </div>
                                    <span className="text-foreground text-sm font-semibold">{solution}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}