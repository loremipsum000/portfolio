'use client';

import Image from 'next/image';
import {
    ArrowUpRight,
    BadgeDollarSign,
    CreditCard,
    LayoutDashboard,
    Link2,
    PlugZap,
    Rocket,
    ShieldCheck,
    WalletCards
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ModalImage {
    src: string;
    alt: string;
    title: string;
    description?: string;
}

interface HelioExperienceContentProps {
    onOpenImage: (images: ModalImage[], index: number) => void;
}

const moonPayArticle = 'https://www.moonpay.com/newsroom/helio-acquisition';
const reportedAmountSource = 'https://www.coindesk.com/business/2025/01/13/moon-pay-buys-crypto-payment-processor-helio-for-175-m';

const helioImages: ModalImage[] = [
    {
        src: '/media/helio/landing-page.png',
        alt: 'Helio landing page design',
        title: 'Landing page',
        description: 'Early brand and product positioning for subscription payments.'
    },
    {
        src: '/media/helio/dashboard-fade.png',
        alt: 'Helio merchant dashboard interface',
        title: 'Merchant dashboard',
        description: 'MVP dashboard for payments, balances, transactions, and activity.'
    },
    {
        src: '/media/helio/payment-builder.png',
        alt: 'Helio payment creation interface',
        title: 'Payment builder',
        description: 'Single payment creation with dynamic pricing, token swaps, and supported networks.'
    },
    {
        src: '/media/helio/embeds.png',
        alt: 'Helio embed and checkout integration visual',
        title: 'Embeds and APIs',
        description: 'Developer-facing integration surface for embedded crypto checkout.'
    },
    {
        src: '/media/helio/payment-confirmation.png',
        alt: 'Helio payment confirmation screen',
        title: 'Payment confirmation',
        description: 'Checkout confirmation flow for a Discord payment context.'
    },
    {
        src: '/media/helio/wallet.png',
        alt: 'Helio wallet asset overview interface',
        title: 'Helio wallet',
        description: 'Wallet view for supported assets, balances, and quick actions.'
    }
];

const stats = [
    { label: '6,000+ merchants', detail: 'Merchant and creator adoption' },
    { label: '$1.5B+ processed', detail: 'Transaction volume handled by Helio' },
    { label: 'Millions of users', detail: 'Consumer reach across checkout flows' }
];

const contributionItems: Array<{ label: string; detail: string; icon: LucideIcon }> = [
    {
        label: 'Initial brand',
        detail: 'Defined the early visual direction, product tone, and presentation layer.',
        icon: Rocket
    },
    {
        label: 'MVP product',
        detail: 'Designed the first merchant flows from dashboard to checkout creation.',
        icon: LayoutDashboard
    },
    {
        label: 'Checkout language',
        detail: 'Made crypto payments clearer through familiar commerce patterns.',
        icon: ShieldCheck
    }
];

const productSections: Array<{
    eyebrow: string;
    title: string;
    body: string;
    pov: string;
    imageIndex: number;
    icon: LucideIcon;
    layout?: 'image-left' | 'image-right';
}> = [
    {
        eyebrow: 'Product foundation',
        title: 'A merchant dashboard for the MVP',
        body: 'The dashboard had to make payment activity understandable from the first session. Pay Links, Pay Streams, balances, transactions, and address book entries were treated as operational tools rather than separate product experiments.',
        pov: 'My design focus was on giving merchants a clear starting point: what has been paid, what is active, what needs attention, and how quickly a new payment can be created.',
        imageIndex: 1,
        icon: LayoutDashboard,
        layout: 'image-right'
    },
    {
        eyebrow: 'Pay Links',
        title: 'Sell anything, anywhere',
        body: 'Pay Links made it possible to create shareable checkout links in minutes and receive payments in USDC and other digital currencies. This was one of the clearest MVP surfaces because it translated crypto payments into a familiar merchant action.',
        pov: 'From a product design perspective, the goal was to reduce the mental load around networks, tokens, swaps, and pricing while still keeping enough control for advanced sellers.',
        imageIndex: 2,
        icon: Link2,
        layout: 'image-left'
    },
    {
        eyebrow: 'Plug-Ins and Embed',
        title: 'Commerce integrations without a heavy setup',
        body: 'Helio needed to work where merchants already sold: Shopify, WooCommerce, websites, apps, and community platforms. Plug-ins and embeds extended the checkout beyond the dashboard and made the payment experience portable.',
        pov: 'The design work was not only the checkout interface. It also included making technical setup feel legible through structure, labels, states, and developer-facing examples.',
        imageIndex: 3,
        icon: PlugZap,
        layout: 'image-right'
    }
];

const checkoutSections = [
    {
        title: 'Pay with card',
        body: 'Traditional payment entry points made the product more approachable for non-crypto native customers. The merchant could still receive crypto while the payer used credit, debit, or bank transfer rails.',
        imageIndex: 4,
        icon: CreditCard
    },
    {
        title: 'Wallet context',
        body: 'The wallet view supported asset understanding, balance visibility, and payment confidence. It gave users a clearer sense of what they owned and how assets moved through checkout.',
        imageIndex: 5,
        icon: WalletCards
    }
];

const Section = ({
    eyebrow,
    title,
    children,
    className = ''
}: {
    eyebrow: string;
    title: string;
    children: ReactNode;
    className?: string;
}) => (
    <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className={`space-y-6 sm:space-y-8 ${className}`}
    >
        <div className="max-w-3xl">
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-[rgb(var(--theme-rgb))]">
                {eyebrow}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[var(--text-main)]">
                {title}
            </h2>
            <div className="mt-5 text-sm sm:text-base leading-relaxed text-[var(--text-muted)]">
                {children}
            </div>
        </div>
    </motion.section>
);

const Surface = ({
    children,
    className = ''
}: {
    children: ReactNode;
    className?: string;
}) => (
    <div className={`overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border-color)] bg-[var(--panel-bg)] backdrop-blur-md ${className}`}>
        {children}
    </div>
);

const ScreenshotButton = ({
    image,
    index,
    onOpenImage,
    aspect = '16/10',
    objectFit = 'cover',
    sizes = '100vw',
    className = ''
}: {
    image: ModalImage;
    index: number;
    onOpenImage: HelioExperienceContentProps['onOpenImage'];
    aspect?: string;
    objectFit?: 'cover' | 'contain';
    sizes?: string;
    className?: string;
}) => (
    <button
        type="button"
        onClick={() => onOpenImage(helioImages, index)}
        className={`group block w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border-color)] bg-[var(--panel-bg)] text-left backdrop-blur-md transition-all duration-300 hover:border-[rgb(var(--theme-rgb))]/60 ${className}`}
        aria-label={`Open ${image.title}`}
    >
        <div className="relative w-full bg-[var(--bg-main)]" style={{ aspectRatio: aspect }}>
            <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`${objectFit === 'contain' ? 'object-contain' : 'object-cover'} object-top transition-transform duration-500 group-hover:scale-[1.015]`}
                sizes={sizes}
            />
        </div>
        <div className="flex items-start justify-between gap-4 border-t border-[var(--border-color)] p-4 sm:p-5">
            <div>
                <div className="text-sm font-medium text-[var(--text-main)]">{image.title}</div>
                <div className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">{image.description}</div>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[rgb(var(--theme-rgb))]" />
        </div>
    </button>
);

