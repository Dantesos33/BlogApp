import { Head, Link, useForm, router } from '@inertiajs/react';
import Layout from '@/layouts/layout';

export default function RegisterPage() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    post('/register', {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    }, {
      onSuccess: () => router.visit('/'),
    });
  };

  return (
    <Layout>
      <Head title="Create account" />
      <section className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">Join the community</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">Create your writer account</h1>
        <p className="mt-3 text-sm text-slate-600">Start publishing, saving bookmarks, and following the latest reader activity.</p>

        <form onSubmit={submit} className="mt-8 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">Full name
            <input value={data.name} onChange={(e) => setData('name', e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" placeholder="Alex Morgan" />
            {errors.name ? <span className="text-xs font-medium text-rose-600">{errors.name}</span> : null}
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">Email
            <input value={data.email} onChange={(e) => setData('email', e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" placeholder="you@example.com" />
            {errors.email ? <span className="text-xs font-medium text-rose-600">{errors.email}</span> : null}
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">Password
            <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" placeholder="Create a strong password" />
            {errors.password ? <span className="text-xs font-medium text-rose-600">{errors.password}</span> : null}
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">Confirm password
            <input type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" placeholder="Repeat your password" />
            {errors.password_confirmation ? <span className="text-xs font-medium text-rose-600">{errors.password_confirmation}</span> : null}
          </label>
          <button type="submit" disabled={processing} className="md:col-span-2 mt-2 inline-flex w-fit items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">{processing ? 'Creating account…' : 'Create account'}</button>
        </form>

        <p className="mt-6 text-sm text-slate-600">Already have an account? <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">Sign in</Link></p>
      </section>
    </Layout>
  );
}
