function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function TruckIcon() {
  return (
    <Icon>
      <path d="M2 7h11v9H2z" />
      <path d="M13 10h4l4 3v3h-8z" />
      <circle cx="6" cy="18" r="1.6" />
      <circle cx="16.5" cy="18" r="1.6" />
    </Icon>
  );
}

export function SofaIcon() {
  return (
    <Icon>
      <path d="M4 12v6h16v-6" />
      <path d="M4 12a2 2 0 0 1 2-2h1V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3h1a2 2 0 0 1 2 2" />
      <path d="M6 18v2M18 18v2" />
    </Icon>
  );
}

export function ApplianceIcon() {
  return (
    <Icon>
      <rect x="6" y="2" width="12" height="20" rx="1.5" />
      <path d="M6 9h12" />
      <path d="M9 5.5h.01M9 12.5h.01" />
    </Icon>
  );
}

export function GarageIcon() {
  return (
    <Icon>
      <path d="M3 10 12 3l9 7" />
      <path d="M5 10v11h14V10" />
      <path d="M9 21v-6h6v6" />
    </Icon>
  );
}

export function DebrisIcon() {
  return (
    <Icon>
      <path d="M4 20h16" />
      <path d="M6 20V9l3-4 3 4v11" />
      <path d="M12 20v-7l3-3 3 3v7" />
    </Icon>
  );
}

export function CleanoutIcon() {
  return (
    <Icon>
      <path d="M4 4h16v4H4z" />
      <path d="M6 8v12h12V8" />
      <path d="M10 12v4M14 12v4" />
    </Icon>
  );
}