const IntroPanel = () => (
    <Surface>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="border-b border-[var(--border-color)] p-5 sm:p-7 lg:border-b-0 lg:border-r">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-[rgb(var(--theme-rgb))]">
                    Founding product design
                </div>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[var(--text-main)]">
                    Initial brand and MVP built from zero in two months.
                </h2>
                <p className="mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--text-muted)]">
                    Helio simplifies crypto payments for merchants and creators by making checkout, payment links, embeds, and wallet flows easier to understand. My work focused on the first product expression: the brand, the MVP experience, and the core merchant surfaces that helped the product move from idea to usable payment platform.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                    <a
                        href={moonPayArticle}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full border border-[rgb(var(--theme-rgb))]/40 bg-[rgb(var(--theme-rgb))]/10 px-4 py-2 text-xs sm:text-sm text-[var(--text-main)] transition-all hover:border-[rgb(var(--theme-rgb))]/70"
                    >
                        <BadgeDollarSign className="h-4 w-4 text-[rgb(var(--theme-rgb))]" />
                        Reported $175M acquisition by MoonPay
                        <ArrowUpRight className="h-3.5 w-3.5 text-[var(--text-muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[rgb(var(--theme-rgb))]" />
                    </a>
                    <a
                        href={reportedAmountSource}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--panel-bg)] px-4 py-2 text-xs sm:text-sm text-[var(--text-muted)] transition-all hover:border-[rgb(var(--theme-rgb))]/60 hover:text-[rgb(var(--theme-rgb))]"
                    >
                        Reported amount source
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1">
                {stats.map((item) => (
                    <div key={item.label} className="border-b border-[var(--border-color)] p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b lg:border-r-0 lg:last:border-b-0">
                        <div className="font-mono text-xl sm:text-2xl text-[var(--text-main)]">{item.label}</div>
                        <div className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">{item.detail}</div>
                    </div>
                ))}
            </div>
        </div>
    </Surface>
);

