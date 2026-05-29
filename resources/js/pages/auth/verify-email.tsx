import { Head } from '@inertiajs/react';
import Layout from '@/layouts/layout';

export default function VerifyEmail() {
    return (
        <Layout>
            <Head title="Verify email" />
            <section className="mx-auto w-full max-w-xl rounded-3xl border border-border/80 bg-card p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">Auth</p>
                <h1 className="mt-3 text-3xl font-semibold text-foreground">Verify your email</h1>
                <p className="mt-3 text-muted-foreground">This placeholder keeps your email verification flow intact while the main public site remains clean and focused.</p>
            </section>
        </Layout>
    );
}
