import { useId } from 'react';

// Per-style color palettes used in illustrations
const PALETTE = {
  Retro:         { bg: '#FEE2E2', wall: '#FCA5A5', accent: '#DB2777', wood: '#9D174D', secondary: '#A855F7', floor: '#FECACA' },
  Vintage:       { bg: '#FDF4FF', wall: '#F5D0FE', accent: '#A21CAF', wood: '#92400E', secondary: '#DDD6FE', floor: '#EDE9FE' },
  Modern:        { bg: '#F8FAFC', wall: '#E2E8F0', accent: '#334155', wood: '#78716C', secondary: '#94A3B8', floor: '#CBD5E1' },
  Rustic:        { bg: '#FFFBEB', wall: '#FDE68A', accent: '#92400E', wood: '#78350F', secondary: '#D97706', floor: '#FEF3C7' },
  Industrial:    { bg: '#F4F4F5', wall: '#D4D4D8', accent: '#18181B', wood: '#3F3F46', secondary: '#71717A', floor: '#A1A1AA' },
  Minimalist:    { bg: '#F9FAFB', wall: '#F3F4F6', accent: '#374151', wood: '#9CA3AF', secondary: '#E5E7EB', floor: '#D1D5DB' },
  Farmhouse:     { bg: '#F0FDF4', wall: '#BBF7D0', accent: '#15803D', wood: '#92400E', secondary: '#4ADE80', floor: '#DCFCE7' },
  Boho:          { bg: '#FFF7ED', wall: '#FED7AA', accent: '#C2410C', wood: '#92400E', secondary: '#FB923C', floor: '#FFEDD5' },
  Coastal:       { bg: '#ECFEFF', wall: '#A5F3FC', accent: '#0E7490', wood: '#6B7280', secondary: '#22D3EE', floor: '#CFFAFE' },
  'Mid-Century': { bg: '#FEFCE8', wall: '#FEF08A', accent: '#854D0E', wood: '#78350F', secondary: '#CA8A04', floor: '#FEF9C3' },
};
const DEF = PALETTE.Rustic;

function colors(style) { return PALETTE[style] || DEF; }

// ─── Scene components ────────────────────────────────────────────────────────

function ShelfScene({ uid, c }) {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-a { from{transform:translateY(14px);opacity:0} to{transform:translateY(0);opacity:1} }
        .${uid}-i1{animation:${uid}-a .55s .15s both cubic-bezier(.34,1.56,.64,1)}
        .${uid}-i2{animation:${uid}-a .55s .32s both cubic-bezier(.34,1.56,.64,1)}
        .${uid}-i3{animation:${uid}-a .55s .48s both cubic-bezier(.34,1.56,.64,1)}
      `}</style>
      <rect width="200" height="140" fill={c.wall} />
      <rect x="0" y="110" width="200" height="30" fill={c.floor} />
      {/* shadow */}
      <ellipse cx="100" cy="112" rx="55" ry="4" fill="rgba(0,0,0,0.08)" />
      {/* brackets */}
      <polyline points="68,87 68,74 82,74" fill="none" stroke={c.accent} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="132,87 132,74 118,74" fill="none" stroke={c.accent} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* shelf plank */}
      <rect x="54" y="68" width="92" height="9" rx="1.5" fill={c.wood} />
      <rect x="54" y="68" width="92" height="2.5" rx="1.5" fill="rgba(255,255,255,0.25)" />
      {/* plant */}
      <g className={`${uid}-i1`}>
        <rect x="67" y="51" width="14" height="18" rx="3" fill={c.secondary} />
        <rect x="64" y="57" width="20" height="3" rx="1.5" fill={c.accent} />
        <ellipse cx="70" cy="45" rx="6" ry="9" fill="#4ADE80" transform="rotate(-20 70 45)" />
        <ellipse cx="76" cy="43" rx="5" ry="8" fill="#22C55E" transform="rotate(15 76 43)" />
      </g>
      {/* books */}
      <g className={`${uid}-i2`}>
        <rect x="93" y="49" width="8" height="19" rx="1.5" fill={c.accent} />
        <rect x="102" y="52" width="7" height="16" rx="1.5" fill={c.secondary} />
        <rect x="110" y="50" width="6" height="18" rx="1.5" fill="#FCA5A5" />
      </g>
      {/* vase */}
      <g className={`${uid}-i3`}>
        <path d={`M127 66 Q122 58 124 51 Q130 46 134 51 Q136 58 131 66Z`} fill={c.secondary} />
        <ellipse cx="129" cy="50" rx="4" ry="5" fill="#4ADE80" />
        <line x1="129" y1="45" x2="127" y2="38" stroke="#4ADE80" strokeWidth="1.5" />
        <line x1="129" y1="45" x2="132" y2="37" stroke="#4ADE80" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function TableScene({ uid, c }) {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-drop { from{transform:translateY(-30px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes ${uid}-fade { from{opacity:0} to{opacity:1} }
        .${uid}-top{animation:${uid}-drop .6s .1s both cubic-bezier(.34,1.3,.64,1)}
        .${uid}-legs{animation:${uid}-drop .5s .35s both cubic-bezier(.34,1.2,.64,1)}
        .${uid}-shadow{animation:${uid}-fade .5s .7s both}
      `}</style>
      <rect width="200" height="140" fill={c.wall} />
      <rect x="0" y="105" width="200" height="35" fill={c.floor} />
      {/* shadow */}
      <ellipse cx="100" cy="107" rx="58" ry="5" className={`${uid}-shadow`} fill="rgba(0,0,0,0.1)" />
      {/* hairpin legs */}
      <g className={`${uid}-legs`}>
        <line x1="68" y1="80" x2="60" y2="108" stroke={c.accent} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="68" y1="80" x2="72" y2="108" stroke={c.accent} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="132" y1="80" x2="128" y2="108" stroke={c.accent} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="132" y1="80" x2="140" y2="108" stroke={c.accent} strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* table top */}
      <g className={`${uid}-top`}>
        <rect x="48" y="68" width="104" height="14" rx="3" fill={c.wood} />
        <rect x="48" y="68" width="104" height="4" rx="3" fill="rgba(255,255,255,0.2)" />
        {/* wood grain lines */}
        <line x1="70" y1="70" x2="70" y2="80" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />
        <line x1="100" y1="70" x2="100" y2="80" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />
        <line x1="130" y1="70" x2="130" y2="80" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />
        {/* item on table */}
        <rect x="90" y="55" width="20" height="13" rx="2" fill={c.secondary} opacity="0.8" />
        <rect x="94" y="51" width="12" height="5" rx="1" fill={c.secondary} opacity="0.7" />
      </g>
    </svg>
  );
}

