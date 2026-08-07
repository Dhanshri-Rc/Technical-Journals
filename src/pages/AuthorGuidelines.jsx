import PolicyPage from "../components/common/PolicyPage";

export default function AuthorGuidelines() {
  return (
    <PolicyPage
      title="Author Guidelines"
      path="/author-guidelines"
      subtitle="Guidelines to help authors prepare and submit high-quality manuscripts to journals hosted on Technical Journals."
      description="Read the author guidelines for manuscript formatting, submission requirements, and publication standards for journals hosted on Technical Journals."
      sections={[
        { title: "1. Manuscript Preparation", body: "Manuscripts should be submitted in Word (.doc/.docx) or PDF format, double-spaced, using a standard 12-point font. Each journal may specify additional formatting requirements available on the individual journal page." },
        { title: "2. Structure of the Manuscript", list: ["Title page with author names, affiliations, and corresponding author details.", "Abstract of 150–250 words with 4–6 keywords.", "Introduction, Methodology, Results, Discussion, and Conclusion sections.", "References formatted in the journal's required citation style.", "Tables and figures with clear captions, numbered sequentially."] },
        { title: "3. Originality and Plagiarism", body: "All submissions are screened for originality. Manuscripts must not be under review elsewhere and should properly cite all sources. See our Publication Ethics policy for full details." },
        { title: "4. Authorship Criteria", body: "All listed authors must have made a significant contribution to the research and approved the final manuscript. Any changes to authorship after submission must be approved by all co-authors and the editor." },
        { title: "5. Ethical Considerations", body: "Research involving human or animal subjects must include a statement of ethical approval. Conflicts of interest must be disclosed at submission." },
        { title: "6. Submission Process", body: "Manuscripts are submitted through our online submission form, which requires the manuscript file, abstract, and corresponding author details. You will receive a tracking ID to monitor your submission's progress." },
        { title: "7. Review Timeline", body: "Initial review typically takes 4–8 weeks depending on the journal and discipline. Authors will be notified of the editorial decision via email." },
      ]}
    />
  );
}
