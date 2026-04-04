'use client';
import React from 'react';
import { 
  BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

const severityData = [
  { name: 'Property Damage Only', count: 99013 },
  { name: 'Complaint of Pain', count: 76229 },
  { name: 'Other Visible Injury', count: 45412 },
  { name: 'Severe Injury', count: 8933 },
  { name: 'Fatal', count: 2327 }
];

const dayOfWeekData = [
  { name: 'Mon', accidents: 32060 },
  { name: 'Tue', accidents: 34668 },
  { name: 'Wed', accidents: 35375 },
  { name: 'Thu', accidents: 35817 },
  { name: 'Fri', accidents: 39315 },
  { name: 'Sat', accidents: 33179 },
  { name: 'Sun', accidents: 29174 }
];

const collisionTypeData = [
  { name: 'Rear End', count: 80834 },
  { name: 'Hit Object', count: 43205 },
  { name: 'Sideswipe', count: 41458 },
  { name: 'Broadside', count: 38613 },
  { name: 'Head-On', count: 10381 },
  { name: 'Vehicle/Pedestrian', count: 9302 }
];

const COLORS = ['#0891b2', '#06b6d4', '#4ade80', '#fbbf24', '#f87171'];

export default function Methodology() {
	return (
		<div style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "60px", paddingLeft: "10%", paddingRight: "10%", display: "flex", flexDirection: "column", width: "100%" }}>
			
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
                <h1 style={{ fontSize: "36px", marginTop: "28px", marginBottom: "15px", color: "var(--accent-cyan)", textShadow: "0 0 20px rgba(6, 182, 212, 0.4)" }}>Technical Methodology</h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "18px", maxWidth: "800px", margin: "0 auto" }}>
                    An in-depth guide to our Data Processing Pipeline, Machine Learning Architecture, and Exploratory Data Analysis.
                </p>
            </div>
            
            {/* PIPELINE SECTION */}
            <h2 style={{ fontSize: "28px", color: "white", marginBottom: "30px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "10px" }}>The Data Processing Pipeline</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px", marginBottom: "80px" }}>
                <div className="glass-panel" style={{ padding: "40px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px" }}>
                        <div>
                            <div style={{ fontSize: "20px", color: "var(--accent-blue)", marginBottom: "15px", fontWeight: "bold" }}>Step 1: Data Ingestion & Cleaning</div>
                            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
                                We begin by ingesting approximately 250,000 raw collision records from the California Highway Patrol (CHP) SWITRS dataset. The data is filtered to focus exclusively on the San Diego metropolitan area, ensuring a relevant and localized analysis.
                            </p>
                        </div>
                        <div>
                            <div style={{ fontSize: "20px", color: "var(--accent-cyan)", marginBottom: "15px", fontWeight: "bold" }}>Step 2: Imputation & Null Handling</div>
                            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
                                To maintain a robust dataset, we use mean imputation for missing numerical values, such as temperature and visibility. Categorical features like weather conditions are tagged with an "Unknown" identifier when missing, preventing the introduction of bias.
                            </p>
                        </div>
                        <div>
                            <div style={{ fontSize: "20px", color: "var(--accent-green)", marginBottom: "15px", fontWeight: "bold" }}>Step 3: Feature Engineering</div>
                            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
                                Raw UTC timestamps are converted into a more analytical `Minute_of_Day` integer format. Boolean flags for infrastructure hazards (like bumps or crossing) are encoded, creating a vectorized input ready for our machine learning model.
                            </p>
                        </div>
                        <div>
                            <div style={{ fontSize: "20px", color: "var(--accent-yellow)", marginBottom: "15px", fontWeight: "bold" }}>Step 4: Spatial Indexing (DBSCAN)</div>
                            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
                                We utilize Density-Based Spatial Clustering of Applications with Noise (DBSCAN) over Haversine distances to algorithmically detect "Hotspots". This method allows us to find clusters of varying shapes and sizes, crucial for dynamic city infrastructures.
                            </p>
                        </div>
                        <div>
                            <div style={{ fontSize: "20px", color: "var(--accent-red)", marginBottom: "15px", fontWeight: "bold" }}>Step 5: Random Forest Classification</div>
                            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
                                Finally, our Random Forest Classifier is trained on 31 distinct input features. It predicts the severity of a potential collision using 100 decision trees, ensuring high accuracy and providing reliable severity bracket estimates.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ANALYSIS SECTION */}
            <h2 style={{ fontSize: "28px", color: "white", marginBottom: "30px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "10px" }}>Exploratory Data Analysis</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "40px", width: "100%" }}>
                
                {/* Visual 1: Bar Chart Weekday */}
                <div className="glass-panel" style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
                    <h3 style={{ color: "white", marginBottom: "20px", textAlign: "center", fontSize: "16px" }}>Accident Distribution (Weekday)</h3>
                    <div style={{ height: "300px", width: "100%" }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={dayOfWeekData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fontSize: 10}} />
                                <YAxis stroke="var(--text-secondary)" tick={{fontSize: 10}} />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                                <Bar dataKey="accidents" fill="var(--accent-blue)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Visual 2: Bar Chart Collision Type */}
                <div className="glass-panel" style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
                    <h3 style={{ color: "white", marginBottom: "20px", textAlign: "center", fontSize: "16px" }}>Collision Type Distribution</h3>
                    <div style={{ height: "300px", width: "100%" }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={collisionTypeData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fontSize: 8}} angle={-20} textAnchor="end" />
                                <YAxis stroke="var(--text-secondary)" tick={{fontSize: 10}} />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                                <Bar dataKey="count" fill="var(--accent-cyan)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Visual 3: Pie Chart Severity */}
                <div className="glass-panel" style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
                    <h3 style={{ color: "white", marginBottom: "20px", textAlign: "center", fontSize: "16px" }}>Severity Breakdown</h3>
                    <div style={{ height: "300px", width: "100%" }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={severityData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="count"
                                    stroke="none"
                                >
                                    {severityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} itemStyle={{ color: 'white' }} />
                                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
		</div>
	);
}
