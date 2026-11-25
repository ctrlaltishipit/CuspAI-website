import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { FREE_PLAN_ALLOWANCE, TIERS } from "@/lib/pricing";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "CuspAI Terms of Service" },
      {
        name: "description",
        content:
          "The terms for using the CuspAI website and app: what the service is, what the plans cost, what you can expect from us and what we ask of you.",
      },
      { property: "og:title", content: "CuspAI Terms of Service" },
      {
        property: "og:description",
        content: "The terms that apply when you use the CuspAI website and app.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TermsPage,
});

const mail = <a href="mailto:hello@cuspai.io">hello@cuspai.io</a>;

const starter = TIERS.find((t) => t.id === "starter")!;
const pro = TIERS.find((t) => t.id === "pro")!;

/*
 * Prices and allowances below are read from lib/pricing.ts, which mirrors the
 * app, so this page cannot quote a figure the app does not charge.
 */
const SECTIONS: LegalSection[] = [
  {
    id: "about-these-terms",
    title: "About these terms",
    body: (
      <>
        <p>
          These terms are the agreement between you and CuspAI ("we", "us") when you use the website
          www.cuspai.io or the CuspAI app. We are based in Bengaluru, India. By joining the waitlist
          or using the app, you agree to them. If you do not agree, please do not use CuspAI.
        </p>
        <p>
          CuspAI has not fully opened yet. Until it does, the main thing you can do here is join the
          waitlist. The parts of these terms about the app and about payment apply from the day you
          start using them.
        </p>
      </>
    ),
  },
  {
    id: "who-can-use",
    title: "Who can use CuspAI",
    body: (
      <p>
        You must be at least 18 years old. If you use CuspAI for a company or another organisation,
        you confirm that you are allowed to accept these terms for it.
      </p>
    ),
  },
  {
    id: "waitlist",
    title: "The waitlist",
    body: (
      <p>
        Joining the waitlist is free and commits you to nothing. We use your details to email you
        once, when CuspAI opens. A place on the waitlist is not a promise of access on a particular
        date. You can ask to be removed at any time by writing to {mail}.
      </p>
    ),
  },
  {
    id: "the-service",
    title: "What CuspAI gives you",
    body: (
      <>
        <p>CuspAI is a phone app with two main jobs:</p>
        <ul>
          <li>
            a daily brief, with newsletters and podcasts, on the topics you choose to follow, and a
            skill map for the role you want next;
          </li>
          <li>
            build plans, which turn a goal you describe into steps, with a free tool and a paid tool
            for each step and what they cost.
          </li>
        </ul>
        <p>Please keep three things in mind when you use it:</p>
        <ul>
          <li>
            <strong>It is general information.</strong> CuspAI does not give professional, legal,
            financial, tax or career advice. Decide for yourself, and take proper advice where the
            stakes are high.
          </li>
          <li>
            <strong>Prices change.</strong> The price and free-plan limits shown for a tool were
            correct when the plan was written. Check the tool's own website before you pay for it.
          </li>
          <li>
            <strong>Some plans are written by an AI model.</strong> It can make mistakes or leave
            things out. Read a plan with care before you rely on it.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "other-services",
    title: "Tools, links and other people's work",
    body: (
      <>
        <p>
          Plans name tools made by other companies. The brief and Discover link to newsletters,
          podcasts and articles written by other people. We do not own or control any of them, and
          we are not responsible for what they do or say. When you use one, its own terms and
          privacy policy apply.
        </p>
        <p>
          The app shows a short version of an article and links to the original. The original
          belongs to its publisher.
        </p>
      </>
    ),
  },
  {
    id: "plans-and-payment",
    title: "Plans and payment",
    body: (
      <>
        <table>
          <thead>
            <tr>
              <th scope="col">Plan</th>
              <th scope="col">Price</th>
              <th scope="col">What it includes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Free</td>
              <td>$0</td>
              <td>
                The daily brief, newsletters, podcasts, the skill map and saved items, plus{" "}
                {FREE_PLAN_ALLOWANCE} build plans in total.
              </td>
            </tr>
            <tr>
              <td>Starter</td>
              <td>
                ${starter.price} a month, or ${starter.yearly} a year
              </td>
              <td>Everything in Free, 8 build plans a month and the playbook PDF.</td>
            </tr>
            <tr>
              <td>Pro</td>
              <td>
                ${pro.price} a month, or ${pro.yearly} a year
              </td>
              <td>
                Everything in Starter, 20 build plans a month, a full history of your plans, and
                plans written for your goal by an AI model.
              </td>
            </tr>
          </tbody>
        </table>
        <p>Prices are in US dollars. Taxes may be added where the law requires.</p>
        <ul>
          <li>
            <strong>Paid plans are not open yet.</strong> Nothing will be charged until they are,
            and never without you choosing a plan and confirming the payment.
          </li>
          <li>
            <strong>Billing.</strong> A paid plan is charged in advance for a month or a year and
            renews for the same period until you cancel.
          </li>
          <li>
            <strong>Cancelling.</strong> You can cancel at any time. Your plan stays active until
            the end of the period you have paid for, and is not renewed after that.
          </li>
          <li>
            <strong>Refunds.</strong> If you pay through the App Store or Google Play, refunds
            follow that store's rules. If you think you were charged by mistake, write to {mail} and
            we will look into it.
          </li>
          <li>
            <strong>Price changes.</strong> If we change a price, we will tell you at least 30 days
            before it applies to you, and you can cancel before it does.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "fair-use",
    title: "Using CuspAI fairly",
    body: (
      <>
        <p>Please do not:</p>
        <ul>
          <li>use CuspAI to break the law or to harm anyone;</li>
          <li>try to get round the limits of your plan;</li>
          <li>
            copy, scrape or resell the service, or use automated tools to pull content from it;
          </li>
          <li>attack it, overload it, or try to reach parts of it you are not meant to;</li>
          <li>take the app apart to copy how it works, except where the law allows you to.</li>
        </ul>
        <p>If you do any of these, we may suspend or end your access.</p>
      </>
    ),
  },
  {
    id: "your-content",
    title: "What is yours and what is ours",
    body: (
      <>
        <p>
          <strong>Yours.</strong> The goals, roles and interests you type in stay yours. You give us
          permission to use them to produce what you asked for, as described in the{" "}
          <Link to="/privacy">Privacy Policy</Link>. The plans and playbooks you generate are yours
          to use for your own work, including paid work.
        </p>
        <p>
          <strong>Ours.</strong> The app, the website, the CuspAI name and logo, and the built-in
          plans belong to CuspAI. These terms let you use them. They do not hand over ownership.
        </p>
      </>
    ),
  },
  {
    id: "changes-to-the-service",
    title: "Changes and availability",
    body: (
      <p>
        CuspAI is new and still changing. We may add, change or remove features, and the service may
        sometimes be unavailable. If we remove something you have paid for, we will tell you in
        advance and refund the part of the period you could not use.
      </p>
    ),
  },
  {
    id: "our-responsibility",
    title: "What we are responsible for",
    body: (
      <>
        <p>
          We will run CuspAI with reasonable care and skill. Beyond that, it is provided as it is.
          We do not promise that a plan will suit your purpose, that following one will bring a
          particular result, or that the service will never have errors.
        </p>
        <p>
          As far as the law allows, we are not liable for losses we could not reasonably have
          foreseen, for lost profit, business or data, or for anything done by another company's
          tool or content. Our total liability to you is limited to the amount you paid us in the
          twelve months before the claim.
        </p>
        <p>
          Nothing in these terms takes away a right the law gives you as a consumer that cannot be
          taken away by agreement.
        </p>
      </>
    ),
  },
  {
    id: "ending",
    title: "Ending this agreement",
    body: (
      <p>
        You can stop using CuspAI at any time, and you can ask us to delete your data by writing to{" "}
        {mail}. We may end or suspend your access if you break these terms. The sections on
        ownership, responsibility and the law that applies carry on after the agreement ends.
      </p>
    ),
  },
  {
    id: "law",
    title: "The law that applies",
    body: (
      <p>
        These terms are governed by the laws of India. Any dispute will be heard by the courts in
        Bengaluru, Karnataka. Before going to court, please write to us. Most problems can be sorted
        out with an email.
      </p>
    ),
  },
  {
    id: "changes-to-these-terms",
    title: "Changes to these terms",
    body: (
      <p>
        When we change these terms we will update the date at the top. If a change is significant,
        we will tell you by email or in the app before it takes effect. If you keep using CuspAI
        after that, you accept the new terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about these terms go to {mail}. We are CuspAI, based in Bengaluru, Karnataka,
        India.
      </p>
    ),
  },
];

function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of Service"
      updated="26 November 2026"
      intro="These are the terms for using the CuspAI website and app. We have written them in plain English. Please read them, because they are a real agreement."
      summary={[
        "Joining the waitlist is free and commits you to nothing.",
        "Reading is free on every plan. Build plans beyond your first three need a paid plan.",
        "Paid plans are not open yet. Nothing is charged until they are.",
        "CuspAI gives general information, and some plans are written by an AI model. Check prices and details before you rely on them.",
        "You can cancel a paid plan at any time and keep it until the end of the period you paid for.",
        "These terms are governed by the laws of India.",
      ]}
      sections={SECTIONS}
    />
  );
}
