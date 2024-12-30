import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App.js";

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

test("convert text", () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Конвертувати в PDF/i));
  const pdfElement = screen.getByTestId(/pdf/i);
  expect(pdfElement).toBeInTheDocument();
});
