import { Head } from '@inertiajs/react';
import Layout from '@/layouts/layout';

export default function Dashboard() {
    return (
        <Layout>
            <Head title="Dashboard" />
            <section className="rounded-3xl border border-border/80 bg-card p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">Dashboard</p>
                <h1 className="mt-3 text-3xl font-semibold text-foreground">Your starter dashboard</h1>
                <p className="mt-3 text-muted-foreground">This is a minimal placeholder so the app keeps its authenticated flow working while your public landing page remains the focus.</p>
            </section>
        </Layout>
    );
}
