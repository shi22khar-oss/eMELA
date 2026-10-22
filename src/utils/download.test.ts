import { describe, expect, it } from 'vitest';
import { passAsSvg } from './download';

describe('passAsSvg', () => {
  it('creates a portable SVG with the visitor details', () => {
    const svg = passAsSvg('The Sharma Crew', 4, 'EM-ABC1234');
    expect(svg).toContain('<svg');
    expect(svg).toContain('The Sharma Crew');
    expect(svg).toContain('Party of 4');
    expect(svg).toContain('EM-ABC1234');
  });

  it('escapes user-entered XML characters', () => {
    const svg = passAsSvg('<script>alert("joy")</script>', 1, 'EM-SAFE123');
    expect(svg).not.toContain('<script>');
    expect(svg).toContain('&lt;script&gt;');
    expect(svg).toContain('&quot;joy&quot;');
  });
});
