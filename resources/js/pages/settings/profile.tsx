import { Head } from '@inertiajs/react';
import Layout from '@/layouts/layout';

export default function Profile() {
    return (
        <Layout>
            <Head title="Profile settings" />
            <section className="rounded-3xl border border-border/80 bg-card p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">Settings</p>
                <h1 className="mt-3 text-3xl font-semibold text-foreground">Profile settings</h1>
                <p className="mt-3 text-muted-foreground">This minimal profile screen keeps your authenticated settings routes functional.</p>
            </section>
        </Layout>
    );
}
