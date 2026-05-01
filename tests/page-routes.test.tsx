import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "@/app/page";

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
});
