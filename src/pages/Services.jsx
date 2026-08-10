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
import l1 from "../assets/images/l1.png";
import l2 from "../assets/images/l2.png";
import l3 from "../assets/images/l3.png";
import l4 from "../assets/images/l4.png";
import l5 from "../assets/images/l5.png";
import l6 from "../assets/images/l6.png";

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

  /* =========================================================
     UNIVERSITIES
  ========================================================= */

 const universities = [
   {
     name: "University of Oxford",
     logo: l1,
   },
   {
     name: "National University of Singapore",
     logo: l2,
   },
   {
     name: "University of Melbourne",
     logo: l3,
   },
   {
     name: "University of Toronto",
     logo: l4,
   },
   {
     name: "Technical University of Munich",
     logo: l5,
   },
   {
     name: "University of Cape Town",
     logo: l6,
   },
 ];
 const universityReveal = {
   hidden: {
     opacity: 0,
     y: 18,
   },
   show: {
     opacity: 1,
     y: 0,
   },
 };

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48 } },
};

function SectionTitle({ children }) {
  return (
    <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} className="mb-8 text-center">
      <h2 className="text-[22px] font-[550] tracking-[-0.02em] text-[#071c46] sm:text-[25px]">{children}</h2>
      <div className="mx-auto mt-2 flex w-[74px] overflow-hidden rounded-full">
        <span className="h-[3px] flex-1 bg-[#ef3d3d]" /><span className="h-[3px] flex-1 bg-[#f8a414]" /><span className="h-[3px] flex-1 bg-[#19a95b]" /><span className="h-[3px] flex-1 bg-[#2767d8]" />
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
          className="relative isolate min-h-[340px] overflow-hidden bg-[#03183f] text-white sm:min-h-[360px]"
          style={{
            backgroundImage: `linear-gradient(90deg,rgba(2,20,54,.97) 0%,rgba(2,20,54,.88) 35%,rgba(2,20,54,.18) 72%,rgba(2,20,54,.05) 100%),url(${servicesBg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="mx-auto flex min-h-[340px] w-full max-w-[1440px] items-center px-5 py-12 sm:min-h-[360px] sm:px-8 lg:px-16 xl:px-20">
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="max-w-[570px]">
              <motion.h1 variants={reveal} className="text-[31px] font-[600] leading-tight tracking-[-0.025em] sm:text-[38px]">Our Services</motion.h1>
              <motion.p variants={reveal} className="mt-3 max-w-[450px] text-[14px] font-medium leading-6 text-white/95 sm:text-[16px] sm:leading-7">Comprehensive publishing and research support services exclusively for universities.</motion.p>
              <motion.p variants={reveal} className="mt-5 max-w-[480px] text-[13px] leading-6 text-white/85 sm:text-[15px] sm:leading-7">Technical Journals provides secure, scalable, and innovative solutions to host, manage, and publish scholarly journals with global impact.</motion.p>
            </motion.div>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-4 w-full max-w-[1440px] px-4 sm:-mt-4 sm:px-8 lg:-mt-5 lg:px-16 xl:px-20">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="grid overflow-hidden rounded-[12px] border border-[#e5eaf1] bg-white px-3 py-2 shadow-[0_12px_35px_rgba(10,35,75,0.10)] sm:grid-cols-2 lg:grid-cols-5 lg:px-5 lg:py-4">
            {STATS.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <motion.div key={stat.title} whileHover={{ y: -3 }} className={`flex items-center gap-3 px-3 py-3 sm:px-5 ${index !== STATS.length - 1 ? "lg:border-r lg:border-[#dfe5ed]" : ""}`}>
                  <span className={`grid h-13 w-13 shrink-0 place-items-center rounded-full text-white ${stat.color}`}><StatIcon className="h-7 w-7" /></span>
                  <div><strong className="block text-[22px] font-[600] leading-none text-[#071c46]">{stat.value}</strong><span className="mt-1.5 block text-[14px] font-[550] text-[#11274d]">{stat.title}</span><span className="mt-0.5 block text-[12px] text-[#526783]">{stat.text}</span></div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 lg:px-16 lg:py-10 xl:px-20">
          <SectionTitle>Our Core Services</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <motion.article key={service.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.04 }} whileHover={{ y: -7, boxShadow: "0 16px 35px rgba(9,35,78,.11)" }} className="group flex min-h-[240px] flex-col items-center rounded-[9px] border border-[#dfe5ed] bg-white px-5 py-6 text-center transition-colors hover:border-[#a9c5ec]">
                  <span className={`grid h-[62px] w-[62px] place-items-center rounded-full ${service.bubble}`} style={{ color: service.accent }}><ServiceIcon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" /></span>
                  <h3 className="mt-5 text-[14px] font-[550] text-[#071c46]">{service.title}</h3>
                  <p className="mt-2 flex-1 text-[13px] leading-[1.8] text-[#4c607d]">{service.desc}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="bg-[#fbfcfe] py-8 lg:py-10">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16 xl:px-20">
            <SectionTitle>Why Universities Choose Technical Journals</SectionTitle>
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
              {WHY.map((item, index) => {
                const WhyIcon = item.icon;
                return (
                  <motion.article key={item.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -5 }} className={`flex gap-3 px-4 py-2 ${index !== WHY.length - 1 ? "lg:border-r lg:border-[#e0e6ee]" : ""}`}>
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${item.bubble}`} style={{ color: item.color }}><WhyIcon className="h-6 w-6" /></span>
                    <div><h3 className="text-[13px] font-[500] text-[#071c46]">{item.title}</h3><p className="mt-1.5 text-[11px] leading-4 text-[#536681]">{item.desc}</p></div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 lg:px-16 lg:py-10 xl:px-20">
          <SectionTitle>Our Service Process</SectionTitle>
          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {PROCESS.map((item, index) => {
              const ProcessIcon = item.icon;
              return (
                <motion.article key={item.step} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -5 }} className="relative px-2 text-center">
                  {index < PROCESS.length - 1 && <span className="absolute left-[72%] top-9 hidden w-[60%] border-t border-dashed border-[#7694c0] lg:block"><ArrowRight className="absolute -right-1 -top-[7px] h-3 w-3 text-[#7694c0]" /></span>}
                  <span className={`relative z-10 mx-auto grid h-[70px] w-[70px] place-items-center rounded-full ${item.bubble}`} style={{ color: item.color }}><ProcessIcon className="h-8 w-8" /></span>
                  <p className="mt-3 text-[15px] font-[600]" style={{ color: item.color }}>{item.step}</p>
                  <h3 className="mt-1 text-[14px] font-[550] text-[#071c46]">{item.title}</h3>
                  <p className="mx-auto mt-2 max-w-[170px] text-[12px] leading-4 text-[#536681]">{item.desc}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-4 pb-12 sm:px-8 lg:px-16 xl:px-20">
          <SectionTitle>Trusted by Leading Universities Worldwide</SectionTitle>
          {/* Logo Container */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.07,
                },
              },
            }}
            className="
              overflow-hidden
              rounded-[14px]
              border
              border-[#E4EAF3]
              bg-white
              shadow-[0_3px_14px_rgba(15,43,89,0.025)]
            "
          >
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-6
              "
            >
              {universities.map((uni, index) => (
                <motion.div
                  key={uni.name}
                  variants={universityReveal}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -3,
                    backgroundColor: "#F8FBFF",
                  }}
                  className={`
                    group
                    relative
                    flex
                    min-h-[94px]
                    items-center
                    justify-center
                    px-5
                    py-5
                    transition-colors
                    duration-300
      
                    ${
                      index !== universities.length - 1
                        ? `
                          border-b
                          border-[#E5EAF2]
      
                          sm:[&:not(:nth-child(2n))]:border-r
      
                          md:border-b
                          md:border-r
                          md:[&:nth-child(3n)]:border-r-0
      
                          lg:border-b-0
                          lg:border-r
                          lg:[&:nth-child(3n)]:border-r
                          lg:last:border-r-0
                        `
                        : ""
                    }
                  `}
                >
                  {/* subtle hover glow */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      opacity-0
                      transition-opacity
                      duration-300
                      group-hover:opacity-100
                      bg-[radial-gradient(circle_at_center,rgba(23,105,224,0.055),transparent_68%)]
                    "
                  />
      
                  <motion.img
                    src={uni.logo}
                    alt={`${uni.name} logo`}
                    loading="lazy"
                    draggable="false"
                    whileHover={{ scale: 1.045 }}
                    transition={{
                      duration: 0.25,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      relative
                      z-10
                      block
                      h-auto
                      w-auto
                      max-h-[48px]
                      max-w-[190px]
                      object-contain
      
                      sm:max-h-[50px]
                      sm:max-w-[185px]
      
                      md:max-h-[52px]
                      md:max-w-[180px]
      
                      lg:max-h-[48px]
                      lg:max-w-[155px]
      
                    
                    "
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-4 pb-8 sm:px-8 lg:px-16 xl:px-20">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="relative overflow-hidden rounded-[10px] bg-[linear-gradient(100deg,#0749c7_0%,#06844d_31%,#f2a20b_59%,#f25a08_76%,#ed0038_100%)] px-5 py-7 text-white sm:px-8 lg:px-12">
            <div className="grid items-center gap-6 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
              <span className="grid h-[70px] w-[70px] place-items-center rounded-full bg-white text-[#0756cf] shadow-[0_7px_20px_rgba(0,0,0,.16)]"><FilePenLine className="h-8 w-8" /></span>
              <div><h2 className="text-[20px] font-[600] sm:text-[23px]">Ready to Elevate Your University’s Research?</h2><p className="mt-2 max-w-[400px] text-[13px] leading-5 text-white/95 sm:text-[14px]">Join hundreds of universities worldwide and publish research with impact, visibility, and trust.</p></div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} href="/contact" className="inline-flex h-12 min-w-[170px] items-center justify-center rounded-[6px] bg-white px-5 text-[14px] font-[550] text-[#0756cf] shadow-[0_7px_18px_rgba(0,0,0,.13)]">Host Your Journal</motion.a>
                <motion.a whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,.14)" }} whileTap={{ scale: 0.98 }} href="/contact" className="inline-flex h-12 min-w-[165px] items-center justify-center rounded-[6px] border border-white/80 px-5 text-[14px] font-[550] text-white">Request a Demo</motion.a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}