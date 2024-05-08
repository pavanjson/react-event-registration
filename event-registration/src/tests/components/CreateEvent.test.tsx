import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/vitest";
import CreateEvent from "../../components/CreateEvent";
import store from "../../redux/state/store";
import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, it } from "vitest";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

describe("CreateEvent component", () => {
  beforeEach(() => {
    cleanup();
  });
  it("renders correctly", () => {
    render(
      <Provider store={store}>
        <CreateEvent modal={true} toggle={() => {}} save={() => {}} />
      </Provider>
    );

    expect(screen.getByLabelText("Event Code:")).toBeInTheDocument();
    expect(screen.getByLabelText("Event Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Description:")).toBeInTheDocument();
    expect(screen.getByLabelText("Date:")).toBeInTheDocument();
    expect(screen.getByLabelText("Time Interval:")).toBeInTheDocument();
    expect(screen.getByLabelText("Venue:")).toBeInTheDocument();
    expect(screen.getByLabelText("Is Active:")).toBeInTheDocument();
    expect(screen.getByLabelText("Image:")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(
      <Provider store={store}>
        <CreateEvent modal={true} toggle={() => {}} save={() => {}} />
      </Provider>
    );
    const mock = new MockAdapter(axios);
    mock.onPost(import.meta.env.VITE_API_GET_EVENTS_URL).reply(200, {
      eventCode: "Event09",
      eventName: "test event 9",
      organizerID: 2004,
      description: "test desc",
      date: "2024-04-15T09:43:30.787",
      timeInterval: "6H",
      venue: "Bangalore ",
      isActive: true,
    });

    fireEvent.change(screen.getByLabelText("Event Code:"), {
      target: { value: "ABC123" },
    });
    fireEvent.change(screen.getByLabelText("Event Name:"), {
      target: { value: "Test Event" },
    });
    fireEvent.change(screen.getByLabelText("Description:"), {
      target: { value: "Description of test event" },
    });
    fireEvent.change(screen.getByLabelText("Date:"), {
      target: { value: "2024-07-23T15:43" },
    });
    fireEvent.change(screen.getByLabelText("Time Interval:"), {
      target: { value: "1H" },
    });
    fireEvent.change(screen.getByLabelText("Venue:"), {
      target: { value: "Test Venue" },
    });
    fireEvent.click(screen.getByLabelText("Is Active:"));
    fireEvent.click(screen.getByText("Create"));
    const TextNode = await screen.findByText(/Event Created successfully/i);
    expect(TextNode).toBeInTheDocument();
  });
});
