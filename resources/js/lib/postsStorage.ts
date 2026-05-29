import { postsData, type PostItem } from './postsData';

const POSTS_KEY = 'blogapp_posts_v1';
const BOOKMARKS_KEY = 'blogapp_bookmarks_v1';

const readStoredPosts = (): PostItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(POSTS_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as PostItem[];
    return parsed.filter((post) => post.id > postsData.length);
  } catch {
    return [];
  }
};

const writeStoredPosts = (posts: PostItem[]) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
};

export const getAllPosts = (): PostItem[] => [...postsData, ...readStoredPosts()];

export const getBookmarksByUser = (userId?: number): number[] => {
  if (!userId || typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(BOOKMARKS_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as Record<string, number[]>;
    return parsed[String(userId)] ?? [];
  } catch {
    return [];
  }
};

export const getBookmarkedPosts = (userId?: number): PostItem[] => {
  const book = getBookmarksByUser(userId);
  return getAllPosts().filter((post) => book.includes(post.id));
};

export const isBookmarked = (postId: number, userId?: number) => {
  return getBookmarksByUser(userId).includes(postId);
};

const notifyBookmarksChanged = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('blogapp-bookmarks-updated'));
  }
};

export const toggleBookmark = (postId: number, userId?: number): boolean => {
  if (!userId || typeof window === 'undefined') {
    return false;
  }

  const existing = getBookmarksByUser(userId);
  const next = existing.includes(postId)
    ? existing.filter((id) => id !== postId)
    : [...existing, postId];

  const stored = JSON.parse(window.localStorage.getItem(BOOKMARKS_KEY) || '{}') as Record<string, number[]>;
  stored[String(userId)] = next;
  window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(stored));
  notifyBookmarksChanged();

  return next.includes(postId);
};

export const removeBookmark = (postId: number, userId?: number) => {
  if (!userId || typeof window === 'undefined') {
    return;
  }

  const stored = JSON.parse(window.localStorage.getItem(BOOKMARKS_KEY) || '{}') as Record<string, number[]>;
  const next = (stored[String(userId)] ?? []).filter((id) => id !== postId);
  stored[String(userId)] = next;
  window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(stored));
  notifyBookmarksChanged();
};

export const createPost = (input: { title: string; category: string; excerpt: string; image?: string }, userId?: number): PostItem => {
  if (!userId) {
    throw new Error('You must be logged in to create a post.');
  }

  const storedPosts = readStoredPosts();
  const nextPost: PostItem = {
    id: Math.max(...[...postsData, ...storedPosts].map((post) => post.id), 0) + 1,
    title: input.title,
    excerpt: input.excerpt,
    category: input.category,
    slug: input.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `post-${Date.now()}`,
    image: input.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80&fit=crop',
    author: 'You',
    authorId: userId,
    readTime: '4 min read',
    views: '0',
    bookmarked: false,
  };

  writeStoredPosts([...storedPosts, nextPost]);

  return nextPost;
};

export const updatePost = (slug: string, input: { title: string; category: string; excerpt: string; image?: string }, userId?: number) => {
  if (!userId || typeof window === 'undefined') {
    return null;
  }

  const storedPosts = readStoredPosts();
  const index = storedPosts.findIndex((post) => post.slug === slug && post.authorId === userId);
  if (index === -1) return null;

  const nextPost = {
    ...storedPosts[index],
    title: input.title,
    excerpt: input.excerpt,
    category: input.category,
    image: input.image || storedPosts[index].image,
    slug: input.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || slug,
  };

  const next = [...storedPosts];
  next[index] = nextPost;
  writeStoredPosts(next);
  return nextPost;
};

export const deletePost = (slug: string, userId?: number) => {
  if (!userId || typeof window === 'undefined') {
    return false;
  }

  const storedPosts = readStoredPosts();
  const next = storedPosts.filter((post) => !(post.slug === slug && post.authorId === userId));
  writeStoredPosts(next);
  return next.length !== storedPosts.length;
};
