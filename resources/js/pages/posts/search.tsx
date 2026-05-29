import { Head } from '@inertiajs/react';
import Layout from '@/layouts/layout';
import PageCard from '@/components/PageCard';
import PostCard from '@/components/PostCard';
import { getAllPosts } from '@/lib/postsStorage';

interface SearchProps {
  q?: string;
  category?: string;
}

export default function PostSearch({ q = '', category = 'All Topics' }: SearchProps) {
  const matches = getAllPosts().filter((post) => {
    const matchesCategory = category === 'All Topics' || post.category === category;
    const haystack = `${post.title} ${post.category} ${post.author}`.toLowerCase();
    const matchesQuery = q === '' || haystack.includes(q.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <Layout>
      <Head title="Search Results" />
      <div className="space-y-8">
        <PageCard
          title="Search results"
          description={`Showing matches for “${q || 'all content'}” in ${category}.`}
          actionLabel="Browse all posts"
          actionHref="/posts"
        >
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {matches.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          {matches.length === 0 ? <p className="mt-4 text-sm text-slate-500">No matching posts found. Try another search term or category.</p> : null}
        </PageCard>
      </div>
    </Layout>
  );
}
