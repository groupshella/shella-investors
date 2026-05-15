/**
 * Disclosure Section - Accordion-style legal/risk items with warning header,
 * expandable content, and border-left accent on expanded items.
 * @module components/sections/Disclosure
 */

"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { AlertTriangle, ChevronDown, Shield, FileText, Scale, TrendingDown, Info } from "lucide-react";

interface DisclosureItem {
    id: string;
    icon: React.ElementType;
    title: string;
    content: string;
}

const items: DisclosureItem[] = [
    {
        id: "risk",
        icon: TrendingDown,
        title: "مخاطر الاستثمار",
        content: "الاستثمار في البضائع يحمل مخاطر مثل تقلبات الأسعار وتغيرات الطلب في السوق. العوائد المذكورة هي تقديرات مستهدفة وليست مضمونة. قد تتعرض قيمة البضاعة للارتفاع أو الانخفاض حسب ظروف السوق.",
    },
    {
        id: "returns",
        icon: Info,
        title: "العوائد المتوقعة",
        content: "نسبة العائد المستهدفة 4.5% شهرياً هي متوسط تقديري بناءً على أداء سابق، ضمن نطاق 3.5% إلى 5.5%. هذه الأرقام ليست وعداً بالربح وقد تختلف العوائد الفعلية صعوداً أو هبوطاً.",
    },
    {
        id: "legal",
        icon: Scale,
        title: "الإطار القانوني",
        content: "النشاط خاضع لنظام التجارة ونظام المعاملات المدنية ونظام الوكالات التجارية في المملكة العربية السعودية. ملكية البضاعة تعود للمستثمر بفاتورة شراء رسمية موثقة.",
    },
    {
        id: "insurance",
        icon: Shield,
        title: "التأمين والحماية",
        content: "البضاعة مؤمنة لدى شركات تأمين مرخصة من البنك المركزي السعودي. التأمين يغطي المخاطر الأساسية وفق شروط وثيقة التأمين المعتمدة.",
    },
    {
        id: "withdrawal",
        icon: FileText,
        title: "شروط الاسترداد",
        content: "يمكن استرداد البضاعة عيناً أو نقداً وفق قيمتها السوقية حسب شروط عقد الوكالة بالبيع. قد تستغرق عملية الاسترداد فترة تصل إلى 14 يوم عمل.",
    },
];

export default function Disclosure() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleItem = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section id="disclosure" className="section-padding bg-dark-100 relative">
            <div className="container-custom" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Warning Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex items-center gap-4 mb-12 p-6 rounded-2xl bg-warning-light border border-warning/30"
                    >
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-6 h-6 text-warning" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-warning mb-1">إفصاح قانوني ومخاطر</h2>
                            <p className="text-muted text-sm">
                                يرجى قراءة المعلومات التالية بعناية قبل اتخاذ قرار الاستثمار
                            </p>
                        </div>
                    </motion.div>

                    {/* Accordion Items */}
                    <div className="space-y-4">
                        {items.map((item, index) => {
                            const isExpanded = expandedId === item.id;

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                    className={`rounded-xl border transition-all duration-300 ${isExpanded
                                            ? "border-gold/20 bg-primary/5"
                                            : "border-dark-200/30 bg-primary/5"
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleItem(item.id)}
                                        className="w-full flex items-center gap-4 p-6 text-right"
                                    >
                                        {/* Left border accent when expanded */}
                                        <div className={`absolute right-0 top-4 bottom-4 w-1 rounded-full transition-all duration-300 ${isExpanded ? "bg-gold opacity-100" : "bg-transparent opacity-0"
                                            }`} />

                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isExpanded ? "bg-gold/10" : "bg-primary/5"
                                            }`}>
                                            <item.icon className={`w-5 h-5 transition-colors ${isExpanded ? "text-gold" : "text-muted"
                                                }`} />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className={`font-semibold transition-colors ${isExpanded ? "text-gold" : "text-foreground"
                                                }`}>
                                                {item.title}
                                            </h3>
                                        </div>

                                        <ChevronDown className={`w-5 h-5 text-muted transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                                            }`} />
                                    </button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 pb-6 pr-20">
                                                    <p className="text-muted leading-relaxed">
                                                        {item.content}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Bottom Note */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.8 }}
                        className="text-center text-muted text-sm mt-12"
                    >
                        قبل التعاقد، يتم توقيع إقرار رسمي يثبت فهمك التام لطبيعة النشاط التجاري والمخاطر المرتبطة به
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}