import React from "react";
import { render, screen } from "@testing-library/react";
import EventStatusBadge from "../../components/EventStatusBadge";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("EventStatusBadge component", () => {
  it("renders 'Active' badge when isActive is true", () => {
    render(<EventStatusBadge isActive={true} />);
    const activeBadge = screen.getByText("Active");
    expect(activeBadge).toBeInTheDocument();
    expect(activeBadge).toHaveClass("badge bg-success");
  });

  it("renders 'Closed' badge when isActive is false", () => {
    render(<EventStatusBadge isActive={false} />);
    const closedBadge = screen.getByText("Closed");
    expect(closedBadge).toBeInTheDocument();
    expect(closedBadge).toHaveClass("badge bg-danger");
  });
});
