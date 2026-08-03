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

/** Flask mid-reaction: bubbles of gas rising and a colour shift through the liquid. */
export function ChemicalReactionHeroIllustration(
  props: SVGProps<SVGSVGElement>,
) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M50,70 L130,70 L145,102 Q148,106 144,107 L36,107 Q32,106 35,102 Z"
        fill="#0ea5e9"
      />
      <path d="M50,70 L130,70 L120,85 L60,85 Z" fill="#f43f5e" />
      <path
        d="M70,18 L70,45 L28,102 Q28,108 35,108 L145,108 Q152,108 152,102 L110,45 L110,18 Z"
        fill="none"
        stroke="#a1a1aa"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="85" cy="55" r="4" fill="#10b981" />
      <circle cx="97" cy="34" r="5" fill="#f59e0b" />
      <circle cx="78" cy="20" r="3" fill="#10b981" />
      <circle cx="101" cy="9" r="3" fill="#f59e0b" />
    </svg>
  );
}

/** Before/after atom clusters: same dots, same colours, rearranged - mass is conserved. */
export function ConservationOfMassIllustration(
  props: SVGProps<SVGSVGElement>,
) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="20" cy="35" r="8" fill="#0ea5e9" />
      <circle cx="45" cy="48" r="8" fill="#8b5cf6" />
      <circle cx="18" cy="70" r="8" fill="#8b5cf6" />
      <circle cx="48" cy="85" r="8" fill="#0ea5e9" />
      <line
        x1="65"
        y1="60"
        x2="108"
        y2="60"
        stroke="#a1a1aa"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <polygon points="108,50 128,60 108,70" fill="#a1a1aa" />
      <circle cx="140" cy="35" r="8" fill="#0ea5e9" />
      <circle cx="156" cy="35" r="8" fill="#8b5cf6" />
      <circle cx="140" cy="80" r="8" fill="#8b5cf6" />
      <circle cx="156" cy="80" r="8" fill="#0ea5e9" />
    </svg>
  );
}

/** A box pushed by a force: arrow drives it from its original (dashed) outline to a displaced position, with motion streaks showing the movement. */
export function ForcesHeroIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect
        x="55"
        y="43"
        width="34"
        height="34"
        rx="4"
        fill="none"
        stroke="#a1a1aa"
        strokeWidth="3"
        strokeDasharray="5 4"
      />
      <line
        x1="90"
        y1="50"
        x2="122"
        y2="50"
        stroke="#a1a1aa"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      <line
        x1="90"
        y1="60"
        x2="122"
        y2="60"
        stroke="#a1a1aa"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      <line
        x1="90"
        y1="70"
        x2="122"
        y2="70"
        stroke="#a1a1aa"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      <rect x="125" y="43" width="34" height="34" rx="4" fill="#f59e0b" />
      <line
        x1="10"
        y1="60"
        x2="45"
        y2="60"
        stroke="#0ea5e9"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <polygon points="45,49 66,60 45,71" fill="#0ea5e9" />
    </svg>
  );
}

/** Same object, two force conditions side by side: equal opposing arrows keep it centred (balanced); unequal arrows push it off to one side (unbalanced). */
export function BalancedUnbalancedForcesIllustration(
  props: SVGProps<SVGSVGElement>,
) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <line
        x1="90"
        y1="10"
        x2="90"
        y2="110"
        stroke="#a1a1aa"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <rect x="30" y="46" width="28" height="28" rx="4" fill="#f59e0b" />
      <line
        x1="6"
        y1="60"
        x2="22"
        y2="60"
        stroke="#0ea5e9"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <polygon points="22,52 34,60 22,68" fill="#0ea5e9" />
      <line
        x1="82"
        y1="60"
        x2="66"
        y2="60"
        stroke="#8b5cf6"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <polygon points="66,52 54,60 66,68" fill="#8b5cf6" />
      <rect x="106" y="46" width="28" height="28" rx="4" fill="#f59e0b" />
      <line
        x1="93"
        y1="60"
        x2="100"
        y2="60"
        stroke="#0ea5e9"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <polygon points="100,52 110,60 100,68" fill="#0ea5e9" />
      <line
        x1="176"
        y1="60"
        x2="145"
        y2="60"
        stroke="#8b5cf6"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <polygon points="145,52 133,60 145,68" fill="#8b5cf6" />
    </svg>
  );
}

/** A lightbulb shining, with radiating light rays - energy actively producing light. */
export function EnergyHeroIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="90" cy="54" r="34" fill="#f59e0b" />
      <rect x="76" y="82" width="28" height="16" rx="3" fill="#a1a1aa" />
      <rect x="80" y="100" width="20" height="8" rx="2" fill="#a1a1aa" />
      <path
        d="M78,42 L90,68 L102,42"
        fill="none"
        stroke="#f43f5e"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="90"
        y1="2"
        x2="90"
        y2="14"
        stroke="#f59e0b"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <line
        x1="40"
        y1="30"
        x2="49"
        y2="38"
        stroke="#f59e0b"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <line
        x1="140"
        y1="30"
        x2="131"
        y2="38"
        stroke="#f59e0b"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="60"
        x2="32"
        y2="60"
        stroke="#f59e0b"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <line
        x1="162"
        y1="60"
        x2="148"
        y2="60"
        stroke="#f59e0b"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Three linked stages - battery, lightning bolt, sun burst - showing energy changing from one form to another. */
export function EnergyTransformationIllustration(
  props: SVGProps<SVGSVGElement>,
) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="10" y="42" width="30" height="36" rx="4" fill="#10b981" />
      <rect x="18" y="34" width="14" height="8" rx="2" fill="#10b981" />
      <line
        x1="46"
        y1="60"
        x2="66"
        y2="60"
        stroke="#a1a1aa"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <polygon points="66,50 84,60 66,70" fill="#a1a1aa" />
      <polygon points="92,32 78,66 92,66 84,90 112,54 96,54 106,32" fill="#8b5cf6" />
      <line
        x1="118"
        y1="60"
        x2="138"
        y2="60"
        stroke="#a1a1aa"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <polygon points="138,50 154,60 138,70" fill="#a1a1aa" />
      <circle cx="160" cy="60" r="14" fill="#f59e0b" />
      <line
        x1="160"
        y1="34"
        x2="160"
        y2="24"
        stroke="#f59e0b"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="160"
        y1="86"
        x2="160"
        y2="96"
        stroke="#f59e0b"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="142"
        y1="38"
        x2="149"
        y2="46"
        stroke="#f59e0b"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="142"
        y1="82"
        x2="149"
        y2="74"
        stroke="#f59e0b"
        strokeWidth="4"
        strokeLinecap="round"
      />
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
