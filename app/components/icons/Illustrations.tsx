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

/** A single cell: outer membrane, an off-centre nucleus, and scattered organelles in the cytoplasm. */
export function CellsHeroIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse
        cx="90"
        cy="60"
        rx="74"
        ry="50"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth="5"
      />
      <circle cx="60" cy="45" r="22" fill="#8b5cf6" />
      <circle cx="125" cy="35" r="6" fill="#f59e0b" />
      <circle cx="135" cy="60" r="5" fill="#10b981" />
      <circle cx="115" cy="85" r="6" fill="#f43f5e" />
      <circle cx="140" cy="90" r="4" fill="#10b981" />
      <circle cx="45" cy="90" r="5" fill="#f59e0b" />
    </svg>
  );
}

/** Animal cell (rounded outline, membrane + nucleus) beside a plant cell (boxy walled outline, membrane, nucleus, chloroplasts, a large vacuole) - shape and contents contrast the two. */
export function PlantVsAnimalCellIllustration(
  props: SVGProps<SVGSVGElement>,
) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M45,12 Q75,8 80,35 Q88,55 78,75 Q80,100 50,108 Q18,112 10,85 Q4,60 15,35 Q20,15 45,12 Z"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth="4"
      />
      <circle cx="35" cy="55" r="15" fill="#8b5cf6" />
      <rect
        x="98"
        y="12"
        width="72"
        height="96"
        rx="4"
        fill="none"
        stroke="#a1a1aa"
        strokeWidth="5"
      />
      <rect
        x="106"
        y="20"
        width="56"
        height="80"
        rx="3"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth="3"
      />
      <circle cx="125" cy="42" r="13" fill="#8b5cf6" />
      <ellipse cx="150" cy="35" rx="8" ry="5" fill="#10b981" />
      <ellipse cx="118" cy="88" rx="8" ry="5" fill="#10b981" />
      <ellipse cx="148" cy="80" rx="14" ry="12" fill="#f59e0b" />
    </svg>
  );
}

/** Simplified body outline with a heart, a pair of lungs, and an intestine loop glowing inside it - systems at work inside a body. */
export function BodySystemsHeroIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle
        cx="90"
        cy="18"
        r="14"
        fill="none"
        stroke="#a1a1aa"
        strokeWidth="4"
      />
      <path
        d="M60,34 Q90,26 120,34 L127,68 L118,110 Q90,118 62,110 L53,68 Z"
        fill="none"
        stroke="#a1a1aa"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M76,45 Q63,50 65,68 Q67,84 79,87 Q83,71 81,56 Q79,49 76,45 Z"
        fill="#0ea5e9"
      />
      <path
        d="M104,45 Q117,50 115,68 Q113,84 101,87 Q97,71 99,56 Q101,49 104,45 Z"
        fill="#0ea5e9"
      />
      <path
        d="M90,82 C90,82 76,70 76,60 C76,52 83,49 90,57 C97,49 104,52 104,60 C104,70 90,82 90,82 Z"
        fill="#f43f5e"
      />
      <path
        d="M75,90 Q90,82 100,90 Q112,98 100,106 Q90,112 80,106 Q70,100 78,94"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A lung and a heart linked by a vessel path, with dots travelling along it - oxygen moving from lungs to heart and on to the rest of the body. */
export function SystemsWorkingTogetherIllustration(
  props: SVGProps<SVGSVGElement>,
) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M55,25 Q35,32 32,55 Q29,80 45,95 Q52,75 50,55 Q52,35 55,25 Z"
        fill="#0ea5e9"
      />
      <path
        d="M140,80 C140,80 118,64 118,50 C118,40 128,36 140,46 C152,36 162,40 162,50 C162,64 140,80 140,80 Z"
        fill="#f43f5e"
      />
      <path
        d="M58,55 Q88,38 114,52"
        fill="none"
        stroke="#a1a1aa"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <polygon points="110,44 126,52 110,60" fill="#a1a1aa" />
      <circle cx="68" cy="49" r="4" fill="#f59e0b" />
      <circle cx="84" cy="42" r="4" fill="#f59e0b" />
      <circle cx="100" cy="44" r="4" fill="#f59e0b" />
      <path
        d="M158,66 Q170,76 174,92"
        fill="none"
        stroke="#a1a1aa"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <polygon points="166,86 175,98 158,96" fill="#a1a1aa" />
      <circle cx="163" cy="74" r="4" fill="#f59e0b" />
      <circle cx="171" cy="85" r="4" fill="#f59e0b" />
    </svg>
  );
}

