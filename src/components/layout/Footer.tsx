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
        <footer className="relative overflow-x-hidden bg-dark border-t border-gold/20 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {/* Grid texture background */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,122,61,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,122,61,0.15) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative z-10">
                {/* Main footer — px matches .section-padding; layout avoids awkward md:2-col mix */}
                <div className="container-custom px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
                    <div className="flex flex-col gap-10 sm:gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-14 xl:gap-16">
                        {/* Brand column */}
                        <div className="min-w-0 lg:max-w-md xl:max-w-lg shrink-0">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-3 mb-5 sm:mb-6 rounded-xl outline-none ring-gold/40 focus-visible:ring-2"
                            >

                                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white border border-dark-200/40">
                                    <img
                                        src="/favicon.ico"
                                        alt=""
                                        width={28}
                                        height={28}
                                        className="size-full object-contain"
                                        aria-hidden
                                    />
                                </div>
                                <span className="text-2xl font-bold text-foreground">شِلّة</span>
                            </Link>
                            <p className="mb-6 max-w-prose text-pretty text-muted leading-relaxed sm:max-w-sm">
                                شريكك التجاري في رحلة الشراكة الذكية والنمو المالي المستدام.
                                تجارة مُتاحة للجميع في قطاع المواد الغذائية والاستهلاكية.
                            </p>
                            <div className="space-y-3.5">
                                <div className="flex items-start gap-3 text-muted">
                                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                                    <span className="min-w-0 break-words text-sm leading-snug" dir="ltr">
                                        info@shellafood.com
                                    </span>
                                </div>
                                <div className="flex items-start gap-3 text-muted">
                                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                                    <span className="min-w-0 text-sm leading-snug" dir="ltr">
                                        0599966674
                                    </span>
                                </div>
                                <div className="flex items-start gap-3 text-muted">
                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                                    <span className="min-w-0 text-sm leading-snug">
                                        مدينه الرياض، مجمع ليسن فيالي، مبنى 13
                                    </span>
                                </div>
                            </div>
                        </div>

                        <nav
                            className="grid min-w-0 grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-10 md:grid-cols-3 lg:max-w-2xl lg:gap-x-10 xl:max-w-none"
                            aria-label="تذييل الصفحة"
                        >
                            {navColumns.map((column) => (
                                <div key={column.title} className="min-w-0">
                                    <h4 className="mb-3 text-sm font-semibold text-foreground sm:mb-4 sm:text-base">
                                        {column.title}
                                    </h4>
                                    <ul className="space-y-1 sm:space-y-2">
                                        {column.links.map((link) => (
                                            <li key={link.label}>
                                                <Link
                                                    href={link.href}
                                                    className="block rounded-md py-2 text-sm text-muted transition-colors hover:text-gold sm:py-1.5"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-dark-200/20">
                    <div className="container-custom px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                                <p className="order-2 text-center text-sm text-muted sm:order-1 sm:text-start">
                                    © 2026 شِلّة. جميع الحقوق محفوظة.
                                </p>
                                <div className="order-1 flex items-center justify-center gap-3 sm:order-2 sm:justify-end">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            aria-label={social.label}
                                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-muted transition-all hover:bg-gold/10 hover:text-gold"
                                        >
                                            <social.icon className="h-5 w-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <p className="max-w-prose text-pretty text-center text-xs leading-relaxed text-muted/60 sm:max-w-none sm:text-start md:max-w-3xl">
                                النشاط خاضع لنظام التجارة ونظام المعاملات المدنية ونظام الوكالات التجارية في المملكة العربية السعودية
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}