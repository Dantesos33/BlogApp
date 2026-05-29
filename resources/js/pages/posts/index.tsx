import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import Layout from '@/layouts/layout';
import PageCard from '@/components/PageCard';
import PostCard from '@/components/PostCard';
import PostFilters from '@/components/PostFilters';
import { categories } from '@/lib/postsData';
import { getAllPosts } from '@/lib/postsStorage';

const PAGE_SIZE = 9;

export default function PostsIndex() {
  const { auth } = usePage<{ auth: { user?: { id?: number } } }>().props;
  const [category, setCategory] = useState('All Topics');
  const [mode, setMode] = useState<'all' | 'mine'>('all');
  const canViewMine = Boolean(auth?.user);
  const [page, setPage] = useState(1);

  const posts = getAllPosts();

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesMode = mode === 'all' || post.authorId === auth?.user?.id;
      const matchesCategory = category === 'All Topics' || post.category === category;
      return matchesMode && matchesCategory;
    });
  }, [auth?.user?.id, category, mode, posts]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const visiblePosts = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Layout>
      <Head title="All Posts" />
      <div className="space-y-8">
        <PageCard
          title="All articles"
          description="This archive shows every available post, supports real search and category filtering, and paginates 9 posts per page."
          actionLabel="Write a post"
          actionHref="/posts/create"
        />

        <PostFilters
          category={category}
          mode={mode}
          canViewMine={canViewMine}
          onCategoryChange={(value) => { setCategory(value); setPage(1); }}
          onModeChange={(value) => { setMode(value); setPage(1); }}
        />

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm text-slate-600">Showing {visiblePosts.length} of {filteredPosts.length} posts</p>
            <Link href="/posts/search?q=" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Open search view</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visiblePosts.map((post) => (
              <PostCard key={post.id} post={post} canManage={post.authorId === auth?.user?.id && mode === 'mine'} />
            ))}
          </div>

          <nav className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPage(item)}
                  className={`h-9 w-9 rounded-full border text-sm font-semibold ${page === item ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200'}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </section>
      </div>
    </Layout>
  );
}