/** A sun, a tree, and a rabbit sharing one scene - living things and the energy source that sustains them, in miniature. */
export function EcosystemHeroIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="28" cy="26" r="14" fill="#f59e0b" />
      <line
        x1="28"
        y1="2"
        x2="28"
        y2="12"
        stroke="#f59e0b"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="4"
        y1="26"
        x2="14"
        y2="26"
        stroke="#f59e0b"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="9"
        y1="7"
        x2="16"
        y2="14"
        stroke="#f59e0b"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="47"
        y1="7"
        x2="40"
        y2="14"
        stroke="#f59e0b"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="9"
        y1="45"
        x2="16"
        y2="38"
        stroke="#f59e0b"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect x="60" y="76" width="10" height="34" rx="2" fill="#a1a1aa" />
      <circle cx="65" cy="60" r="20" fill="#10b981" />
      <circle cx="48" cy="72" r="15" fill="#10b981" />
      <circle cx="82" cy="72" r="15" fill="#10b981" />
      <ellipse cx="140" cy="100" rx="22" ry="15" fill="#f43f5e" />
      <circle cx="162" cy="88" r="11" fill="#f43f5e" />
      <path d="M156,78 Q152,64 158,64 Q162,72 160,80 Z" fill="#f43f5e" />
      <path d="M168,78 Q170,64 176,66 Q174,74 172,81 Z" fill="#f43f5e" />
    </svg>
  );
}

/** Left-to-right chain from sun to producer to herbivore to carnivore, each stage noticeably smaller than the last - most energy is lost at every step. */
export function FoodChainEnergyFlowIllustration(
  props: SVGProps<SVGSVGElement>,
) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="18" cy="58" r="13" fill="#f59e0b" />
      <line
        x1="18"
        y1="40"
        x2="18"
        y2="32"
        stroke="#f59e0b"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="76"
        x2="18"
        y2="84"
        stroke="#f59e0b"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="8"
        y1="48"
        x2="2"
        y2="42"
        stroke="#f59e0b"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="8"
        y1="68"
        x2="2"
        y2="74"
        stroke="#f59e0b"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="34"
        y1="58"
        x2="44"
        y2="58"
        stroke="#a1a1aa"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <polygon points="44,51 58,58 44,65" fill="#a1a1aa" />
      <rect x="68" y="68" width="6" height="10" rx="1" fill="#a1a1aa" />
      <circle cx="71" cy="58" r="10" fill="#10b981" />
      <line
        x1="84"
        y1="58"
        x2="94"
        y2="58"
        stroke="#a1a1aa"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <polygon points="94,51 108,58 94,65" fill="#a1a1aa" />
      <circle cx="114" cy="50" r="3" fill="#8b5cf6" />
      <circle cx="122" cy="50" r="3" fill="#8b5cf6" />
      <circle cx="118" cy="58" r="7" fill="#8b5cf6" />
      <line
        x1="128"
        y1="58"
        x2="136"
        y2="58"
        stroke="#a1a1aa"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <polygon points="136,52 146,58 136,64" fill="#a1a1aa" />
      <polygon points="150,54 151,48 153,54" fill="#f43f5e" />
      <polygon points="153,54 155,48 156,54" fill="#f43f5e" />
      <circle cx="153" cy="58" r="4.5" fill="#f43f5e" />
      <path
        d="M157,60 Q163,63 160,68"
        fill="none"
        stroke="#f43f5e"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A twisted double helix - two intertwined strands linked by alternating cross-rungs, like base pairs - the genetic material passed between generations. */
export function GeneticsHeroIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M35,8 Q90,18.5 145,29 Q90,39.5 35,50 Q90,60.5 145,71 Q90,81.5 35,92 Q90,102.5 145,113"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M145,8 Q90,18.5 35,29 Q90,39.5 145,50 Q90,60.5 35,71 Q90,81.5 145,92 Q90,102.5 35,113"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line x1="35" y1="8" x2="145" y2="8" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      <line x1="145" y1="29" x2="35" y2="29" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
      <line x1="35" y1="50" x2="145" y2="50" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
      <line x1="145" y1="71" x2="35" y2="71" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      <line x1="35" y1="92" x2="145" y2="92" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
      <line x1="145" y1="113" x2="35" y2="113" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Split scene: one parent shape making an identical clone offspring (asexual) beside two differently-coloured parent shapes converging on one blended offspring (sexual) - the contrast reads without labels. */
