import PolicyPage from "../components/common/PolicyPage";

export default function PublicationEthics() {
  return (
    <PolicyPage
      title="Publication Ethics"
      path="/publication-ethics"
      subtitle="Our commitment to upholding the highest standards of publication ethics and integrity across every journal we host."
      description="Learn about Technical Journals' publication ethics policy, covering authorship, plagiarism, conflicts of interest, and misconduct handling."
      sections={[
        { title: "1. Our Commitment", body: "Technical Journals is committed to upholding the highest standards of publication ethics for every journal hosted on our platform, in line with recognised international guidelines for academic publishing." },
        { title: "2. Authorship", body: "Authorship must be limited to those who have made a significant contribution to the conception, design, execution, or interpretation of the reported research." },
        { title: "3. Plagiarism and Originality", body: "All submissions are checked for originality. Plagiarism, including self-plagiarism and improper citation, is not tolerated and may result in rejection or retraction." },
        { title: "4. Data Integrity", body: "Authors must present an accurate account of their research and underlying data. Fabrication or falsification of data constitutes serious misconduct." },
        { title: "5. Conflicts of Interest", body: "Authors, reviewers, and editors must disclose any financial or personal relationships that could inappropriately influence their work." },
        { title: "6. Handling Misconduct", body: "Allegations of misconduct are investigated in accordance with recognised editorial standards. Outcomes may include correction, retraction, or notification to the author's institution." },
        { title: "7. Retraction Policy", body: "Articles may be retracted if there is clear evidence of unreliable findings, plagiarism, duplicate publication, or unethical research." },
      ]}
    />
  );
}
