import ReviewContainer from "./ReviewContainer";
import { render, screen } from "@testing-library/react";

jest.mock("next/router", () => require("next-router-mock"));

describe("ReviewContainer", () => {
  it("should render", () => {
    const cards = [
      {
        id: "1",
        front: "testing",
        back: "this is a test",
        targetWord: "is",
        deckId: "1",
        userId: "1",
        Assignment: {
          id: "123",
        },
      },
    ];
    render(<ReviewContainer cards={cards} />);
    expect(screen.getByText("testing")).toBeInTheDocument();
  });
});
