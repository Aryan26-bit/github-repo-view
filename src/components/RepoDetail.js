import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RepoDetail = () => {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repositories/${id}`
        );
        setRepo(response.data);
      } catch (err) {
        setError("Error fetching repo details");
      } finally {
        setLoading(false);
      }
    };
    fetchRepo();
  }, [id]);

  if (loading) return <div className="spinner"></div>;
  if (error) return <div className="not-found">{error}</div>;

  return (
    <div className="repo-card" style={{ maxWidth: "600px", margin: "auto" }}>
      <h2 className="repo-title">{repo.name}</h2>
      <p className="repo-description">
        {repo.description || "No description"}
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
          <span className="detail-title">Watchers:</span> {repo.watchers_count}
        </div>
      </div>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="button"
      >
        View Repository
      </a>
    </div>
  );
};

export default RepoDetail;
