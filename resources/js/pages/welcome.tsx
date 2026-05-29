import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import Layout from '@/layouts/layout';
import {
    FaChevronLeft, FaChevronRight, FaArrowRight,
    FaClock, FaBookmark, FaEye,
} from 'react-icons/fa';
import { FaTag } from 'react-icons/fa6';
import { isBookmarked, toggleBookmark } from '@/lib/postsStorage';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Post {
    id: number;
    title: string;
    meta: string;
    excerpt: string;
    image: string;
    category: string;
    readTime: string;
    views: string;
    slug: string;
}

interface Category {
    name: string;
    count: number;
    color: string;
    dot: string;
}

// ─── Data (replace with Inertia props from controller) ───────────────────────

const heroSlides: Post[] = [
    {
        id: 1,
        slug: 'clean-homepage-readers',
        title: 'Why a clean homepage makes readers stay longer',
        meta: 'Design',
        excerpt: 'Great blog pages balance visual calm, fast scanning, and thoughtful layout to build trust from the very first scroll.',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1400&q=80&fit=crop',
        category: 'Design',
        readTime: '6 min read',
        views: '4.2k',
    },
    {
        id: 2,
        slug: 'smart-categories-discovery',
        title: 'How smart categories improve discovery for modern blogs',
        meta: 'Productivity',
        excerpt: 'Readers browse faster when categories, tags, and search feel intuitive rather than cluttered and hard to navigate.',
        image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1400&q=80&fit=crop',
        category: 'Productivity',
        readTime: '5 min read',
        views: '3.8k',
    },
    {
        id: 3,
        slug: 'details-premium-blog',
        title: 'The small details that make a blog feel premium',
        meta: 'Writing',
        excerpt: 'Spacing, hierarchy, and clean typography turn a simple page into a memorable editorial experience worth revisiting.',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1400&q=80&fit=crop',
        category: 'Writing',
        readTime: '4 min read',
        views: '2.9k',
    },
];

const latestPosts: Post[] = [
    {
        id: 4,
        slug: 'write-first-workflow',
        title: 'The write-first workflow every creator should use',
        meta: 'Writing · 5 min read',
        excerpt: 'Starting with words instead of visuals changes how ideas develop. Here is why the best writers always start with a blank page.',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80&fit=crop',
        category: 'Writing',
        readTime: '5 min read',
        views: '1.7k',
    },
    {
        id: 5,
        slug: 'readers-newsletter-audience',
        title: 'How to turn readers into a loyal newsletter audience',
        meta: 'Growth · 7 min read',
        excerpt: 'A newsletter is your most direct line to readers. Learn how to convert casual visitors into subscribers who look forward to every edition.',
        image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80&fit=crop',
        category: 'Growth',
        readTime: '7 min read',
        views: '3.1k',
    },
    {
        id: 6,
        slug: 'visual-consistency-blog-growth',
        title: 'Why visual consistency matters for blog growth',
        meta: 'Design · 4 min read',
        excerpt: 'Consistent type, colour, and spacing create a brand readers remember. Inconsistency erodes the trust that takes months to build.',
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80&fit=crop',
        category: 'Design',
        readTime: '4 min read',
        views: '2.4k',
    },
    {
        id: 7,
        slug: 'seo-for-independent-writers',
        title: 'SEO for independent writers who hate SEO',
        meta: 'Technology · 6 min read',
        excerpt: 'You do not need to become an SEO expert. A handful of habits applied consistently will do most of the heavy lifting for you.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fit=crop',
        category: 'Technology',
        readTime: '6 min read',
        views: '5.6k',
    },
    {
        id: 8,
        slug: 'craft-compelling-headline',
        title: 'How to craft a headline that actually gets clicked',
        meta: 'Writing · 3 min read',
        excerpt: 'Your headline is the only part most people read. Make it count with a handful of proven frameworks that never go out of style.',
        image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&q=80&fit=crop',
        category: 'Writing',
        readTime: '3 min read',
        views: '6.2k',
    },
    {
        id: 9,
        slug: 'remote-work-creative-writing',
        title: 'Remote work has changed how writers find their voice',
        meta: 'Culture · 8 min read',
        excerpt: 'Working from anywhere has introduced new rhythms, rituals, and reference points that are quietly reshaping modern writing.',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80&fit=crop',
        category: 'Culture',
        readTime: '8 min read',
        views: '1.9k',
    },
];

