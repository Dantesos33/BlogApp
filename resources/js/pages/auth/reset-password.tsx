import { Head } from '@inertiajs/react';
import Layout from '@/layouts/layout';

export default function ResetPassword() {
    return (
        <Layout>
            <Head title="Reset password" />
            <section className="mx-auto w-full max-w-xl rounded-3xl border border-border/80 bg-card p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">Auth</p>
                <h1 className="mt-3 text-3xl font-semibold text-foreground">Reset your password</h1>
                <p className="mt-3 text-muted-foreground">This placeholder keeps your password-reset route ready for your real authentication design.</p>
            </section>
        </Layout>
    );
}
