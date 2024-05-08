import {
  render,
  fireEvent,
  waitFor,
  screen,
  findByLabelText,
  findByRole,
  cleanup,
} from "@testing-library/react";
import axios from "axios";
import { beforeEach, describe, expect, it, vi, vitest } from "vitest";
import "@testing-library/jest-dom/vitest";
import MockAdapter from "axios-mock-adapter";
import Signup from "../../components/Signup";
import { Provider } from "react-redux";
import store from "../../redux/state/store";
import { message } from "antd";

describe("Sign up component", async () => {
  beforeEach(() => {
    cleanup();
  });
  it("submits the form with valid parameters", async () => {
    const mock = new MockAdapter(axios);
    const testValues = {
      userID: 2017,
      password: "Pass@1234",
      email: "pavan.m+109@spurtreetech.com",
      firstName: "Tony",
      lastName: "Stark",
      phone: "9900998999",
      otp: "Sent Successfully",
      isOrganizer: true,
      isEmailVerified: false,
    };
    mock.onPost(import.meta.env.VITE_API_POST_SIGNUP_URL).reply(200, {
      userID: testValues.userID,
      password: testValues.password,
      email: testValues.email,
      firstName: testValues.firstName,
      lastName: testValues.lastName,
      phone: testValues.phone,
      otp: testValues.otp,
      isOrganizer: testValues.isOrganizer,
      isEmailVerified: testValues.isEmailVerified,
    });

    render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );
    const emailInput = await findByLabelText(document.body, "Email:");
    fireEvent.change(emailInput, { target: { value: testValues.email } });

    const passwordInput = await findByLabelText(document.body, "Password:");
    fireEvent.change(passwordInput, { target: { value: testValues.password } });
    const fnameInput = await findByLabelText(document.body, "First Name:");
    fireEvent.change(fnameInput, { target: { value: testValues.firstName } });
    const lnameInput = await findByLabelText(document.body, "Last Name:");
    fireEvent.change(lnameInput, { target: { value: testValues.lastName } });
    const phoneInput = await findByLabelText(document.body, "Phone:");
    fireEvent.change(phoneInput, { target: { value: testValues.phone } });

    const submitButton = await findByRole(document.body, "button", {
      name: "Submit",
    });
    fireEvent.click(submitButton);

    await waitFor(async () => {
      const greetingTextNode = await screen.findByText(/sign up successfull/i);
      expect(greetingTextNode).toBeInTheDocument();
    });
  });

  it("submission with duplicate email ID", async () => {
    const mock = new MockAdapter(axios);
    const alertMock = vitest
      .spyOn(window, "alert")
      .mockImplementation(() => {});
    const testValues = {
      userID: 2017,
      password: "Pass@1234",
      email: "pavan.m+109@spurtreetech.com",
      firstName: "Tony",
      lastName: "Stark",
      phone: "9900998999",
      otp: "Sent Successfully",
      isOrganizer: true,
      isEmailVerified: false,
    };
    mock.onPost(import.meta.env.VITE_API_POST_SIGNUP_URL).reply(200, {
      code: "R1007",
      error: "Something went wrong",
    });

    render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );
    const emailInput = await findByLabelText(document.body, "Email:");
    fireEvent.change(emailInput, { target: { value: testValues.email } });

    const passwordInput = await findByLabelText(document.body, "Password:");
    fireEvent.change(passwordInput, { target: { value: testValues.password } });
    const fnameInput = await findByLabelText(document.body, "First Name:");
    fireEvent.change(fnameInput, { target: { value: testValues.firstName } });
    const lnameInput = await findByLabelText(document.body, "Last Name:");
    fireEvent.change(lnameInput, { target: { value: testValues.lastName } });
    const phoneInput = await findByLabelText(document.body, "Phone:");
    fireEvent.change(phoneInput, { target: { value: testValues.phone } });

    const submitButton = await findByRole(document.body, "button", {
      name: "Submit",
    });
    fireEvent.click(submitButton);
    await waitFor(async () => {
      const greetingTextNode = await screen.findByText(
        /Unable to Sign up : Something went wrong/i
      );
      expect(greetingTextNode).toBeInTheDocument();
    });
  });
});
