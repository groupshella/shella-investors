"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Rocket, TrendingUp, Award, Crown } from "lucide-react";

interface Milestone {
    year: string;
    title: string;
    description: string;
    icon: React.ElementType;
    current?: boolean;
}

const milestones: Milestone[] = [
    {
        year: "النواة",
        title: "نواة تجارية للأفراد",
        description:
            "انطلقنا إيماناً بأن التجارة ليست حِكراً على المؤسسات الكبرى. \"شِلّة\" هي النواة الأولى للأفراد الراغبين في بناء حضور تجاري بثقة.",
        icon: Lightbulb,
    },
    {
        year: "النماذج",
        title: "نماذج تجارية مبتكرة",
        description:
            "نواكب تطوّرات السوق، ونُقدّم نماذج وخطط تجارية متطوّرة، لدعم الاقتصاد الوطني وتحقيق مستهدفات رؤية المملكة 2030 في تطوير القطاع التجاري.",
        icon: Rocket,
    },
    {
        year: "المدخرات",
        title: "توجيه المدخرات نحو بناء الثروات",
        description:
            "نسعى لتوجيه مدخرات الأفراد نحو تملّك بضائع حقيقية بفواتير موثّقة، تُسهم في بناء ثرواتهم عبر هامش ربح مستهدف من حركة بيع فعلية.",
        icon: TrendingUp,
    },
    {
        year: "المرونة",
        title: "مرونة في الدخول والخروج",
        description:
            "نؤمن بضرورة توفير بيئة تجارية مرنة، تُتيح للملاك سهولة دخول الشراكة والخروج منها، عبر استرداد البضاعة عيناً أو نقداً وفق قيمتها السوقية.",
        icon: Award,
    },
    {
        year: "محلياً",
        title: "دعم الاقتصاد المحلي",
        description:
            "نُسهم في تعزيز الناتج المحلي عبر تأسيس سوق متكامل لتجارة المواد الاستهلاكية والغذائية، وهي أساسيات تُلامس احتياجات كل أسرة سعودية.",
        icon: Crown,
        current: true,
    },
];

export default function Story() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="story" className="section-padding bg-dark-100/50 relative overflow-hidden">
            <div className="absolute inset-0 gradient-mesh pointer-events-none" />

            <div className="container-custom" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="section-header"
                >
                    <span className="section-eyebrow">قصتنا</span>
                    <h2 className="section-title">
                        رحلة <span className="text-gradient">بناء المستقبل</span>
                    </h2>
                </motion.div>

                {/* Desktop: Horizontal Timeline */}
                <div className="hidden lg:block relative">
                    {/* Connecting line */}
                    <div className="absolute top-[52px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                    <div className="flex justify-between items-start gap-3">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 24 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.15 + index * 0.12 }}
                                className="relative flex-1 text-center"
                            >
                                {/* Icon node */}
                                <div className={`relative z-10 w-[52px] h-[52px] mx-auto mb-5 rounded-2xl flex items-center justify-center border-2 transition-all ${milestone.current
                                    ? "bg-gradient-to-br from-primary to-primary-dark border-primary/30 shadow-lg shadow-primary/30"
                                    : "bg-white border-dark-200/60 shadow-sm"
                                    }`}>
                                    {milestone.current && (
                                        <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping" />
                                    )}
                                    <milestone.icon className={`w-6 h-6 relative z-10 ${milestone.current ? "text-white" : "text-muted"}`} />
                                </div>

                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${milestone.current
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "bg-dark-100 text-muted border border-dark-200/50"
                                    }`}>
                                    {milestone.year}
                                </span>

                                <h3 className={`text-base font-bold mb-2 ${milestone.current ? "text-primary" : "text-foreground"}`}>
                                    {milestone.title}
                                </h3>
                                <p className="text-muted text-xs leading-relaxed px-1">{milestone.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile: Vertical Timeline */}
                <div className="lg:hidden relative">
                    <div className="absolute right-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

                    <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 24 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.45, delay: 0.15 + index * 0.08 }}
                                className="relative flex items-start gap-5 pr-16"
                            >
                                {/* Node */}
                                <div className={`absolute right-3 top-0 w-10 h-10 rounded-xl flex items-center justify-center border ${milestone.current
                                    ? "bg-gradient-to-br from-primary to-primary-dark border-primary/30 shadow-md shadow-primary/25"
                                    : "bg-white border-dark-200/60"
                                    }`}>
                                    <milestone.icon className={`w-5 h-5 ${milestone.current ? "text-white" : "text-muted"}`} />
                                </div>

                                <div className="flex-1">
                                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold mb-2 ${milestone.current
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "bg-dark-100 text-muted"
                                        }`}>
                                        {milestone.year}
                                    </span>
                                    <h3 className={`text-base font-bold mb-1.5 ${milestone.current ? "text-primary" : "text-foreground"}`}>
                                        {milestone.title}
                                    </h3>
                                    <p className="text-muted text-sm leading-relaxed">{milestone.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}