import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "@/app/page";

describe("route pages", () => {
  it("renders the whimsical OMT Assist homepage", async () => {
    render(await HomePage());

    const main = screen.getByRole("main", { name: "OMT Assist" });
    expect(main).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "The day, gently handled."
      })
    ).toBeInTheDocument();
    expect(screen.getByText("a quiet kind of wonderful")).toBeInTheDocument();
    expect(screen.getByText("always nearby")).toBeInTheDocument();
    expect(main).not.toHaveTextContent("OMT Global");
    expect(main).not.toHaveTextContent("repository");
  });

});
