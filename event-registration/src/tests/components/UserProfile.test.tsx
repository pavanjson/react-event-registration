import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import UserProfile from "../../components/UserProfile";
import * as userContext from "../../context/userContext";
import { beforeEach, describe, expect, it, vi, vitest } from "vitest";
import "@testing-library/jest-dom/vitest";

vi.mock("../../context/userContext");
describe("UserProfile component", () => {
  beforeEach(() => {
    cleanup();
    vitest.spyOn(userContext, "useUser").mockReturnValue({
      userData: {
        firstName: "John",
        email: "john@example.com",
        isOrganizer: false,
      },
      setUser: vi.fn(),
    });
  });

  it("renders user info button", () => {
    render(<UserProfile />);
    const userButton = screen.getByRole("button", { name: "John" });
    expect(userButton).toBeInTheDocument();
  });

  it("opens popover with correct user info", () => {
    render(<UserProfile />);
    const userButton = screen.getByRole("button", { name: "John" });

    fireEvent.click(userButton);

    const popoverHeader = screen.getByText("Audience Account");
    const popoverBody = screen.getByText("john@example.com");

    expect(popoverHeader).toBeInTheDocument();
    expect(popoverBody).toBeInTheDocument();
  });
});
