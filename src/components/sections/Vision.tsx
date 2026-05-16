"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, TrendingUp, Shield } from "lucide-react";

const values = [
    {
        icon: Globe,
        title: "توسيع دائرة التجارة",
        description: "نجعل من التجارة الحقيقية فرصة متاحة للجميع بصرف النظر عن حجم رأس المال",
        accent: "border-t-4 border-t-primary",
        iconBg: "bg-primary/10",
        iconColor: "text-primary",
    },
    {
        icon: TrendingUp,
        title: "الاستقرار والنمو",
        description: "نركز على قطاع المواد الاستهلاكية والغذائية لضمان استقرار ونمو مستدام",
        accent: "border-t-4 border-t-gold",
        iconBg: "bg-gold/10",
        iconColor: "text-gold",
    },
    {
        icon: Shield,
        title: "الشفافية والمصداقية",
        description: "نلتزم بأعلى معايير الإفصاح والتوثيق لبناء علاقات تجارية مستدامة",
        accent: "border-t-4 border-t-teal",
        iconBg: "bg-teal/10",
        iconColor: "text-teal",
    },
];

export default function Vision() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="vision" className="section-padding bg-dark-100/50 relative overflow-hidden">
            {/* Mesh background */}
            <div className="absolute inset-0 gradient-mesh pointer-events-none" />

            <div className="container-custom" ref={ref}>
                {/* Decorative quote */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-6"
                >
                    <span className="text-7xl md:text-9xl font-serif text-primary/15 leading-none select-none">"</span>
                </motion.div>

                {/* Vision statement */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-center max-w-4xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black leading-tight mb-5 text-balance">
                        <span className="text-foreground">تجارة </span>
                        <span className="text-gradient-gold">مُتاحة للجميع</span>
                        <span className="text-foreground">، </span>
                        <br className="hidden md:block" />
                        <span className="text-foreground">نمو حقيقي في </span>
                        <span className="text-gradient">أساسيات الحياة</span>
                    </h2>
                    <p className="text-muted text-base md:text-xl leading-relaxed max-w-2xl mx-auto">
                        نؤمن في شِلّة بأن التجارة الناجحة حقّ مشروع لكل فرد،
                        لا امتياز مقتصراً على الكبار
                    </p>
                </motion.div>

                {/* Value cards */}
                <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className={`bg-white rounded-2xl p-7 shadow-sm border border-dark-200/40 ${value.accent} hover:shadow-lg transition-all duration-300`}
                        >
                            <div className={`w-13 h-13 rounded-2xl ${value.iconBg} flex items-center justify-center mb-5 w-14 h-14`}>
                                <value.icon className={`w-7 h-7 ${value.iconColor}`} />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-3">{value.title}</h3>
                            <p className="text-muted leading-relaxed text-sm">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}