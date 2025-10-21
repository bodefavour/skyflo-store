import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type Countdown = {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
};

type SubscribeStatus = "idle" | "loading" | "success" | "error";

const HIGHLIGHT_COLOR = "#d4af37";
const LAUNCH_TARGET = new Date("2027-01-01T12:00:00Z");

const padValue = (value: number) => value.toString().padStart(2, "0");

const calculateRemainingTime = (): Countdown => {
    const now = new Date().getTime();
    const delta = Math.max(0, LAUNCH_TARGET.getTime() - now);

    const days = Math.floor(delta / (1000 * 60 * 60 * 24));
    const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((delta / (1000 * 60)) % 60);
    const seconds = Math.floor((delta / 1000) % 60);

    return {
        days: padValue(days),
        hours: padValue(hours),
        minutes: padValue(minutes),
        seconds: padValue(seconds)
    };
};

const ComingSoon = () => {
    const [timeLeft, setTimeLeft] = useState<Countdown>(() => calculateRemainingTime());
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<SubscribeStatus>("idle");
    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {
        const timer = window.setInterval(() => {
            setTimeLeft(calculateRemainingTime());
        }, 1000);

        return () => window.clearInterval(timer);
    }, []);

    useEffect(() => {
        if (status === "idle") {
            return;
        }
        const timeout = window.setTimeout(() => {
            setStatus("idle");
            setStatusMessage("");
        }, 5000);

        return () => window.clearTimeout(timeout);
    }, [status]);

    const experienceHighlights = useMemo(
        () => [
            {
                title: "Curated gifting redesign",
                description: "Gifts tailored to every milestone and memory, crafted with the Skyflo touch."
            },
            {
                title: "Global concierge checkout",
                description: "Seamless currency support and personal assistance across every timezone."
            },
            {
                title: "Immersive celebration builder",
                description: "Design entire experiences, from decor to keepsakes, in one guided flow."
            }
        ],
        []
    );

    const momentumStats = useMemo(
        () => [
            { label: "Curated launches", value: "24" },
            { label: "Artisans onboard", value: "140+" },
            { label: "Wishlist signups", value: "3.2K" }
        ],
        []
    );

    const validateEmail = (value: string) => /.+@.+\..+/.test(value);

    const handleNotify = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            setStatus("error");
            setStatusMessage("Please enter a valid email address so we can reach you.");
            return;
        }

        setStatus("loading");
        setStatusMessage("Adding you to the guest list...");

        window.setTimeout(() => {
            setStatus("success");
            setStatusMessage("You are on the list. We will send a personal invite before launch.");
            setEmail("");
        }, 1000);
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-black text-white">
            <div className="absolute inset-0">
                <img
                    src="/images/HP_Hero-FullBleed-Desktop_Gucci-SOFTBIT-Mar25-GUCCI-PREFALL-DETAILS-29-INDIGO-LEWIN_001_Default.avif"
                    alt="Skyflo gallery teaser"
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-[#0a0a0a]/80" />
                <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#d4af37]/20 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#ffffff]/5 blur-3xl" />
            </div>

            <div className="relative z-10 flex min-h-screen flex-col">
                <header className="flex w-full items-center justify-between px-6 py-6 sm:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-3"
                    >
                        <div className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/70">
                            Skyflo Studios
                        </div>
                        <span className="text-sm text-white/50">
                            Crafting elevated celebrations worldwide
                        </span>
                    </motion.div>

                    <motion.a
                        href="mailto:hello@skyflo.com"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-[rgba(212,175,55,0.6)] hover:text-[rgba(212,175,55,0.9)] sm:flex"
                    >
                        Concierge
                    </motion.a>
                </header>

                <main className="flex flex-1 flex-col justify-center px-6 pb-16 pt-8 sm:px-10">
                    <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/70"
                        >
                            Coming Winter 2025
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            className="text-4xl font-semibold uppercase tracking-[0.3em] sm:text-5xl lg:text-6xl"
                        >
                            Skyflo is almost ready
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }}
                            className="mt-6 max-w-2xl text-base text-white/70 sm:text-lg"
                        >
                            We are perfecting a bespoke experience that elevates gifting, celebrations, and curated living.
                            Reserve your place to receive access to the private launch preview before doors open to the public.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.55 }}
                            className="mt-12 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4"
                        >
                            {[
                                { label: "Days", value: timeLeft.days },
                                { label: "Hours", value: timeLeft.hours },
                                { label: "Minutes", value: timeLeft.minutes },
                                { label: "Seconds", value: timeLeft.seconds }
                            ].map((segment) => (
                                <motion.div
                                    key={segment.label}
                                    whileHover={{ borderColor: HIGHLIGHT_COLOR, translateY: -4 }}
                                    className="rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur"
                                >
                                    <span className="block text-4xl font-semibold text-white sm:text-5xl">
                                        {segment.value}
                                    </span>
                                    <span className="mt-2 block text-xs uppercase tracking-[0.3em] text-white/50">
                                        {segment.label}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.form
                            onSubmit={handleNotify}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65 }}
                            className="mt-12 flex w-full max-w-xl flex-col gap-4 sm:flex-row"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="Join the launch list"
                                className="w-full rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm text-white placeholder:text-white/40 focus:border-[rgba(212,175,55,0.6)] focus:outline-none"
                                aria-label="Email address"
                                required
                            />
                            <button
                                type="submit"
                                className="flex items-center justify-center rounded-full bg-[rgba(212,175,55,0.85)] px-6 py-3 text-sm font-medium uppercase tracking-[0.25em] text-black transition hover:bg-[rgba(212,175,55,1)]"
                                disabled={status === "loading"}
                            >
                                {status === "loading" ? "Adding..." : "Notify me"}
                            </button>
                        </motion.form>

                        {status !== "idle" && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={`mt-3 text-sm ${status === "error" ? "text-red-400" : "text-white/70"}`}
                            >
                                {statusMessage}
                            </motion.p>
                        )}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.75 }}
                            className="mt-14 grid w-full gap-6 lg:grid-cols-2"
                        >
                            {experienceHighlights.map((item) => (
                                <motion.div
                                    key={item.title}
                                    whileHover={{ translateY: -6, borderColor: HIGHLIGHT_COLOR }}
                                    className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur"
                                >
                                    <h3 className="text-lg font-semibold text-white/90">{item.title}</h3>
                                    <p className="mt-3 text-sm text-white/60">{item.description}</p>
                                </motion.div>
                            ))}
                            <motion.div
                                whileHover={{ translateY: -6, borderColor: HIGHLIGHT_COLOR }}
                                className="relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-black/70 p-6"
                            >
                                <div>
                                    <h3 className="text-sm uppercase tracking-[0.35em] text-white/50">Preview Capsule</h3>
                                    <p className="mt-3 text-lg font-semibold text-white/90">
                                        Experience the first curated drops and bespoke concierge tools crafted for celebrations with edge.
                                    </p>
                                </div>
                                <motion.a
                                    href="mailto:hello@skyflo.com?subject=Skyflo+Private+Preview"
                                    whileHover={{ color: HIGHLIGHT_COLOR }}
                                    className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-white/60"
                                >
                                    Request private walkthrough →
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </div>
                </main>

                <footer className="relative px-6 pb-10 pt-8 sm:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.85 }}
                        className="mx-auto flex w-full max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div className="flex flex-col gap-2 text-sm text-white/60">
                            <span className="uppercase tracking-[0.3em] text-white/40">Momentum</span>
                            <div className="flex flex-wrap items-center gap-4">
                                {momentumStats.map((stat) => (
                                    <div key={stat.label} className="flex flex-col">
                                        <span className="text-lg font-semibold text-white">{stat.value}</span>
                                        <span className="text-xs uppercase tracking-[0.25em] text-white/40">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/50">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="transition hover:text-[rgba(212,175,55,0.9)]"
                            >
                                Instagram
                            </a>
                            <a
                                href="https://pinterest.com"
                                target="_blank"
                                rel="noreferrer"
                                className="transition hover:text-[rgba(212,175,55,0.9)]"
                            >
                                Pinterest
                            </a>
                            <a
                                href="https://x.com"
                                target="_blank"
                                rel="noreferrer"
                                className="transition hover:text-[rgba(212,175,55,0.9)]"
                            >
                                X
                            </a>
                        </div>
                    </motion.div>
                </footer>
            </div>
        </div>
    );
};

export default ComingSoon;
