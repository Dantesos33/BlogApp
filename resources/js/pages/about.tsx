import { Head } from '@inertiajs/react';
import Layout from '@/layouts/layout';
import PageCard from '@/components/PageCard';

export default function AboutPage() {
  return (
    <Layout>
      <Head title="About" />
      <div className="space-y-8">
        <PageCard title="About BlogApp" description="BlogApp is a bright, modern publishing space designed for creators, readers, and editorial teams.">
          <p className="text-sm text-slate-600 md:text-base">The platform combines a calm interface, readable typography, and flexible content sections to help you tell stories with clarity and confidence.</p>
        </PageCard>
      </div>
    </Layout>
  );
}
