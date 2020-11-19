// React
import React, { useState, useEffect } from "react";
// Styles
import Container from '@material-ui/core/Container';
// Componants
import Header from "../../components/Header";
import Feature from "../../components/Feature";
import hero from  "../../assets/hero.png"
import trupp from  "../../assets/trupp.jpg"
import spoons from  "../../assets/spoons.jpg"
import timeout from  "../../assets/timeout.jpg"


const content =  [
	{
		title: "Feature 1",
		description: "Something nice",
		imageUrl: trupp,
	},
	{
		title: "Feature 2",
		description: "Multiple nice things",
		imageUrl: spoons,
	},
	{
		title: "Feature 3",
		description: "The best things",
		imageUrl: timeout,
	}
]

function Home() {
	return (
		<div>
			<Header />
			<Container maxWidth="lg">
				{content.map((content) => (
					<Feature props={content} />
				))}
			</Container>
		</div>
	);
}

export default Home;