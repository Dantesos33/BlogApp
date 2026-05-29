import { Head } from '@inertiajs/react';
import Layout from '@/layouts/layout';
import PageCard from '@/components/PageCard';

const notifications = [
  { title: 'New comment on “Why a clean homepage makes readers stay longer”', meta: '2 minutes ago' },
  { title: 'Your article “How smart categories improve discovery” is trending in Design', meta: 'Today' },
  { title: 'A new follower subscribed to your writer profile', meta: 'Yesterday' },
];

export default function NotificationsPage() {
  return (
    <Layout>
      <Head title="Inbox" />
      <div className="space-y-8">
        <PageCard title="Inbox" description="Keep track of comments, mentions, and activity from your readers and collaborators.">
          <div className="space-y-3">
            {notifications.map((item) => (
              <article key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600 shadow-sm">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-blue-600">{item.meta}</p>
              </article>
            ))}
          </div>
        </PageCard>
      </div>
    </Layout>
  );
}
