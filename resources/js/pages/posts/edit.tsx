import { Head, router, useForm, usePage } from '@inertiajs/react';
import Layout from '@/layouts/layout';
import PageCard from '@/components/PageCard';
import { getAllPosts, updatePost } from '@/lib/postsStorage';

export default function PostEdit({ slug }: { slug: string }) {
  const { auth } = usePage<{ auth?: { user?: { id?: number } } }>().props;
  const post = getAllPosts().find((item) => item.slug === slug && item.authorId === auth?.user?.id);

  const { data, setData, processing } = useForm({
    title: post?.title ?? '',
    category: post?.category ?? '',
    excerpt: post?.excerpt ?? '',
    image: post?.image ?? '',
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!auth?.user?.id || !post) {
      router.visit('/login');
      return;
    }

    updatePost(post.slug, data, auth.user.id);
    router.visit('/posts');
  };

  if (!post) {
    return (
      <Layout>
        <Head title="Edit post" />
        <PageCard title="Post not found" description="You can only edit your own posts." actionLabel="Back to posts" actionHref="/posts" />
      </Layout>
    );
  }

  return (
    <Layout>
      <Head title="Edit post" />
      <div className="space-y-8">
        <PageCard title="Edit article" description="Update the article details and keep your writer profile in sync.">
          <form onSubmit={submit} className="grid gap-5 rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">Title
              <input value={data.title} onChange={(e) => setData('title', e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm" required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">Category
              <input value={data.category} onChange={(e) => setData('category', e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm" required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">Image URL
              <input value={data.image} onChange={(e) => setData('image', e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">Story
              <textarea value={data.excerpt} onChange={(e) => setData('excerpt', e.target.value)} rows={6} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm" required />
            </label>
            <button type="submit" disabled={processing} className="inline-flex w-fit items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60">{processing ? 'Saving…' : 'Save changes'}</button>
          </form>
        </PageCard>
      </div>
    </Layout>
  );
}
