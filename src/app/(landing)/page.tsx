import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import logo from "@/asset/logo.png";
import { FaHeart, FaUserFriends, FaImage, FaBolt, FaArrowRight } from "react-icons/fa";

const features = [
    {
        icon: <FaImage />,
        title: "Share your moments",
        text: "Post photos with captions and let your vibe speak for itself.",
    },
    {
        icon: <FaUserFriends />,
        title: "Find your people",
        text: "Discover creators, follow friends and build your own circle.",
    },
    {
        icon: <FaHeart />,
        title: "Like what you love",
        text: "Save the posts that move you and revisit them anytime.",
    },
    {
        icon: <FaBolt />,
        title: "Instant sign in",
        text: "Jump in with Google or GitHub. No passwords, no friction.",
    },
];

const steps = [
    { n: "01", title: "Sign in", text: "Continue with Google or GitHub in one click." },
    { n: "02", title: "Pick a username", text: "Claim your handle and set up your profile." },
    { n: "03", title: "Start vibing", text: "Post, follow, like and explore the feed." },
];

export default async function Landing() {
    const token = (await cookies()).get("token")?.value;
    if (token) redirect("/feed");

    return (
        <div className="min-h-screen bg-[#18141F] text-white overflow-x-hidden">
            {/* glow */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(124,85,231,0.35),transparent_65%)]" />

            <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                <Link href="/">
                    <Image src={logo} alt="VibeZone" priority className="w-[140px] h-auto" />
                </Link>
                <nav className="flex items-center gap-6 text-sm font-medium text-gray-300">
                    <a href="#features" className="hidden sm:block hover:text-white transition">Features</a>
                    <a href="#how" className="hidden sm:block hover:text-white transition">How it works</a>
                    <Link
                        href="/signin"
                        className="rounded-full bg-white/10 px-5 py-2 text-white hover:bg-white/20 transition"
                    >
                        Sign in
                    </Link>
                </nav>
            </header>

            <section className="relative z-10 mx-auto max-w-4xl px-6 pt-16 pb-24 text-center md:pt-28">
                <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold tracking-wide text-[#B9A5FF]">
                    ✨ The social space for good vibes
                </span>
                <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-6xl">
                    Share your <span className="bg-gradient-to-r from-[#7C55E7] to-[#E2367C] bg-clip-text text-transparent">vibe</span> with
                    the world
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
                    VibeZone is where you post what you love, follow people who inspire you and
                    connect over the moments that matter.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        href="/signin"
                        className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7C55E7] to-[#E2367C] px-8 py-4 font-semibold shadow-lg shadow-[#7C55E7]/30 transition hover:scale-105"
                    >
                        Get started
                        <FaArrowRight className="transition group-hover:translate-x-1" />
                    </Link>
                    <a
                        href="#features"
                        className="rounded-full border border-white/15 px-8 py-4 font-semibold text-gray-200 transition hover:bg-white/5"
                    >
                        Learn more
                    </a>
                </div>

                {/* mock post card */}
                <div className="mx-auto mt-20 max-w-md rounded-2xl border border-white/10 bg-[#0E0B13] p-5 text-left shadow-2xl">
                    <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#7C55E7] to-[#E2367C]" />
                        <div>
                            <p className="font-semibold">Vibe Explorer</p>
                            <p className="text-sm text-gray-500">@goodvibes</p>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-300">Golden hour hits different when you&apos;re surrounded by great people 🌅</p>
                    <div className="mt-4 h-48 rounded-xl bg-gradient-to-br from-[#2A1F45] via-[#4B2A7A] to-[#E2367C]/60" />
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                        <FaHeart className="text-red-500" /> 1.2k likes
                    </div>
                </div>
            </section>

            <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
                <h2 className="text-center text-3xl font-bold sm:text-4xl">Everything you need to vibe</h2>
                <p className="mx-auto mt-3 max-w-xl text-center text-gray-400">
                    Simple, fast and made for sharing.
                </p>
                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-[#7C55E7]/50 hover:bg-white/[0.06]"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7C55E7]/20 text-xl text-[#B9A5FF]">
                                {f.icon}
                            </div>
                            <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-400">{f.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="how" className="relative z-10 mx-auto max-w-5xl px-6 py-20">
                <h2 className="text-center text-3xl font-bold sm:text-4xl">Up and running in seconds</h2>
                <div className="mt-14 grid gap-8 md:grid-cols-3">
                    {steps.map((s) => (
                        <div key={s.n} className="text-center">
                            <p className="bg-gradient-to-r from-[#7C55E7] to-[#E2367C] bg-clip-text text-5xl font-extrabold text-transparent">
                                {s.n}
                            </p>
                            <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                            <p className="mt-2 text-gray-400">{s.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="relative z-10 mx-auto max-w-4xl px-6 py-20">
                <div className="rounded-3xl bg-gradient-to-r from-[#7C55E7] to-[#E2367C] p-10 text-center sm:p-16">
                    <h2 className="text-3xl font-extrabold sm:text-4xl">Ready to join the zone?</h2>
                    <p className="mt-3 text-white/80">Create your profile and post your first vibe today.</p>
                    <Link
                        href="/signin"
                        className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-semibold text-[#18141F] transition hover:scale-105"
                    >
                        Join VibeZone
                    </Link>
                </div>
            </section>

            <footer className="relative z-10 border-t border-white/10 py-8 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} VibeZone. All rights reserved.
            </footer>
        </div>
    );
}
