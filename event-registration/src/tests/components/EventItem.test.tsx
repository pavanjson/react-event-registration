import { cleanup, render, screen } from "@testing-library/react";
import EventItem from "../../components/EventItem";
import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, it } from "vitest";

describe("EventItem component", () => {
  beforeEach(() => {
    cleanup();
  });
  const mockEventModel = {
    eventCode: "test code",
    eventName: "Test Event",
    organizerID: 2,
    description: "This is a test event",
    date: new Date().toISOString(),
    timeInterval: "1h",
    venue: "test pura",
    isActive: true,
  };

  it("renders event item correctly", () => {
    render(<EventItem eventModel={mockEventModel} />);
    expect(screen.getByText(mockEventModel.eventName)).toBeInTheDocument();
    expect(screen.getByText(mockEventModel.description)).toBeInTheDocument();
  });

  it("check if the cards in the holding time left renders", async () => {
    render(<EventItem eventModel={mockEventModel} />);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(screen.getByText("Time Left:")).toBeInTheDocument();
    expect(screen.getByText("days")).toBeInTheDocument();
    expect(screen.getByText("hours")).toBeInTheDocument();
    expect(screen.getByText("min")).toBeInTheDocument();
    expect(screen.getByText("sec")).toBeInTheDocument();
  });
});
