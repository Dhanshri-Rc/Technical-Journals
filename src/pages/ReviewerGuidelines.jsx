import PolicyPage from "../components/common/PolicyPage";

export default function ReviewerGuidelines() {
  return (
    <PolicyPage
      title="Reviewer Guidelines"
      path="/reviewer-guidelines"
      subtitle="Guidance for reviewers evaluating manuscripts submitted to journals hosted on Technical Journals."
      description="Guidelines for peer reviewers on evaluating manuscripts, providing constructive feedback, and maintaining confidentiality on the Technical Journals platform."
      sections={[
        { title: "1. Role of the Reviewer", body: "Reviewers assess the originality, methodology, clarity, and significance of submitted manuscripts, providing constructive feedback to help authors improve their work and to guide the editor's decision." },
        { title: "2. Confidentiality", body: "Manuscripts under review must be treated as confidential documents. Reviewers must not share, discuss, or use the content of a manuscript for personal or professional gain." },
        { title: "3. Conflicts of Interest", body: "Reviewers should decline to review a manuscript if they have a conflict of interest, such as a close professional or personal relationship with the authors." },
        { title: "4. Review Criteria", list: ["Originality and contribution to the field.", "Soundness of methodology and analysis.", "Clarity of writing and structure.", "Appropriateness of references and citations.", "Ethical compliance and ethical approval where applicable."] },
        { title: "5. Providing Feedback", body: "Reviews should be constructive, specific, and professional. Reviewers should recommend one of: Accept, Minor Revisions, Major Revisions, or Reject, with supporting comments." },
        { title: "6. Turnaround Time", body: "Reviewers are asked to complete their review within 2–3 weeks of accepting an invitation. If more time is needed, please notify the editorial office promptly." },
        { title: "7. Becoming a Reviewer", body: "Researchers can register as reviewers via the Register page and select their area of expertise. Editors will send review invitations that match your specialization." },
      ]}
    />
  );
}
