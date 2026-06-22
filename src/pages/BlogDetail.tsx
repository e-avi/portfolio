import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, BookOpen, Tag } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const getBlogDetailHeroVisual = (category: string) => {
  return (
    <div className="h-40 w-full relative overflow-hidden bg-gradient-to-br from-[#2B2F2E] via-[#353833] to-bronze/10 border-b border-quicksilver/20 dark:border-aurometalsaurus/15 flex items-center justify-center">
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#F4F0EC_2px,transparent_2px)] [background-size:24px_24px]"></div>
      <span className="font-display italic text-5xl md:text-6xl opacity-[0.05] select-none uppercase font-bold tracking-widest text-bronze">
        {category}
      </span>
      <div className="absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-widest opacity-40">
        EDITORIAL READ // V.S. WRITING
      </div>
    </div>
  );
};

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const blog = portfolioData.blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="py-24 text-center space-y-6">
        <h2 className="text-3xl font-display font-bold">Article Not Found</h2>
        <p className="opacity-70 max-w-md mx-auto">
          The blog post or write-up you are looking for does not exist or has been deleted.
        </p>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 px-6 py-3 bg-bronze text-blackolive font-bold hover:bg-bronze-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>
      </div>
    );
  }

  // Find related articles (same category or general recommendations, excluding current article)
  const relatedBlogs = portfolioData.blogs
    .filter((b) => b.id !== blog.id)
    .slice(0, 2);

  // Custom rendering logic for basic Markdown styling
  const renderMarkdown = (text: string) => {
    const parts = text.split(/```/g);
    return parts.map((part, index) => {
      // Odd indices are inside code blocks
      if (index % 2 === 1) {
        const lines = part.split("\n");
        const language = lines[0].trim();
        const code = lines.slice(1).join("\n").trim();
        return (
          <div key={index} className="my-6 border border-quicksilver/20 dark:border-aurometalsaurus/20 rounded-none overflow-hidden">
            <div className="bg-lightgray/10 dark:bg-black/35 px-4 py-2 border-b border-quicksilver/20 dark:border-aurometalsaurus/15 flex items-center justify-between text-xs font-mono">
              <span className="text-bronze font-semibold">{language || "code"}</span>
              <button
                onClick={() => navigator.clipboard.writeText(code)}
                className="hover:text-bronze active:scale-95 transition-all cursor-pointer font-bold bg-transparent border-none outline-none"
              >
                Copy
              </button>
            </div>
            <pre className="p-4 bg-lightgray/5 dark:bg-black/20 text-xs md:text-sm font-mono overflow-x-auto text-left leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Even indices are prose
      return part.split("\n\n").map((para, pIdx) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        // Check for Headers
        if (trimmed.startsWith("###")) {
          return (
            <h3 key={`${index}-${pIdx}`} className="text-2xl md:text-3xl font-display font-semibold italic mt-8 mb-4 text-left">
              {trimmed.replace(/^###\s+/, "")}
            </h3>
          );
        }

        if (trimmed.startsWith("##")) {
          return (
            <h2 key={`${index}-${pIdx}`} className="text-3xl md:text-4xl font-display font-semibold italic mt-10 mb-4 text-left">
              {trimmed.replace(/^##\s+/, "")}
            </h2>
          );
        }

        // Bullet Lists
        if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
          // split on newlines that start with bullet indicators
          const items = trimmed.split(/\n[\*\-]\s+/);
          return (
            <ul key={`${index}-${pIdx}`} className="list-disc list-inside pl-4 space-y-2 my-6 text-left leading-relaxed">
              {items.map((item, iIdx) => (
                <li key={iIdx} className="text-sm md:text-base opacity-90">
                  {item.replace(/^[\*\-]\s+/, "")}
                </li>
              ))}
            </ul>
          );
        }

        // Numbered Lists
        if (/^\d+\./.test(trimmed)) {
          const items = trimmed.split(/\n\d+\.\s+/);
          return (
            <ol key={`${index}-${pIdx}`} className="list-decimal list-inside pl-4 space-y-2 my-6 text-left leading-relaxed">
              {items.map((item, iIdx) => (
                <li key={iIdx} className="text-sm md:text-base opacity-90">
                  {item.replace(/^\d+\.\s+/, "")}
                </li>
              ))}
            </ol>
          );
        }

        // Standard Paragraphs with inline Bold format parser (**text**)
        return (
          <p key={`${index}-${pIdx}`} className="text-sm md:text-base leading-relaxed opacity-90 my-4 text-left whitespace-pre-wrap">
            {trimmed.split(/(\*\*.*?\*\*)/g).map((chunk, cIndex) => {
              if (chunk.startsWith("**") && chunk.endsWith("**")) {
                return (
                  <strong key={cIndex} className="font-bold text-bronze">
                    {chunk.slice(2, -2)}
                  </strong>
                );
              }
              return chunk;
            })}
          </p>
        );
      });
    });
  };

  return (
    <div className="py-12 space-y-8">
        {/* Navigation Link back */}
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-sm font-mono font-bold text-bronze hover:underline group animate-fade-in"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Blogs
        </Link>

        {/* Dynamic Header Block with Visual Panel */}
        <div className="border border-quicksilver/30 dark:border-aurometalsaurus/20 overflow-hidden">
          {getBlogDetailHeroVisual(blog.category)}
          
          <div className="p-6 md:p-10 space-y-4">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <span className="text-bronze font-bold uppercase tracking-wider">{blog.category}</span>
              <span className="flex items-center gap-1.5 opacity-70"><Calendar className="w-3.5 h-3.5" /> {blog.publishDate}</span>
              <span className="flex items-center gap-1.5 opacity-70"><Clock className="w-3.5 h-3.5" /> {blog.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-medium italic tracking-tight leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap gap-2 pt-2">
              {blog.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-3 py-1 rounded-none border border-quicksilver/35 dark:border-aurometalsaurus/20 bg-lightgray/10 dark:bg-blackolive/40 flex items-center gap-1 text-bronze"
                >
                  <Tag className="w-3 h-3 text-bronze" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          {/* Main Article Content */}
          <div className="lg:col-span-8 space-y-6 prose dark:prose-invert max-w-none">
            {renderMarkdown(blog.content)}
          </div>

          {/* Related Articles Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {relatedBlogs.length > 0 && (
              <div className="p-6 border border-quicksilver/30 dark:border-aurometalsaurus/15 bg-white/5 space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-dashed border-aurometalsaurus/20 text-bronze">
                  <BookOpen className="w-5 h-5" />
                  <h3 className="font-mono text-sm uppercase font-bold tracking-wider">Suggested Reading</h3>
                </div>
                <div className="space-y-6">
                  {relatedBlogs.map((post) => (
                    <div key={post.id} className="space-y-2 group">
                      <span className="text-[10px] font-mono text-bronze uppercase font-bold">{post.category}</span>
                      <h4 className="text-base font-bold font-display italic leading-snug group-hover:text-bronze transition-colors">
                        <Link to={`/blogs/${post.id}`}>{post.title}</Link>
                      </h4>
                      <p className="text-xs opacity-75 line-clamp-2 leading-relaxed">{post.summary}</p>
                      <Link
                        to={`/blogs/${post.id}`}
                        className="text-xs font-mono font-bold text-bronze hover:underline inline-block pt-1"
                      >
                        Read Post &rarr;
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
  );
}
