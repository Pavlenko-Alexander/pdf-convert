import { render, screen } from "@testing-library/react";
import App from "../App.js";

test("render title", () => {
  render(<App />);
  const title = screen.getByText(
    /Введіть текст щоб конвертувати його у PDF документ./i
  );
  expect(title).toBeInTheDocument();
});

test("render text area", () => {
  render(<App />);
  const textarea = screen.getByPlaceholderText(/Введіть текст/i);
  expect(textarea).toBeInTheDocument();
});

test("render main button", () => {
  render(<App />);
  const buttonElement = screen.getByText(/Конвертувати в PDF/i);
  expect(buttonElement).toBeInTheDocument();
});
