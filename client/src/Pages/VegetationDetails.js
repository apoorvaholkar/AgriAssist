import React, { useState, useEffect } from "react";
import "./VegetationDetails.css";

const VegetationDetails = () => {
  const [graphUrl, setGraphUrl] = useState(null);
  const [analysisReport, setAnalysisReport] = useState(null);
  const [error, setError] = useState(null);

  // Fetch vegetation graph data from the backend
  useEffect(() => {
    const fetchVegetationGraph = async () => {
      try {
        const response = await fetch("http://localhost:5000/getveg", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch vegetation graph.");
        }

        const data = await response.json();
        setGraphUrl(data.graph_url);
      } catch (err) {
        console.error("Error fetching vegetation graph:", err);
        setError("Unable to load vegetation graph. Please try again later.");
      }
    };

    fetchVegetationGraph();
  }, []);

  // Fetch analysis report from the public folder
  useEffect(() => {
    const fetchAnalysisReport = async () => {
      try {
        const response = await fetch("/output.json");

        if (!response.ok) {
          throw new Error("Failed to fetch analysis report.");
        }

        const data = await response.json();
        setAnalysisReport(data.analysisReport);
      } catch (err) {
        console.error("Error fetching analysis report:", err);
        setError("Unable to load analysis report. Please try again later.");
      }
    };

    fetchAnalysisReport();
  }, []);

  return (
    <div className="vegetation-details">
      <h1 className="text-2xl font-semibold text-center my-4">Vegetation Details</h1>

      {/* NDVI Graph Section */}
      {graphUrl ? (
        <div className="text-center mt-8">
          <h3 className="text-lg font-semibold mb-4">Vegetation Graph:</h3>
          <img
            src={`http://localhost:5000${graphUrl}`}
            alt="Vegetation Graph"
            className="border rounded-md shadow-md mx-auto w-4/5 md:w-3/5"
          />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 mt-8">{error}</div>
      ) : (
        <div className="text-center mt-8 text-gray-600">Loading Vegetation Graph...</div>
      )}

      {/* Analysis Report Section */}
      {analysisReport ? (
        <div className="mt-12 bg-white border rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Analysis Report</h2>
          <h3 className="text-lg mb-2">
            Recent Vegetation Cycle Detected:{" "}
            {analysisReport[0] ? (
              <span className="text-green-600 font-bold">Yes</span>
            ) : (
              <span className="text-red-600 font-bold">No</span>
            )}
          </h3>
          <h3 className="text-lg mb-2">Latest NDVI Data:</h3>
          <pre className="bg-gray-100 rounded-md p-4 text-sm text-gray-700 overflow-x-auto">
            {JSON.stringify(analysisReport[1], null, 2)}
          </pre>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 mt-8">{error}</div>
      ) : (
        <div className="text-center mt-8 text-gray-600">Loading Analysis Report...</div>
      )}
    </div>
  );
};

export default VegetationDetails;
