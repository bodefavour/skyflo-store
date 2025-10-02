import React from "react";
import { motion } from "framer-motion";
import ProductGrid from "./ProductGrid";

type SortOption = "priceAsc" | "priceDesc" | "nameAsc";

type Highlight = {
    title: string;
    description: string;
};

type Stat = {
    label: string;
    value: string;
};

interface CollectionPageLayoutProps {
    title: string;
    subtitle: string;
    description: string;
    collectionName: string;
    backgroundImage?: string;
    highlights?: Highlight[];
    stats?: Stat[];
    defaultSort?: SortOption;
    showFilter?: boolean;
}

const CollectionPageLayout: React.FC<CollectionPageLayoutProps> = ({
    title,
    subtitle,
    description,
    collectionName,
    backgroundImage,
    highlights = [],
    stats = [],
    defaultSort = "priceAsc",
    showFilter = true
}) => {
    return (
        <main className="relative bg-[#040404] text-white min-h-screen">
            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    {backgroundImage ? (
                        <>
                            <img
                                src={backgroundImage}
                                alt={title}
                                className="w-full h-full object-cover opacity-50"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-[#040404]" />
                        </>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-[#040404]" />
                    )}
                    <div className="absolute -top-1/2 left-1/2 w-[120%] max-w-6xl aspect-square bg-[#d4af37]/10 blur-3xl opacity-60 -translate-x-1/2" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.45em] text-white/60 bg-white/5 rounded-full px-4 py-2 backdrop-blur"
                    >
                        {subtitle}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mt-8 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl"
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mt-6 max-w-2xl text-base md:text-lg text-white/70"
                    >
                        {description}
                    </motion.p>

                    {stats.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
                        >
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur"
                                >
                                    <p className="text-sm text-white/50 uppercase tracking-[0.25em]">
                                        {stat.label}
                                    </p>
                                    <p className="mt-3 text-2xl font-semibold text-white">
                                        {stat.value}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {highlights.length > 0 && (
                <section className="relative z-10 -mt-12 pb-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {highlights.map((highlight) => (
                                <motion.div
                                    key={highlight.title}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 backdrop-blur group"
                                >
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#d4af37]/20 via-transparent to-transparent" />
                                    <div className="relative">
                                        <h3 className="text-lg font-semibold text-white">
                                            {highlight.title}
                                        </h3>
                                        <p className="mt-3 text-sm text-white/70 leading-relaxed">
                                            {highlight.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="relative z-10 pb-24">
                <ProductGrid
                    collectionName={collectionName}
                    defaultSort={defaultSort}
                    showFilter={showFilter}
                    theme="dark"
                />
            </section>
        </main>
    );
};

export default CollectionPageLayout;
