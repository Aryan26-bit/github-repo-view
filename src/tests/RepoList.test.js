import React from "react";
import { render, screen } from "@testing-library/react";
import RepoList from "../components/RepoList";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");
import axios from "axios";

const mockRepos = [
  {
    id: 1,
    name: "better_spree_paypal_express",
    description: "A better Spree PayPal Express Extension. Currently in beta.",
    language: "Ruby",
    forks_count: 4,
    open_issues_count: 0,
    watchers_count: 2,
    html_url: "https://github.com/godaddy/better_spree_paypal_express",
  },
];

describe("RepoList Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockRepos });
  });

  test("renders repo list with given repos", async () => {
    render(
      <Router>
        <RepoList />
      </Router>
    );

    const titleElement = await screen.findByText(
      /better_spree_paypal_express/i
    );
    expect(titleElement).toBeInTheDocument();
  });

  test("handles error fetching repos", async () => {
    axios.get.mockRejectedValue(new Error("Error fetching repositories"));
    render(
      <Router>
        <RepoList />
      </Router>
    );

    const errorMessage = await screen.findByText(
      /error fetching repositories/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
