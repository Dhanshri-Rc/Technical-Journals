import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CloudUpload,
  Cpu,
  FilePenLine,
  FileText,
  Globe2,
  GraduationCap,
  Headphones,
  Landmark,
  Network,
  PieChart,
  Rocket,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import Seo from "../components/common/Seo";
import servicesBg from "../assets/images/servicebg.png";

const STATS = [
  { icon: BookOpen, value: "100+", title: "University Journals", text: "Hosted", color: "bg-[#0756cf]" },
  { icon: FileText, value: "10,000+", title: "Articles", text: "Published", color: "bg-[#169447]" },
  { icon: Globe2, value: "50+", title: "Countries", text: "Worldwide", color: "bg-[#f59b12]" },
  { icon: Landmark, value: "500+", title: "Universities", text: "Trust Us", color: "bg-[#7041c6]" },
  { icon: ShieldCheck, value: "99.9%", title: "Uptime & Reliable", text: "Performance", color: "bg-[#0756cf]" },
];

const SERVICES = [
  { icon: FileText, title: "Journal Hosting", desc: "Secure and reliable hosting for peer-reviewed journals with custom domains, branding, and unlimited scalability.", accent: "#0756cf", bubble: "bg-[#eaf2ff]" },
  { icon: Network, title: "Editorial Workflow", desc: "Streamline submission, peer review, editing, and publication with automated and transparent editorial workflows.", accent: "#159447", bubble: "bg-[#eaf8ef]" },
  { icon: TrendingUp, title: "Indexing & Visibility", desc: "Get indexed in major databases and directories to increase the visibility and impact of your research.", accent: "#f17712", bubble: "bg-[#fff1e7]" },
  { icon: ShieldCheck, title: "Security & Compliance", desc: "Enterprise-grade security, regular backups, and compliance with global publishing standards and ethics.", accent: "#7041c6", bubble: "bg-[#f1edff]" },
  { icon: Users, title: "Author & Reviewer Tools", desc: "Intuitive dashboards and tools for authors, reviewers, and editors to collaborate efficiently and seamlessly.", accent: "#08a7bd", bubble: "bg-[#e6f8fb]" },
  { icon: PieChart, title: "Reports & Analytics", desc: "Real-time insights on submissions, reviews, publications, citations, and performance with advanced analytics.", accent: "#ef2d6f", bubble: "bg-[#ffedf4]" },
  { icon: CloudUpload, title: "Digital Preservation", desc: "Long-term digital preservation and archiving to ensure the integrity and accessibility of scholarly content.", accent: "#0873d8", bubble: "bg-[#e9f3ff]" },
  { icon: GraduationCap, title: "Consulting & Training", desc: "Capacity building, training, and consulting for universities to strengthen research and publishing excellence.", accent: "#15863d", bubble: "bg-[#eaf7ee]" },
];

const WHY = [
  { icon: Landmark, title: "Exclusive to Universities", desc: "Platform built strictly for universities. No commercial content.", color: "#0756cf", bubble: "bg-[#e9f2ff]" },
  { icon: Globe2, title: "Global Reach", desc: "Increase research visibility and impact worldwide.", color: "#169447", bubble: "bg-[#eaf8ef]" },
  { icon: Headphones, title: "End-to-End Support", desc: "From setup to publication, our team supports you at every step.", color: "#f17712", bubble: "bg-[#fff2e8]" },
  { icon: Cpu, title: "Advanced Technology", desc: "Modern, scalable, and AI-enabled solutions for academic publishing.", color: "#7041c6", bubble: "bg-[#f0ecff]" },
  { icon: ShieldCheck, title: "Trusted & Reliable", desc: "99.9% uptime with robust security and data protection.", color: "#0756cf", bubble: "bg-[#e9f2ff]" },
];

const PROCESS = [
  { icon: FilePenLine, step: "01", title: "Consultation", desc: "Understand your requirements and recommend the best solution for your journal.", color: "#0756cf", bubble: "bg-[#e8f2ff]" },
  { icon: Settings, step: "02", title: "Setup & Configuration", desc: "We set up your journal with custom branding, workflows, and essential tools.", color: "#169447", bubble: "bg-[#eaf8ef]" },
  { icon: CloudUpload, step: "03", title: "Data Migration", desc: "Migrate existing content securely and organize it for seamless access.", color: "#f17712", bubble: "bg-[#fff2e8]" },
  { icon: Rocket, step: "04", title: "Launch", desc: "Go live with your journal and start receiving submissions from authors worldwide.", color: "#7041c6", bubble: "bg-[#f0ecff]" },
  { icon: BarChart3, step: "05", title: "Ongoing Support", desc: "Continuous support, updates, and improvements to ensure your journal's success.", color: "#0756cf", bubble: "bg-[#e8f2ff]" },
];

