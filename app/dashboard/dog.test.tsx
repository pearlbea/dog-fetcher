import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DogProfile } from "./dog";

const mockDog = {
  img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_11365.jpg",
  name: "Lea",
  age: 11,
  breed: "Affenpinscher",
  zip_code: "36032",
  id: "RHGFTIcBOvEgQ5OCx8A1",
};

describe("Dog Profile", () => {
  it("should display a dog", () => {
    render(<DogProfile dog={mockDog} handleLike={jest.fn()} />);
    expect(screen.getByAltText("Lea")).toBeTruthy();
    expect(screen.getByText("Lea")).toBeTruthy();
    expect(screen.getByText("Affenpinscher")).toBeTruthy();
    expect(screen.getByText("age: 11")).toBeTruthy();
    expect(screen.getByText("zipcode: 36032")).toBeTruthy();
  });

  it("should call handleLike on like", async () => {
    const handleLike = jest.fn();
    render(<DogProfile dog={mockDog} handleLike={handleLike} />);
    await userEvent.click(screen.getByRole("button"));
    expect(handleLike).toHaveBeenCalled();
    expect(handleLike).toHaveBeenCalledWith({
      liked: true,
      dogId: "RHGFTIcBOvEgQ5OCx8A1",
    });
  });
  it("should should pass false if like button clicked twice", async () => {
    const handleLike = jest.fn();
    render(<DogProfile dog={mockDog} handleLike={handleLike} />);
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByRole("button"));
    expect(handleLike).toHaveBeenCalledWith({
      liked: false,
      dogId: "RHGFTIcBOvEgQ5OCx8A1",
    });
  });
});
