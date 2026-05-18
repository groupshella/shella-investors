"use client";

import { useCallback, useState } from "react";
import {
  initialPartnershipFormData,
  type FormErrors,
  type PartnershipFormData,
} from "@/types/partnershipForm";

export default function useFormHook() {
  const [formData, setFormData] = useState<PartnershipFormData>(initialPartnershipFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = useCallback((): boolean => {
    const e: FormErrors = {};
    if (!formData.fullName.trim() || formData.fullName.length < 3)
      e.fullName = "الاسم الكامل مطلوب (3 أحرف على الأقل)";
    if (!formData.phone.trim() || !/^05\d{8}$/.test(formData.phone))
      e.phone = "رقم جوال سعودي صحيح مطلوب (05xxxxxxxx)";
    if (!formData.latitude || !formData.longitude)
      e.location = "يرجى تحديد موقعك على الخريطة";
    if (!formData.amount)
      e.amount = "يرجى اختيار نطاق الاستثمار";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [formData]);

  const handleChange = useCallback((field: keyof PartnershipFormData, value: string) => {
    setFormData((p) => ({ ...p, [field]: value }));
    setErrors((p) => {
      if (!p[field]) return p;
      const next = { ...p };
      delete next[field];
      return next;
    });
  }, []);

  const resetForm = useCallback(() => {
    setIsSuccess(false);
    setFormData(initialPartnershipFormData);
    setErrors({});
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      setIsSubmitting(true);
      setErrors({});

      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            timestamp: Date.now(),
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          setErrors({ submit: "فشل إرسال الطلب. حاول مرة أخرى." });
          return;
        }

        setIsSuccess(true);
      } catch {
        setErrors({ submit: "فشل إرسال الطلب. تحقق من الاتصال وحاول مرة أخرى." });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validate],
  );

  return {
    formData,
    setFormData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
