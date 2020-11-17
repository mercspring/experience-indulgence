import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ChefCard from "../../components/chef-card"
import ChefImages from "../../components/chef-image-list"

export default function ChefProfile() {
  return (
    <Container maxWidth="lg" fixed>
      <Grid container xs={12}>
        <Grid item xs={3}>
          <ChefCard />
        </Grid>
        <Grid item xs={9}>
          <ChefImages />
        </Grid>
      </Grid>
    </Container>
  );
}