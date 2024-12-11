import React from "react";

const datasets = [
	{
		name: "U.S. Accidents Dataset ",
		description:
			"This dataset provides approximately 7.7 million records detailing traffic accidents across 49 U.S. states, collected from multiple API sources such as the Department of Transportation, law enforcement agencies, and traffic sensors. The data spans from February 2016 to March 2023 and includes 45 columns with information on time, location, and accident severity.",
		image: "https://www.kaggle.com/datasets/sobhanmoosavi/us-accidents",
	},
	{
		name: "SWITRS California Highway Patrol Data",
		description:
			"Contains detailed traffic incident records for California, providing variables such as population density and environmental factors, thus allowing for comprehensive contextual analysis",
		image: "https://opendata.sandag.org/Transportation/Safety-Collisions-SWITRS-2023/7mrt-w2uu/data",
	},
];

const Methods = () => {
	return (
		<div className='profiles-container'>
			<h1>Datasets</h1>
			<div className='profiles-grid'>
				{datasets.map((member, index) => (
					<div className='profile-card' key={index}>
						<h2>{member.name}</h2>
						<p className='description'>{member.description}</p>
						<a href={member.image}>Click here to go to dataset</a>
					</div>
				))}
			</div>
		</div>
	);
};

export default Methods;