export function SexualVsAsexualReproductionIllustration(
  props: SVGProps<SVGSVGElement>,
) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <line
        x1="90"
        y1="8"
        x2="90"
        y2="112"
        stroke="#a1a1aa"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <circle cx="40" cy="24" r="15" fill="#8b5cf6" />
      <line
        x1="40"
        y1="42"
        x2="40"
        y2="70"
        stroke="#a1a1aa"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <polygon points="32,70 40,84 48,70" fill="#a1a1aa" />
      <circle cx="40" cy="100" r="15" fill="#8b5cf6" />
      <circle cx="118" cy="20" r="12" fill="#f59e0b" />
      <circle cx="152" cy="20" r="12" fill="#0ea5e9" />
      <line
        x1="118"
        y1="32"
        x2="131"
        y2="80"
        stroke="#a1a1aa"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="152"
        y1="32"
        x2="139"
        y2="80"
        stroke="#a1a1aa"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <polygon points="127,78 135,92 143,78" fill="#a1a1aa" />
      <path d="M135,84 A16,16 0 0,0 135,116 Z" fill="#f59e0b" />
      <path d="M135,84 A16,16 0 0,1 135,116 Z" fill="#0ea5e9" />
    </svg>
  );
}

/** Earth cross-section: a rose core and an amber mantle drawn as nested filled discs, wrapped by a thin outer ring broken into four alternating sky/emerald arcs with visible gaps between them - the crust reads as a shell of separate rigid pieces sitting over the continuous inner layers. */
export function PlateTectonicsHeroIllustration(
  props: SVGProps<SVGSVGElement>,
) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="90" cy="60" r="50" fill="#f59e0b" />
      <circle cx="90" cy="60" r="22" fill="#f43f5e" />
      <path
        d="M144,60 A54,54 0 0,1 108,111"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M90,114 A54,54 0 0,1 39,78"
        fill="none"
        stroke="#10b981"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M36,60 A54,54 0 0,1 72,9"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M90,6 A54,54 0 0,1 141,42"
        fill="none"
        stroke="#10b981"
        strokeWidth="9"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Three side-by-side plate-boundary scenes told entirely through arrow direction: convergent arrows push toward each other into an uplifted amber ridge, divergent arrows pull apart around a wedge of new amber material filling the gap, and transform arrows run parallel to the boundary in opposite directions with no bump or gap at all. */
export function PlateBoundaryTypesIllustration(
  props: SVGProps<SVGSVGElement>,
) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <line
        x1="60"
        y1="4"
        x2="60"
        y2="116"
        stroke="#a1a1aa"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <line
        x1="120"
        y1="4"
        x2="120"
        y2="116"
        stroke="#a1a1aa"
        strokeWidth="2"
        strokeDasharray="4 4"
      />

      <rect x="6" y="76" width="20" height="36" fill="#0ea5e9" />
      <rect x="32" y="82" width="20" height="30" fill="#10b981" />
      <polygon points="20,76 44,76 32,50" fill="#f59e0b" />
      <line
        x1="10"
        y1="60"
        x2="22"
        y2="60"
        stroke="#0ea5e9"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <polygon points="22,54 34,60 22,66" fill="#0ea5e9" />
      <line
        x1="54"
        y1="60"
        x2="42"
        y2="60"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <polygon points="42,54 30,60 42,66" fill="#10b981" />

      <rect x="64" y="76" width="20" height="36" fill="#0ea5e9" />
      <rect x="96" y="76" width="20" height="36" fill="#10b981" />
      <polygon points="84,112 96,112 90,80" fill="#f59e0b" />
      <line
        x1="76"
        y1="60"
        x2="64"
        y2="60"
        stroke="#0ea5e9"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <polygon points="64,54 52,60 64,66" fill="#0ea5e9" />
      <line
        x1="104"
        y1="60"
        x2="116"
        y2="60"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <polygon points="116,54 128,60 116,66" fill="#10b981" />

      <rect x="124" y="76" width="24" height="36" fill="#0ea5e9" />
      <rect x="152" y="76" width="24" height="36" fill="#10b981" />
      <line
        x1="150"
        y1="76"
        x2="150"
        y2="112"
        stroke="#a1a1aa"
        strokeWidth="2"
        strokeDasharray="3 3"
      />
      <line
        x1="136"
        y1="68"
        x2="136"
        y2="52"
        stroke="#0ea5e9"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <polygon points="130,52 136,42 142,52" fill="#0ea5e9" />
      <line
        x1="164"
        y1="52"
        x2="164"
        y2="68"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <polygon points="158,68 164,78 170,68" fill="#10b981" />
    </svg>
  );
}

