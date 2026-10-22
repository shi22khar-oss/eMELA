import { useId } from 'react';

interface FerrisWheelProps {
  className?: string;
}

const cabins = Array.from({ length: 12 }, (_, index) => {
  const angle = (index * 30 - 90) * (Math.PI / 180);
  return {
    x: 200 + Math.cos(angle) * 150,
    y: 190 + Math.sin(angle) * 150,
    colour: ['#ffc94f', '#ef6a52', '#77c7b5', '#f2a7b5'][index % 4],
  };
});

export function FerrisWheel({ className = '' }: FerrisWheelProps) {
  const gradientId = `wheel-glow-${useId().replace(/:/g, '')}`;

  return (
    <svg className={`ferris-wheel ${className}`} viewBox="0 0 400 460" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={gradientId}>
          <stop offset="0" stopColor="#fff7bf" />
          <stop offset="0.45" stopColor="#ffc94f" />
          <stop offset="1" stopColor="#ed6147" />
        </radialGradient>
      </defs>
      <g className="ferris-wheel__supports" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M200 190 116 430M200 190l84 240M93 430h214" stroke="#7b3f45" strokeWidth="15" />
        <path d="M200 190 116 430M200 190l84 240M93 430h214" stroke="#ffc94f" strokeWidth="4" />
      </g>
      <g className="ferris-wheel__rotor">
        <circle cx="200" cy="190" r="151" fill="none" stroke="#ffcf5c" strokeWidth="8" />
        <circle className="ferris-wheel__lights" cx="200" cy="190" r="151" fill="none" stroke="#fff7c7" strokeWidth="5" strokeDasharray="1 15" strokeLinecap="round" />
        <circle cx="200" cy="190" r="126" fill="none" stroke="#d75a52" strokeWidth="3" />
        {cabins.map((cabin, index) => (
          <g key={index}>
            <line x1="200" y1="190" x2={cabin.x} y2={cabin.y} stroke="#eaa858" strokeWidth="3" />
            <g transform={`translate(${cabin.x} ${cabin.y})`}>
              <path d="M0 0v13" stroke="#ffe385" strokeWidth="2" />
              <path d="M-14 15h28l-3 19h-22Z" fill={cabin.colour} stroke="#fff0b0" strokeWidth="2" />
              <path d="M-9 20v9M0 20v9M9 20v9" stroke="#512039" strokeWidth="2" />
            </g>
          </g>
        ))}
        <circle cx="200" cy="190" r="23" fill={`url(#${gradientId})`} stroke="#fff2b2" strokeWidth="4" />
        <circle cx="200" cy="190" r="7" fill="#54213d" />
      </g>
      <path d="M78 434h244" stroke="#f5bd50" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}
