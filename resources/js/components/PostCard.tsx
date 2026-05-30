import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaBookmark, FaClock, FaEye } from 'react-icons/fa';
import type { PostItem } from '@/lib/postsData';
import { deletePost, isBookmarked, toggleBookmark } from '@/lib/postsStorage';

interface PostCardProps {
  post: PostItem;
  canManage?: boolean;
}

export default function PostCard({ post, canManage = false }: PostCardProps) {
  const { auth } = usePage<{ auth?: { user?: { id?: number } } }>().props;
  const [bookmarked, setBookmarked] = useState(() => isBookmarked(post.id, auth?.user?.id));

  useEffect(() => {
    const sync = () => setBookmarked(isBookmarked(post.id, auth?.user?.id));
    sync();
    window.addEventListener('blogapp-bookmarks-updated', sync);
    return () => window.removeEventListener('blogapp-bookmarks-updated', sync);
  }, [auth?.user?.id, post.id]);

  const handleBookmark = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!auth?.user?.id) {
      router.visit('/login');
      return;
    }

    setBookmarked(toggleBookmark(post.id, auth.user.id));
  };

  return (
    <article className="rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <Link href={`/posts/${post.slug}`} className="block">
        <img src={post.image} alt={post.title} className="h-44 w-full rounded-t-3xl object-cover" />
        <div className="p-5">
          <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
            <span>{post.category}</span>
            <button
              type="button"
              onClick={handleBookmark}
              aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
              className={`cursor-pointer rounded-full border p-2 transition ${bookmarked ? 'border-blue-200 bg-blue-50 text-blue-600' : 'border-slate-200 bg-white text-slate-400 hover:border-blue-200 hover:text-blue-600'}`}
            >
              <FaBookmark size={12} />
            </button>
          </div>
          <h3 className="mt-3 text-lg font-black text-slate-900">{post.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5"><FaClock size={11} /> {post.readTime}</span>
            <span className="inline-flex items-center gap-1.5"><FaEye size={11} /> {post.views}</span>
          </div>
        </div>
      </Link>
      {canManage ? (
        <div className="flex items-center gap-2 border-t border-slate-100 px-5 py-4">
          <Link href={`/posts/${post.slug}/edit`} className="cursor-pointer rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">Edit</Link>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              if (deletePost(post.slug, auth?.user?.id)) {
                window.location.assign('/posts');
              }
            }}
            className="cursor-pointer rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-100"
          >
            Delete
          </button>
        </div>
      ) : null}
    </article>
  );
}
