import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "@/app/page";
import OMTGlobalPage from "@/app/omt-global/page";

describe("route pages", () => {
  it("renders the OMT Assist operations homepage", async () => {
    render(await HomePage());

    const main = screen.getByRole("main", { name: "OMT Assist" });
    expect(main).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /The quiet layer behind/
      })
    ).toBeInTheDocument();
    expect(screen.getByText("operated systems.")).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Inspect the surface/ })
    ).toHaveAttribute("href", "#artifacts");
    expect(screen.getByRole("link", { name: /Access policy/ })).toHaveAttribute(
      "href",
      "#index-note"
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "A narrow surface, held deliberately." })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "One surface, several receivers." })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Machine-readable by default." })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /profile\.json/ })).toHaveAttribute(
      "href",
      "/profile.json"
    );
    expect(screen.getByRole("link", { name: /resume\.json/ })).toHaveAttribute(
      "href",
      "/resume.json"
    );
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
