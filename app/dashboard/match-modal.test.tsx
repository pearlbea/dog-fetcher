import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MatchModal } from "./match-modal";

const mockDog = {
  img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_11365.jpg",
  name: "Lea",
  age: 11,
  breed: "Affenpinscher",
  zip_code: "36032",
  id: "RHGFTIcBOvEgQ5OCx8A1",
};

describe("MatchModal", () => {
  it("should be open by default", () => {
    render(<MatchModal dog={mockDog} onModalClose={jest.fn()} />);
    expect(screen.getByText("Lea")).toBeTruthy();
  });

  it("should call onModalClose on close", async () => {
    const onModalClose = jest.fn();
    render(<MatchModal dog={mockDog} onModalClose={onModalClose} />);
    await userEvent.click(screen.getByLabelText("Close"));
    expect(onModalClose).toHaveBeenCalled();
  });
});
