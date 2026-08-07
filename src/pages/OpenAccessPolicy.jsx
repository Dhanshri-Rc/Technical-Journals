import PolicyPage from "../components/common/PolicyPage";

export default function OpenAccessPolicy() {
  return (
    <PolicyPage
      title="Open Access Policy"
      path="/open-access-policy"
      subtitle="Technical Journals supports open access publishing to maximize the visibility and impact of university research."
      description="Read the Technical Journals Open Access Policy covering licensing, article availability, and archiving for hosted university journals."
      sections={[
        { title: "1. Our Open Access Commitment", body: "Journals hosted on Technical Journals may be published under an open access model, making peer-reviewed research freely available to readers worldwide without subscription barriers." },
        { title: "2. Licensing", body: "Open access articles are typically published under a Creative Commons license (such as CC BY), allowing reuse with proper attribution, unless otherwise specified by the journal." },
        { title: "3. Author Rights", body: "Authors retain copyright of their work and grant Technical Journals and the hosting journal a license to publish, distribute, and archive the article." },
        { title: "4. Article Processing Charges", body: "Some open access journals apply an article processing charge (APC) to cover editorial and hosting costs. See our APC & Publication Charges page for details." },
        { title: "5. Long-Term Access", body: "All published open access content is digitally preserved to ensure permanent, uninterrupted access for the global research community." },
      ]}
    />
  );
}
