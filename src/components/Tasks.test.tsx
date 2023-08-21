import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Tasks from "./Tasks";
import { setupServer } from "msw/node";
import { rest } from "msw";

describe("Tasks Component", () => {
  const worker = setupServer(
    rest.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=10",
      async (req, res, ctx) => {
        return res(
          ctx.json([
            {
              userId: 1,
              id: 1,
              title: "delectus aut autem",
              completed: false,
            },
          ])
        );
      }
    )
  );

  beforeAll(() => {
    worker.listen();
  });

  it("should fetch and show tasks on button click", async () => {
    render(<Tasks />);

    const button = screen.getByText("Get Tasks from API");
    fireEvent.click(button);
    await waitFor(() => {
      screen.getByText("delectus aut autem");
    });
    // await sceen.findByText("delectus aut autem"); precisa usar key ao invés do id nas tasks
  });
});
