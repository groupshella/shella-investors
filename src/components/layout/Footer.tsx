/**
 * Footer Component - Dark background with grid texture, logo, nav columns,
 * social icons, and bottom bar with copyright and disclaimer.
 * @module components/layout/Footer
 */

"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, X, Link2 } from "lucide-react";

const navColumns = [
    {
        title: "المنصة",
        links: [
            { label: "من نحن", href: "#about" },
            { label: "رؤيتنا", href: "#vision" },
            { label: "قصتنا", href: "#story" },
            { label: "كيف تعمل", href: "#how-it-works" },
        ],
    },
    {
        title: "القانونية",
        links: [
            { label: "الإفصاح الكامل", href: "#disclosure" },
            { label: "شروط الاستخدام", href: "#terms" },
            { label: "سياسة الخصوصية", href: "#privacy" },
            { label: "عقد الوكالة", href: "#contract" },
        ],
    },
    {
        title: "الدعم",
        links: [
            { label: "الحاسبة الذكية", href: "#calculator" },
            { label: "الأسئلة الشائعة", href: "#faq" },
            { label: "مركز المساعدة", href: "#help" },
            { label: "تواصل معنا", href: "#contact" },
        ],
    },
];

const socialLinks = [
    { icon: X, href: "#", label: "تويتر" },
    { icon: Link2, href: "#", label: "لينكد إن" },
];

export default function Footer() {
    return (
        <footer className="relative bg-dark border-t border-gold/20">
            {/* Grid texture background */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,122,61,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,122,61,0.15) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative z-10">
                {/* Main Footer */}
                <div className="container-custom py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                        {/* Brand Column */}
                        <div className="lg:col-span-2">
                            <Link href="/" className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                                    <span className="text-gold font-bold text-xl">ش</span>
                                </div>
                                <span className="text-2xl font-bold text-foreground">شِلّة</span>
                            </Link>
                            <p className="text-muted leading-relaxed mb-6 max-w-sm">
                                شريكك التجاري في رحلة الشراكة الذكية والنمو المالي المستدام.
                                تجارة مُتاحة للجميع في قطاع المواد الغذائية والاستهلاكية.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-muted">
                                    <Mail className="w-4 h-4 text-gold" />
                                    <span className="text-sm">support@shella.sa</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted">
                                    <Phone className="w-4 h-4 text-gold" />
                                    <span className="text-sm">9200XXXXX</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted">
                                    <MapPin className="w-4 h-4 text-gold" />
                                    <span className="text-sm">الرياض، المملكة العربية السعودية</span>
                                </div>
                            </div>
                        </div>

                        {/* Nav Columns */}
                        {navColumns.map((column) => (
                            <div key={column.title}>
                                <h4 className="text-foreground font-semibold mb-4">{column.title}</h4>
                                <ul className="space-y-3">
                                    {column.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-muted hover:text-gold transition-colors text-sm"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-dark-200/20">
                    <div className="container-custom py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-6">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-muted hover:text-gold hover:bg-gold/10 transition-all"
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>

                            <p className="text-muted text-sm text-center">
                                © 2024 شِلّة. جميع الحقوق محفوظة.
                            </p>

                            <p className="text-muted/60 text-xs text-center md:text-right max-w-md">
                                النشاط خاضع لنظام التجارة ونظام المعاملات المدنية ونظام الوكالات التجارية في المملكة العربية السعودية
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}