function LightScene({ uid, c }) {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-glow { 0%,100%{opacity:.6;r:32} 50%{opacity:1;r:40} }
        @keyframes ${uid}-on { 0%{opacity:0} 60%{opacity:.4} 65%{opacity:1} 70%{opacity:.6} 75%{opacity:1} 100%{opacity:1} }
        @keyframes ${uid}-swing { 0%,100%{transform:rotate(-2deg)} 50%{transform:rotate(2deg)} }
        .${uid}-glow{animation:${uid}-glow 2.5s ease-in-out infinite; transform-origin:100px 105px}
        .${uid}-light{animation:${uid}-on .8s .2s both}
        .${uid}-cord{animation:${uid}-swing 4s ease-in-out infinite; transform-origin:100px 10px}
      `}</style>
      <rect width="200" height="140" fill={c.bg === '#F4F4F5' ? '#18181B' : '#1E293B'} />
      {/* ceiling */}
      <rect x="0" y="0" width="200" height="14" fill={c.accent} />
      {/* glow */}
      <circle cx="100" cy="105" r="36" fill="#FFF7AE" opacity="0" className={`${uid}-glow`} />
      <circle cx="100" cy="105" r="22" fill="#FEFCE8" opacity="0" className={`${uid}-glow`} style={{animationDelay:'0.1s'}} />
      {/* cord + fixture */}
      <g className={`${uid}-cord`}>
        <line x1="100" y1="14" x2="100" y2="72" stroke={c.secondary} strokeWidth="2" />
        {/* mason jar shape */}
        <g className={`${uid}-light`}>
          <rect x="86" y="72" width="28" height="34" rx="4" fill={c.secondary} opacity="0.9" />
          <rect x="89" y="70" width="22" height="6" rx="2" fill={c.accent} />
          {/* lid */}
          <circle cx="100" cy="89" r="10" fill="#FBBF24" opacity="0.9" />
          <circle cx="100" cy="89" r="6" fill="#FEF3C7" />
          {/* glow inside jar */}
          <rect x="87" y="73" width="26" height="32" rx="3" fill="#FBBF24" opacity="0.25" />
        </g>
      </g>
      {/* floor light cone */}
      <path d="M78 106 L122 106 L140 140 L60 140Z" fill="#FBBF24" opacity="0.06" className={`${uid}-light`} />
    </svg>
  );
}

function NeonScene({ uid, c }) {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-flicker {
          0%{opacity:0} 30%{opacity:.8} 35%{opacity:.3} 40%{opacity:1}
          60%{opacity:.9} 65%{opacity:.4} 70%{opacity:1} 100%{opacity:1}
        }
        @keyframes ${uid}-pulse { 0%,100%{opacity:.7} 50%{opacity:1} }
        .${uid}-sign{animation:${uid}-flicker 1.2s .1s both}
        .${uid}-glow{animation:${uid}-pulse 2s ease-in-out infinite}
      `}</style>
      <rect width="200" height="140" fill="#0F0F1A" />
      {/* backing board */}
      <rect x="30" y="30" width="140" height="80" rx="8" fill="#1A1A2E" />
      {/* glow behind text */}
      <rect x="38" y="38" width="124" height="64" rx="5" fill={c.accent} opacity="0.12" className={`${uid}-glow`} />
      {/* neon letters "DIY" */}
      <g className={`${uid}-sign`}>
        {/* D */}
        <path d="M52 52 L52 88 Q80 88 80 70 Q80 52 52 52" fill="none" stroke={c.accent} strokeWidth="4" strokeLinecap="round" filter={`url(#${uid}-blur)`} />
        {/* I */}
        <line x1="100" y1="52" x2="100" y2="88" stroke={c.secondary} strokeWidth="4" strokeLinecap="round" />
        <line x1="92" y1="52" x2="108" y2="52" stroke={c.secondary} strokeWidth="3" strokeLinecap="round" />
        <line x1="92" y1="88" x2="108" y2="88" stroke={c.secondary} strokeWidth="3" strokeLinecap="round" />
        {/* Y */}
        <path d="M118 52 L134 70 L150 52" fill="none" stroke={c.accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="134" y1="70" x2="134" y2="88" stroke={c.accent} strokeWidth="4" strokeLinecap="round" />
      </g>
      <defs>
        <filter id={`${uid}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      {/* floor reflection */}
      <rect x="0" y="115" width="200" height="25" fill="rgba(255,255,255,0.02)" />
    </svg>
  );
}

function WallScene({ uid, c }) {
  const boards = [0,1,2,3,4,5,6];
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-slide { from{transform:translateX(-40px);opacity:0} to{transform:translateX(0);opacity:1} }
        ${boards.map(i => `.${uid}-b${i}{animation:${uid}-slide .4s ${(i*0.07).toFixed(2)}s both ease-out}`).join('\n')}
      `}</style>
      <rect width="200" height="140" fill={c.wall} />
      {boards.map(i => (
        <g key={i} className={`${uid}-b${i}`}>
          <rect x="0" y={i * 20} width="200" height="18" fill={i % 2 === 0 ? c.secondary : c.bg} opacity="0.8" />
          <rect x="0" y={i * 20 + 17} width="200" height="1.5" fill="rgba(0,0,0,0.07)" />
          {/* wood grain */}
          {[30, 80, 130, 170].map(x => (
            <path key={x} d={`M${x} ${i*20+2} Q${x+5} ${i*20+9} ${x} ${i*20+17}`}
              fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="2" />
          ))}
        </g>
      ))}
    </svg>
  );
}

