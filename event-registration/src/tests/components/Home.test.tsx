import { cleanup, render, screen } from "@testing-library/react";
import Home from "../../components/Home";
import { beforeEach, describe, expect, it, vitest } from "vitest";
import "@testing-library/jest-dom/vitest";
import { Provider } from "react-redux";
import store from "../../redux/state/store";

describe("Home component", () => {
  beforeEach(() => {
    cleanup();
  });
  it("renders Home page title correctly", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const titleElement = screen.getByText("Home");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders Events component", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const eventsComponent = screen.getByTestId("events-component");
    expect(eventsComponent).toBeInTheDocument();
  });
});
