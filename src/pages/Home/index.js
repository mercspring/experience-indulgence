// React
import React from "react";
// Styles
import Container from "@material-ui/core/Container";
// Componants
import Header from "../../components/Header";
import Feature from "../../components/Feature";
import trupp from "../../assets/trupp.jpg";
import spoons from "../../assets/spoons.jpg";
import timeout from "../../assets/timeout.jpg";

const content = [
  {
    title: "Our Values",
    description: "As part of our mission to make America’s new food landscape culture safe, diverse, and sustainable for everyone, Indulge is dedicated to cultivating excellence, and producing extrodinary meals in the comfort of our client's home. Guided by the values of respect, transparency, diversity, sustainability, and equality. We believe that in order to achieve our mission, it is expected that everyone who works in and with our organization shares similar values and operates with integrity.",
    imageUrl: trupp,
  },
  {
		imageUrl: spoons,
		title: "Ingredients",
		description: "Nothing gives more flavor to your food than fresh ingredients. As time goes on, preserved food loses its taste, but ingredients that are fresh with no preservatives provide the authentic taste that every single ingredient has.  'Cooking is an art and patience a virtue. Careful shopping, fresh ingredients and an unhurried approach are nearly all you need. There is one more thing - love. Love for food and love for those you invite to your table. With a combination of these things you can be an artist.' -Keith Floyd",
  
  },
  {
    title: "Experience",
    description: "The best things in life are shared. Our goal is to create a perfect dining experience that will be remembered through out your lifetime.  Our chefs are filled with not only passion for food, but they strive everyday to give each of their clients something unique and exciting.  Blending cutting edge flavor combinations as you watch each course being creating in your own kitchen in front of your own eyes, you get to explore the joys of a fine dining experience where most of your memories are created. ",
    imageUrl: timeout,
  },
];

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