const UNIVERSITIES = [
  { abbr: "OXFORD", name: "University of Oxford" },
  { abbr: "NUS", name: "National University of Singapore" },
  { abbr: "MELBOURNE", name: "The University of Melbourne" },
  { abbr: "TORONTO", name: "University of Toronto" },
  { abbr: "TUM", name: "Technical University of Munich" },
  { abbr: "CAPE TOWN", name: "University of Cape Town" },
];

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48 } },
};

function SectionTitle({ children }) {
  return (
    <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} className="mb-8 text-center">
      <h2 className="text-[22px] font-bold tracking-[-0.02em] text-[#071c46] sm:text-[25px]">{children}</h2>
      <div className="mx-auto mt-2 flex w-[74px] overflow-hidden rounded-full">
        <span className="h-[2px] flex-1 bg-[#ef3d3d]" /><span className="h-[2px] flex-1 bg-[#f8a414]" /><span className="h-[2px] flex-1 bg-[#19a95b]" /><span className="h-[2px] flex-1 bg-[#2767d8]" />
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Seo title="Our Services | Technical Journals" description="Secure journal hosting, editorial workflows, indexing, analytics, preservation, and university publishing support." />

      <main className="overflow-hidden bg-white">
        <section
          className="relative isolate min-h-[330px] overflow-hidden bg-[#03183f] text-white sm:min-h-[350px] lg:min-h-[390px]"
          style={{
            backgroundImage: `linear-gradient(90deg,rgba(2,20,54,.97) 0%,rgba(2,20,54,.88) 35%,rgba(2,20,54,.18) 72%,rgba(2,20,54,.05) 100%),url(${servicesBg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="mx-auto flex min-h-[330px] w-full max-w-[1440px] items-center px-5 py-12 sm:min-h-[350px] sm:px-8 lg:min-h-[390px] lg:px-16 xl:px-20">
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="max-w-[570px]">
              <motion.h1 variants={reveal} className="text-[30px] font-bold leading-tight tracking-[-0.025em] sm:text-[36px] lg:text-[40px]">Our Services</motion.h1>
              <motion.p variants={reveal} className="mt-3 max-w-[500px] text-[13px] font-medium leading-6 text-white/95 sm:text-[15px] sm:leading-7">Comprehensive publishing and research support services exclusively for universities.</motion.p>
              <motion.p variants={reveal} className="mt-5 max-w-[510px] text-[12px] leading-6 text-white/85 sm:text-[14px] sm:leading-7">Technical Journals provides secure, scalable, and innovative solutions to host, manage, and publish scholarly journals with global impact.</motion.p>
            </motion.div>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-3 w-full max-w-[1440px] px-4 sm:-mt-4 sm:px-8 lg:-mt-5 lg:px-16 xl:px-20">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="grid overflow-hidden rounded-[12px] border border-[#e5eaf1] bg-white px-3 py-4 shadow-[0_12px_35px_rgba(10,35,75,0.10)] sm:grid-cols-2 lg:grid-cols-5 lg:px-5 lg:py-6">
            {STATS.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <motion.div key={stat.title} whileHover={{ y: -3 }} className={`flex items-center gap-3 px-3 py-3 sm:px-5 ${index !== STATS.length - 1 ? "lg:border-r lg:border-[#dfe5ed]" : ""}`}>
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-white ${stat.color}`}><StatIcon className="h-6 w-6" /></span>
                  <div><strong className="block text-[19px] font-bold leading-none text-[#071c46]">{stat.value}</strong><span className="mt-1.5 block text-[10px] font-bold text-[#11274d]">{stat.title}</span><span className="mt-0.5 block text-[9px] text-[#526783]">{stat.text}</span></div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-8 lg:px-16 lg:py-14 xl:px-20">
          <SectionTitle>Our Core Services</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <motion.article key={service.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.04 }} whileHover={{ y: -7, boxShadow: "0 16px 35px rgba(9,35,78,.11)" }} className="group flex min-h-[270px] flex-col items-center rounded-[9px] border border-[#dfe5ed] bg-white px-5 py-6 text-center transition-colors hover:border-[#a9c5ec]">
                  <span className={`grid h-[62px] w-[62px] place-items-center rounded-full ${service.bubble}`} style={{ color: service.accent }}><ServiceIcon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" /></span>
                  <h3 className="mt-5 text-[13px] font-bold text-[#071c46]">{service.title}</h3>
                  <p className="mt-2 flex-1 text-[10px] leading-[1.8] text-[#4c607d]">{service.desc}</p>
                  <a href="/contact" className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold transition-all hover:gap-3" style={{ color: service.accent }}>Learn More <ArrowRight className="h-3.5 w-3.5" /></a>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="bg-[#fbfcfe] py-12 lg:py-14">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16 xl:px-20">
            <SectionTitle>Why Universities Choose Technical Journals</SectionTitle>
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
              {WHY.map((item, index) => {
                const WhyIcon = item.icon;
                return (
                  <motion.article key={item.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -5 }} className={`flex gap-3 px-4 py-2 ${index !== WHY.length - 1 ? "lg:border-r lg:border-[#e0e6ee]" : ""}`}>
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${item.bubble}`} style={{ color: item.color }}><WhyIcon className="h-5 w-5" /></span>
                    <div><h3 className="text-[10px] font-bold text-[#071c46]">{item.title}</h3><p className="mt-1.5 text-[9px] leading-4 text-[#536681]">{item.desc}</p></div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-8 lg:px-16 lg:py-14 xl:px-20">
          <SectionTitle>Our Service Process</SectionTitle>
          <div className="relative grid gap-9 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {PROCESS.map((item, index) => {
              const ProcessIcon = item.icon;
              return (
                <motion.article key={item.step} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -5 }} className="relative px-3 text-center">
                  {index < PROCESS.length - 1 && <span className="absolute left-[72%] top-9 hidden w-[60%] border-t border-dashed border-[#7694c0] lg:block"><ArrowRight className="absolute -right-1 -top-[7px] h-3 w-3 text-[#7694c0]" /></span>}
                  <span className={`relative z-10 mx-auto grid h-[76px] w-[76px] place-items-center rounded-full ${item.bubble}`} style={{ color: item.color }}><ProcessIcon className="h-8 w-8" /></span>
                  <p className="mt-3 text-[11px] font-extrabold" style={{ color: item.color }}>{item.step}</p>
                  <h3 className="mt-1 text-[11px] font-bold text-[#071c46]">{item.title}</h3>
                  <p className="mx-auto mt-2 max-w-[190px] text-[9px] leading-4 text-[#536681]">{item.desc}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-4 pb-12 sm:px-8 lg:px-16 xl:px-20">
          <SectionTitle>Trusted by Leading Universities Worldwide</SectionTitle>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid overflow-hidden rounded-[8px] border border-[#e1e7ef] bg-white grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {UNIVERSITIES.map((university) => (
              <motion.div key={university.name} whileHover={{ backgroundColor: "#f4f8ff", y: -2 }} className="flex min-h-[92px] items-center justify-center gap-2 border-b border-r border-[#e8ecf2] px-3 py-4 text-center sm:min-h-[100px]">
                <Landmark className="h-7 w-7 shrink-0 text-[#164785]" />
                <div><strong className="block text-[11px] font-extrabold leading-tight text-[#123d79]">{university.abbr}</strong><span className="mt-1 block text-[7px] leading-tight text-[#536681]">{university.name}</span></div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-4 pb-8 sm:px-8 lg:px-16 xl:px-20">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="relative overflow-hidden rounded-[10px] bg-[linear-gradient(100deg,#0749c7_0%,#06844d_31%,#f2a20b_59%,#f25a08_76%,#ed0038_100%)] px-5 py-7 text-white sm:px-8 lg:px-12">
            <div className="grid items-center gap-6 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
              <span className="grid h-[70px] w-[70px] place-items-center rounded-full bg-white text-[#0756cf] shadow-[0_7px_20px_rgba(0,0,0,.16)]"><FilePenLine className="h-8 w-8" /></span>
              <div><h2 className="text-[20px] font-bold sm:text-[23px]">Ready to Elevate Your University’s Research?</h2><p className="mt-2 max-w-[560px] text-[11px] leading-5 text-white/95 sm:text-[12px]">Join hundreds of universities worldwide and publish research with impact, visibility, and trust.</p></div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} href="/contact" className="inline-flex h-12 min-w-[170px] items-center justify-center rounded-[6px] bg-white px-5 text-[11px] font-bold text-[#0756cf] shadow-[0_7px_18px_rgba(0,0,0,.13)]">Host Your Journal</motion.a>
                <motion.a whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,.14)" }} whileTap={{ scale: 0.98 }} href="/contact" className="inline-flex h-12 min-w-[165px] items-center justify-center rounded-[6px] border border-white/80 px-5 text-[11px] font-bold text-white">Request a Demo</motion.a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}