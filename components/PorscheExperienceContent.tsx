'use client';

import Image from 'next/image';
import {
    ArrowUpRight,
    Check,
    CheckCircle2,
    ChevronDown,
    Code2,
    FileText,
    GitBranch,
    Layers,
    MonitorSmartphone,
    PenTool,
    Workflow
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

interface ModalImage {
    src: string;
    alt: string;
    title: string;
    description?: string;
}

interface PorscheExperienceContentProps {
    onOpenImage: (images: ModalImage[], index: number) => void;
}

const iconographyImages: ModalImage[] = [
    {
        src: '/media/porsche-digital/iconography-light.jpg',
        alt: 'Light mode iconography library mockup',
        title: 'Iconography library, light mode',
        description: 'Grouped icon families prepared for light interface contexts.'
    },
    {
        src: '/media/porsche-digital/iconography-dark.jpg',
        alt: 'Dark mode iconography library mockup',
        title: 'Iconography library, dark mode',
        description: 'Grouped icon families prepared for dark interface contexts.'
    }
];

const pdsScreenshots: ModalImage[] = [
    {
        src: '/media/porsche-digital/v4-screenshots/pds-v4-home.png',
        alt: 'Porsche Design System v4 landing page screenshot',
        title: 'Porsche Design System v4',
        description: 'Current public entry point for the design system documentation.'
    },
    {
        src: '/media/porsche-digital/v4-screenshots/pds-v4-components.png',
        alt: 'Porsche Design System v4 components overview screenshot',
        title: 'Component overview',
        description: 'Public component inventory showing the breadth of reusable interface primitives.'
    },
    {
        src: '/media/porsche-digital/v4-screenshots/pds-v4-multi-select.png',
        alt: 'Porsche Design System v4 multi select configurator screenshot',
        title: 'Multi Select configurator',
        description: 'Configurator view with live component example, properties, and implementation snippet.'
    }
];

const scopeItems: Array<{ label: string; detail: string; icon: LucideIcon }> = [
    { label: 'Figma libraries', detail: 'Reusable components, variants, and styles', icon: PenTool },
    { label: 'Coded components', detail: 'React, Kotlin, and Swift implementation alignment', icon: Code2 },
    { label: 'Documentation', detail: 'Usage guidance, decisions, and handoff notes', icon: FileText },
    { label: 'Product teams', detail: 'Adoption support across digital product surfaces', icon: MonitorSmartphone },
    { label: 'Brand guidance', detail: 'Consistency across interface and marketing contexts', icon: Layers }
];

const workflowSteps = [
    'Request',
    'Review',
    'Design update',
    'Implementation',
    'Documentation',
    'Adoption'
];

const qualityItems: Array<{ label: string; detail: string }> = [
    { label: 'Accessibility', detail: 'Interaction states, contrast, keyboard behavior, and readable structure.' },
    { label: 'Responsiveness', detail: 'Components and iconography checked across product breakpoints.' },
    { label: 'Theme support', detail: 'Light and dark mode usage reviewed as part of library maintenance.' },
    { label: 'Naming', detail: 'Clear component and icon categories to reduce interpretation.' },
    { label: 'Documentation', detail: 'Usage rules made available where teams needed implementation guidance.' },
    { label: 'Parity', detail: 'Figma and code repositories kept close enough for reliable handoff.' }
];

const referenceLinks = [
    {
        title: 'Porsche Design System v4',
        description: 'Current public documentation surface for Porsche digital product UI.',
        href: 'https://designsystem.porsche.com/v4/'
    },
    {
        title: 'Start Designing',
        description: 'Figma libraries, design tooling, and onboarding guidance.',
        href: 'https://designsystem.porsche.com/v4/designing/introduction/'
    },
    {
        title: 'Start Developing',
        description: 'Framework packages and implementation entry points.',
        href: 'https://designsystem.porsche.com/v4/developing/introduction/'
    },
    {
        title: 'Accessibility',
        description: 'Public accessibility guidance and quality criteria.',
        href: 'https://designsystem.porsche.com/v4/accessibility-statement/'
    }
];

const multiSelectOptions = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
    { value: 'd', label: 'Option D' },
    { value: 'e', label: 'Option E' },
    { value: 'f', label: 'Option F' }
];

