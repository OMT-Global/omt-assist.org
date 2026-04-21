import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "@/app/page";

describe("route pages", () => {
  it("renders the centered placeholder", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: "OMT" })).toBeInTheDocument();
  });
});
