import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, BookOpen, ChevronRight, Tag } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const getBlogVisual = (category: string, index: number) => {
  const patterns = [
    "bg-[linear-gradient(45deg,#2B2F2E_25%,transparent_25%),linear-gradient(-45deg,#2B2F2E_25%,transparent_25%)] [background-size:20px_20px]",
    "bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]",
    "bg-[linear-gradient(to_right,#3B3C36_1px,transparent_1px)] [background-size:24px_24px]"
  ];
  const pattern = patterns[index % patterns.length];
  return (
    <div className="w-full h-full relative overflow-hidden bg-lightgray/5 dark:bg-black/10 flex items-center justify-center min-h-[220px]">
      <div className={`absolute inset-0 opacity-[0.06] ${pattern}`}></div>
      {/* Editorial geometric visual */}
      <div className="absolute w-3/4 h-3/4 border border-quicksilver/20 dark:border-aurometalsaurus/15 group-hover:scale-105 transition-transform duration-700"></div>
      <div className="absolute w-1/2 h-1/2 border border-bronze/25 dark:border-bronze/15 rotate-12 group-hover:rotate-45 transition-transform duration-700"></div>
      <div className="font-display italic text-6xl opacity-[0.04] select-none uppercase font-bold absolute">
        {category.slice(0, 4)}
      </div>
    </div>
  );
};

export default function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const blogs = portfolioData.blogs;

  // Get list of categories
  const categories = ["All", ...new Set(blogs.map((b) => b.category))];

  // Filter blogs based on category
  const filteredBlogs = selectedCategory === "All"
    ? blogs
    : blogs.filter((b) => b.category === selectedCategory);

  const featuredPost = filteredBlogs[0];
  const remainingBlogs = filteredBlogs.slice(1);

  return (
    <div className="py-12 space-y-12">
        {/* Navigation Link back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-mono font-bold text-bronze hover:underline group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        {/* Header Block */}
        <div className="space-y-4 text-center md:text-left border-b border-dashed border-aurometalsaurus/20 pb-8">
          <div className="inline-flex items-center gap-2 text-bronze font-mono text-sm tracking-wider uppercase justify-center md:justify-start">
            <BookOpen className="w-4 h-4" />
            <span>Articles & Insights</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-medium italic tracking-tight">
            Blogs & Write-ups
          </h1>
          <p className="text-lg opacity-80 max-w-2xl leading-relaxed">
            Detailed guides, thought leadership, and deep dives on software architecture, frontend technologies, and AI governance systems.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pb-2 justify-center md:justify-start">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-none text-xs font-mono font-semibold transition-all border cursor-pointer ${
                selectedCategory === category
                  ? "bg-bronze text-blackolive border-bronze font-bold"
                  : "border-quicksilver/35 dark:border-aurometalsaurus/20 hover:border-bronze/45 hover:bg-bronze/5 text-current"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blogs List */}
        {filteredBlogs.length > 0 ? (
          <div className="space-y-12">
            {/* Featured Post Card */}
            {featuredPost && (
              <article className="group border border-lightgray dark:border-aurometalsaurus/20 bg-white/50 dark:bg-blackolive/60 hover:border-bronze/50 transition-colors rounded">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-xs font-mono text-bronze font-bold uppercase tracking-wider">
                        <span>Featured Article</span>
                        <span className="opacity-40">•</span>
                        <span>{featuredPost.category}</span>
                      </div>
                      
                      <h2 className="text-2xl md:text-4xl font-display font-medium italic tracking-tight leading-tight group-hover:text-bronze transition-colors">
                        <Link to={`/blogs/${featuredPost.id}`}>{featuredPost.title}</Link>
                      </h2>
                      
                      <p className="text-sm opacity-85 leading-relaxed">
                        {featuredPost.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-dashed border-aurometalsaurus/15 text-xs font-mono opacity-80">
                      <div className="flex items-center gap-4">
                        <span>{featuredPost.publishDate}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}</span>
                      </div>
                      <Link
                        to={`/blogs/${featuredPost.id}`}
                        className="font-bold text-bronze hover:underline inline-flex items-center gap-1 hover:translate-x-1 transition-transform"
                      >
                        Read Article <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-quicksilver/20 dark:border-aurometalsaurus/15 overflow-hidden">
                    {getBlogVisual(featuredPost.category, 0)}
                  </div>
                </div>
              </article>
            )}

            {/* Remaining Posts Grid */}
            {remainingBlogs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {remainingBlogs.map((post, idx) => (
                  <article
                    key={post.id}
                    className="group border border-lightgray dark:border-aurometalsaurus/20 flex flex-col justify-between overflow-hidden bg-white/50 dark:bg-blackolive/60 hover:border-bronze/50 transition-colors rounded"
                  >
                    <div>
                      {/* Top Graphic Banner */}
                      <div className="border-b border-quicksilver/15 dark:border-aurometalsaurus/15">
                        {getBlogVisual(post.category, idx + 1)}
                      </div>

                      <div className="p-6 space-y-4">
                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs font-mono opacity-70">
                          <span className="text-bronze font-bold uppercase tracking-wider">{post.category}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold font-display italic tracking-tight leading-snug group-hover:text-bronze transition-colors duration-200">
                          <Link to={`/blogs/${post.id}`}>{post.title}</Link>
                        </h3>

                        {/* Summary */}
                        <p className="text-xs opacity-85 leading-relaxed line-clamp-3">
                          {post.summary}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 py-4 border-t border-dashed border-aurometalsaurus/15 flex flex-col gap-3 bg-lightgray/5 dark:bg-blackolive/20">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[9px] font-mono opacity-80 hover:opacity-100 flex items-center gap-1 text-bronze uppercase tracking-wider"
                          >
                            <Tag className="w-2.5 h-2.5 text-bronze" /> {tag.toLowerCase()}
                          </span>
                        ))}
                      </div>

                      {/* Read More Link */}
                      <Link
                        to={`/blogs/${post.id}`}
                        className="text-xs font-mono font-bold text-bronze hover:underline inline-flex items-center gap-1 mt-1 hover:translate-x-1 transition-transform self-start"
                      >
                        Read Article <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24 opacity-60">
            <p>No blog posts found matching this category filter.</p>
          </div>
        )}
      </div>
  );
}

