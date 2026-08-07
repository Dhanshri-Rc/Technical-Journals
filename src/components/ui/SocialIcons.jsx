/**
 * Lightweight brand icons for social links.
 * lucide-react no longer ships brand/logo icons, so these simple
 * outline-style SVGs are used instead to match the app's icon weight.
 */
export function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C4 16 2.4 13.3 2 10c1 .6 2.1.9 3.3 1C2.9 9 1.9 5.5 3.1 3c2.7 3.3 6.6 5.3 11 5.6-.5-2.7 2.5-5.9 5.7-4.5 1 .4 1.7 1.2 2.2 2.1 1-.2 1.9-.5 2.7-1-.3 1-1 1.9-1.9 2.5.9-.1 1.7-.3 2.5-.7-.6.9-1.3 1.6-2.1 2.3z" />
    </svg>
  );
}

export function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 8.6a4.4 4.4 0 0 0-3.1-3.1C16.9 5 12 5 12 5s-4.9 0-6.9.5A4.4 4.4 0 0 0 2 8.6 46 46 0 0 0 2 12a46 46 0 0 0 0 3.4 4.4 4.4 0 0 0 3.1 3.1C7.1 19 12 19 12 19s4.9 0 6.9-.5a4.4 4.4 0 0 0 3.1-3.1c.3-1.1.3-3.4.3-3.4s0-2.3-.3-3.4z" />
      <path d="M10 15l5-3-5-3z" />
    </svg>
  );
}
