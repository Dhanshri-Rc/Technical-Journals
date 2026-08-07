import PolicyPage from "../components/common/PolicyPage";

export default function Indexing() {
  return (
    <PolicyPage
      title="Indexing & Abstracting"
      path="/indexing"
      subtitle="Journals hosted on Technical Journals are indexed across major academic databases to maximize discoverability and citation impact."
      description="Learn how Technical Journals-hosted journals are indexed and abstracted in Scopus, Web of Science, DOAJ, Google Scholar, and other major databases."
      sections={[
        { title: "1. Why Indexing Matters", body: "Indexing in recognised databases increases the discoverability, credibility, and citation impact of published research, helping authors reach a wider academic audience." },
        { title: "2. Supported Indexing Databases", list: ["Scopus", "Web of Science (WoS)", "Google Scholar", "DOAJ (Directory of Open Access Journals)", "UGC-CARE (where applicable)"] },
        { title: "3. DOI Assignment", body: "Every published article receives a persistent Digital Object Identifier (DOI), ensuring it can be reliably cited and located over time." },
        { title: "4. Indexing Timeline", body: "New journals typically apply for indexing after publishing a minimum number of issues with consistent editorial quality. Our team assists universities throughout the indexing application process." },
        { title: "5. Checking a Journal's Index Status", body: "Each journal's current indexing status is displayed on its individual journal page under 'Journal Facts'." },
      ]}
    />
  );
}
