import type { CSSProperties } from 'react';

interface StringLightsProps {
  count?: number;
  className?: string;
}

export function StringLights({ count = 18, className = '' }: StringLightsProps) {
  return (
    <div className={`string-lights ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span key={index} style={{ '--bulb-index': index } as CSSProperties} />
      ))}
    </div>
  );
}
