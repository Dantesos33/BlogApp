import { Head, Link, router, usePage } from '@inertiajs/react';
import Layout from '@/layouts/layout';
import { useEffect, useState } from 'react';
import {
    FaArrowLeft,
    FaBookmark,
    FaClock,
    FaEye,
    FaTag,
} from 'react-icons/fa';
import { isBookmarked, toggleBookmark, getAllPosts } from '@/lib/postsStorage';

const contentMap: Record<string, string[]> = {
    'clean-homepage-readers': [
        'A strong homepage does more than show information. It gives readers an immediate sense of clarity, confidence, and direction. When the layout feels calm, people stay longer and explore more deeply.',
        'In this design approach, the hero space is intentionally spacious, the categories are easy to scan, and the cards guide attention without feeling crowded. Clean pages create trust, and trust creates momentum.',
        'The result is a reading experience that feels premium, modern, and easy to navigate. That is what turns a simple blog into a memorable editorial destination.',
    ],
    'smart-categories-discovery': [
        'Good discovery starts with well-structured categories. Readers should understand where they are in a few seconds and find similar topics without friction.',
        'A thoughtful category system reduces decision fatigue, makes browsing more efficient, and invites people to spend more time in your content ecosystem.',
        'When category labels are clear and consistent, your homepage feels more intentional and easier to trust.',
    ],
    'details-premium-blog': [
        'Premium design is rarely about adding more. It is about refining the details that readers notice without being distracted by them.',
        'Consistent spacing, bold section labels, thoughtful card proportions, and restrained color help content feel focused instead of noisy.',
        'These subtle choices create a reading experience that feels intentional and polished from the very first section.',
    ],
};

const getDetailContent = (slug: string): string[] => {
    return contentMap[slug] ?? ['This is a great article. Read it carefully and think about how it applies to your own work.'];
};

export default function PostDetail({ slug }: { slug: string }) {
    const { auth } = usePage<{ auth?: { user?: { id?: number } } }>().props;
    const allPosts = getAllPosts();
    const post = allPosts.find((item) => item.slug === slug);
    const relatedPosts = allPosts.slice(0, 3);
    
    if (!post) {
        return (
            <Layout>
                <Head title="Post not found" />
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold text-slate-900">Post not found</h1>
                    <Link href="/" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
                        <FaArrowLeft size={10} /> Back to home
                    </Link>
                </div>
            </Layout>
        );
    }

    const [bookmarked, setBookmarked] = useState(() => isBookmarked(post.id, auth?.user?.id));

    useEffect(() => {
        const sync = () => setBookmarked(isBookmarked(post.id, auth?.user?.id));
        sync();
        window.addEventListener('blogapp-bookmarks-updated', sync);
        return () => window.removeEventListener('blogapp-bookmarks-updated', sync);
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
        <Layout>
            <Head title={post.title} />

            <article className="space-y-8">
                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="relative min-h-80 lg:min-h-105">
                            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-900/30 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white lg:p-8">
                                <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200 hover:text-white">
                                    <FaArrowLeft size={10} /> Back to home
                                </Link>
                                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">{post.category}</p>
                                <h1 className="mt-2 max-w-xl text-3xl font-black leading-tight md:text-4xl">{post.title}</h1>
                                <p className="mt-3 max-w-2xl text-sm text-slate-200 md:text-base">{post.excerpt}</p>
                            </div>
                        </div>

                        <aside className="p-6 md:p-8 bg-slate-50 border-t border-slate-200 lg:border-t-0 lg:border-l">
                            <div className="flex items-center justify-between gap-3">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200">
                                    <FaTag size={10} /> {post.category}
                                </span>
                                <button onClick={handleBookmark} className={`cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-full bg-white border transition-colors ${bookmarked ? 'border-blue-200 text-blue-600' : 'border-slate-200 text-slate-500 hover:text-blue-600'}`} aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}>
                                    <FaBookmark size={12} />
                                </button>
                            </div>

                            <div className="mt-6 space-y-4 text-sm text-slate-600">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Author</p>
                                    <p className="mt-1 font-semibold text-slate-900">{post.author}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Published</p>
                                    <p className="mt-1 font-semibold text-slate-900">{post.date}</p>
                                </div>
                                <div className="flex items-center gap-4 text-slate-500">
                                    <span className="inline-flex items-center gap-1.5"><FaClock size={11} /> {post.readTime}</span>
                                    <span className="inline-flex items-center gap-1.5"><FaEye size={11} /> {post.views}</span>
                                </div>
                            </div>

                            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Why this works</p>
                                <p className="mt-2 text-sm text-slate-600">This page keeps the same editorial feel as the homepage: strong imagery, scannable content, and calm visual hierarchy.</p>
                            </div>
                        </aside>
                    </div>
                </section>

                <section className="grid gap-8 lg:grid-cols-[1fr_320px]">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Article</p>
                        {getDetailContent(post.slug).map((paragraph) => (
                            <p key={paragraph} className="mt-4 text-base leading-8 text-slate-700">{paragraph}</p>
                        ))}

                        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
                            Tip: Use consistent spacing, short paragraphs, and clear section breaks to keep readers engaged from the first scroll to the last line.
                        </div>
                    </div>

                    <aside className="space-y-6">
                        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-black text-slate-900">Related posts</h2>
                            <div className="mt-4 space-y-3">
                                {relatedPosts.map((item) => (
                                    <Link key={item.slug} href={`/posts/${item.slug}`} className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50">
                                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.category}</p>
                                        <h3 className="mt-1 text-sm font-semibold text-slate-900">{item.title}</h3>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-3xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm">
                            <h2 className="text-lg font-black">Browse more</h2>
                            <p className="mt-2 text-sm text-slate-300">Explore categories, latest topics, and editor picks from the same modern blog layout.</p>
                            <Link href="/" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-200 hover:text-white">Return to homepage</Link>
                        </section>
                    </aside>
                </section>
            </article>
        </Layout>
    );
}