const ContributionPanel = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contributionItems.map((item) => {
            const Icon = item.icon;

            return (
                <Surface key={item.label} className="p-5 sm:p-6">
                    <Icon className="mb-6 h-5 w-5 text-[rgb(var(--theme-rgb))]" />
                    <div className="text-sm font-medium text-[var(--text-main)]">{item.label}</div>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">{item.detail}</p>
                </Surface>
            );
        })}
    </div>
);

const ProductSection = ({
    section,
    onOpenImage
}: {
    section: (typeof productSections)[number];
    onOpenImage: HelioExperienceContentProps['onOpenImage'];
}) => {
    const Icon = section.icon;
    const image = helioImages[section.imageIndex];
    const imageFirst = section.layout === 'image-left';

    const copy = (
        <div className="flex flex-col justify-center p-5 sm:p-7">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--theme-rgb))]/40 bg-[rgb(var(--theme-rgb))]/10">
                <Icon className="h-5 w-5 text-[rgb(var(--theme-rgb))]" />
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-[rgb(var(--theme-rgb))]">
                {section.eyebrow}
            </div>
            <h3 className="mt-4 text-2xl sm:text-3xl font-light tracking-tight text-[var(--text-main)]">
                {section.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">{section.body}</p>
            <p className="mt-4 border-l border-[rgb(var(--theme-rgb))]/50 pl-4 text-sm leading-relaxed text-[var(--text-main)]">
                {section.pov}
            </p>
        </div>
    );

    const visual = (
        <div className="p-3 sm:p-4">
            <ScreenshotButton
                image={image}
                index={section.imageIndex}
                onOpenImage={onOpenImage}
                aspect={section.imageIndex === 2 ? '1024/930' : '16/10'}
                objectFit="contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="bg-[var(--bg-main)]"
            />
        </div>
    );

    return (
        <Surface>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {imageFirst ? visual : copy}
                <div className="border-t border-[var(--border-color)] lg:border-l lg:border-t-0">
                    {imageFirst ? copy : visual}
                </div>
            </div>
        </Surface>
    );
};

const CheckoutWalletPanel = ({ onOpenImage }: HelioExperienceContentProps) => (
    <div className="grid grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-2">
        {checkoutSections.map((section) => {
            const Icon = section.icon;
            const image = helioImages[section.imageIndex];

            return (
                <Surface key={section.title}>
                    <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-[rgb(var(--theme-rgb))]" />
                            <h3 className="text-xl sm:text-2xl font-light tracking-tight text-[var(--text-main)]">
                                {section.title}
                            </h3>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">{section.body}</p>
                    </div>
                    <div className="border-t border-[var(--border-color)] p-3 sm:p-4">
                        <ScreenshotButton
                            image={image}
                            index={section.imageIndex}
                            onOpenImage={onOpenImage}
                            aspect={section.imageIndex === 4 ? '687/1024' : '576/480'}
                            objectFit="contain"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="bg-[var(--bg-main)]"
                        />
                    </div>
                </Surface>
            );
        })}
    </div>
);

export default function HelioExperienceContent({ onOpenImage }: HelioExperienceContentProps) {
    return (
        <div className="space-y-16 sm:space-y-24">
            <IntroPanel />

            <Section
                eyebrow="MVP setup"
                title="A product language for crypto checkout"
            >
                <p>
                    The first version needed to explain crypto payments without making the merchant feel like they were configuring infrastructure. I worked on the brand, core interface patterns, payment creation flows, and checkout presentation so the product could be used and understood quickly.
                </p>
            </Section>

            <ContributionPanel />

            <Section
                eyebrow="Brand and positioning"
                title="The first public product surface"
            >
                <p>
                    The landing page established the early Helio identity and framed the product promise around simple billing, subscriptions, and invoices. It was the first place where the brand, checkout concept, and customer value had to feel coherent.
                </p>
            </Section>

            <ScreenshotButton
                image={helioImages[0]}
                index={0}
                onOpenImage={onOpenImage}
                aspect="1440/1024"
                sizes="100vw"
            />

            <div className="space-y-6 sm:space-y-8">
                {productSections.map((section) => (
                    <ProductSection key={section.title} section={section} onOpenImage={onOpenImage} />
                ))}
            </div>

            <Section
                eyebrow="Checkout and wallet"
                title="Trust, payment context, and asset clarity"
            >
                <p>
                    Checkout had to work for crypto-native users and for customers coming from traditional payment habits. The design work balanced speed, clarity, and confidence by making payment state, wallet context, fees, timing, and supported assets visible where they mattered.
                </p>
            </Section>

            <CheckoutWalletPanel onOpenImage={onOpenImage} />
        </div>
    );
}