const codeSnippets: Record<string, string> = {
    'Vanilla JS': `<p-multi-select name="name" label="Some Label" description="Some description">
  <p-multi-select-option value="a">Option A</p-multi-select-option>
  <p-multi-select-option value="b">Option B</p-multi-select-option>
  <p-multi-select-option value="c">Option C</p-multi-select-option>
  <p-multi-select-option value="d">Option D</p-multi-select-option>
</p-multi-select>`,
    React: `<PMultiSelect name="name" label="Some Label" description="Some description">
  <PMultiSelectOption value="a">Option A</PMultiSelectOption>
  <PMultiSelectOption value="b">Option B</PMultiSelectOption>
  <PMultiSelectOption value="c">Option C</PMultiSelectOption>
  <PMultiSelectOption value="d">Option D</PMultiSelectOption>
</PMultiSelect>`,
    Angular: `<p-multi-select name="name" label="Some Label" description="Some description">
  <p-multi-select-option value="a">Option A</p-multi-select-option>
  <p-multi-select-option value="b">Option B</p-multi-select-option>
  <p-multi-select-option value="c">Option C</p-multi-select-option>
  <p-multi-select-option value="d">Option D</p-multi-select-option>
</p-multi-select>`,
    Vue: `<p-multi-select name="name" label="Some Label" description="Some description">
  <p-multi-select-option value="a">Option A</p-multi-select-option>
  <p-multi-select-option value="b">Option B</p-multi-select-option>
  <p-multi-select-option value="c">Option C</p-multi-select-option>
  <p-multi-select-option value="d">Option D</p-multi-select-option>
</p-multi-select>`
};

const snippetNames = Object.keys(codeSnippets);

const Section = ({
    eyebrow,
    title,
    children,
    visual
}: {
    eyebrow: string;
    title: string;
    children: ReactNode;
    visual: ReactNode;
}) => (
    <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="space-y-6 sm:space-y-8"
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
        {visual}
    </motion.section>
);

