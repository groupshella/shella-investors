/**
 * Partnership Form Section - Glass-styled form with floating labels,
 * validation, loading states, and privacy note.
 * @module components/sections/PartnershipForm
 */

"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Check, Loader2, User, Phone, MapPin, MessageSquare } from "lucide-react";

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
    "其他",
];

const amountRanges = [
    { value: "1000-5000", label: "1,000 - 5,000 ريال" },
    { value: "5000-10000", label: "5,000 - 10,000 ريال" },
    { value: "10000-50000", label: "10,000 - 50,000 ريال" },
    { value: "50000+", label: "50,000+ ريال" },
];

export default function PartnershipForm() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        phone: "",
        city: "",
        amount: "",
        model: "horizontal",
        message: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.fullName.trim() || formData.fullName.length < 3) {
            newErrors.fullName = "الاسم الكامل مطلوب (3 أحرف على الأقل)";
        }

        if (!formData.phone.trim() || !/^05\d{8}$/.test(formData.phone)) {
            newErrors.phone = "رقم جوال سعودي صحيح مطلوب (05xxxxxxxx)";
        }

        if (!formData.city) {
            newErrors.city = "يرجى اختيار المدينة";
        }

        if (!formData.amount) {
            newErrors.amount = "يرجى اختيار نطاق الاستثمار";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    if (isSuccess) {
        return (
            <section id="partnership" className="section-padding bg-dark-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md mx-auto text-center card-glass p-12"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6"
                        >
                            <Check className="w-10 h-10 text-gold" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-foreground mb-4">تم إرسال طلبك بنجاح!</h3>
                        <p className="text-muted mb-8">
                            سنتواصل معك خلال 24 ساعة لتأكيد طلبك وإرشادك للخطوات التالية
                        </p>
                        <button
                            onClick={() => {
                                setIsSuccess(false);
                                setFormData({
                                    fullName: "",
                                    phone: "",
                                    city: "",
                                    amount: "",
                                    model: "horizontal",
                                    message: "",
                                });
                            }}
                            className="btn-primary"
                        >
                            تقديم طلب جديد
                        </button>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="partnership" className="section-padding bg-dark-50">
            <div className="container-custom" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <span className="section-eyebrow">
                        انضم إلينا
                    </span>
                    <h2 className="section-title">
                        ابدأ <span className="text-gradient">شراكتك التجارية</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-2xl mx-auto"
                >
                    <form onSubmit={handleSubmit} className="card-glass p-8 md:p-10 space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-muted text-sm mb-2">الاسم الكامل</label>
                            <div className="relative">
                                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => handleChange("fullName", e.target.value)}
                                    className={`w-full pr-12 pl-4 py-4 rounded-xl bg-primary/5 border ${errors.fullName ? "border-danger" : "border-dark-200/30"
                                        } text-foreground placeholder-dark-400 focus:border-gold/50 focus:outline-none transition-colors`}
                                    placeholder="محمد أحمد العبدالله"
                                />
                            </div>
                            <AnimatePresence>
                                {errors.fullName && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-danger text-sm mt-2"
                                    >
                                        {errors.fullName}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-muted text-sm mb-2">رقم الجوال</label>
                            <div className="relative">
                                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    className={`w-full pr-12 pl-4 py-4 rounded-xl bg-primary/5 border ${errors.phone ? "border-danger" : "border-dark-200/30"
                                        } text-foreground placeholder-dark-400 focus:border-gold/50 focus:outline-none transition-colors`}
                                    placeholder="05xxxxxxxx"
                                />
                            </div>
                            <AnimatePresence>
                                {errors.phone && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-danger text-sm mt-2"
                                    >
                                        {errors.phone}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* City & Amount */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-muted text-sm mb-2">المدينة</label>
                                <div className="relative">
                                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                    <select
                                        value={formData.city}
                                        onChange={(e) => handleChange("city", e.target.value)}
                                        className={`w-full pr-12 pl-4 py-4 rounded-xl bg-primary/5 border ${errors.city ? "border-danger" : "border-dark-200/30"
                                            } text-foreground focus:border-gold/50 focus:outline-none transition-colors appearance-none`}
                                    >
                                        <option value="" className="bg-dark-100">اختر المدينة</option>
                                        {cities.map((city) => (
                                            <option key={city} value={city} className="bg-dark-100">
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.city && <p className="text-danger text-sm mt-2">{errors.city}</p>}
                            </div>

                            <div>
                                <label className="block text-muted text-sm mb-2">نطاق الاستثمار</label>
                                <select
                                    value={formData.amount}
                                    onChange={(e) => handleChange("amount", e.target.value)}
                                    className={`w-full px-4 py-4 rounded-xl bg-primary/5 border ${errors.amount ? "border-danger" : "border-dark-200/30"
                                        } text-foreground focus:border-gold/50 focus:outline-none transition-colors appearance-none`}
                                >
                                    <option value="" className="bg-dark-100">اختر النطاق</option>
                                    {amountRanges.map((range) => (
                                        <option key={range.value} value={range.value} className="bg-dark-100">
                                            {range.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.amount && <p className="text-danger text-sm mt-2">{errors.amount}</p>}
                            </div>
                        </div>

                        {/* Model Preference */}
                        <div>
                            <label className="block text-muted text-sm mb-3">نموذج الاستثمار المفضل</label>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { id: "horizontal" as const, label: "النموذج الأفقي", desc: "حصص ثابتة" },
                                    { id: "vertical" as const, label: "النموذج الرأسي", desc: "نمو تراكمي" },
                                ].map((m) => (
                                    <button
                                        key={m.id}
                                        type="button"
                                        onClick={() => handleChange("model", m.id)}
                                        className={`p-4 rounded-xl border transition-all ${formData.model === m.id
                                                ? "border-gold bg-gold/10"
                                                : "border-dark-200/30 hover:border-dark-200/30"
                                            }`}
                                    >
                                        <div className={`font-semibold ${formData.model === m.id ? "text-gold" : "text-foreground"}`}>
                                            {m.label}
                                        </div>
                                        <div className="text-muted text-sm">{m.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-muted text-sm mb-2">رسالة إضافية (اختياري)</label>
                            <div className="relative">
                                <MessageSquare className="absolute right-4 top-4 w-5 h-5 text-muted" />
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => handleChange("message", e.target.value)}
                                    rows={4}
                                    className="w-full pr-12 pl-4 py-4 rounded-xl bg-primary/5 border border-dark-200/30 text-foreground placeholder-dark-400 focus:border-gold/50 focus:outline-none transition-colors resize-none"
                                    placeholder="أخبرنا أكثر عن أهدافك الاستثمارية..."
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full btn-gold flex items-center justify-center gap-2 disabled:opacity-70"
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

                        {/* Privacy Note */}
                        <p className="text-center text-muted text-sm">
                            بإرسال هذا الطلب، أنت توافق على{" "}
                            <a href="#terms" className="text-gold hover:underline">شروط الاستخدام</a>{" "}
                            و{" "}
                            <a href="#privacy" className="text-gold hover:underline">سياسة الخصوصية</a>
                        </p>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}