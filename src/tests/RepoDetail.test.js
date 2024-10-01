import React from "react";
import { render, screen } from "@testing-library/react";
import RepoDetail from "../components/RepoDetail";
import { MemoryRouter, Route } from "react-router-dom";
import axios from "axios";

jest.mock("axios");

const mockRepo = {
  id: 1,
  name: "better_spree_paypal_express",
  description: "A better Spree PayPal Express Extension. Currently in beta.",
  language: "Ruby",
  forks_count: 4,
  open_issues_count: 0,
  watchers_count: 2,
  html_url: "https://github.com/godaddy/better_spree_paypal_express",
};

describe("RepoDetail Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockRepo });
  });

  test("renders repo details", async () => {
    render(
      <MemoryRouter initialEntries={["/repo/1"]}>
        <Route path="/repo/:id" component={RepoDetail} />
      </MemoryRouter>
    );

    expect(
      await screen.findByText(/better_spree_paypal_express/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/language/i)).toHaveTextContent("Ruby");
    expect(await screen.findByRole("link")).toHaveAttribute(
      "href",
      mockRepo.html_url
    );
  });

  test("handles error fetching repo details", async () => {
    axios.get.mockRejectedValue(new Error("Error fetching repository details"));
    render(
      <MemoryRouter initialEntries={["/repo/1"]}>
        <Route path="/repo/:id" component={RepoDetail} />
      </MemoryRouter>
    );

    expect(
      await screen.findByText(/error fetching repository details/i)
    ).toBeInTheDocument();
  });
});