const Surface = ({
    children,
    className = ''
}: {
    children: ReactNode;
    className?: string;
}) => (
    <div
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border-color)] bg-[var(--panel-bg)] backdrop-blur-md ${className}`}
    >
        <div className="relative z-10">{children}</div>
    </div>
);

const SystemScopePanel = () => (
    <Surface>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr]">
            <div className="border-b lg:border-b-0 lg:border-r border-[var(--border-color)] p-5 sm:p-7">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    System scope
                </div>
                <div className="mt-6 rounded-2xl border border-[rgb(var(--theme-rgb))]/40 bg-[rgb(var(--theme-rgb))]/10 p-5">
                    <div className="flex items-center gap-3 text-[var(--text-main)]">
                        <Workflow className="h-5 w-5 text-[rgb(var(--theme-rgb))]" />
                        <span className="font-medium">Shared product language</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                        A single operating layer for design, implementation, and adoption across product surfaces.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
                {scopeItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.label}
                            className={`p-5 sm:p-6 ${index < 3 ? 'border-b' : ''} ${index % 2 === 0 ? 'sm:border-r' : ''} border-[var(--border-color)]`}
                        >
                            <Icon className="mb-5 h-5 w-5 text-[rgb(var(--theme-rgb))]" />
                            <div className="text-sm font-medium text-[var(--text-main)]">{item.label}</div>
                            <div className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">{item.detail}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    </Surface>
);

const GovernanceWorkflow = () => (
    <Surface className="p-5 sm:p-7">
        <div className="grid grid-cols-1 md:grid-cols-6">
            {workflowSteps.map((step, index) => (
                <div
                    key={step}
                    className="relative border-b md:border-b-0 md:border-r last:border-0 border-[var(--border-color)] px-0 py-5 md:px-4 md:py-0"
                >
                    <div className="flex md:block items-center gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgb(var(--theme-rgb))]/40 bg-[rgb(var(--theme-rgb))]/10 font-mono text-xs text-[rgb(var(--theme-rgb))]">
                            {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="md:mt-5">
                            <div className="text-sm font-medium text-[var(--text-main)]">{step}</div>
                            <div className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                                {index === 0 && 'Need or gap identified by a product team.'}
                                {index === 1 && 'Fit checked against existing system patterns.'}
                                {index === 2 && 'Component, variant, or usage guidance refined.'}
                                {index === 3 && 'Engineering alignment across target platforms.'}
                                {index === 4 && 'Rules captured for future handoff and reuse.'}
                                {index === 5 && 'Teams supported through application and rollout.'}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </Surface>
);

const FigmaCodeDiagram = () => (
    <Surface>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr]">
            <div className="border-b lg:border-b-0 lg:border-r border-[var(--border-color)] p-5 sm:p-7">
                <div className="flex items-center gap-3 text-[var(--text-main)]">
                    <PenTool className="h-5 w-5 text-[rgb(var(--theme-rgb))]" />
                    <span className="font-medium">Figma library</span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                    {['Variants', 'States', 'Responsive rules', 'Usage notes'].map((item) => (
                        <div key={item} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)]/40 p-3 text-xs text-[var(--text-muted)]">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-5 sm:p-7">
                <div className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    <GitBranch className="h-4 w-4" />
                    Implementation paths
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: 'React', detail: 'Web components and product interfaces' },
                        { label: 'Kotlin', detail: 'Android product implementation' },
                        { label: 'Swift', detail: 'iOS product implementation' }
                    ].map((item) => (
                        <div key={item.label} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-main)]/50 p-4">
                            <Code2 className="mb-5 h-5 w-5 text-[rgb(var(--theme-rgb))]" />
                            <div className="font-mono text-sm text-[var(--text-main)]">{item.label}</div>
                            <div className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">{item.detail}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-5 rounded-2xl border border-[var(--border-color)] bg-black/80 p-4 font-mono text-xs leading-relaxed text-zinc-300">
                    <div className="text-zinc-500">system.check()</div>
                    <div><span className="text-[rgb(var(--theme-rgb))]">variants</span> aligned across design and code</div>
                    <div><span className="text-[rgb(var(--theme-rgb))]">states</span> reviewed before reuse</div>
                    <div><span className="text-[rgb(var(--theme-rgb))]">handoff</span> documented for product teams</div>
                </div>
            </div>
        </div>
    </Surface>
);

const IconographyShowcase = ({ onOpenImage }: PorscheExperienceContentProps) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {iconographyImages.map((image, index) => (
            <button
                key={image.src}
                type="button"
                onClick={() => onOpenImage(iconographyImages, index)}
                className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border-color)] bg-[var(--panel-bg)] text-left backdrop-blur-md transition-all duration-300 hover:border-[rgb(var(--theme-rgb))]/60"
                aria-label={`Open ${image.title}`}
            >
                <div className="relative aspect-[3072/2240] w-full bg-[var(--bg-main)]">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-[var(--border-color)] p-4 sm:p-5">
                    <div>
                        <div className="text-sm font-medium text-[var(--text-main)]">{image.title}</div>
                        <div className="mt-1 text-xs text-[var(--text-muted)]">{image.description}</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[rgb(var(--theme-rgb))]" />
                </div>
            </button>
        ))}
    </div>
);

const QualityMatrix = () => (
    <Surface>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {qualityItems.map((item) => (
                <div key={item.label} className="border-b border-r border-[var(--border-color)] p-5 sm:p-6 last:border-b-0">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[rgb(var(--theme-rgb))]" />
                        <div className="text-sm font-medium text-[var(--text-main)]">{item.label}</div>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">{item.detail}</p>
                </div>
            ))}
        </div>
    </Surface>
);

const ReferenceCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {referenceLinks.map((link) => (
            <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-[var(--border-color)] bg-[var(--panel-bg)] p-5 backdrop-blur-md transition-all duration-300 hover:border-[rgb(var(--theme-rgb))]/60"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="text-sm font-medium text-[var(--text-main)]">{link.title}</div>
                        <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">{link.description}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[rgb(var(--theme-rgb))]" />
                </div>
            </a>
        ))}
    </div>
);

const PdsScreenshotGallery = ({ onOpenImage }: PorscheExperienceContentProps) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {pdsScreenshots.map((image, index) => (
            <button
                key={image.src}
                type="button"
                onClick={() => onOpenImage(pdsScreenshots, index)}
                className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border-color)] bg-[var(--panel-bg)] text-left backdrop-blur-md transition-all duration-300 hover:border-[rgb(var(--theme-rgb))]/60"
                aria-label={`Open ${image.title}`}
            >
                <div className="relative aspect-[16/11] w-full bg-[var(--bg-main)]">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 33vw"
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
        ))}
    </div>
);

const MultiSelectSpecimen = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedValues, setSelectedValues] = useState<string[]>(['a', 'c']);
    const [activeSnippet, setActiveSnippet] = useState(snippetNames[0]);

    const selectedLabels = multiSelectOptions
        .filter((option) => selectedValues.includes(option.value))
        .map((option) => option.label);

    const filteredOptions = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) return multiSelectOptions;

        return multiSelectOptions.filter((option) => option.label.toLowerCase().includes(normalizedQuery));
    }, [query]);

    const toggleValue = (value: string) => {
        setSelectedValues((currentValues) => (
            currentValues.includes(value)
                ? currentValues.filter((currentValue) => currentValue !== value)
                : [...currentValues, value]
        ));
    };

    return (
        <Surface>
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="border-b lg:border-b-0 lg:border-r border-[var(--border-color)] p-5 sm:p-7">
                    <div className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        Live component specimen
                    </div>
                    <div className="mt-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-main)]/40 p-5 sm:p-6">
                        <label className="block text-sm font-medium text-[var(--text-main)]" htmlFor="porsche-multi-select-search">
                            Some Label
                        </label>
                        <div className="mt-1 text-xs text-[var(--text-muted)]">Some description</div>
                        <button
                            type="button"
                            onClick={() => setIsOpen((open) => !open)}
                            className="mt-4 flex min-h-[52px] w-full items-center justify-between gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--panel-bg)] px-4 py-3 text-left text-sm text-[var(--text-main)] transition-colors hover:border-[rgb(var(--theme-rgb))]/60"
                            aria-expanded={isOpen}
                            aria-controls="porsche-multi-select-options"
                        >
                            <span className={selectedLabels.length ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}>
                                {selectedLabels.length ? selectedLabels.join(', ') : 'Select options'}
                            </span>
                            <ChevronDown className={`h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isOpen && (
                            <div
                                id="porsche-multi-select-options"
                                className="mt-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-main)] p-3 shadow-2xl"
                            >
                                <input
                                    id="porsche-multi-select-search"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Filter options"
                                    className="mb-3 w-full rounded-xl border border-[var(--border-color)] bg-[var(--panel-bg)] px-3 py-2 text-sm text-[var(--text-main)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[rgb(var(--theme-rgb))]/70"
                                />
                                <div className="max-h-56 overflow-y-auto pr-1">
                                    {filteredOptions.length ? filteredOptions.map((option) => {
                                        const isSelected = selectedValues.includes(option.value);

                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => toggleValue(option.value)}
                                                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-[var(--text-main)] transition-colors hover:bg-[rgb(var(--theme-rgb))]/10"
                                            >
                                                {option.label}
                                                <span className={`flex h-5 w-5 items-center justify-center rounded border ${isSelected ? 'border-[rgb(var(--theme-rgb))] bg-[rgb(var(--theme-rgb))] text-white' : 'border-[var(--border-color)] text-transparent'}`}>
                                                    <Check className="h-3.5 w-3.5" />
                                                </span>
                                            </button>
                                        );
                                    }) : (
                                        <div className="px-3 py-6 text-center text-sm text-[var(--text-muted)]">
                                            No results found
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="mt-4 flex flex-wrap gap-2">
                            {selectedLabels.map((label) => (
                                <span
                                    key={label}
                                    className="rounded-full border border-[rgb(var(--theme-rgb))]/30 bg-[rgb(var(--theme-rgb))]/10 px-3 py-1 text-xs text-[var(--text-main)]"
                                >
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-5 sm:p-7">
                    <div className="mb-5 flex flex-wrap gap-2">
                        {snippetNames.map((name) => (
                            <button
                                key={name}
                                type="button"
                                onClick={() => setActiveSnippet(name)}
                                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${activeSnippet === name ? 'bg-[var(--text-main)] text-[var(--bg-main)]' : 'bg-[var(--panel-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                    <pre className="max-h-[420px] overflow-auto rounded-2xl border border-[var(--border-color)] bg-black/85 p-4 text-xs leading-relaxed text-zinc-200">
                        <code>{codeSnippets[activeSnippet]}</code>
                    </pre>
                    <a
                        href="https://designsystem.porsche.com/v4/components/multi-select/configurator/"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-xs text-[var(--text-muted)] transition-colors hover:text-[rgb(var(--theme-rgb))]"
                    >
                        Open canonical v4 Multi Select documentation
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                </div>
            </div>
        </Surface>
    );
};

export default function PorscheExperienceContent({ onOpenImage }: PorscheExperienceContentProps) {
    return (
        <div className="space-y-16 sm:space-y-24">
            <motion.section
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-4xl"
            >
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-[rgb(var(--theme-rgb))]">
                    Case study
                </div>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[var(--text-main)]">
                    Design system management and iconography development
                </h2>
            </motion.section>

            <Section
                eyebrow="Reference"
                title="Public v4 documentation surface"
                visual={<PdsScreenshotGallery onOpenImage={onOpenImage} />}
            >
                <p>
                    The public v4 documentation gives useful context for the scale of the system: an entry point for designers and developers, a component inventory, and individual configurator pages that combine behavior, properties, accessibility notes, and implementation examples.
                </p>
            </Section>

            <Section
                eyebrow="Component specimen"
                title="Multi Select as a system component"
                visual={<MultiSelectSpecimen />}
            >
                <p>
                    Multi Select is a good example of the kind of component that needs both product behavior and implementation discipline. The component has a visible label and description, searchable options, selected values, framework snippets, and a canonical documentation route for implementation details.
                </p>
            </Section>

            <Section
                eyebrow="01 / Scope"
                title="System work across product surfaces"
                visual={<SystemScopePanel />}
            >
                <p>
                    At Porsche Digital Croatia, my work focused on design system management for Porsche digital products. I worked across component libraries, documentation, implementation alignment, and adoption, with the goal of keeping design and development consistent across websites, applications, and internal product surfaces.
                </p>
            </Section>

            <Section
                eyebrow="02 / Management"
                title="A shared product, not a static UI kit"
                visual={<GovernanceWorkflow />}
            >
                <p>
                    The design system was managed as a shared product rather than a static UI kit. My day to day work included reviewing component usage, maintaining reusable Figma libraries, supporting documentation, and helping product teams apply the system without creating unnecessary local variations.
                </p>
            </Section>

            <Section
                eyebrow="03 / Libraries"
                title="Component alignment across design and code"
                visual={<FigmaCodeDiagram />}
            >
                <p>
                    A large part of the work was keeping design components aligned with implementation. The component libraries had to remain reusable, accessible, responsive, and consistent with Porsche's visual identity. This required close coordination between Figma and code repositories used by engineering teams working in React, Kotlin, and Swift.
                </p>
            </Section>

            <Section
                eyebrow="04 / Iconography"
                title="Theme-aware icon library development"
                visual={<IconographyShowcase onOpenImage={onOpenImage} />}
            >
                <p>
                    Iconography was part of the same system work. The goal was to keep icons consistent across categories, states, themes, and product contexts. The light and dark mode icon mockups show the kind of library structure that supported this work: grouped icon families, theme validation, and reusable categories for navigation, system actions, communication, media, calendars, warnings, and user flows.
                </p>
            </Section>

            <Section
                eyebrow="05 / Quality"
                title="Reducing interpretation between teams"
                visual={<QualityMatrix />}
            >
                <p>
                    The value of this work was in reducing interpretation between teams. A component or icon needed to be clear in design, reliable in implementation, and understandable through documentation. Accessibility, responsive behavior, visual consistency, naming, and release communication were part of the same quality bar.
                </p>
            </Section>

            <Section
                eyebrow="06 / Reference"
                title="Current public design system reference"
                visual={<ReferenceCards />}
            >
                <p>
                    The current public Porsche Design System shows the later evolution of this type of work through Figma libraries, Web Components, framework packages, tokens, patterns, templates, and accessibility guidance. I use it here as a reference for the system surface and documentation model, without implying ownership of every current v4 artifact.
                </p>
            </Section>
        </div>
    );
}
