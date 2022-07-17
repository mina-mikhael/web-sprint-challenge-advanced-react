import React from "react";
import AppFunctional from "./AppFunctional";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
beforeEach(() => {
  render(<AppFunctional />);
});

describe("AppFunctional is  rendered properly and working as expected", () => {
  test("render without errors", () => {});

  test("renders an error message if user did not enter valid email address", async () => {
    const submitButton = screen.getByTestId("submitBtn");
    userEvent.click(submitButton);
    const errorMsg = await screen.findByTestId("message");
    expect(errorMsg).toBeTruthy();
  });

  test("renders 4 direction buttons and one reset button to the dom", () => {
    const rightBtn = screen.getByText(/right/i);
    const leftBtn = screen.getByText(/left/i);
    const upBtn = screen.getByText(/up/i);
    const downBtn = screen.getByText(/down/i);
    const resetBtn = screen.getByText(/reset/i);
    expect(rightBtn).toBeInTheDocument();
    expect(leftBtn).toBeInTheDocument();
    expect(upBtn).toBeInTheDocument();
    expect(downBtn).toBeInTheDocument();
    expect(resetBtn).toBeInTheDocument();
  });

  test("email input field has the placeholder text 'type email' and it's not visible when user types", () => {
    const emailPhText = screen.queryByPlaceholderText("type email");
    expect(emailPhText).toBeVisible();
    userEvent.type(emailPhText, "soso");
    expect(emailPhText).not.toHaveValue("type email");
  });

  test("when user move right coordinates change to(3, 2)", async () => {
    const rightBtn = screen.getByText(/right/i);
    userEvent.click(rightBtn);
    const Coor = await screen.findByText("Coordinates (3, 2)");
    expect(Coor).toBeInTheDocument();
  });

  test("reset button resets coordinates and steps", async () => {
    const rightBtn = screen.getByText(/right/i);
    userEvent.click(rightBtn);
    const resetBtn = screen.getByText(/reset/i);
    userEvent.click(resetBtn);
    const Coor = await screen.findByText("Coordinates (2, 2)");
    expect(Coor).toBeInTheDocument();
    const steps = await screen.findByText("You moved 0 times");
    expect(steps).toBeInTheDocument();
  });
});
