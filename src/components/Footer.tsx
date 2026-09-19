export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-afterlight-line py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-[0.1em] text-afterlight-text-primary">
              AFTERLIGHT
            </span>
            <span className="text-afterlight-text-muted text-xs">/</span>
            <span className="text-xs text-afterlight-text-muted tracking-[0.1em]">
              URBAN CAPACITY
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {[
              { label: 'THE PROBLEM', id: 'problem' },
              { label: 'OPERATOR REVIEW', id: 'operator-review' },
              { label: 'PILOT', id: 'pilot' },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-[10px] tracking-[0.15em] text-afterlight-text-muted hover:text-afterlight-text-primary transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-[10px] font-mono text-afterlight-text-muted tracking-wider opacity-50">
            © 2026 AFTERLIGHT — CONCEPT PROTOTYPE
          </div>
        </div>
      </div>
    </footer>
  );
}
