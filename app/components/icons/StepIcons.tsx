import type { SVGProps } from "react";

/**
 * Inline React versions of assets/icons/*.svg. Kept as small components
 * (rather than imported files) so they need no SVG-loader build config,
 * accept standard SVG props (className, etc.), and stay in sync with the
 * canonical source files in /assets by construction — copy changes to
 * both when editing either.
 */

export function ExplanationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 3a6 6 0 00-3.5 10.9c.4.3.6.8.6 1.3V16h5.8v-.8c0-.5.2-1 .6-1.3A6 6 0 0012 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 19h5M10 21.5h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ExampleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M15.5 15.5L21 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function QuestionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4 5h16v11H9l-4 4v-4H4V5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 9.2c0-1.2 1-2.2 2.5-2.2s2.5.9 2.5 2c0 1.5-2.5 1.6-2.5 3.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="14.7" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function SummaryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9.2 9.3l1.8 1.8 3.6-3.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 14.5L7 21l5-2.5 5 2.5-2-6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
