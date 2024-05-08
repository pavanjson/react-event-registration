import { render, screen } from "@testing-library/react";
import NumberCard from "../../components/NumberCard";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("NumberCard component", () => {
  it("renders number and name correctly", () => {
    const testValues = {
      number: 123,
      name: "Test Name",
    };

    render(<NumberCard name={testValues.name} number={testValues.number} />);

    const numberElement = screen.getByRole("heading", {
      name: String(testValues.number),
    });
    const nameElement = screen.getByText(testValues.name);

    expect(numberElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
  });
});
