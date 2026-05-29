import type { ReactNode } from 'react';

interface PageCardProps {
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
    children?: ReactNode;
}

export default function PageCard({ title, description, actionLabel, actionHref, children }: PageCardProps) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">Section</p>
                    <h2 className="mt-2 text-2xl font-black text-slate-900">{title}</h2>
                    <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">{description}</p>
                </div>
                {actionLabel && actionHref ? (
                    <a href={actionHref} className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">{actionLabel}</a>
                ) : null}
            </div>
            {children ? <div className="mt-6">{children}</div> : null}
        </section>
    );
}
