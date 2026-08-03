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

/** Magnifying glass zooming in on a cluster of particles. */
export function ParticleModelIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g>
        <circle cx="35" cy="45" r="6" fill="#8b5cf6" />
        <circle cx="55" cy="40" r="6" fill="#8b5cf6" />
        <circle cx="45" cy="62" r="6" fill="#8b5cf6" />
        <circle cx="65" cy="58" r="6" fill="#8b5cf6" />
        <circle cx="40" cy="80" r="6" fill="#8b5cf6" />
        <circle cx="62" cy="78" r="6" fill="#8b5cf6" />
      </g>
      <circle
        cx="95"
        cy="55"
        r="32"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth="6"
      />
      <line
        x1="118"
        y1="78"
        x2="150"
        y2="110"
        stroke="#0ea5e9"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="86" cy="46" r="8" fill="#10b981" />
      <circle cx="106" cy="50" r="8" fill="#10b981" />
      <circle cx="95" cy="68" r="8" fill="#10b981" />
    </svg>
  );
}

/** Ice cube melting into water, then rising as steam wisps. */
export function ChangesOfStateIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="12" y="55" width="34" height="34" rx="4" fill="#0ea5e9" />
      <path
        d="M75 60 Q85 45 95 60 Q105 75 95 88 Q85 100 75 88 Q65 75 75 60 Z"
        fill="#0ea5e9"
      />
      <path
        d="M132 95 Q126 82 132 70 M144 95 Q138 78 144 62 M156 95 Q150 82 156 70"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <line
        x1="0"
        y1="100"
        x2="180"
        y2="100"
        stroke="#10b981"
        strokeWidth="3"
      />
    </svg>
  );
}

/** Atom: nucleus of protons/neutrons with electrons orbiting on dashed shells. */
export function AtomicStructureIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse
        cx="90"
        cy="60"
        rx="78"
        ry="32"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth="2.5"
        strokeDasharray="6 5"
      />
      <ellipse
        cx="90"
        cy="60"
        rx="78"
        ry="32"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth="2.5"
        strokeDasharray="6 5"
        transform="rotate(60 90 60)"
      />
      <ellipse
        cx="90"
        cy="60"
        rx="78"
        ry="32"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth="2.5"
        strokeDasharray="6 5"
        transform="rotate(120 90 60)"
      />
      <circle cx="82" cy="53" r="9" fill="#f43f5e" />
      <circle cx="98" cy="53" r="9" fill="#a1a1aa" />
      <circle cx="90" cy="68" r="9" fill="#a1a1aa" />
      <circle cx="168" cy="60" r="5" fill="#0ea5e9" />
      <circle cx="55" cy="20" r="5" fill="#0ea5e9" />
      <circle cx="125" cy="100" r="5" fill="#0ea5e9" />
    </svg>
  );
}

/** A small grid of element tiles, coloured by metal (amber) vs non-metal (sky). */
export function PeriodicTableIllustration(props: SVGProps<SVGSVGElement>) {
  const tileColors = [
    "#f59e0b",
    "#f59e0b",
    "#0ea5e9",
    "#0ea5e9",
    "#0ea5e9",
    "#f59e0b",
    "#f59e0b",
    "#0ea5e9",
    "#0ea5e9",
    "#0ea5e9",
    "#0ea5e9",
    "#0ea5e9",
  ];
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      {tileColors.map((color, index) => {
        const col = index % 6;
        const row = Math.floor(index / 6);
        return (
          <rect
            key={index}
            x={12 + col * 27}
            y={25 + row * 40}
            width="20"
            height="20"
            rx="3"
            fill={color}
          />
        );
      })}
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
