import { cleanup, render, screen } from "@testing-library/react";
import OrganizerHome from "../../components/OrganizerHome";
import "@testing-library/jest-dom/vitest";
import store from "../../redux/state/store";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { Provider } from "react-redux";

describe("OrganizerHome component", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders OrganizerHome component with data", async () => {
    const mockResponse = {
      data: [
        {
          eventCode: "Event01",
          eventName: "no name",
          organizerID: 1,
          description: "no desc",
          date: "2023-12-21T14:01:50.751",
          timeInterval: "5h",
          venue: "nelamangala",
          isActive: false,
        },
      ],
    };
    const mock = new MockAdapter(axios);
    mock
      .onGet(import.meta.env.VITE_API_GET_EVENTS_URL)
      .reply(200, mockResponse);

    render(
      <Provider store={store}>
        <OrganizerHome />
      </Provider>
    );
    await new Promise((resolve) => setTimeout(resolve, 2000));
    expect(store.getState().events.data).toEqual(mockResponse);
  });

  it("renders OrganizerHome component with no data", async () => {
    render(
      <Provider store={store}>
        <OrganizerHome />
      </Provider>
    );
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("renders OrganizerHome component while loading", async () => {
    render(
      <Provider store={store}>
        <OrganizerHome />
      </Provider>
    );
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