function HeadboardScene({ uid, c }) {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-hb { from{transform:translateY(-40px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes ${uid}-fade { from{opacity:0} to{opacity:1} }
        .${uid}-hb{animation:${uid}-hb .6s .1s both cubic-bezier(.34,1.3,.64,1)}
        .${uid}-bed{animation:${uid}-fade .5s .5s both}
      `}</style>
      <rect width="200" height="140" fill={c.wall} />
      <rect x="0" y="105" width="200" height="35" fill={c.floor} />
      {/* headboard */}
      <g className={`${uid}-hb`}>
        <rect x="25" y="42" width="150" height="52" rx="4" fill={c.wood} />
        {/* vertical slats */}
        {[48,68,88,108,128,148].map(x => (
          <rect key={x} x={x} y="48" width="10" height="40" rx="2" fill={c.accent} opacity="0.5" />
        ))}
        <rect x="25" y="42" width="150" height="5" rx="2" fill="rgba(255,255,255,0.18)" />
      </g>
      {/* bed body */}
      <g className={`${uid}-bed`}>
        <rect x="20" y="90" width="160" height="22" rx="4" fill={c.secondary} opacity="0.9" />
        {/* pillows */}
        <rect x="32" y="82" width="54" height="14" rx="7" fill="white" opacity="0.95" />
        <rect x="114" y="82" width="54" height="14" rx="7" fill="white" opacity="0.95" />
        {/* duvet fold */}
        <rect x="20" y="98" width="160" height="8" rx="2" fill={c.secondary} opacity="0.7" />
      </g>
    </svg>
  );
}

function DoorScene({ uid, c }) {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-slide { from{transform:translateX(-80px)} to{transform:translateX(0)} }
        @keyframes ${uid}-fade { from{opacity:0} to{opacity:1} }
        .${uid}-door{animation:${uid}-slide .8s .1s both cubic-bezier(.25,.46,.45,.94)}
        .${uid}-track{animation:${uid}-fade .3s both}
      `}</style>
      <rect width="200" height="140" fill={c.wall} />
      <rect x="0" y="115" width="200" height="25" fill={c.floor} />
      {/* door frame */}
      <rect x="40" y="30" width="120" height="88" rx="2" fill={c.floor} />
      {/* track */}
      <rect x="30" y="28" width="140" height="6" rx="3" fill={c.accent} className={`${uid}-track`} />
      <circle cx="155" cy="31" r="4" fill={c.secondary} className={`${uid}-track`} />
      {/* door panel */}
      <g className={`${uid}-door`}>
        <rect x="41" y="31" width="118" height="84" rx="2" fill={c.wood} />
        {/* vertical board lines */}
        {[65, 89, 113, 137].map(x => (
          <line key={x} x1={x} y1="34" x2={x} y2="112" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
        ))}
        <rect x="41" y="31" width="118" height="4" rx="1" fill="rgba(255,255,255,0.15)" />
        {/* handle */}
        <circle cx="152" cy="73" r="5" fill={c.accent} />
        <line x1="147" y1="73" x2="140" y2="73" stroke={c.accent} strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function GardenScene({ uid, c }) {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-grow { from{transform:scaleY(0);transform-origin:bottom} to{transform:scaleY(1);transform-origin:bottom} }
        @keyframes ${uid}-fade { from{opacity:0} to{opacity:1} }
        .${uid}-bed{animation:${uid}-fade .4s both}
        .${uid}-p1{animation:${uid}-grow .6s .3s both cubic-bezier(.34,1.4,.64,1)}
        .${uid}-p2{animation:${uid}-grow .6s .5s both cubic-bezier(.34,1.4,.64,1)}
        .${uid}-p3{animation:${uid}-grow .6s .65s both cubic-bezier(.34,1.4,.64,1)}
        .${uid}-p4{animation:${uid}-grow .6s .8s both cubic-bezier(.34,1.4,.64,1)}
      `}</style>
      <rect width="200" height="140" fill={c.bg} />
      {/* sky */}
      <rect width="200" height="90" fill={c.wall} />
      {/* ground */}
      <rect x="0" y="88" width="200" height="52" fill="#86EFAC" opacity="0.3" />
      <rect x="0" y="95" width="200" height="45" fill="#4ADE80" opacity="0.2" />
      {/* raised bed box */}
      <g className={`${uid}-bed`}>
        <rect x="30" y="90" width="140" height="38" rx="4" fill={c.wood} />
        <rect x="30" y="90" width="140" height="8" rx="4" fill="rgba(255,255,255,0.1)" />
        {/* soil */}
        <rect x="36" y="98" width="128" height="26" rx="2" fill="#92400E" opacity="0.6" />
        <rect x="36" y="98" width="128" height="4" rx="1" fill="#78350F" opacity="0.4" />
      </g>
      {/* plants */}
      <g className={`${uid}-p1`}>
        <line x1="60" y1="97" x2="60" y2="60" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="52" cy="65" rx="11" ry="7" fill="#4ADE80" transform="rotate(-30 52 65)" />
        <ellipse cx="68" cy="62" rx="10" ry="6" fill="#22C55E" transform="rotate(25 68 62)" />
        <circle cx="60" cy="55" r="6" fill="#FCA5A5" />
      </g>
      <g className={`${uid}-p2`}>
        <line x1="90" y1="97" x2="90" y2="52" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="82" cy="58" rx="10" ry="7" fill="#4ADE80" transform="rotate(-20 82 58)" />
        <ellipse cx="98" cy="55" rx="9" ry="7" fill="#22C55E" transform="rotate(20 98 55)" />
        <ellipse cx="90" cy="49" rx="8" ry="5" fill="#4ADE80" />
      </g>
      <g className={`${uid}-p3`}>
        <line x1="120" y1="97" x2="120" y2="58" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="112" cy="64" rx="10" ry="6" fill="#4ADE80" transform="rotate(-15 112 64)" />
        <ellipse cx="128" cy="61" rx="9" ry="6" fill="#22C55E" transform="rotate(30 128 61)" />
        <circle cx="120" cy="53" r="5" fill="#FDE047" />
      </g>
      <g className={`${uid}-p4`}>
        <line x1="150" y1="97" x2="150" y2="63" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="142" cy="69" rx="9" ry="6" fill="#4ADE80" transform="rotate(-25 142 69)" />
        <ellipse cx="158" cy="67" rx="8" ry="6" fill="#22C55E" transform="rotate(20 158 67)" />
        <circle cx="150" cy="58" r="5" fill="#FCA5A5" />
      </g>
    </svg>
  );
}

function PlanterScene({ uid, c }) {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-up { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes ${uid}-grow { from{transform:scaleY(0)} to{transform:scaleY(1)} }
        .${uid}-pot1{animation:${uid}-up .5s .1s both}
        .${uid}-pot2{animation:${uid}-up .5s .25s both}
        .${uid}-pot3{animation:${uid}-up .5s .4s both}
        .${uid}-pl1{animation:${uid}-grow .6s .5s both cubic-bezier(.34,1.4,.64,1);transform-origin:bottom center}
        .${uid}-pl2{animation:${uid}-grow .6s .65s both cubic-bezier(.34,1.4,.64,1);transform-origin:bottom center}
        .${uid}-pl3{animation:${uid}-grow .6s .8s both cubic-bezier(.34,1.4,.64,1);transform-origin:bottom center}
      `}</style>
      <rect width="200" height="140" fill={c.wall} />
      <rect x="0" y="108" width="200" height="32" fill={c.floor} />
      <ellipse cx="100" cy="110" rx="90" ry="5" fill="rgba(0,0,0,0.07)" />
      {/* pots */}
      <g className={`${uid}-pot1`}>
        <path d="M46 108 L38 78 L66 78 L58 108Z" fill={c.accent} />
        <rect x="36" y="75" width="32" height="6" rx="2" fill={c.wood} />
      </g>
      <g className={`${uid}-pot2`}>
        <path d="M106 108 L96 72 L128 72 L118 108Z" fill={c.secondary} />
        <rect x="94" y="68" width="36" height="7" rx="2" fill={c.wood} />
      </g>
      <g className={`${uid}-pot3`}>
        <path d="M162 108 L156 84 L178 84 L172 108Z" fill={c.accent} opacity="0.75" />
        <rect x="154" y="81" width="26" height="5" rx="2" fill={c.wood} />
      </g>
      {/* plants */}
      <g className={`${uid}-pl1`}>
        <line x1="52" y1="76" x2="52" y2="50" stroke="#16A34A" strokeWidth="2" />
        <ellipse cx="44" cy="56" rx="9" ry="6" fill="#4ADE80" transform="rotate(-25 44 56)" />
        <ellipse cx="60" cy="53" rx="8" ry="6" fill="#22C55E" transform="rotate(20 60 53)" />
      </g>
      <g className={`${uid}-pl2`}>
        <line x1="112" y1="70" x2="112" y2="38" stroke="#16A34A" strokeWidth="2.5" />
        <ellipse cx="102" cy="44" rx="12" ry="8" fill="#4ADE80" transform="rotate(-20 102 44)" />
        <ellipse cx="122" cy="41" rx="11" ry="7" fill="#22C55E" transform="rotate(25 122 41)" />
        <ellipse cx="112" cy="36" rx="9" ry="6" fill="#4ADE80" />
      </g>
      <g className={`${uid}-pl3`}>
        <line x1="165" y1="82" x2="165" y2="55" stroke="#16A34A" strokeWidth="2" />
        <ellipse cx="158" cy="60" rx="8" ry="6" fill="#4ADE80" transform="rotate(-15 158 60)" />
        <ellipse cx="172" cy="58" rx="7" ry="5" fill="#22C55E" transform="rotate(20 172 58)" />
      </g>
    </svg>
  );
}

function MirrorScene({ uid, c }) {
  const rays = Array.from({length: 16}, (_, i) => i);
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-ray { from{transform:scaleX(0);opacity:0} to{transform:scaleX(1);opacity:1} }
        @keyframes ${uid}-mirror { from{opacity:0;transform:scale(.7)} to{opacity:1;transform:scale(1)} }
        .${uid}-mirror{animation:${uid}-mirror .5s .5s both cubic-bezier(.34,1.4,.64,1)}
        ${rays.map(i => `.${uid}-r${i}{animation:${uid}-ray .3s ${(.05 + i * .035).toFixed(2)}s both ease-out;transform-origin:100px 70px}`).join('\n')}
      `}</style>
      <rect width="200" height="140" fill={c.wall} />
      {/* sunburst rays */}
      {rays.map(i => {
        const angle = (i / 16) * 360;
        const rad = (angle * Math.PI) / 180;
        const r1 = 38, r2 = 62;
        const x1 = 100 + r1 * Math.cos(rad), y1 = 70 + r1 * Math.sin(rad);
        const x2 = 100 + r2 * Math.cos(rad), y2 = 70 + r2 * Math.sin(rad);
        return <line key={i} className={`${uid}-r${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c.accent} strokeWidth={i % 2 === 0 ? 4 : 2.5} strokeLinecap="round" />;
      })}
      {/* mirror */}
      <g className={`${uid}-mirror`}>
        <circle cx="100" cy="70" r="34" fill={c.accent} />
        <circle cx="100" cy="70" r="31" fill="#BFDBFE" />
        <circle cx="100" cy="70" r="31" fill="url(#mirror-grad)" opacity="0.5" />
        {/* reflection sheen */}
        <ellipse cx="90" cy="58" rx="10" ry="14" fill="white" opacity="0.25" transform="rotate(-20 90 58)" />
      </g>
      <defs>
        <radialGradient id="mirror-grad" cx="35%" cy="30%">
          <stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor={c.secondary} stopOpacity="0.3" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function SeatScene({ uid, c }) {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-drop { from{transform:translateY(-20px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes ${uid}-puff { from{transform:scaleY(0.5);opacity:0} to{transform:scaleY(1);opacity:1} }
        .${uid}-frame{animation:${uid}-drop .5s .1s both cubic-bezier(.34,1.2,.64,1)}
        .${uid}-cushion{animation:${uid}-puff .5s .4s both cubic-bezier(.34,1.5,.64,1);transform-origin:center 80px}
        .${uid}-back{animation:${uid}-drop .5s .2s both cubic-bezier(.34,1.2,.64,1)}
      `}</style>
      <rect width="200" height="140" fill={c.wall} />
      <rect x="0" y="112" width="200" height="28" fill={c.floor} />
      <ellipse cx="100" cy="114" rx="65" ry="5" fill="rgba(0,0,0,0.08)" />
      {/* back */}
      <g className={`${uid}-back`}>
        <rect x="35" y="44" width="130" height="44" rx="8" fill={c.accent} />
        {/* button tufting */}
        {[65, 100, 135].map(x => (
          <circle key={x} cx={x} cy="66" r="3" fill="rgba(255,255,255,0.3)" />
        ))}
        <rect x="35" y="44" width="130" height="6" rx="4" fill="rgba(255,255,255,0.15)" />
      </g>
      {/* seat frame */}
      <g className={`${uid}-frame`}>
        <rect x="30" y="84" width="140" height="14" rx="3" fill={c.wood} />
        {/* legs */}
        <rect x="40" y="95" width="8" height="18" rx="3" fill={c.wood} />
        <rect x="152" y="95" width="8" height="18" rx="3" fill={c.wood} />
        <rect x="60" y="97" width="6" height="16" rx="3" fill={c.wood} opacity="0.7" />
        <rect x="134" y="97" width="6" height="16" rx="3" fill={c.wood} opacity="0.7" />
      </g>
      {/* cushion */}
      <g className={`${uid}-cushion`}>
        <rect x="33" y="74" width="134" height="16" rx="8" fill={c.secondary} />
        <rect x="33" y="74" width="134" height="5" rx="4" fill="rgba(255,255,255,0.2)" />
      </g>
    </svg>
  );
}

function TextileScene({ uid, c }) {
  const strands = Array.from({length: 9}, (_, i) => i);
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-drop { from{transform:translateY(-20px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes ${uid}-hang { from{transform:scaleY(0);opacity:0} to{transform:scaleY(1);opacity:1} }
        .${uid}-rod{animation:${uid}-drop .4s both}
        ${strands.map(i => `.${uid}-s${i}{animation:${uid}-hang .5s ${(.15 + i * .06).toFixed(2)}s both;transform-origin:${(60 + i * 10)}px 34px}`).join('\n')}
      `}</style>
      <rect width="200" height="140" fill={c.wall} />
      {/* dowel */}
      <rect x="50" y="28" width="100" height="8" rx="4" fill={c.wood} className={`${uid}-rod`} />
      {/* hanging strings */}
      {strands.map(i => {
        const x = 60 + i * 9;
        return (
          <g key={i} className={`${uid}-s${i}`}>
            <line x1={x} y1="36" x2={x} y2="70" stroke={c.secondary} strokeWidth="2" strokeLinecap="round" />
            {/* knot */}
            <circle cx={x} cy="70" r="3" fill={c.accent} />
            {/* fringe */}
            <line x1={x - 5} y1="73" x2={x - 8} y2="110" stroke={c.secondary} strokeWidth="1.5" strokeLinecap="round" />
            <line x1={x} y1="73" x2={x} y2="115" stroke={c.secondary} strokeWidth="1.5" strokeLinecap="round" />
            <line x1={x + 5} y1="73" x2={x + 8} y2="108" stroke={c.secondary} strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
  );
}

function WorkbenchScene({ uid, c }) {
  const tools = [
    {x:100, y:52, w:6, h:22, label:'hammer'},
    {x:114, y:48, w:4, h:26, label:'screwdriver'},
    {x:127, y:50, w:8, h:24, label:'wrench'},
    {x:142, y:55, w:5, h:18, label:'pliers'},
    {x:155, y:46, w:6, h:28, label:'drill'},
  ];
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-wb { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes ${uid}-tool { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .${uid}-bench{animation:${uid}-wb .5s .1s both}
        ${tools.map((t,i) => `.${uid}-t${i}{animation:${uid}-tool .35s ${(.4 + i * .1).toFixed(1)}s both}`).join('\n')}
      `}</style>
      <rect width="200" height="140" fill={c.wall} />
      {/* pegboard */}
      <rect x="20" y="20" width="160" height="76" rx="2" fill={c.floor} className={`${uid}-bench`} />
      {/* pegboard holes */}
      {Array.from({length: 40}, (_, i) => (
        <circle key={i} cx={34 + (i % 8) * 18} cy={34 + Math.floor(i / 8) * 14} r="1.5" fill={c.secondary} opacity="0.5" className={`${uid}-bench`} />
      ))}
      {/* tools on pegboard */}
      {tools.map((t, i) => (
        <g key={i} className={`${uid}-t${i}`}>
          <rect x={t.x} y={t.y} width={t.w} height={t.h} rx="2" fill={c.accent} />
          <rect x={t.x} y={t.y} width={t.w} height={6} rx="2" fill={c.secondary} />
        </g>
      ))}
      {/* bench surface */}
      <g className={`${uid}-bench`}>
        <rect x="10" y="94" width="180" height="14" rx="3" fill={c.wood} />
        <rect x="10" y="94" width="180" height="4" rx="2" fill="rgba(255,255,255,0.18)" />
        {/* legs */}
        <rect x="18" y="107" width="12" height="30" rx="2" fill={c.wood} />
        <rect x="170" y="107" width="12" height="30" rx="2" fill={c.wood} />
        {/* vise */}
        <rect x="140" y="97" width="22" height="10" rx="2" fill={c.accent} />
        <rect x="159" y="99" width="6" height="22" rx="1" fill={c.accent} />
      </g>
    </svg>
  );
}

function PergolaScene({ uid, c }) {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-post { from{transform:scaleY(0);transform-origin:bottom} to{transform:scaleY(1);transform-origin:bottom} }
        @keyframes ${uid}-beam { from{transform:scaleX(0);transform-origin:left} to{transform:scaleX(1);transform-origin:left} }
        @keyframes ${uid}-sky { from{opacity:0} to{opacity:1} }
        .${uid}-sky{animation:${uid}-sky .4s both}
        .${uid}-p1{animation:${uid}-post .5s .15s both}
        .${uid}-p2{animation:${uid}-post .5s .28s both}
        .${uid}-beam{animation:${uid}-beam .5s .5s both}
        .${uid}-raf{animation:${uid}-beam .4s .7s both}
      `}</style>
      <rect width="200" height="140" fill={c.bg} className={`${uid}-sky`} />
      {/* sky gradient */}
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.wall} />
          <stop offset="100%" stopColor={c.floor} />
        </linearGradient>
      </defs>
      <rect width="200" height="100" fill={`url(#${uid}-sky)`} className={`${uid}-sky`} />
      <rect x="0" y="100" width="200" height="40" fill="#4ADE80" opacity="0.3" />
      <rect x="0" y="108" width="200" height="32" fill="#22C55E" opacity="0.2" />
      {/* posts */}
      <rect x="38" y="46" width="12" height="94" rx="3" fill={c.wood} className={`${uid}-p1`} />
      <rect x="150" y="46" width="12" height="94" rx="3" fill={c.wood} className={`${uid}-p2`} />
      {/* main beam */}
      <rect x="28" y="38" width="144" height="12" rx="3" fill={c.wood} className={`${uid}-beam`} />
      {/* rafters */}
      {[52, 72, 92, 112, 132].map((x, i) => (
        <rect key={x} x={x} y="30" width="8" height="22" rx="2" fill={c.accent} opacity="0.8" className={`${uid}-raf`} style={{animationDelay: `${0.72 + i * 0.06}s`}} />
      ))}
    </svg>
  );
}

function StorageScene({ uid, c }) {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-in { from{transform:translateX(30px);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes ${uid}-up { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        .${uid}-rail{animation:${uid}-up .4s .1s both}
        .${uid}-h1{animation:${uid}-in .4s .2s both}
        .${uid}-h2{animation:${uid}-in .4s .35s both}
        .${uid}-h3{animation:${uid}-in .4s .5s both}
        .${uid}-h4{animation:${uid}-in .4s .65s both}
        .${uid}-bin{animation:${uid}-up .4s .8s both}
      `}</style>
      <rect width="200" height="140" fill={c.wall} />
      <rect x="0" y="108" width="200" height="32" fill={c.floor} />
      {/* hook rail */}
      <rect x="30" y="50" width="140" height="10" rx="5" fill={c.wood} className={`${uid}-rail`} />
      {/* hooks */}
      {[50, 80, 110, 140].map((x, i) => (
        <g key={x} className={`${uid}-h${i+1}`}>
          <path d={`M${x} 60 L${x} 70 Q${x} 80 ${x+10} 80`} fill="none" stroke={c.accent} strokeWidth="4" strokeLinecap="round" />
          {/* item on hook */}
          {i === 0 && <ellipse cx={x+14} cy="86" rx="8" ry="12" fill={c.secondary} opacity="0.8" />}
          {i === 1 && <path d={`M${x+4} 80 Q${x+10} 90 ${x+16} 80`} fill="none" stroke={c.secondary} strokeWidth="8" strokeLinecap="round" />}
          {i === 2 && <>
            <ellipse cx={x+12} cy="83" rx="6" ry="10" fill={c.secondary} opacity="0.8" />
            <line x1={x+12} y1="73" x2={x+12} y2="80" stroke={c.accent} strokeWidth="2" />
          </>}
          {i === 3 && <rect x={x+4} y="80" width="16" height="20" rx="3" fill={c.secondary} opacity="0.8" />}
        </g>
      ))}
      {/* shelf/bin below */}
      <g className={`${uid}-bin`}>
        <rect x="35" y="98" width="55" height="12" rx="2" fill={c.secondary} />
        <rect x="100" y="98" width="65" height="12" rx="2" fill={c.accent} opacity="0.6" />
        <rect x="30" y="108" width="140" height="4" rx="1" fill={c.wood} />
      </g>
    </svg>
  );
}

function FireScene({ uid, c }) {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-f1 { 0%,100%{transform:scaleX(1) scaleY(1)} 33%{transform:scaleX(1.1) scaleY(0.9)} 66%{transform:scaleX(0.9) scaleY(1.1)} }
        @keyframes ${uid}-f2 { 0%,100%{transform:scaleX(1) scaleY(1)} 33%{transform:scaleX(0.9) scaleY(1.1)} 66%{transform:scaleX(1.1) scaleY(0.9)} }
        @keyframes ${uid}-fade { from{opacity:0} to{opacity:1} }
        .${uid}-pit{animation:${uid}-fade .4s both}
        .${uid}-f1{animation:${uid}-f1 1.2s ease-in-out infinite;transform-origin:100px 80px}
        .${uid}-f2{animation:${uid}-f2 1.4s ease-in-out infinite;transform-origin:100px 85px}
        .${uid}-glow{animation:${uid}-f1 2s ease-in-out infinite;transform-origin:100px 90px}
      `}</style>
      <rect width="200" height="140" fill={c.wall} />
      <rect x="0" y="100" width="200" height="40" fill={c.floor} />
      {/* fire glow on ground */}
      <ellipse cx="100" cy="104" rx="40" ry="8" fill="#FDE047" opacity="0.2" className={`${uid}-glow`} />
      {/* stone circle */}
      <g className={`${uid}-pit`}>
        <ellipse cx="100" cy="100" rx="50" ry="12" fill={c.accent} opacity="0.4" />
        {[0,40,80,120,160,200,240,280,320].map((a, i) => {
          const r = (a * Math.PI) / 180;
          return <ellipse key={i} cx={100 + 44 * Math.cos(r)} cy={100 + 11 * Math.sin(r)} rx="7" ry="6" fill={c.accent} />;
        })}
        {/* logs */}
        <ellipse cx="85" cy="100" rx="18" ry="5" fill={c.wood} transform="rotate(-20 85 100)" />
        <ellipse cx="115" cy="100" rx="18" ry="5" fill={c.wood} transform="rotate(20 115 100)" />
      </g>
      {/* outer flame */}
      <path className={`${uid}-f1`} d="M80 100 Q70 75 82 62 Q88 75 95 68 Q90 80 100 55 Q110 80 105 68 Q112 75 118 62 Q130 75 120 100Z" fill="#F97316" />
      {/* inner flame */}
      <path className={`${uid}-f2`} d="M88 100 Q82 82 90 72 Q95 82 100 65 Q105 82 110 72 Q118 82 112 100Z" fill="#FDE047" />
      {/* core */}
      <path d="M93 100 Q95 87 100 78 Q105 87 107 100Z" fill="white" opacity="0.6" />
    </svg>
  );
}

function KidsScene({ uid, c }) {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-twinkle { 0%,100%{opacity:.3;r:2} 50%{opacity:1;r:3} }
        @keyframes ${uid}-build { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes ${uid}-flag { 0%,100%{transform:rotate(-5deg)} 50%{transform:rotate(5deg)} }
        .${uid}-loft{animation:${uid}-build .5s .1s both}
        .${uid}-ladder{animation:${uid}-build .4s .4s both}
        ${[0,1,2,3,4,5,6,7].map(i => `.${uid}-star${i}{animation:${uid}-twinkle 1.5s ${(i*0.2).toFixed(1)}s ease-in-out infinite}`).join('\n')}
        .${uid}-flag{animation:${uid}-flag 2s ease-in-out infinite;transform-origin:60px 22px}
      `}</style>
      <rect width="200" height="140" fill="#0F172A" />
      {/* stars */}
      {[[20,20],[50,15],[80,25],[120,12],[150,22],[170,14],[35,40],[155,38]].map(([x,y],i)=>(
        <circle key={i} className={`${uid}-star${i}`} cx={x} cy={y} r="2" fill="#FEF9C3" />
      ))}
      {/* moon */}
      <path d="M170 30 Q158 42 170 54 Q148 50 148 42 Q148 30 170 30Z" fill="#FEF9C3" opacity="0.9" />
      {/* loft bed */}
      <g className={`${uid}-loft`}>
        {/* frame */}
        <rect x="30" y="58" width="140" height="8" rx="3" fill={c.wood} />
        <rect x="30" y="60" width="6" height="68" rx="2" fill={c.wood} />
        <rect x="164" y="60" width="6" height="68" rx="2" fill={c.wood} />
        {/* mattress */}
        <rect x="36" y="62" width="128" height="14" rx="4" fill={c.secondary} />
        <rect x="40" y="62" width="38" height="12" rx="6" fill="white" opacity="0.9" />
        <rect x="84" y="62" width="38" height="12" rx="6" fill="white" opacity="0.9" />
        {/* below desk area */}
        <rect x="35" y="96" width="94" height="6" rx="2" fill={c.accent} opacity="0.6" />
        <rect x="35" y="96" width="94" height="34" rx="0" fill={c.accent} opacity="0.1" />
        {/* fairy lights */}
        <path d="M30 56 Q50 50 70 56 Q90 50 110 56 Q130 50 150 56 Q170 50 170 56" fill="none" stroke={c.secondary} strokeWidth="1" />
        {[40,60,80,100,120,140,160].map(x => (
          <circle key={x} cx={x} cy={x < 90 ? 53 : 53} cy={53} r="2.5" fill="#FDE047" opacity="0.9" />
        ))}
        {/* pennant */}
        <line x1="60" y1="22" x2="60" y2="62" stroke={c.secondary} strokeWidth="1.5" className={`${uid}-flag`} />
        <path d="M60 22 L82 32 L60 42Z" fill={c.accent} className={`${uid}-flag`} />
      </g>
      {/* ladder */}
      <g className={`${uid}-ladder`}>
        <line x1="155" y1="60" x2="160" y2="120" stroke={c.wood} strokeWidth="3" strokeLinecap="round" />
        <line x1="164" y1="60" x2="169" y2="120" stroke={c.wood} strokeWidth="3" strokeLinecap="round" />
        {[70,83,96,109].map(y => <line key={y} x1="157" y1={y} x2="167" y2={y} stroke={c.wood} strokeWidth="2.5" strokeLinecap="round" />)}
      </g>
    </svg>
  );
}

function PipeShelfScene({ uid, c }) {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-a { from{opacity:0;transform:scaleX(0)} to{opacity:1;transform:scaleX(1)} }
        @keyframes ${uid}-b { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .${uid}-pipe{animation:${uid}-a .5s .1s both;transform-origin:left center}
        .${uid}-sh1{animation:${uid}-b .4s .4s both}
        .${uid}-sh2{animation:${uid}-b .4s .55s both}
        .${uid}-sh3{animation:${uid}-b .4s .7s both}
      `}</style>
      <rect width="200" height="140" fill={c.wall} />
      {/* vertical pipes */}
      <rect x="35" y="15" width="8" height="115" rx="4" fill={c.accent} />
      <rect x="157" y="15" width="8" height="115" rx="4" fill={c.accent} />
      {/* flanges */}
      {[20, 65, 110].map(y => (
        <g key={y}>
          <circle cx="39" cy={y + 5} r="8" fill={c.accent} opacity="0.7" />
          <circle cx="161" cy={y + 5} r="8" fill={c.accent} opacity="0.7" />
          {/* shelf */}
          <rect x="30" y={y + 8} width="140" height="10" rx="2" fill={c.wood} className={`${uid}-sh${Math.floor(y/45)+1}`} />
          <rect x="30" y={y + 8} width="140" height="3" rx="1" fill="rgba(255,255,255,0.2)" className={`${uid}-sh${Math.floor(y/45)+1}`} />
        </g>
      ))}
      {/* items on shelves */}
      <g className={`${uid}-sh1`}>
        <rect x="50" y="19" width="8" height="14" rx="1" fill={c.secondary} />
        <rect x="60" y="21" width="6" height="12" rx="1" fill="#FCA5A5" />
        <ellipse cx="85" cy="27" rx="7" ry="6" fill={c.secondary} opacity="0.7" />
      </g>
      <g className={`${uid}-sh2`}>
        <line x1="50" y1="73" x2="50" y2="55" stroke="#16A34A" strokeWidth="2" />
        <ellipse cx="50" cy="53" rx="6" ry="7" fill="#4ADE80" />
        <rect x="44" y="65" width="12" height="10" rx="2" fill={c.secondary} />
        <rect x="100" y="58" width="30" height="14" rx="2" fill={c.accent} opacity="0.5" />
      </g>
    </svg>
  );
}

function ConcreteScene({ uid, c }) {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-up { from{transform:translateY(18px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes ${uid}-grow { from{transform:scaleY(0)} to{transform:scaleY(1)} }
        .${uid}-p1{animation:${uid}-up .45s .1s both}
        .${uid}-p2{animation:${uid}-up .45s .25s both}
        .${uid}-p3{animation:${uid}-up .45s .4s both}
        .${uid}-g1{animation:${uid}-grow .5s .45s both;transform-origin:bottom}
        .${uid}-g2{animation:${uid}-grow .5s .6s both;transform-origin:bottom}
        .${uid}-g3{animation:${uid}-grow .5s .75s both;transform-origin:bottom}
      `}</style>
      <rect width="200" height="140" fill={c.wall} />
      <rect x="0" y="110" width="200" height="30" fill={c.floor} />
      <ellipse cx="100" cy="112" rx="80" ry="5" fill="rgba(0,0,0,0.07)" />
      {/* pot 1 (small) */}
      <g className={`${uid}-p1`}>
        <path d="M52 110 L44 90 L62 90 L54 110Z" fill="#9CA3AF" />
        <rect x="42" y="86" width="22" height="6" rx="1" fill="#6B7280" />
      </g>
      {/* pot 2 (large) */}
      <g className={`${uid}-p2`}>
        <path d="M105 110 L92 80 L120 80 L107 110Z" fill="#9CA3AF" opacity="0.9" />
        <rect x="90" y="75" width="32" height="8" rx="2" fill="#6B7280" />
      </g>
      {/* pot 3 (medium) */}
      <g className={`${uid}-p3`}>
        <path d="M158 110 L150 92 L170 92 L162 110Z" fill="#9CA3AF" opacity="0.8" />
        <rect x="148" y="88" width="24" height="6" rx="1" fill="#6B7280" />
      </g>
      {/* plants */}
      <g className={`${uid}-g1`}>
        <line x1="53" y1="89" x2="53" y2="66" stroke="#16A34A" strokeWidth="2" />
        <ellipse cx="46" cy="71" rx="9" ry="6" fill="#4ADE80" transform="rotate(-20 46 71)" />
        <ellipse cx="60" cy="68" rx="8" ry="6" fill="#22C55E" transform="rotate(15 60 68)" />
      </g>
      <g className={`${uid}-g2`}>
        <line x1="106" y1="78" x2="106" y2="46" stroke="#16A34A" strokeWidth="2.5" />
        <ellipse cx="96" cy="52" rx="12" ry="8" fill="#4ADE80" transform="rotate(-20 96 52)" />
        <ellipse cx="116" cy="49" rx="11" ry="8" fill="#22C55E" transform="rotate(25 116 49)" />
        <ellipse cx="106" cy="44" rx="9" ry="6" fill="#4ADE80" />
      </g>
      <g className={`${uid}-g3`}>
        <line x1="160" y1="90" x2="160" y2="65" stroke="#16A34A" strokeWidth="2" />
        <ellipse cx="153" cy="70" rx="9" ry="6" fill="#4ADE80" transform="rotate(-15 153 70)" />
        <ellipse cx="167" cy="68" rx="8" ry="5" fill="#22C55E" transform="rotate(20 167 68)" />
      </g>
    </svg>
  );
}

function TileScene({ uid, c }) {
  const tiles = Array.from({length: 30}, (_, i) => i);
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${uid}-tile { from{opacity:0;transform:scale(0.8)} to{opacity:1;transform:scale(1)} }
        ${tiles.map(i => `.${uid}-t${i}{animation:${uid}-tile .25s ${(i * .04).toFixed(2)}s both}`).join('\n')}
      `}</style>
      <rect width="200" height="140" fill={c.bg} />
      {tiles.map(i => {
        const col = i % 6, row = Math.floor(i / 6);
        const x = col * 33 + 1, y = row * 28 + 1;
        return (
          <g key={i} className={`${uid}-t${i}`}>
            <rect x={x} y={y} width="31" height="26" rx="1.5" fill={row % 2 === col % 2 ? c.secondary : c.bg} />
            <rect x={x} y={y} width="31" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
            {/* grout lines */}
            <rect x={x} y={y + 26} width="31" height="2" fill={c.wall} />
            <rect x={x + 31} y={y} width="2" height="28" fill={c.wall} />
          </g>
        );
      })}
    </svg>
  );
}

// ─── Scene registry ───────────────────────────────────────────────────────────

const SCENE_MAP = {
  shelf:      ShelfScene,
  table:      TableScene,
  light:      LightScene,
  neon:       NeonScene,
  wall:       WallScene,
  headboard:  HeadboardScene,
  door:       DoorScene,
  garden:     GardenScene,
  planter:    PlanterScene,
  mirror:     MirrorScene,
  seat:       SeatScene,
  textile:    TextileScene,
  workbench:  WorkbenchScene,
  pergola:    PergolaScene,
  storage:    StorageScene,
  fire:       FireScene,
  kids:       KidsScene,
  pipe:       PipeShelfScene,
  concrete:   ConcreteScene,
  tile:       TileScene,
};

export default function ProjectIllustration({ project, className = '' }) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-z0-9]/gi, 'u');
  const Scene = SCENE_MAP[project.illu] || ShelfScene;
  const c = colors(project.style);
  return (
    <div className={`w-full h-full ${className}`}>
      <Scene uid={uid} c={c} />
    </div>
  );
}
