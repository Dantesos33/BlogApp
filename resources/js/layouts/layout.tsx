import { Footer } from "@/components/Footer";
import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-10 lg:px-8">{children}</main>
            <Footer />
        </div>
    );
}
