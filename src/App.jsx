import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Loading from "./components/common/Loading";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Journals = lazy(() => import("./pages/Journals"));
const JournalDetail = lazy(() => import("./pages/JournalDetail"));
const Conferences = lazy(() => import("./pages/Conferences"));
const ConferenceDetail = lazy(() => import("./pages/ConferenceDetail"));
const Services = lazy(() => import("./pages/Services"));
const ForUniversities = lazy(() => import("./pages/ForUniversities"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Faq = lazy(() => import("./pages/Faq"));
const ReviewProcess = lazy(() => import("./pages/ReviewProcess"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const SubmitManuscript = lazy(() => import("./pages/SubmitManuscript"));
const TrackManuscript = lazy(() => import("./pages/TrackManuscript"));
const AuthorGuidelines = lazy(() => import("./pages/AuthorGuidelines"));
const ReviewerGuidelines = lazy(() => import("./pages/ReviewerGuidelines"));
const PublicationEthics = lazy(() => import("./pages/PublicationEthics"));
const OpenAccessPolicy = lazy(() => import("./pages/OpenAccessPolicy"));
const CopyrightPolicy = lazy(() => import("./pages/CopyrightPolicy"));
const Apc = lazy(() => import("./pages/Apc"));
const Indexing = lazy(() => import("./pages/Indexing"));
const Terms = lazy(() => import("./pages/Terms"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const Blog = lazy(() => import("./pages/Blog"));
const SdgCommitment = lazy(() => import("./pages/SdgCommitment"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/journals" element={<Journals />} />
          <Route path="/journals/:id" element={<JournalDetail />} />
          <Route path="/conferences" element={<Conferences />} />
          <Route path="/conferences/:id" element={<ConferenceDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/for-universities" element={<ForUniversities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/review-process" element={<ReviewProcess />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/submit-manuscript" element={<SubmitManuscript />} />
          <Route path="/track-manuscript" element={<TrackManuscript />} />
          <Route path="/author-guidelines" element={<AuthorGuidelines />} />
          <Route path="/reviewer-guidelines" element={<ReviewerGuidelines />} />
          <Route path="/publication-ethics" element={<PublicationEthics />} />
          <Route path="/open-access-policy" element={<OpenAccessPolicy />} />
          <Route path="/copyright-policy" element={<CopyrightPolicy />} />
          <Route path="/apc" element={<Apc />} />
          <Route path="/indexing" element={<Indexing />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/sdg-commitment" element={<SdgCommitment />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
