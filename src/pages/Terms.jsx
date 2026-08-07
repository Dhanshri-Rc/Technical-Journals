import PolicyPage from "../components/common/PolicyPage";

export default function Terms() {
  return (
    <PolicyPage
      title="Terms of Use"
      path="/terms"
      subtitle="Please read these Terms of Use carefully before using the Technical Journals platform."
      description="Read the Technical Journals Terms of Use governing access to and use of our journal hosting platform."
      sections={[
        { title: "1. Acceptance of Terms", body: "By accessing or using Technical Journals, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, please do not use the platform." },
        { title: "2. Eligibility", body: "Technical Journals is exclusively available to universities, affiliated researchers, authors, reviewers, and editorial staff. Commercial or non-academic use is not permitted." },
        { title: "3. Account Responsibilities", body: "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account." },
        { title: "4. Acceptable Use", body: "You agree not to misuse the platform, including submitting fraudulent, plagiarized, or unlawful content, or attempting to disrupt platform operations." },
        { title: "5. Intellectual Property", body: "Content published through Technical Journals remains subject to the copyright terms outlined in our Copyright Policy. The Technical Journals name, logo, and platform design are the property of Technical Journals." },
        { title: "6. Limitation of Liability", body: "Technical Journals is provided on an 'as is' basis. We are not liable for indirect or consequential damages arising from use of the platform." },
        { title: "7. Changes to These Terms", body: "We may update these Terms of Use from time to time. Continued use of the platform after changes constitutes acceptance of the revised terms." },
        { title: "8. Contact", body: "Questions about these Terms of Use can be directed to our support team via the Contact page." },
      ]}
    />
  );
}
