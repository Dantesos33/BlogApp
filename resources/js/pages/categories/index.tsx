import { Head, Link } from '@inertiajs/react';
import Layout from '@/layouts/layout';
import PageCard from '@/components/PageCard';
import PostCard from '@/components/PostCard';
import { getAllPosts } from '@/lib/postsStorage';

export default function CategoriesIndex() {
  const posts = getAllPosts();
  const categoryMap = posts.reduce<Record<string, number>>((map, post) => {
    map[post.category] = (map[post.category] ?? 0) + 1;
    return map;
  }, {});

  const categories = Object.entries(categoryMap).map(([name, count]) => ({
    name,
    count,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  }));

  const featuredPosts = posts.slice(0, 6);

  return (
    <Layout>
      <Head title="Categories" />
      <div className="space-y-8">
        <PageCard
          title="Browse categories"
          description="A dedicated category archive helps readers find the right topic quickly and keeps the homepage navigation meaningful."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {categories.map((category) => (
              <Link key={category.slug} href={`/categories/${category.slug}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">{category.count} posts</p>
                <h3 className="mt-2 text-xl font-black text-slate-900">{category.name}</h3>
                <p className="mt-2 text-sm text-slate-600">Explore a curated collection of articles and related topics under this section.</p>
              </Link>
            ))}
          </div>
        </PageCard>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Featured posts</h2>
              <p className="text-sm text-slate-600">A quick view of recent posts across all categories.</p>
            </div>
            <Link href="/posts" className="text-sm font-semibold text-blue-600 hover:text-blue-700">View all posts</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
