import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/trpc", () => ({
  trpc: {
    subscribers: {
      subscribe: {
        useMutation: () => ({ mutate: vi.fn(), isPending: false }),
      },
    },
  },
}));

import Footer from "./Footer";

describe("Footer subscription prompt", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it("opens the in-page subscription modal when Subscribe is selected", () => {
    render(<Footer />);

    expect(screen.getByText("Strategic notes on media effectiveness, measurement systems, AI, and growth.")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Subscribe" }));

    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByText("No cadence promises. Only when there is something worth saying.")).toBeTruthy();
    expect(screen.getByPlaceholderText("Your email address")).toBeTruthy();
  });
});
