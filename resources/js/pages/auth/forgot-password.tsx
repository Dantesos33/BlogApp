import { Head } from '@inertiajs/react';
import Layout from '@/layouts/layout';

export default function ForgotPassword() {
    return (
        <Layout>
            <Head title="Forgot password" />
            <section className="mx-auto w-full max-w-xl rounded-3xl border border-border/80 bg-card p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">Auth</p>
                <h1 className="mt-3 text-3xl font-semibold text-foreground">Forgot your password?</h1>
                <p className="mt-3 text-muted-foreground">This starter page keeps your auth flow working while your public landing page stays focused.</p>
            </section>
        </Layout>
    );
}
