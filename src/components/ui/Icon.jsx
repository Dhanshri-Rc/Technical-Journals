import {
  Atom, Award, BarChart3, BookOpen, Building2, CalendarDays, CheckCircle2,
  CloudUpload, Cog, Cpu, Dna, FileCheck, FileEdit, FileText, FileUp,
  FlaskConical, Globe2, GraduationCap, Headphones, Landmark, Languages, Leaf,
  Link2, List, Lock, MessageSquare, Monitor, Network, Palette, PieChart,
  PiggyBank, Rocket, Send, Settings, Settings2, ShieldCheck, Sigma,
  TrendingUp, Unlock, UserCheck, Users, Users2, Zap, HelpCircle,
} from "lucide-react";

/**
 * Central icon resolver. Reference: /src/assets/icons/iconset.png
 * (the supplied icon reference sheet). Icons below are matched 1:1 to the
 * outline-style icons in that reference sheet using lucide-react.
 *
 * Explicit imports (rather than `import *`) are used so unused icons are
 * tree-shaken out of the production bundle.
 */
const ICONS = {
  Atom, Award, BarChart3, BookOpen, Building2, CalendarDays, CheckCircle2,
  CloudUpload, Cog, Cpu, Dna, FileCheck, FileEdit, FileText, FileUp,
  FlaskConical, Globe2, GraduationCap, Headphones, Landmark, Languages, Leaf,
  Link2, List, Lock, MessageSquare, Monitor, Network, Palette, PieChart,
  PiggyBank, Rocket, Send, Settings, Settings2, ShieldCheck, Sigma,
  TrendingUp, Unlock, UserCheck, Users, Users2, Zap,
};

export default function Icon({ name, className = "w-5 h-5", strokeWidth = 2 }) {
  const Cmp = ICONS[name] || HelpCircle;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
