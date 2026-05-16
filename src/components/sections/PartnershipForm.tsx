"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Check, Loader2, User, Phone, MapPin, MessageSquare, ArrowRightLeft, TrendingUp } from "lucide-react";

interface FormData {
    fullName: string;
    phone: string;
    city: string;
    amount: string;
    model: "horizontal" | "vertical";
    message: string;
}

interface FormErrors {
    [key: string]: string;
}

const cities = [
    "الرياض",
    "جدة",
    "مكة المكرمة",
    "المدينة المنورة",
    "الدمام",
    "الخبر",
    "الطائف",
    "تبوك",
    "أبها",
    "خميس مشيط",
    "أخرى",
];

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
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    const [formData, setFormData] = useState<FormData>({
        fullName: "", phone: "", city: "", amount: "", model: "horizontal", message: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = (): boolean => {
        const e: FormErrors = {};
        if (!formData.fullName.trim() || formData.fullName.length < 3)
            e.fullName = "الاسم الكامل مطلوب (3 أحرف على الأقل)";
        if (!formData.phone.trim() || !/^05\d{8}$/.test(formData.phone))
            e.phone = "رقم جوال سعودي صحيح مطلوب (05xxxxxxxx)";
        if (!formData.city)
            e.city = "يرجى اختيار المدينة";
        if (!formData.amount)
            e.amount = "يرجى اختيار نطاق الاستثمار";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        await new Promise((r) => setTimeout(r, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((p) => ({ ...p, [field]: value }));
        if (errors[field]) setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
    };

    if (isSuccess) {
        return (
            <section id="partnership" className="section-padding bg-dark-100/50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md mx-auto text-center bg-white rounded-3xl border border-dark-200/50 shadow-lg p-10"
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
                        <button
                            onClick={() => {
                                setIsSuccess(false);
                                setFormData({ fullName: "", phone: "", city: "", amount: "", model: "horizontal", message: "" });
                            }}
                            className="btn-primary w-full"
                        >
                            تقديم طلب جديد
                        </button>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="partnership" className="section-padding bg-dark-100/50">
            <div className="container-custom" ref={ref}>
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
                        {/* Full Name */}
                        <div>
                            <label className="block text-foreground text-sm font-semibold mb-2">الاسم الكامل</label>
                            <div className="relative">
                                <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted w-[18px] h-[18px]" />
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

                        {/* Phone */}
                        <div>
                            <label className="block text-foreground text-sm font-semibold mb-2">رقم الجوال</label>
                            <div className="relative">
                                <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted" />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    placeholder="05xxxxxxxx"
                                    className={`input-field pr-10 ${errors.phone ? "input-error" : ""}`}
                                    dir="ltr"
                                />
                            </div>
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
                        </div>

                        {/* City & Amount */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-foreground text-sm font-semibold mb-2">المدينة</label>
                                <div className="relative">
                                    <MapPin className="absolute right-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted pointer-events-none" />
                                    <select
                                        value={formData.city}
                                        onChange={(e) => handleChange("city", e.target.value)}
                                        className={`input-field pr-10 appearance-none ${errors.city ? "input-error" : ""}`}
                                    >
                                        <option value="">اختر المدينة</option>
                                        {cities.map((city) => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.city && <p className="text-danger text-xs mt-1.5">{errors.city}</p>}
                            </div>

                            <div>
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
                            </div>
                        </div>

                        {/* Model */}
                        <div>
                            <label className="block text-foreground text-sm font-semibold mb-2.5">نموذج الاستثمار المفضل</label>
                            <div className="grid grid-cols-2 gap-3">
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
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <m.icon className="w-4 h-4" />
                                            <span className="font-bold text-sm">{m.label}</span>
                                        </div>
                                        <div className="text-xs opacity-70">{m.sub}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-foreground text-sm font-semibold mb-2">
                                رسالة إضافية <span className="text-muted font-normal">(اختياري)</span>
                            </label>
                            <div className="relative">
                                <MessageSquare className="absolute right-3.5 top-3.5 w-[18px] h-[18px] text-muted" />
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => handleChange("message", e.target.value)}
                                    rows={3}
                                    placeholder="أخبرنا أكثر عن أهدافك الاستثمارية..."
                                    className="input-field pr-10 resize-none"
                                />
                            </div>
                        </div>

                        {/* Submit */}
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

                        {/* Privacy */}
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