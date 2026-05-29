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
                        <li>Latest blogs</li>
                        <li>Popular reads</li>
                        <li>Categories</li>
                    </ul>
                </div>
                <div>
                    <p className="text-col-title">Contact</p>
                    <ul className="mt-3 space-y-2 text-ui-muted">
                        <li>hello@blogapp.dev</li>
                        <li>Write for us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-100 py-4 text-center text-caption">© 2026 Blog App. All rights reserved.</div>
        </footer>
    );
}
