import React, { useState } from "react";

const DatabaseQuery = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");   // clear any previous errors

    try {
      const response = await fetch("https://tomorrow2due-io.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Query execution failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Execute SQL Query</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter SQL Query"
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit">Run Query</button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <h3>Query Results:</h3>
      <pre>{result ? JSON.stringify(result, null, 2) : "No results yet."}</pre>
    </div>
  );
};

export default DatabaseQuery;
