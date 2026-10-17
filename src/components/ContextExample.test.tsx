import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ContextExample from "./ContextExample";

afterEach(cleanup);

describe("the illustrative project timeline", () => {
  it("walks through the changing plan and shows the recovered context on return", () => {
    render(<ContextExample />);
    expect(screen.getByText(/A fictional scenario/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A launch for 200 customers" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("heading", { name: "The service needs more testing" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("heading", { name: "Start with a smaller pilot" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Return two weeks later" }));
    expect(screen.getByRole("heading", { name: "You are preparing a five-customer pilot." })).toBeInTheDocument();
    expect(screen.getByText("What needs a decision?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Two weeks later You return" })).toHaveAttribute("aria-current", "step");
    fireEvent.click(screen.getByRole("button", { name: "Start again" }));
    expect(screen.getByRole("heading", { name: "A launch for 200 customers" })).toBeInTheDocument();
  });

  it("allows direct step selection and inspection of the evidence behind the summary", () => {
    render(<ContextExample />);
    fireEvent.click(screen.getByRole("button", { name: "Two weeks later You return" }));
    fireEvent.click(screen.getByRole("button", { name: "Technical review" }));
    expect(screen.getByText("Illustrative technical review")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tuesday The constraint" })).toHaveAttribute("aria-current", "step");
    fireEvent.click(screen.getByRole("button", { name: "Previous" }));
    expect(screen.getByText("Illustrative meeting note")).toBeInTheDocument();
  });
});
