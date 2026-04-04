'use client';
import React from "react";

const datasets = [
	{
		name: "U.S. Accidents Dataset",
		description:
			"This dataset provides approximately 7.7 million records detailing traffic accidents across 49 U.S. states, collected from multiple API sources such as the Department of Transportation, law enforcement agencies, and traffic sensors. The data spans from February 2016 to March 2023 and includes 45 columns with information on time, location, and accident severity.",
		link: "https://www.kaggle.com/datasets/sobhanmoosavi/us-accidents",
	},
	{
		name: "SWITRS California Highway Patrol Data",
		description:
			"Contains detailed traffic incident records for California, providing variables such as population density and environmental factors, thus allowing for comprehensive contextual analysis.",
		link: "https://opendata.sandag.org/Transportation/SWITRS-Collisions-Records-2014-2023-/uzct-sb5t/about_data",
	},
];

export default function Methods() {
	return (
		<div style={{ minHeight: "100vh", paddingTop: "120px", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
			<h1 style={{ fontSize: "36px", marginBottom: "40px", color: "var(--accent-cyan)", textShadow: "0 0 20px rgba(6, 182, 212, 0.4)" }}>Datasets</h1>
			
      <div style={{ display: "flex", flexDirection: "column", gap: "30px", width: "80%", maxWidth: "900px" }}>
				{datasets.map((dataset, index) => (
					<div 
            key={index}
            className="glass-panel" 
            style={{ 
              padding: "30px", 
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "default"
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(6, 182, 212, 0.2)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)'; }}
          >
						<h2 style={{ fontSize: "24px", color: "white", marginBottom: "16px" }}>{dataset.name}</h2>
						<p style={{ color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
              {dataset.description}
            </p>
						<a 
              href={dataset.link} 
              target="_blank" 
              rel="noreferrer"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                background: "rgba(59, 130, 246, 0.2)",
                color: "var(--accent-blue)",
                border: "1px solid rgba(59, 130, 246, 0.5)",
                borderRadius: "8px",
                fontWeight: 600,
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'; }}
            >
              View Dataset →
            </a>
					</div>
				))}
			</div>
		</div>
	);
}
