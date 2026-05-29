import { Head } from '@inertiajs/react';

import Layout from '@/layouts/layout';

export default function Welcome() {
    return (
        <Layout>
            <Head title="Home" />

            <section className="relative overflow-hidden rounded-4xl border border-border/70 bg-[linear-gradient(135deg,#fffdf8_0%,#fff7ed_45%,#eef2ff_100%)] px-6 py-10 text-slate-900 shadow-sm lg:px-10 lg:py-14">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.12),transparent_18%),radial-gradient(circle_at_top_right,rgba(129,140,248,0.18),transparent_22%)]" />
                <div className="relative grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
                    <div className="max-w-2xl">
                        <p className="mb-4 inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs uppercase tracking-[0.35em] text-amber-700">Write. Publish. Grow.</p>
                        <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">Write, publish, and grow your audience with BlogApp.</h1>
                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600 sm:text-xl">Create polished posts, organize ideas by topic, and launch your blog with a clean reading experience built for modern writers.</p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a href="#blogs" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-700/10 transition hover:-translate-y-0.5 hover:bg-slate-800">Browse latest posts</a>
                            <a href="#features" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">See blog features</a>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-700">
                            <span className="rounded-full border border-slate-200 bg-white/90 px-3 py-2">Searchable posts</span>
                            <span className="rounded-full border border-slate-200 bg-white/90 px-3 py-2">Category filters</span>
                            <span className="rounded-full border border-slate-200 bg-white/90 px-3 py-2">Featured stories</span>
                        </div>
                    </div>

                </div>
            </section>


            <section id="blogs" className="mt-10 rounded-3xl border border-border/70 bg-card p-8 shadow-sm lg:p-10">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-primary">Latest posts</p>
                        <h2 className="mt-2 text-2xl font-semibold text-foreground">Search, filter, and browse the stories that matter most.</h2>
                        <p className="mt-2 max-w-2xl text-muted-foreground">A real blog homepage needs discovery tools, category navigation, and clear article previews — all built into the first screen.</p>
                    </div>
                    <div className="w-full max-w-xl rounded-2xl border border-border/70 bg-background p-3 shadow-sm">
                        <label className="sr-only" htmlFor="search">Search posts</label>
                        <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-white px-3 py-2">
                            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-muted-foreground"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2"/></svg>
                            <input id="search" type="search" placeholder="Search for articles, topics, or ideas" className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                    {['All', 'Design', 'Technology', 'Culture', 'Startups'].map((item) => (
                        <button key={item} type="button" className="rounded-full border border-border/70 bg-background px-4 py-2 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground">{item}</button>
                    ))}
                </div>

            </section>

            <section id="stories" className="mt-10 rounded-3xl border border-border/70 bg-card p-8 shadow-sm lg:p-10">
                <p className="text-xs uppercase tracking-[0.35em] text-primary">Editor’s picks</p>
                <div className="mt-4 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <article className="rounded-3xl bg-[linear-gradient(135deg,#111827_0%,#1f2937_100%)] p-6 text-white shadow-lg shadow-slate-900/15">
                        <p className="text-sm uppercase tracking-[0.3em] text-amber-200">This week</p>
                        <h2 className="mt-3 text-2xl font-semibold">Design a blog that feels calm, clear, and memorable from the very first impression.</h2>
                        <p className="mt-3 text-slate-200">The best blogs combine thoughtful copy, confident visuals, and a smooth reading experience that keeps people engaged from headline to final paragraph.</p>
                    </article>
                    <article className="grid gap-4">
                        {[
                            ['Creative workflow', 'Create, edit, and publish with a simple structure that keeps your ideas organized and easy to share.'],
                            ['Story-first visuals', 'Blend sharp typography, bright accents, and warm spacing into a design that feels modern and personal.'],
                        ].map(([title, copy]) => (
                            <div key={title} className="rounded-3xl border border-border/70 bg-background p-5 shadow-sm">
                                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
                            </div>
                        ))}
                    </article>
                </div>
            </section>

            <section id="contact" className="mt-10 rounded-3xl border border-border/70 bg-[linear-gradient(135deg,#f8fafc_0%,#eef2ff_100%)] p-8 shadow-sm lg:p-10">
                <p className="text-xs uppercase tracking-[0.35em] text-primary">Contact</p>
                <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-foreground">Start writing today.</h2>
                        <p className="mt-2 max-w-2xl text-muted-foreground">Create your first post, invite your readers, and launch your blog with a simple workflow that feels polished from day one.</p>
                    </div>
                    <a href="/register" className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Create your account</a>
                </div>
            </section>
        </Layout>
    );
}
