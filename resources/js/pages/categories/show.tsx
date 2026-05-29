import { Head } from '@inertiajs/react';
import Layout from '@/layouts/layout';
import PageCard from '@/components/PageCard';
import PostCard from '@/components/PostCard';
import { getAllPosts } from '@/lib/postsStorage';

interface CategoryShowProps {
  category?: string;
}

export default function CategoryShow({ category = 'Category' }: CategoryShowProps) {
  const filteredPosts = getAllPosts().filter((post) => post.category.toLowerCase() === category.toLowerCase());

  return (
    <Layout>
      <Head title={category} />
      <div className="space-y-8">
        <PageCard
          title={`${category} articles`}
          description={`This page groups posts for the ${category.toLowerCase()} section and keeps the reading flow aligned with the rest of the blog.`}
          actionLabel="Back to categories"
          actionHref="/categories"
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          {filteredPosts.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">No posts were found for this category yet. Try a different topic or create a new story.</p>
          ) : null}
        </PageCard>
      </div>
    </Layout>
  );
}
