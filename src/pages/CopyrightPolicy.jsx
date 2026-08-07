import PolicyPage from "../components/common/PolicyPage";

export default function CopyrightPolicy() {
  return (
    <PolicyPage
      title="Copyright Policy"
      path="/copyright-policy"
      subtitle="Understand how copyright is managed for content published across Technical Journals-hosted journals."
      description="Read the Technical Journals Copyright Policy covering author rights, licensing terms, and permitted use of published research."
      sections={[
        { title: "1. Copyright Ownership", body: "Authors retain copyright of their original work published in Technical Journals-hosted journals, unless a specific journal's policy states otherwise." },
        { title: "2. License to Publish", body: "By submitting a manuscript, authors grant Technical Journals and the relevant journal a non-exclusive license to publish, distribute, and archive the work." },
        { title: "3. Permitted Use", body: "Readers may access, download, and cite published articles for personal, educational, and research purposes, subject to the applicable license (see our Open Access Policy)." },
        { title: "4. Reuse and Permissions", body: "Requests to reuse content beyond the scope of the applicable license, including commercial use, should be directed to the corresponding author or our support team." },
        { title: "5. Third-Party Content", body: "Authors are responsible for obtaining permission to reproduce any third-party copyrighted material (such as figures or tables) included in their manuscript." },
      ]}
    />
  );
}
