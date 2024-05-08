import { cleanup, getByRole, render, waitFor } from "@testing-library/react";
import { useUser, UserProvider } from "../../context/userContext";
import AdminDashboard from "../../components/AdminDashboard";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { Provider } from "react-redux";
import store from "../../redux/state/store";

const mock = new MockAdapter(axios);

const mockUserData = {
  data: {
    userID: 2013,
    password: "Pass@345",
    email: "pavan.m+100@spurtreetech.com",
    firstName: "Pavan",
    lastName: "ghjghj",
    phone: "9008293408",
    otp: "599665",
    isOrganizer: true,
    isEmailVerified: true,
  },
};

describe("AdminDashboard component", () => {
  beforeEach(() => {
    mock.reset();
    cleanup();
  });

  it("rendering the admin dashboard", async () => {
    mock
      .onGet("https://localhost:7179/event-registration-users/user-info")
      .reply(200, mockUserData);

    const { getByRole } = render(
      <Provider store={store}>
        <UserProvider>
          <AdminDashboard />
        </UserProvider>
      </Provider>
    );

    expect(
      getByRole("heading", { name: /admin dashboard/i })
    ).toBeInTheDocument();
  });
});
