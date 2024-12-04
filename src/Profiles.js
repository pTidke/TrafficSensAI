import prajwalImg from "./prajwal.jpg";
import pranjalImg from "./pranjal.jpg";
import NikhithImg from "./nikhith.jpg";

import React, { useState } from "react";
import "./Profiles.css";

const teamMembers = [
	{
		name: "Prajwal Tidke",
		role: "Team Member",
		description:
			"Prajwal Narendra Tidke is a skilled Cloud Data Engineer with over four years of experience in designing and optimizing data solutions in finance and manufacturing. Currently pursuing a Master’s in Big Data Analytics at San Diego State University, he has expertise in cloud architecture, scalable ETL pipelines, and automation. His technical skills include Python, SQL, SAP BODS, Databricks, and AWS, and he is dedicated to driving data-driven decisions and operational efficiency. In his previous roles, Prajwal led initiatives that significantly reduced processing times and manual workload, achieving substantial operational improvements for clients like Carrier Global and the Canada Pension Plan Investment Board. He has also spearheaded cost-saving data migration projects to cloud platforms, demonstrating his effectiveness in transforming complex data environments. Prajwal is passionate about leveraging data science and cloud technology to create impactful solutions that advance both business efficiency and public safety.",
		image: prajwalImg,
	},
	{
		name: "Palash Suryavanshi",
		role: "Team Member",
		description:
			"Palash Vijaykumar Suryawanshi is a Graduate Student in the Big Data Analytics program at San Diego State University, holding a Bachelor of Technology in Computer Engineering. With expertise in data analytics, visualization, full-stack development, machine learning, and automation, he demonstrates advanced skills in programming languages like Python, R, and Java, as well as frameworks such as Angular, Flask, Django, and MySQL. Proficient in analysis and visualization tools like Tableau, ArcGIS, QGIS, Power BI, and Gephi, he brings a well-rounded and impactful skill set to the field. Notable accomplishments include developing a flight booking system using AWS Code Whisperer that reduced code generation time by 40% and boosted development speed by 25% through optimized AI-assisted prompts. He also created a hybrid recommendation blogging platform with real-time chat, utilizing NLP and machine learning for collaborative editing and personalized recommendations. Additionally, he built a sentiment analysis tool capable of processing over 100,000 tweets, leveraging NLP and machine learning to provide valuable sentiment insights for marketing strategies. Passionate about community involvement, he frequently participates in tech events, further enriching his contributions to the field.",
		image: "path/to/alice.jpg",
	},
	{
		name: "Pranjal Patel",
		role: "Team Member",
		description:
			"Pranjal Patel is currently pursuing a Master’s in Big Data Analytics at San Diego State University, with an anticipated graduation in Spring 2026. She holds a Bachelor’s degree in Information Systems and Business Analytics from California State University, Northridge, where she graduated with Honors. Pranjal’s skill set includes predictive modeling, data analysis, and database management, with hands-on experience in Python, R, and SQL. She has worked on modeling projects ranging from social media influence on price prediction, focusing on translating complex datasets into actionable insights that support strategic decision-making.",
		image: pranjalImg,
	},
	{
		name: "Nikhith Reddy",
		role: "Team Member",
		description:
			"Nikhith Reddy is a Graduate Student in the Big Data Analytics program at San Diego State University, holding a Bachelor of Technology in Computer Engineering. With expertise in data analytics, visualization, full-stack development, machine learning, and automation, he demonstrates advanced skills in programming languages like Python, R, and Java, as well as frameworks such as Angular, Flask, Django, and MySQL. Proficient in analysis and visualization tools like Tableau, ArcGIS, QGIS, Power BI, and Gephi, he brings a well-rounded and impactful skill set to the field. Notable accomplishments include developing a flight booking system using AWS Code Whisperer that reduced code generation time by 40% and boosted development speed by 25% through optimized AI-assisted prompts. He also created a hybrid recommendation blogging platform with real-time chat, utilizing NLP and machine learning for collaborative editing and personalized recommendations. Additionally, he built a sentiment analysis tool capable of processing over 100,000 tweets, leveraging NLP and machine learning to provide valuable sentiment insights for marketing strategies. Passionate about community involvement, he frequently participates in tech events, further enriching his contributions to the field.",
		image: NikhithImg,
	},
];

const Profiles = () => {
	const [activeIndex, setActiveIndex] = useState(null);

	const toggleDescription = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<div className='profiles-container'>
			<h1>Team Profiles</h1>
			<div className='profiles-grid'>
				{teamMembers.map((member, index) => (
					<div className='profile-card' key={index}>
						<img
							src={member.image}
							alt={`${member.name}`}
							className='profile-image'
						/>
						<h2>{member.name}</h2>
						<h3>{member.role}</h3>
						<button
							className='toggle-btn'
							onClick={() => toggleDescription(index)}
						>
							{activeIndex === index
								? "Hide Details"
								: "View Details"}
						</button>
						{activeIndex === index && (
							<p className='description'>{member.description}</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Profiles;
