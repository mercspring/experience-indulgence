import React from "react";
import Home from "./pages/Home"
import Search from "./pages/search"
import ChefSignup from "./pages/chef-signup"
import ChefProfile from "./pages/chef-profile"
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// function App() {
//   return (
//     <div className="App">
//      <ChefSignup/> 
//     </div>
//   );
// }
const theme = createMuiTheme ({
  palette: {
    primary: {
      light: '#62727b',
      main: '#37474f',
      dark: '#102027',
      contrastText: '#fafafa',
    },
    secondary: {
      light: '#4f5b62',
      main: '#263238',
      dark: '#000a12',
      contrastText: '#dda300',
    },
    contrastThreshold: 3,
    tonalOffset: 2,
  },
});



function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/signup" component={ChefSignup} />
            <Route exact path="/profile/:id" component={ChefProfile} />
            {/* <Route exact path="/posts/:id" component={Detail} />
            <Route component={NoMatch} /> */}
          </Switch>
      </div>
    </Router>
    </ThemeProvider>
  );
}




export default App;
