'use client';
import React from "react";
import Image from "next/image";

const teamMembers = [
	{
		name: "Prajwal Tidke",
		role: "Team Lead, Data Analysis, Machine Learning",
		image: "/prajwal.jpg",
	},
	{
		name: "Palash Suryawanshi",
		role: "Visualization and EDA",
		image: "/palash.jpeg",
	},
	{
		name: "Pranjal Patel",
		role: "Data Cleaning and Feature Engineering",
		image: "/pranjal.jpg",
	},
	{
		name: "Nikhith Reddy",
		role: "Model Validation and Optimization",
		image: "/nikhith.jpg",
	},
];

export default function Profiles() {
	return (
		<div style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "40px", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
			<h1 style={{ fontSize: "36px", marginBottom: "40px", color: "var(--accent-cyan)", textShadow: "0 0 20px rgba(6, 182, 212, 0.4)" }}>Team Profiles</h1>
			
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px", width: "90%", maxWidth: "1200px" }}>
				{teamMembers.map((member, index) => (
					<div 
            key={index} 
            className="glass-panel"
            style={{
              padding: "40px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(6, 182, 212, 0.2)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)'; }}
          >
						<div style={{ 
              width: "126px", 
              height: "126px", 
              borderRadius: "50%", 
              background: "linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))",
              padding: "3px",
              marginBottom: "20px",
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)"
            }}>
              <div style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "var(--bg-panel-solid)"
              }}>
                <img 
                  src={member.image} 
                  alt={`${member.name}'s profile`} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
						</div>
						<h2 style={{ fontSize: "22px", color: "white", marginBottom: "8px" }}>{member.name}</h2>
						<p style={{ color: "var(--accent-cyan)", fontWeight: 500 }}>{member.role}</p>
					</div>
				))}
			</div>
		</div>
	);
}
