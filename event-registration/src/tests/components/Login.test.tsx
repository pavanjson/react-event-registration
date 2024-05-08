import {
  render,
  fireEvent,
  waitFor,
  findByLabelText,
  findByRole,
  cleanup,
  screen,
} from "@testing-library/react";
import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import Login from "../../components/Login";

describe("Login component", async () => {
  beforeEach(() => {
    cleanup();
  });
  it("submits the form with valid email and password", async () => {
    const setItem = vi.spyOn(Object.getPrototypeOf(localStorage), "setItem");
    const navigate = vi.fn();
    vi.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    const mock = new MockAdapter(axios);
    mock.onPost(import.meta.env.VITE_API_POST_USER_SIGNIN_URL).reply(200, {
      token: "mock-token",
    });

    render(
      <Router>
        <Login />
      </Router>
    );
    const emailInput = await findByLabelText(document.body, "Email:");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const passwordInput = await findByLabelText(document.body, "Password:");
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    const submitButton = await findByRole(document.body, "button", {
      name: "Submit",
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(setItem).toHaveBeenCalledWith("token", "mock-token");
      expect(navigate).toHaveBeenCalledWith("admin");
    });
  });

  it("displays error message for invalid email and password", async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(import.meta.env.VITE_API_POST_USER_SIGNIN_URL).reply(200, {
      error: "Invalid credentials",
    });

    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = await findByLabelText(document.body, "Email:");
    fireEvent.change(emailInput, { target: { value: "test@example.c" } });

    const passwordInput = await findByLabelText(document.body, "Password:");
    fireEvent.change(passwordInput, { target: { value: "password1" } });

    const submitButton = await findByRole(document.body, "button", {
      name: "Submit",
    });
    fireEvent.click(submitButton);

    await waitFor(async () => {
      const greetingTextNode = await screen.findByText(
        /Error while Login Invalid credentials/i
      );
      expect(greetingTextNode).toBeInTheDocument();
    });
  });
});
