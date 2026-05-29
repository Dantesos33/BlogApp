import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Layout from '@/layouts/layout';
import PageCard from '@/components/PageCard';
import PostCard from '@/components/PostCard';
import { getBookmarkedPosts } from '@/lib/postsStorage';

export default function BookmarksPage() {
  const { auth } = usePage<{ auth?: { user?: { id?: number } } }>().props;
  const [bookmarked, setBookmarked] = useState(() => getBookmarkedPosts(auth?.user?.id));

  useEffect(() => {
    const sync = () => setBookmarked(getBookmarkedPosts(auth?.user?.id));
    window.addEventListener('blogapp-bookmarks-updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('blogapp-bookmarks-updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, [auth?.user?.id]);

  return (
    <Layout>
      <Head title="Bookmarks" />
      <div className="space-y-8">
        <PageCard title="Bookmarks" description="Keep a personal list of articles you want to return to later.">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {bookmarked.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </PageCard>
      </div>
    </Layout>
  );
}
