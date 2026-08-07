import PolicyPage from "../components/common/PolicyPage";

export default function Apc() {
  return (
    <PolicyPage
      title="APC & Publication Charges"
      path="/apc"
      subtitle="Transparent information about article processing charges and publication fees across Technical Journals-hosted journals."
      description="Learn about article processing charges (APC) and publication fees for journals hosted on the Technical Journals platform."
      sections={[
        { title: "1. Overview", body: "Article Processing Charges (APCs) help cover the costs of editorial management, peer review coordination, typesetting, hosting, indexing, and long-term digital preservation for open access articles." },
        { title: "2. When APCs Apply", body: "APCs are only charged upon acceptance of a manuscript for publication, never at submission. Fees vary by journal and are listed on each journal's individual page." },
        { title: "3. Waivers and Discounts", body: "Universities on our Advanced and Enterprise plans may offer partial or full APC waivers to their affiliated authors. Contact your institution's journal administrator for eligibility." },
        { title: "4. Payment", body: "Payment instructions are provided after acceptance. We accept institutional invoicing as well as standard payment methods." },
        { title: "5. No Submission Fees", body: "Submitting a manuscript for review is always free. Charges, where applicable, apply only after a positive editorial decision." },
      ]}
    />
  );
}
