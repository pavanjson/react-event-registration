import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("Navbar component", () => {
  beforeEach(() => {
    cleanup();
  });
  it("renders correctly", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const homeLink = screen.getByText("Home");
    const aboutLink = screen.getByText("About");
    const loginLink = screen.getByText("Login");
    const signUpLink = screen.getByText("Sign Up");

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
  });

  it("navigates to the correct routes", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const homeLink = screen.getByText("Home");
    const aboutLink = screen.getByText("About");

    fireEvent.click(homeLink);
    expect(window.location.pathname).toBe("/");

    fireEvent.click(aboutLink);
    expect(window.location.pathname).toBe("/about");
  });
});
