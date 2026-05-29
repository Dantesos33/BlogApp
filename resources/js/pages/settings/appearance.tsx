import { Head } from '@inertiajs/react';
import Layout from '@/layouts/layout';

export default function Appearance() {
    return (
        <Layout>
            <Head title="Appearance settings" />
            <section className="rounded-3xl border border-border/80 bg-card p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">Settings</p>
                <h1 className="mt-3 text-3xl font-semibold text-foreground">Appearance settings</h1>
                <p className="mt-3 text-muted-foreground">This lightweight settings page keeps the layout and theme controls ready for your next design pass.</p>
            </section>
        </Layout>
    );
}