const categories: Category[] = [
    { name: 'Technology', count: 24, color: 'hover:bg-blue-50 hover:text-blue-700',   dot: 'bg-blue-500' },
    { name: 'Design',     count: 18, color: 'hover:bg-purple-50 hover:text-purple-700', dot: 'bg-purple-500' },
    { name: 'Writing',    count: 31, color: 'hover:bg-amber-50 hover:text-amber-700',  dot: 'bg-amber-500' },
    { name: 'Culture',    count: 15, color: 'hover:bg-rose-50 hover:text-rose-700',    dot: 'bg-rose-500' },
    { name: 'Growth',     count: 20, color: 'hover:bg-emerald-50 hover:text-emerald-700', dot: 'bg-emerald-500' },
    { name: 'Wellness',   count: 12, color: 'hover:bg-teal-50 hover:text-teal-700',   dot: 'bg-teal-500' },
    { name: 'Startups',   count: 9,  color: 'hover:bg-orange-50 hover:text-orange-700', dot: 'bg-orange-500' },
    { name: 'Travel',     count: 7,  color: 'hover:bg-sky-50 hover:text-sky-700',     dot: 'bg-sky-500' },
];

// ─── Category Sidebar ─────────────────────────────────────────────────────────

const CategorySidebar = () => (
    <aside className="w-52 shrink-0 bg-slate-900 flex flex-col">
        <div className="px-5 py-5 border-b border-slate-700/60">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                <FaTag size={10} /> Categories
            </span>
        </div>
        <nav className="flex flex-col flex-1 py-2 overflow-y-auto">
            {categories.map((cat) => (
                <Link
                    key={cat.name}
                    href={`/categories/${cat.name.toLowerCase()}`}
                    className={`cursor-pointer flex items-center justify-between px-5 py-3 text-slate-300 text-sm font-medium transition-all duration-200 ${cat.color} group`}
                >
                    <span className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${cat.dot}`} />
                        {cat.name}
                    </span>
                    <span className="text-xs text-slate-500 group-hover:text-current transition-colors">
                        {cat.count}
                    </span>
                </Link>
            ))}
        </nav>
        <div className="px-5 py-4 border-t border-slate-700/60">
            <Link
                href="/categories"
                className="cursor-pointer flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors font-medium"
            >
                All categories <FaArrowRight size={10} />
            </Link>
        </div>
    </aside>
);

// ─── Hero Slider ──────────────────────────────────────────────────────────────

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);
    const [transitioning, setTransitioning] = useState(false);

    const goTo = useCallback((index: number) => {
        if (transitioning) return;
        setTransitioning(true);
        setCurrent(index);
        setTimeout(() => setTransitioning(false), 600);
    }, [transitioning]);

    const prev = () => goTo((current - 1 + heroSlides.length) % heroSlides.length);
    const next = useCallback(() => goTo((current + 1) % heroSlides.length), [current, goTo]);

    useEffect(() => {
        const t = setInterval(next, 5500);
        return () => clearInterval(t);
    }, [next]);

    const slide = heroSlides[current];

    return (
        <div className="flex-1 relative overflow-hidden h-[480px]">
            {/* Slides */}
            {heroSlides.map((s, i) => (
                <div
                    key={s.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent" />
                </div>
            ))}

            {/* Content — pinned to bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-8">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
                    {slide.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3 max-w-xl">
                    {slide.title}
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-5 max-w-lg">
                    {slide.excerpt}
                </p>
                <div className="flex items-center gap-4">
                    <Link
                        href={`/posts/${slide.slug}`}
                        className="cursor-pointer inline-flex items-center gap-2 bg-white text-slate-900 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-blue-50 transition-all duration-300"
                    >
                        Read article <FaArrowRight size={11} />
                    </Link>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                        <FaClock size={11} /> {slide.readTime}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                        <FaEye size={11} /> {slide.views}
                    </div>
                </div>
            </div>

            {/* Prev / Next */}
            <button
    onClick={prev}
    aria-label="Previous"
    className="cursor-pointer absolute left-4 top-8 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300"
>
    <FaChevronLeft size={13} />
</button>
<button
    onClick={next}
    aria-label="Next"
    className="cursor-pointer absolute right-4 top-8 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300"
>
    <FaChevronRight size={13} />
</button>

            {/* Dots */}
            <div className="absolute bottom-4 right-6 z-20 flex items-center gap-2">
                {heroSlides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Slide ${i + 1}`}
                        className={`cursor-pointer rounded-full transition-all duration-300 ${
                            i === current ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

// ─── Post Card ────────────────────────────────────────────────────────────────

const PostCard = ({ post }: { post: Post }) => {
    const { auth } = usePage<{ auth?: { user?: { id?: number } } }>().props;
    const [bookmarked, setBookmarked] = useState(() => isBookmarked(post.id, auth?.user?.id));

    useEffect(() => {
        setBookmarked(isBookmarked(post.id, auth?.user?.id));
    }, [auth?.user?.id, post.id]);

    const handleBookmark = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (!auth?.user?.id) {
            router.visit('/login');
            return;
        }

        setBookmarked(toggleBookmark(post.id, auth.user.id));
    };

    return (
    <Link
        href={`/posts/${post.slug}`}
        className="cursor-pointer group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 flex flex-col"
    >
        <div className="relative overflow-hidden h-48">
            <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
        (e.target as HTMLImageElement).src =
            'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80&fit=crop';
    }}
            />
            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-700 px-2.5 py-1 rounded-full border border-white/60">
                {post.category}
            </span>
            <button
                onClick={handleBookmark}
                aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
                className={`cursor-pointer absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/60 transition-colors ${bookmarked ? 'text-blue-600' : 'text-slate-400 hover:text-blue-600'}`}
            >
                <FaBookmark size={12} />
            </button>
        </div>
        <div className="p-4 flex flex-col flex-1">
            <p className="text-xs text-slate-400 mb-1.5">{post.meta}</p>
            <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors flex-1 line-clamp-2">
                {post.title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
                {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1"><FaClock size={10} /> {post.readTime}</span>
                <span className="flex items-center gap-1"><FaEye size={10} /> {post.views}</span>
            </div>
        </div>
    </Link>
    );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Welcome() {
    return (
        <Layout>
            <Head title="Home" />

            {/* ── Hero: categories sidebar + slider side by side ── */}
            <section className="w-full overflow-hidden flex border-b border-slate-200 shadow-md" style={{ height: '480px' }}>
                {/* Category sidebar — hidden on mobile, shown lg+ */}
                <div className="hidden lg:flex">
                    <CategorySidebar />
                </div>

                {/* Slider fills remaining space */}
                <HeroSlider />
            </section>

            {/* ── Main content ── */}
            <div className="bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

                    {/* Latest Articles — full row */}
                    <section className="mb-12 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black text-slate-900">Latest Articles</h2>
                            <Link
                                href="/posts"
                                className="cursor-pointer flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                View all <FaArrowRight size={11} />
                            </Link>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {latestPosts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </section>

                    {/* Write CTA banner */}
                    <section>
                        <div className="relative overflow-hidden bg-slate-900 rounded-2xl p-8 md:p-12 text-white shadow-md">
                            <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-blue-500/10" />
                            <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-purple-500/10" />
                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div>
                                    <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
                                        Share your story
                                    </p>
                                    <h2 className="text-2xl md:text-3xl font-black mb-2">Have something to say?</h2>
                                    <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                                        Join thousands of writers publishing on BlogApp. Your next article is one click away.
                                    </p>
                                </div>
                                <Link
                                    href="/posts/create"
                                    className="cursor-pointer shrink-0 inline-flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-blue-50 transition-all duration-300"
                                >
                                    Start writing <FaArrowRight size={12} />
                                </Link>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </Layout>
    );
}