// React
import React from "react";
// Styles
import Container from '@material-ui/core/Container';
// Componants
import Header from "../../components/Header";
import Feature from "../../components/Feature";
import trupp from  "../../assets/trupp.jpg"
import spoons from  "../../assets/spoons.jpg"
import timeout from  "../../assets/timeout.jpg"


const content =  [
	{
		title: "Feature 1",
		description: "Something nice",
		imageUrl: trupp,
		id: 1
	},
	{
		title: "Feature 2",
		description: "Multiple nice things",
		imageUrl: spoons,
		id: 2
	},
	{
		title: "Feature 3",
		description: "The best things",
		imageUrl: timeout,
		id: 3
	}
]

function Home() {
	return (
		<div>
			<Header />
			<Container maxWidth="lg">
				{content.map((content) => (
					<Feature key={content.id} props={content} />
				))}
			</Container>
		</div>
	);
}

export default Home;