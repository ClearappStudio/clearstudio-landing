import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ContextDiscussion from "./ContextDiscussion";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
const response = (data: unknown, ok = true) => ({ ok, json: async () => data });

describe("discussion visitor experience", () => {
  it("clearly disables submission when the storage has not been configured", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response({ available: false }, false)));
    render(<ContextDiscussion />);
    expect(await screen.findByText(/not accepting contributions yet/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit for review/i })).toBeDisabled();
  });

  it("submits a reader reply and reports review rather than claiming it is published", async () => {
    const id = "d45793d1-b8fe-4f16-9f51-4241d462d107";
    const fetcher = vi.fn().mockResolvedValueOnce(response({ available: true, comments: [
      { id, parentId: null, name: "Alex", body: "Where do you find context when returning to a project?", createdAt: "2026-10-17T12:00:00Z", isAuthor: 0 },
    ] })).mockResolvedValueOnce(response({ received: true }));
    vi.stubGlobal("fetch", fetcher);
    render(<ContextDiscussion />);
    fireEvent.click(await screen.findByRole("button", { name: "Reply", exact: true }));
    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Sam" } });
    fireEvent.change(screen.getByLabelText("Your reply"), { target: { value: "I usually have to read through meeting notes again." } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.submit(screen.getByRole("form", { name: "Share a contribution" }));
    expect(await screen.findByText(/received and will appear here after review/)).toBeInTheDocument();
    expect(JSON.parse(fetcher.mock.calls[1][1].body)).toMatchObject({ name: "Sam", parentId: id, consent: true });
    expect(screen.queryByText("I usually have to read through meeting notes again.")).not.toBeInTheDocument();
  });

  it("keeps the draft after failure and renders reader text without interpreting HTML", async () => {
    const fetcher = vi.fn().mockResolvedValueOnce(response({ available: true, comments: [
      { id: "root", parentId: null, name: "Reader", body: "<img src=x onerror=alert(1)>", createdAt: "2026-10-17T12:00:00Z", isAuthor: 0 },
    ] })).mockResolvedValueOnce(response({ error: "Please try again in an hour." }, false));
    vi.stubGlobal("fetch", fetcher);
    render(<ContextDiscussion />);
    expect(await screen.findByText("<img src=x onerror=alert(1)>")).toBeInTheDocument();
    expect(document.querySelector(".cfc-contribution img")).toBeNull();
    await waitFor(() => expect(screen.getByRole("button", { name: /submit for review/i })).toBeEnabled());
    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Sam" } });
    fireEvent.change(screen.getByLabelText("Your contribution"), { target: { value: "A contribution that should survive a network error." } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.submit(screen.getByRole("form", { name: "Share a contribution" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Please try again in an hour.");
    expect(screen.getByLabelText("Your contribution")).toHaveValue("A contribution that should survive a network error.");
  });
});
