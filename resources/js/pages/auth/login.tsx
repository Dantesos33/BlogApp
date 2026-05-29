import { Head } from '@inertiajs/react';
import Layout from '@/layouts/layout';

export default function Login() {
    return (
        <Layout>
            <Head title="Sign in" />
            <section className="mx-auto w-full max-w-xl rounded-3xl border border-border/80 bg-card p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">Auth</p>
                <h1 className="mt-3 text-3xl font-semibold text-foreground">Sign in</h1>
                <p className="mt-3 text-muted-foreground">This page is intentionally minimal so your auth flow still works while your landing page stays clean.</p>
            </section>
        </Layout>
    );
}
