import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '@/layouts/layout';

export default function LoginPage() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    post('/login', {
      email: data.email,
      password: data.password,
      remember: data.remember,
    });
  };

  return (
    <Layout>
      <Head title="Sign in" />
      <section className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">Welcome back</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">Sign in to your account</h1>
        <p className="mt-3 text-sm text-slate-600">Use your email and password to access your profile, drafts, and bookmarks.</p>

        <form onSubmit={submit} className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">Email
            <input value={data.email} onChange={(e) => setData('email', e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" placeholder="you@example.com" />
            {errors.email ? <span className="text-xs font-medium text-rose-600">{errors.email}</span> : null}
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">Password
            <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" placeholder="••••••••" />
            {errors.password ? <span className="text-xs font-medium text-rose-600">{errors.password}</span> : null}
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} /> Remember me</label>
          <button type="submit" disabled={processing} className="mt-2 inline-flex w-fit items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">{processing ? 'Signing in…' : 'Continue'}</button>
        </form>

        <p className="mt-6 text-sm text-slate-600">Need an account? <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700">Create one</Link></p>
      </section>
    </Layout>
  );
}
