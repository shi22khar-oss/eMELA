interface BrandProps {
  className?: string;
  linked?: boolean;
}

export function Brand({ className = '', linked = true }: BrandProps) {
  const content = (
    <>
      <svg className="brand__mark" viewBox="0 0 44 44" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="22" cy="18" r="13" />
          <circle cx="22" cy="18" r="2" />
          <path d="M22 5v11m0 4v11M9 18h11m4 0h11M13 9l7 7m4 4 7 7M31 9l-7 7m-4 4-7 7M15 39l7-15 7 15M13 39h18" />
        </g>
      </svg>
      <span className="brand__word">eMELA</span>
      <span className="brand__dot">.</span>
    </>
  );

  return linked ? (
    <a className={`brand ${className}`} href="#top" aria-label="eMELA home">
      {content}
    </a>
  ) : (
    <div className={`brand ${className}`}>{content}</div>
  );
}