/** The Sun at centre with orbit rings holding four small warm-toned rocky planets close in, a faint dotted asteroid-belt ring, then four larger cool-toned gas-giant planets (one with a ring) farther out - two visually distinct planet groups around one star. */
export function SolarSystemHeroIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse cx="90" cy="60" rx="20" ry="11" fill="none" stroke="#a1a1aa" strokeWidth="1" />
      <ellipse cx="90" cy="60" rx="28" ry="15.4" fill="none" stroke="#a1a1aa" strokeWidth="1" />
      <ellipse cx="90" cy="60" rx="36" ry="19.8" fill="none" stroke="#a1a1aa" strokeWidth="1" />
      <ellipse cx="90" cy="60" rx="44" ry="24.2" fill="none" stroke="#a1a1aa" strokeWidth="1" />
      <ellipse
        cx="90"
        cy="60"
        rx="51"
        ry="28.05"
        fill="none"
        stroke="#a1a1aa"
        strokeWidth="2"
        strokeDasharray="1 4"
      />
      <ellipse cx="90" cy="60" rx="58" ry="31.9" fill="none" stroke="#a1a1aa" strokeWidth="1" />
      <ellipse cx="90" cy="60" rx="68" ry="37.4" fill="none" stroke="#a1a1aa" strokeWidth="1" />
      <ellipse cx="90" cy="60" rx="78" ry="42.9" fill="none" stroke="#a1a1aa" strokeWidth="1" />
      <ellipse cx="90" cy="60" rx="87" ry="47.85" fill="none" stroke="#a1a1aa" strokeWidth="1" />

      <circle cx="90" cy="60" r="9" fill="#f59e0b" />
      <circle cx="90" cy="60" r="4.5" fill="#f43f5e" />

      <circle cx="86.5" cy="49.2" r="4" fill="#f59e0b" />
      <circle cx="111.5" cy="50.1" r="5.5" fill="#f59e0b" />
      <circle cx="121.2" cy="69.9" r="5.5" fill="#f43f5e" />
      <circle cx="82.4" cy="83.8" r="4.5" fill="#f43f5e" />

      <circle cx="35.5" cy="70.9" r="9" fill="#0ea5e9" />
      <ellipse
        cx="26.1"
        cy="47.2"
        rx="13"
        ry="4.5"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="2"
        transform="rotate(-20 26.1 47.2)"
      />
      <circle cx="26.1" cy="47.2" r="8" fill="#8b5cf6" />
      <circle cx="129" cy="22.9" r="6.5" fill="#10b981" />
      <circle cx="133.5" cy="101.4" r="6.5" fill="#0ea5e9" />
    </svg>
  );
}

/** A tiny Solar System icon nested at the core of a spiral Milky Way galaxy, itself one of several small spiral galaxies scattered inside a faint dashed boundary - the Solar System's place within a galaxy within the wider Universe. */
export function CosmicScaleIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle
        cx="90"
        cy="60"
        r="56"
        fill="none"
        stroke="#a1a1aa"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      <path
        d="M60,60 Q80,50 88,68 Q92,80 76,86"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M60,60 Q40,70 32,52 Q28,38 46,30"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="60" cy="60" r="9" fill="#8b5cf6" />

      <circle cx="60" cy="60" r="2.5" fill="#f59e0b" />
      <circle cx="65" cy="58" r="1" fill="#f43f5e" />
      <circle cx="55" cy="63" r="1" fill="#10b981" />
      <circle cx="63" cy="65" r="1" fill="#0ea5e9" />

      <path
        d="M125,32 Q133,28 134,36"
        fill="none"
        stroke="#f43f5e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M125,32 Q117,36 116,28"
        fill="none"
        stroke="#f43f5e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="125" cy="32" r="5" fill="#f43f5e" />

      <path
        d="M118,90 Q126,86 127,94"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M118,90 Q110,94 109,86"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="118" cy="90" r="4.5" fill="#10b981" />

      <path
        d="M50,92 Q58,88 59,96"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M50,92 Q42,96 41,88"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="50" cy="92" r="4" fill="#f59e0b" />
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
