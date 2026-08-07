import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import networkBg from "../assets/backgrounds/network-bg.jpg";
import Icon from "../components/ui/Icon";

const POSTS = [
  { title: "5 Ways Universities Can Increase Journal Visibility", excerpt: "Practical strategies for improving indexing, citations, and global readership for university-hosted journals.", tag: "Publishing", icon: "TrendingUp", date: "12 June, 2024" },
  { title: "Understanding Double Blind Peer Review", excerpt: "A closer look at how double blind review protects impartiality and strengthens the credibility of published research.", tag: "Peer Review", icon: "Users", date: "28 May, 2024" },
  { title: "A Guide to Open Access Publishing for Universities", excerpt: "What open access means for authors, readers, and institutions — and how to get started.", tag: "Open Access", icon: "Unlock", date: "14 May, 2024" },
  { title: "Preparing Your Manuscript for Submission", excerpt: "A checklist to help authors avoid the most common reasons manuscripts are returned during editorial screening.", tag: "Author Tips", icon: "FileCheck", date: "2 May, 2024" },
  { title: "How Conferences Complement Journal Publishing", excerpt: "Why pairing conference presentations with journal publication accelerates research impact.", tag: "Conferences", icon: "CalendarDays", date: "20 April, 2024" },
  { title: "Indexing 101: Scopus, WoS, and DOAJ Explained", excerpt: "A breakdown of the major academic indexing databases and what they mean for your journal's reach.", tag: "Indexing", icon: "BarChart3", date: "8 April, 2024" },
];

export default function Blog() {
  return (
    <>
      <Seo title="Blog" description="Insights, guides, and updates on academic publishing, peer review, and journal hosting from the Technical Journals team." path="/blog" />
      <PageHero title="Blog" subtitle="Insights and guidance on academic publishing, peer review, and research visibility." bg={networkBg} />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((p) => (
            <article key={p.title} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-36 bg-gradient-to-br from-blue-800 to-slate-900 flex items-center justify-center">
                <Icon name={p.icon} className="w-9 h-9 text-white/80" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{p.tag}</span>
                  <span className="text-[11px] text-slate-400">{p.date}</span>
                </div>
                <h2 className="font-semibold text-sm text-slate-900 mb-1.5 leading-snug">{p.title}</h2>
                <p className="text-xs text-slate-500 leading-relaxed">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
