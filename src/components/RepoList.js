import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/orgs/godaddy/repos"
        );
        setRepos(response.data);
      } catch (err) {
        setError("Error fetching repositories");
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  if (loading) return <div className="spinner"></div>;
  if (error) return <div className="not-found">{error}</div>;

  return (
    <div className="repo-list">
      {repos.map((repo) => (
        <div className="repo-card" key={repo.id}>
          <h2 className="repo-title">
            <Link to={`/repo/${repo.id}`} style={{ textDecoration: "none" }}>
              {repo.name}
            </Link>
          </h2>
          <p className="repo-description">
            {repo.description || "No description available"}
          </p>
          <div className="repo-details">
            <div>
              <span className="detail-title">Language:</span>{" "}
              {repo.language || "N/A"}
            </div>
            <div>
              <span className="detail-title">Forks:</span> {repo.forks_count}
            </div>
            <div>
              <span className="detail-title">Open Issues:</span>{" "}
              {repo.open_issues_count}
            </div>
            <div>
              <span className="detail-title">Watchers:</span>{" "}
              {repo.watchers_count}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepoList;
