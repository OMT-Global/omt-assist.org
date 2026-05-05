import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "@/app/page";

describe("route pages", () => {
  it("renders the OMT Global landing page", () => {
    const { container } = render(<HomePage />);
    const hero = screen.getByRole("region", { name: "OMT Global" });

    expect(hero).toHaveStyle({
      backgroundImage: "url('/omt-assist/omt-global-landing-hero.png')"
    });
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Practical software for operated systems."
      })
    ).toBeInTheDocument();
    expect(container).toHaveTextContent(
      "OMT Global builds focused software projects across home automation, DevOps tooling, systems programming, and agent-assisted operations."
    );
  });
});
