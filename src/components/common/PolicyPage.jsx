import Seo from "./Seo";
import PageHero from "./PageHero";
import networkBg from "../../assets/backgrounds/network-bg.jpg";

export default function PolicyPage({ title, description, path, subtitle, sections }) {
  return (
    <>
      <Seo title={title} description={description} path={path} />
      <PageHero title={title} subtitle={subtitle} bg={networkBg} />
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14">
        {sections.map((s) => (
          <div key={s.title} className="mb-8">
            <h2 className="font-display font-bold text-lg text-slate-900 mb-2">{s.title}</h2>
            {s.body && <p className="text-sm text-slate-600 leading-relaxed mb-2">{s.body}</p>}
            {s.list && (
              <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-600">
                {s.list.map((li) => <li key={li}>{li}</li>)}
              </ul>
            )}
          </div>
        ))}
      </section>
    </>
  );
}
