import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "@/app/page";
import OMTGlobalPage from "@/app/omt-global/page";

describe("route pages", () => {
  it("renders the OMT Assist background page", () => {
    const { container } = render(<HomePage />);
    const main = screen.getByRole("main", { name: "OMT Assist" });

    expect(main).toHaveStyle({
      backgroundImage:
        "url('/omt-assist/ig_0cea3c1c0cf26aec0169f51036527c819b9e500524417054fb.png')"
    });
    expect(container.querySelector("h1")).not.toBeInTheDocument();
  });

  it("renders the OMT Global landing page", () => {
    const { container } = render(<OMTGlobalPage />);
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
