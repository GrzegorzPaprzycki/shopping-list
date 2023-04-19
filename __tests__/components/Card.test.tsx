import { render, screen } from "@testing-library/react";
import Card from "../../components/Card";
import "@testing-library/jest-dom";

describe("Card", () => {
  it("renders without errors", () => {
    // given
    // when
    const { container } = render(<Card>Test content</Card>);

    // then
    const proof = screen.getByText(/Test content/i);
    expect(proof).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
