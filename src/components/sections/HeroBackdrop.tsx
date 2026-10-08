export function HeroBackdrop({ src }: { src: string }) {
  return <div aria-hidden className="hero-mask" style={{ backgroundImage: `url(${src})` }} />;
}
