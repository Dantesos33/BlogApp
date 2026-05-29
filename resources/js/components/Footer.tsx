import { Link } from "@inertiajs/react";

export function Footer() {
    return (
        <footer className="mt-12 border-t border-slate-200 bg-white">
            <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 text-sm text-slate-600 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
                <div>
                    <p className="text-brand">Blog App</p>
                    <p className="mt-3 text-ui-muted">A bright blog platform for writers, readers, and creators who want a clean and modern publishing experience.</p>
                </div>
                <div>
                    <p className="text-col-title">Explore</p>
                    <ul className="mt-3 space-y-2 text-ui-muted">
                        <li><Link href="/posts" className="hover:text-blue-600">Latest blogs</Link></li>
                        <li><Link href="/categories" className="hover:text-blue-600">Categories</Link></li>
                        <li><Link href="/bookmarks" className="hover:text-blue-600">Bookmarks</Link></li>
                    </ul>
                </div>
                <div>
                    <p className="text-col-title">Contact</p>
                    <ul className="mt-3 space-y-2 text-ui-muted">
                        <li><a href="mailto:hello@blogapp.dev" className="hover:text-blue-600">hello@blogapp.dev</a></li>
                        <li><Link href="/contact" className="hover:text-blue-600">Contact us</Link></li>
                        <li><Link href="/about" className="hover:text-blue-600">About BlogApp</Link></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-100 py-4 text-center text-caption">© 2026 Blog App. All rights reserved.</div>
        </footer>
    );
}
