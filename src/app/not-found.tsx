import { RoutePlaceholder } from "@/components/sections/RoutePlaceholder";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <>
      <RoutePlaceholder
        eyebrow="404"
        title="This page is not in the catalog."
        description="The address does not match a route in this frontend."
      />
      <Container className="-mt-10 pb-16">
        <Button href="/">Back home</Button>
      </Container>
    </>
  );
}
