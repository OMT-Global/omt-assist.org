import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CommandConsole } from "@/components/home/command-console";
import { Reveal } from "@/components/home/reveal";
import { SignalNetwork } from "@/components/home/signal-network";

function mockMatchMedia(matches: boolean) {
  const original = window.matchMedia;
  window.matchMedia = ((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false
  })) as typeof window.matchMedia;
  return original;
}

describe("command console", () => {
  let originalMatchMedia: typeof window.matchMedia | undefined;

  afterEach(() => {
    if (originalMatchMedia) {
      window.matchMedia = originalMatchMedia;
      originalMatchMedia = undefined;
    }
  });

  it("renders the session header, status lines, and artifact prompt", () => {
    originalMatchMedia = mockMatchMedia(false);
    render(
      <CommandConsole profileName="OMT Assist" githubHandle="OMT-Global/omt-assist.org" />
    );

    expect(screen.getByText("omt-assist · session")).toBeInTheDocument();
    expect(screen.getByText("assist status --public")).toBeInTheDocument();
    expect(screen.getByText(/private \/ operational/)).toBeInTheDocument();
    expect(screen.getByText("OMT-Global/omt-assist.org")).toBeInTheDocument();
    expect(screen.getByText("static export ✓")).toBeInTheDocument();
    expect(screen.getByText("assist artifacts --list")).toBeInTheDocument();
  });

  it("shows the complete artifact listing when reduced motion is preferred", () => {
    originalMatchMedia = mockMatchMedia(true);
    const { container } = render(
      <CommandConsole profileName="OMT Assist" githubHandle="OMT-Global/omt-assist.org" />
    );

    const listing = container.querySelector("pre")?.textContent ?? "";
    for (const artifact of [
      "▸ profile.json",
      "▸ projects.json",
      "▸ resume.json",
      "▸ sitemap.xml"
    ]) {
      expect(listing).toContain(artifact);
    }
  });
});

describe("reveal", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("starts hidden while the observer has not reported intersection", () => {
    const observed: unknown[] = [];
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe(target: unknown) {
          observed.push(target);
        }
        disconnect() {}
        unobserve() {}
        takeRecords() {
          return [];
        }
      }
    );

    render(
      <Reveal data-testid="reveal" delay={240}>
        content
      </Reveal>
    );

    const element = screen.getByTestId("reveal");
    expect(element).toHaveAttribute("data-reveal", "off");
    expect(element).toHaveClass("reveal");
    expect(element.style.getPropertyValue("--reveal-delay")).toBe("240ms");
    expect(observed).toHaveLength(1);
  });

  it("reveals once the observer reports intersection", () => {
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        callback: (entries: Array<{ isIntersecting: boolean }>) => void;

        constructor(callback: (entries: Array<{ isIntersecting: boolean }>) => void) {
          this.callback = callback;
        }

        observe() {
          this.callback([{ isIntersecting: true }]);
        }
        disconnect() {}
      }
    );

    render(
      <Reveal data-testid="reveal" delay={240}>
        content
      </Reveal>
    );

    expect(screen.getByTestId("reveal")).toHaveAttribute("data-reveal", "on");
  });

  it("falls back to an immediate reveal when IntersectionObserver is unavailable", () => {
    vi.stubGlobal("IntersectionObserver", undefined);

    render(
      <Reveal data-testid="reveal">
        content
      </Reveal>
    );

    expect(screen.getByTestId("reveal")).toHaveAttribute("data-reveal", "on");
  });

  it("renders the requested element tag", () => {
    vi.stubGlobal("IntersectionObserver", undefined);

    render(
      <Reveal as="section" data-testid="reveal-section">
        content
      </Reveal>
    );

    expect(screen.getByTestId("reveal-section").tagName).toBe("SECTION");
  });
});

describe("signal network", () => {
  it("renders an orbit node and legend entry for every receiver", () => {
    render(<SignalNetwork />);

    const buttons = screen.getAllByRole("button", { name: /signal receiver:/i });
    expect(buttons).toHaveLength(4);

    for (const label of [
      "Human operators",
      "Agents",
      "Generated artifacts",
      "Source repository"
    ]) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(2);
    }
  });

  it("labels the center surface and keeps orbit nodes focusable", () => {
    render(<SignalNetwork />);

    expect(screen.getByText("OMT Assist")).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "Signal receiver: Agents" })
    ).toHaveLength(1);
  });
});
