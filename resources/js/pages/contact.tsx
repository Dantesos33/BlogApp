import { Head } from '@inertiajs/react';
import Layout from '@/layouts/layout';
import PageCard from '@/components/PageCard';

export default function ContactPage() {
  return (
    <Layout>
      <Head title="Contact" />
      <div className="space-y-8">
        <PageCard title="Contact us" description="Need help, feedback, or a quick question? Reach out to the editorial team at any time.">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 md:p-8">Email: hello@blogapp.dev</div>
        </PageCard>
      </div>
    </Layout>
  );
}
