import type { SVGProps } from "react";

/** Inline React version of assets/illustrations/states-of-matter.svg. */
export function StatesOfMatterIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g>
        <circle cx="30" cy="70" r="9" fill="#0ea5e9" />
        <circle cx="48" cy="70" r="9" fill="#0ea5e9" />
        <circle cx="39" cy="55" r="9" fill="#0ea5e9" />
        <circle cx="30" cy="40" r="9" fill="#0ea5e9" />
        <circle cx="48" cy="40" r="9" fill="#0ea5e9" />
      </g>
      <g>
        <circle cx="95" cy="78" r="9" fill="#8b5cf6" />
        <circle cx="118" cy="72" r="9" fill="#8b5cf6" />
        <circle cx="100" cy="55" r="9" fill="#8b5cf6" />
        <circle cx="122" cy="48" r="9" fill="#8b5cf6" />
      </g>
      <g>
        <circle cx="160" cy="85" r="7" fill="#f59e0b" />
        <circle cx="183" cy="62" r="7" fill="#f59e0b" />
        <circle cx="166" cy="38" r="7" fill="#f59e0b" />
        <circle cx="188" cy="95" r="7" fill="#f59e0b" />
        <circle cx="150" cy="55" r="7" fill="#f59e0b" />
      </g>
    </svg>
  );
}

/** Inline React version of assets/illustrations/celebration.svg. */
export function CelebrationIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="30" cy="30" r="5" fill="#10b981" />
      <circle cx="130" cy="25" r="4" fill="#f59e0b" />
      <circle cx="100" cy="95" r="5" fill="#0ea5e9" />
      <circle cx="35" cy="92" r="4" fill="#8b5cf6" />
      <rect
        x="68"
        y="12"
        width="8"
        height="8"
        fill="#f59e0b"
        transform="rotate(20 72 16)"
      />
      <rect
        x="118"
        y="68"
        width="8"
        height="8"
        fill="#10b981"
        transform="rotate(-15 122 72)"
      />
      <rect
        x="14"
        y="58"
        width="8"
        height="8"
        fill="#0ea5e9"
        transform="rotate(30 18 62)"
      />
      <polygon
        points="80,32 89,54 113,54 93,68 101,90 80,76 59,90 67,68 47,54 71,54"
        fill="#f59e0b"
      />
    </svg>
  );
}
