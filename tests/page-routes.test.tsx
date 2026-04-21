import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "@/app/page";
import AboutPage from "@/app/about/page";
import ProjectsPage from "@/app/projects/page";
import ResumePage from "@/app/resume/page";

describe("route pages", () => {
  it("renders homepage content", async () => {
    render(await HomePage());
    expect(
      screen.getByRole("heading", {
        name: "OMT Assist"
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Operations assistance and automation surface for OMT Global")).toBeInTheDocument();
    expect(screen.getByText("Career trajectory")).toBeInTheDocument();
    expect(screen.getByText("Patent record")).toBeInTheDocument();
    expect(screen.getByText("Slopmeter snapshot")).toBeInTheDocument();
    expect(screen.getByText(/Recent focus on AI-assisted coding/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Slopmeter usage snapshot/i)).toBeInTheDocument();
    expect(screen.queryByText("Profile JSON")).not.toBeInTheDocument();
  });

  it("renders about page content", async () => {
    render(await AboutPage());
    expect(screen.getAllByRole("heading", { name: "About" }).length).toBeGreaterThan(0);
    expect(screen.getByText(/initialized from the `jmcte.me` site template/i)).toBeInTheDocument();
  });

  it("renders projects page content", async () => {
    render(await ProjectsPage());
    expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByText(/Current repository surface and deployment baseline/)).toBeInTheDocument();
  });

  it("renders resume page content", async () => {
    render(await ResumePage());
    expect(screen.getByRole("heading", { name: "Resume" })).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Patents")).toBeInTheDocument();
    expect(screen.getByText("Operations assistance workspace")).toBeInTheDocument();
  });
});
