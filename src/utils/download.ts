export function downloadFile(contents: BlobPart, filename: string, type: string) {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => {
    const entities: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&apos;',
      '"': '&quot;',
    };
    return entities[character];
  });
}

export function passAsSvg(name: string, guests: number, id: string) {
  const safeName = escapeXml(name);
  const safeId = escapeXml(id);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="680" viewBox="0 0 1200 680">
  <rect width="1200" height="680" rx="44" fill="#321526"/>
  <path d="M0 500C240 390 340 650 600 520S980 410 1200 520V680H0Z" fill="#ef6146"/>
  <g fill="none" stroke="#ffc94f" stroke-width="5" opacity=".9">
    <circle cx="1030" cy="150" r="105"/><circle cx="1030" cy="150" r="14"/>
    <path d="M1030 45v91M1030 164v91M925 150h91M1044 150h91M956 76l64 64M1040 160l64 64M1104 76l-64 64M1020 160l-64 64M960 290l70-120 70 120"/>
  </g>
  <g font-family="Arial, sans-serif" fill="#fff8e9">
    <text x="72" y="100" font-size="30" font-weight="700" letter-spacing="5">eMELA · DIGITAL PASS</text>
    <text x="72" y="210" font-size="28" fill="#ffc94f">ALL THE JOY. ALL YOURS.</text>
    <text x="72" y="310" font-size="64" font-weight="700">${safeName}</text>
    <text x="72" y="370" font-size="30">Party of ${guests} · Every zone included</text>
    <text x="72" y="590" font-size="26" font-weight="700">${safeId}</text>
    <text x="72" y="630" font-size="20" opacity=".75">Come as you are. Leave a little happier.</text>
  </g>
</svg>`;
}
