"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { Send, Check, Loader2, User, Phone, MessageSquare, ArrowRightLeft, TrendingUp } from "lucide-react";
import useFormHook from "@/hooks/useFormHook";
import MapSection from "@/ui/MapSection";

const amountRanges = [
    { value: "1000-5000", label: "1,000 – 5,000 ريال" },
    { value: "5000-10000", label: "5,000 – 10,000 ريال" },
    { value: "10000-50000", label: "10,000 – 50,000 ريال" },
    { value: "50000+", label: "أكثر من 50,000 ريال" },
];

const modelOptions = [
    { id: "horizontal" as const, label: "الأفقي", sub: "حصص شهرية ثابتة", icon: ArrowRightLeft },
    { id: "vertical" as const, label: "الرأسي", sub: "نمو تراكمي", icon: TrendingUp },
];

export default function PartnershipForm() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(contentRef, { once: true, margin: "-80px" });

    const {
        formData,
        setFormData,
        errors,
        isSubmitting,
        isSuccess,
        handleChange,
        handleSubmit,
        resetForm,
    } = useFormHook();

    useEffect(() => {
        if (!isSuccess) return;

        const scrollToSection = () => {
            sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        };

        requestAnimationFrame(() => {
            requestAnimationFrame(scrollToSection);
        });
    }, [isSuccess]);

    if (isSuccess) {
        return (
            <section
                id="partnership"
                ref={sectionRef}
                className="section-padding bg-dark-100/50 scroll-mt-24"
            >
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md mx-auto text-center bg-white rounded-3xl border border-dark-200/50 shadow-lg p-10"
                        role="status"
                        aria-live="polite"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 220, damping: 16 }}
                            className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-5"
                        >
                            <Check className="w-10 h-10 text-primary" />
                        </motion.div>
                        <h3 className="text-2xl font-black text-foreground mb-3">تم إرسال طلبك!</h3>
                        <p className="text-muted mb-7 text-sm leading-relaxed">
                            سنتواصل معك خلال 24 ساعة لتأكيد طلبك وإرشادك للخطوات التالية
                        </p>
                        <button onClick={resetForm} className="btn-primary w-full">
                            تقديم طلب جديد
                        </button>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section
            id="partnership"
            ref={sectionRef}
            className="section-padding bg-dark-100/50 scroll-mt-24"
        >
            <div className="container-custom" ref={contentRef}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="section-header"
                >
                    <span className="section-eyebrow">انضم إلينا</span>
                    <h2 className="section-title">
                        ابدأ <span className="text-gradient">شراكتك التجارية</span>
                    </h2>
                    <p className="text-muted">أكمل بياناتك وسيتواصل معك فريقنا خلال 24 ساعة</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="max-w-2xl mx-auto"
                >
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-3xl border border-dark-200/50 shadow-sm p-6 sm:p-8 space-y-5"
                    >
                        <div>
                            <label className="block text-foreground text-sm font-semibold mb-2">الاسم الكامل</label>
                            <div className="relative">
                                <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted" />
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => handleChange("fullName", e.target.value)}
                                    placeholder="محمد أحمد العبدالله"
                                    className={`input-field pr-10 ${errors.fullName ? "input-error" : ""}`}
                                />
                            </div>
                            <AnimatePresence>
                                {errors.fullName && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-danger text-xs mt-1.5"
                                    >
                                        {errors.fullName}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.div className="relative">
                            <label className="block text-foreground text-sm font-semibold mb-2">رقم الجوال</label>
                            <motion.div className="relative">
                                <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted" />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    placeholder="05xxxxxxxx"
                                    className={`input-field pr-10 ${errors.phone ? "input-error" : ""}`}
                                    dir="ltr"
                                />
                            </motion.div>
                            <AnimatePresence>
                                {errors.phone && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-danger text-xs mt-1.5"
                                    >
                                        {errors.phone}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <MapSection form={formData} setForm={setFormData} error={errors.location} />

                        <motion.div className="relative">
                            <label className="block text-foreground text-sm font-semibold mb-2">نطاق الاستثمار</label>
                            <select
                                value={formData.amount}
                                onChange={(e) => handleChange("amount", e.target.value)}
                                className={`input-field appearance-none ${errors.amount ? "input-error" : ""}`}
                            >
                                <option value="">اختر النطاق</option>
                                {amountRanges.map((r) => (
                                    <option key={r.value} value={r.value}>{r.label}</option>
                                ))}
                            </select>
                            {errors.amount && <p className="text-danger text-xs mt-1.5">{errors.amount}</p>}
                        </motion.div>

                        <motion.div className="relative"    >
                            <label className="block text-foreground text-sm font-semibold mb-2.5">نموذج الاستثمار المفضل</label>
                            <motion.div className="grid grid-cols-2 gap-3">
                                {modelOptions.map((m) => (
                                    <button
                                        key={m.id}
                                        type="button"
                                        onClick={() => handleChange("model", m.id)}
                                        className={`p-4 rounded-xl border-2 text-right transition-all ${formData.model === m.id
                                            ? m.id === "horizontal"
                                                ? "border-primary bg-primary/8 text-primary"
                                                : "border-gold bg-gold/8 text-gold"
                                            : "border-dark-200/50 text-muted hover:border-dark-200"
                                            }`}
                                    >
                                        <motion.div className="flex items-center gap-2 mb-0.5">
                                            <m.icon className="w-4 h-4" />
                                            <span className="font-bold text-sm">{m.label}</span>
                                        </motion.div>
                                        <motion.div className="text-xs opacity-70">{m.sub}</motion.div>
                                    </button>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div className="relative"    >
                            <label className="block text-foreground text-sm font-semibold mb-2">
                                رسالة إضافية <span className="text-muted font-normal">(اختياري)</span>
                            </label>
                            <motion.div className="relative">
                                <MessageSquare className="absolute right-3.5 top-3.5 w-[18px] h-[18px] text-muted" />
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => handleChange("message", e.target.value)}
                                    rows={3}
                                    placeholder="أخبرنا أكثر عن أهدافك الاستثمارية..."
                                    className="input-field pr-10 resize-none"
                                />
                            </motion.div>
                        </motion.div>

                        {errors.submit && (
                            <p className="text-danger text-sm text-center">{errors.submit}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary w-full py-4 text-base rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    جاري الإرسال...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    إرسال الطلب
                                </>
                            )}
                        </button>

                        <p className="text-center text-muted text-xs">
                            بإرسال هذا الطلب، أنت توافق على{" "}
                            <a href="#terms" className="text-primary hover:underline font-medium">شروط الاستخدام</a>{" "}
                            و{" "}
                            <a href="#privacy" className="text-primary hover:underline font-medium">سياسة الخصوصية</a>
                        </p>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
