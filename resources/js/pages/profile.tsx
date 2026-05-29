import { Head, router, useForm, usePage } from '@inertiajs/react';
import Layout from '@/layouts/layout';
import PageCard from '@/components/PageCard';

export default function ProfilePage() {
  const { auth } = usePage<{ auth?: { user?: { id?: number; name?: string; email?: string } } }>().props;
  const { data, setData, patch, processing, errors } = useForm({
    name: auth?.user?.name ?? '',
    email: auth?.user?.email ?? '',
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    patch(route('profile.update'));
  };

  return (
    <Layout>
      <Head title="Profile" />
      <div className="space-y-8">
        <PageCard title="Your profile" description="Manage your public identity and account details from one place.">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Account</p>
              <h2 className="mt-3 text-2xl font-black text-slate-900">{auth?.user?.name ?? 'Your account'}</h2>
              <p className="mt-2 text-sm text-slate-600">{auth?.user?.email ?? 'No email on file.'}</p>
              <button
                type="button"
                onClick={() => router.post('/logout')}
                className="mt-5 inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-100"
              >
                Log out
              </button>
            </div>

            <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Update profile</p>
              <div className="mt-4 grid gap-4">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">Name
                  <input value={data.name} onChange={(e) => setData('name', e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
                  {errors.name ? <span className="text-xs text-rose-600">{errors.name}</span> : null}
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">Email
                  <input value={data.email} onChange={(e) => setData('email', e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
                  {errors.email ? <span className="text-xs text-rose-600">{errors.email}</span> : null}
                </label>
                <button type="submit" disabled={processing} className="inline-flex w-fit items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60">{processing ? 'Saving…' : 'Save changes'}</button>
              </div>
            </form>
          </div>
        </PageCard>
      </div>
    </Layout>
  );
}
