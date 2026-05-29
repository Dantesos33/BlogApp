import { Head, router, useForm, usePage } from '@inertiajs/react';
import Layout from '@/layouts/layout';
import PageCard from '@/components/PageCard';
import { createPost } from '@/lib/postsStorage';

export default function PostCreate() {
  const { auth } = usePage<{ auth?: { user?: { id?: number } } }>().props;
  const { data, setData, processing } = useForm({
    title: '',
    category: '',
    excerpt: '',
    image: '',
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!auth?.user?.id) {
      router.visit('/login');
      return;
    }

    createPost(data, auth.user.id);
    router.visit('/posts');
  };

  return (
    <Layout>
      <Head title="Create Post" />
      <div className="space-y-8">
        <PageCard
          title="Write a new article"
          description="This starter screen gives you a clear place to publish your next piece using the same design system as the rest of the app."
        >
          <form onSubmit={submit} className="grid gap-5 rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Title
              <input value={data.title} onChange={(e) => setData('title', e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-0" placeholder="Enter a strong headline" required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Category
              <input value={data.category} onChange={(e) => setData('category', e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-0" placeholder="Design, Growth, Culture..." required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Image URL
              <input value={data.image} onChange={(e) => setData('image', e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-0" placeholder="https://..." />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Story
              <textarea value={data.excerpt} onChange={(e) => setData('excerpt', e.target.value)} rows={6} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-0" placeholder="Share your article here..." required />
            </label>
            <button type="submit" disabled={processing} className="inline-flex w-fit items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60">{processing ? 'Publishing…' : 'Publish draft'}</button>
          </form>
        </PageCard>
      </div>
    </Layout>
  );
}
