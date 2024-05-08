import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/vitest";
import SearchBar from "../../components/SearchBar";
import { beforeEach, describe, expect, it, vitest } from "vitest";
import store from "../../redux/state/store";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("SearchBar component", () => {
  beforeEach(() => {
    cleanup();
  });

  it("checking if renders correctly", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const searchCriteriaSelect = screen.getByRole("combobox");
    const searchInput = screen.getByPlaceholderText("Enter eventCode...");
    const fromDateInput = screen.getByPlaceholderText("Start date", {
      exact: false,
    });
    const searchButton = screen.getByRole("button", { name: "Search" });

    expect(searchCriteriaSelect).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(fromDateInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it("dispatches fetchData action with correct query on search", async () => {
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

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const query = "Event";
    mock
      .onGet(`${import.meta.env.VITE_API_GET_EVENTS_URL}?eventCode=${query}`)
      .reply(200, mockResponse);

    const searchInput = screen.getByPlaceholderText("Enter eventCode...");
    fireEvent.change(searchInput, { target: { value: "Event" } });

    const searchButton = screen.getByRole("button", { name: "Search" });
    fireEvent.click(searchButton);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    expect(store.getState().events.loading).toBe(false);
    expect(store.getState().events.data).toEqual(mockResponse);
  });
});
