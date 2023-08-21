import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

const sum = (x: number, y: number) => {
  return x + y;
};

describe("App Component", () => {
  it("should sum correctly", () => {
    expect(sum(4, 4)).toBe(8);
  });

  it("should be render with hello message", () => {
    render(<App />);
    screen.getByText("Hello world!");
  });

  it("shoud change the message", () => {
    render(<App />);
    screen.getByText("Let's learn more about testing in React");
    const button = screen.getByText("Change message");
    fireEvent.click(button);

    screen.getByText("New message!");
    const oldMessage = screen.queryByText(
      "Let's learn more about testing in React"
    );
    expect(oldMessage).toBeNull();
  });
});

export default {};
