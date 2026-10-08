export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
  mega?: "models" | "services";
};

export type FooterColumn = {
  title: string;
  links: NavChild[];
};
