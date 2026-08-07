import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Minus, Star, Info } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import pricingBg from "../assets/backgrounds/pricing-bg.jpg";
import { PRICING_PLANS } from "../data/site";

const COMPARE_ROWS = [
  ["Number of Journals", "1", "1", "Up to 3", "Unlimited"],
  ["Submissions / Year", "Up to 500", "Up to 2,000", "Up to 5,000", "Unlimited"],
  ["Review Types", "Single Blind", "Single & Double Blind", "Single, Double Blind & Direct", "All Review Types"],
  ["Editorial Workflow", true, true, true, true],
  ["Reviewer Database", false, true, true, true],
  ["Reports & Analytics", "Basic", "Detailed", "Advanced", "Advanced & Custom"],
  ["API Access", false, false, true, true],
  ["Priority Support", false, true, true, true],
  ["Dedicated Account Manager", false, false, false, true],
  ["Training & Onboarding", false, false, false, true],
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <>
      <Seo
        title="Pricing"
        description="Simple, transparent pricing plans for universities, societies, and organizations to publish and manage journals and conferences on Technical Journals."
        path="/pricing"
      />
      <PageHero title="Simple, Transparent Pricing" subtitle="Flexible plans for universities, societies, and organizations to publish and manage journals and conferences." bg={pricingBg} />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className={`text-sm font-medium ${!annual ? "text-slate-900" : "text-slate-400"}`}>Billed Monthly</span>
          <button
            role="switch"
            aria-checked={annual}
            onClick={() => setAnnual((v) => !v)}
            className="w-12 h-6 rounded-full bg-blue-700 relative transition-colors"
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${annual ? "translate-x-6" : "translate-x-0.5"}`} />
          </button>
          <span className={`text-sm font-medium ${annual ? "text-slate-900" : "text-slate-400"}`}>Billed Annually</span>
          <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">Save up to 20%</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PRICING_PLANS.map((p) => {
            const price = p.price === "Custom" ? "Custom" : Math.round(Number(p.price) * (annual ? 1 : 1.15));
            return (
              <div
                key={p.name}
                className={`relative rounded-xl border-2 ${p.popular ? "border-purple-400 shadow-lg" : "border-slate-200"} bg-white p-6 flex flex-col`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-700 text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Most Popular
                  </span>
                )}
                <h3 className={`font-display font-bold text-lg mb-1 ${p.color.split(" ")[0]}`}>{p.name}</h3>
                <p className="text-xs text-slate-500 mb-4 h-8">{p.tagline}</p>
                <p className="mb-1">
                  {price === "Custom" ? (
                    <span className="font-display font-bold text-3xl text-slate-900">Custom</span>
                  ) : (
                    <>
                      <span className="font-display font-bold text-3xl text-slate-900">${price}</span>
                      <span className="text-slate-400 text-sm">/year</span>
                    </>
                  )}
                </p>
                <p className="text-xs text-slate-400 mb-5">{price === "Custom" ? "Contact us for pricing" : "Billed annually"}</p>
                <Link
                  to={price === "Custom" ? "/contact" : "/register"}
                  className={`text-center text-sm font-semibold rounded-md px-4 py-2.5 mb-6 transition-colors ${p.btn}`}
                >
                  {price === "Custom" ? "Contact Sales" : "Get Started"}
                </Link>
                <p className="text-xs font-semibold text-slate-700 mb-3">Includes:</p>
                <ul className="space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto">
          <h2 className="font-display font-bold text-lg text-slate-900 p-6 pb-0">Compare Plans</h2>
          <table className="w-full text-sm mt-4 min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left font-medium text-slate-500 px-6 py-3"></th>
                {PRICING_PLANS.map((p) => (
                  <th key={p.name} className={`text-center font-semibold px-4 py-3 ${p.color.split(" ")[0]}`}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map(([label, ...vals]) => (
                <tr key={label} className="border-b border-slate-100 last:border-0">
                  <td className="px-6 py-3 text-slate-600">{label}</td>
                  {vals.map((v, i) => (
                    <td key={i} className="text-center px-4 py-3">
                      {typeof v === "boolean" ? (
                        v ? <Check className="w-4 h-4 text-green-600 mx-auto" /> : <Minus className="w-4 h-4 text-slate-300 mx-auto" />
                      ) : (
                        <span className="text-slate-700">{v}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 bg-blue-50 border border-blue-100 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-700 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-700 shrink-0" /> Need a custom plan? We offer tailored solutions for societies, publishers, and consortia.
          </p>
          <Link to="/contact" className="px-5 py-2.5 rounded-md border border-blue-600 text-blue-700 text-sm font-semibold hover:bg-blue-100 whitespace-nowrap">
            Contact Sales
          </Link>
        </div>
      </section>
    </>
  );
}
