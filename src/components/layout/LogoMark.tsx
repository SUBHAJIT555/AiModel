export function LogoMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        opacity="0.5"
        d="M22 10.5V12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2H13.5"
        stroke="var(--foreground)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="19" cy="5" r="3" stroke="var(--primary)" strokeWidth="1.5" />
    </svg>
  );
}
