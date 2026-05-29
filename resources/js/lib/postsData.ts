export interface PostItem {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  slug: string;
  image: string;
  author: string;
  authorId: number;
  readTime: string;
  views: string;
  bookmarked: boolean;
}

export const postsData: PostItem[] = [
  { id: 1, title: 'Why a clean homepage makes readers stay longer', excerpt: 'A calm layout, clear hierarchy, and fast scanning help visitors feel at home from the first scroll.', category: 'Design', slug: 'clean-homepage-readers', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80&fit=crop', author: 'Ava Carter', authorId: 1001, readTime: '6 min read', views: '4.2k', bookmarked: true },
  { id: 2, title: 'How smart categories improve discovery for modern blogs', excerpt: 'Readers move faster when categories are obvious, consistent, and easy to scan.', category: 'Productivity', slug: 'smart-categories-discovery', image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80&fit=crop', author: 'Noah Reed', authorId: 1002, readTime: '5 min read', views: '3.8k', bookmarked: false },
  { id: 3, title: 'The small details that make a blog feel premium', excerpt: 'Subtle spacing and careful typography transform simple cards into an editorial experience.', category: 'Writing', slug: 'details-premium-blog', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80&fit=crop', author: 'Maya Stone', authorId: 1003, readTime: '4 min read', views: '2.9k', bookmarked: true },
  { id: 4, title: 'The write-first workflow every creator should use', excerpt: 'Start with your ideas before the visuals so the story stays focused and authentic.', category: 'Writing', slug: 'write-first-workflow', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80&fit=crop', author: 'Ethan Cole', authorId: 1004, readTime: '5 min read', views: '1.7k', bookmarked: false },
  { id: 5, title: 'How to turn readers into a loyal newsletter audience', excerpt: 'Newsletter signups become easier when the value proposition is clear and consistent.', category: 'Growth', slug: 'readers-newsletter-audience', image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80&fit=crop', author: 'Lena Brooks', authorId: 1005, readTime: '7 min read', views: '3.1k', bookmarked: true },
  { id: 6, title: 'Why visual consistency matters for blog growth', excerpt: 'Readers remember a brand when type, spacing, and color all feel aligned.', category: 'Design', slug: 'visual-consistency-blog-growth', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80&fit=crop', author: 'Jordan Miles', authorId: 1006, readTime: '4 min read', views: '2.4k', bookmarked: false },
  { id: 7, title: 'SEO for independent writers who hate SEO', excerpt: 'A few smart habits do most of the work without turning writing into a spreadsheet exercise.', category: 'Technology', slug: 'seo-for-independent-writers', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fit=crop', author: 'Nora Kim', authorId: 1007, readTime: '6 min read', views: '5.6k', bookmarked: false },
  { id: 8, title: 'How to craft a headline that actually gets clicked', excerpt: 'The best headlines promise clarity, curiosity, and a payoff readers can trust.', category: 'Writing', slug: 'craft-compelling-headline', image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&q=80&fit=crop', author: 'Owen Hart', authorId: 1008, readTime: '3 min read', views: '6.2k', bookmarked: true },
  { id: 9, title: 'Remote work has changed how writers find their voice', excerpt: 'New routines and new environments are shaping how writers develop tone and style.', category: 'Culture', slug: 'remote-work-creative-writing', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80&fit=crop', author: 'Sofia Grant', authorId: 1009, readTime: '8 min read', views: '1.9k', bookmarked: false },
  { id: 10, title: 'A simple routine for writing every single day', excerpt: 'Consistency wins when the framework is simple enough to repeat without friction.', category: 'Wellness', slug: 'simple-writing-routine', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80&fit=crop', author: 'Mia Davis', authorId: 1010, readTime: '4 min read', views: '1.1k', bookmarked: false },
  { id: 11, title: 'Why founders need a strong editorial voice', excerpt: 'A clear voice helps companies sound human, credible, and memorable in every update.', category: 'Startups', slug: 'founders-editorial-voice', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80&fit=crop', author: 'Leo Cruz', authorId: 1011, readTime: '6 min read', views: '2.0k', bookmarked: true },
  { id: 12, title: 'The little habits that make long-form writing easier', excerpt: 'Longer articles become lighter when you build a repeatable drafting routine.', category: 'Travel', slug: 'habits-long-form-writing', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80&fit=crop', author: 'Hannah Park', authorId: 1012, readTime: '5 min read', views: '1.5k', bookmarked: false },
];

export const categories = ['All Topics', 'Technology', 'Design', 'Writing', 'Culture', 'Growth', 'Wellness', 'Startups', 'Travel'];
export const currentUserId = 1;
