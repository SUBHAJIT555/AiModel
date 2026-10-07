import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

type RoutePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function RoutePlaceholder({ eyebrow, title, description }: RoutePlaceholderProps) {
  return (
    <Section>
      <Container>
        <SectionHeader as="h1" eyebrow={eyebrow} title={title} description={description} />
      </Container>
    </Section>
  );
}
