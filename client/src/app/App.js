import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Container } from "./styled.js";

import Landing from "./pages/Landing";
import Tweet from "./pages/Tweet";

function App() {
  return (
    <Container>
      <Router>
        <Route path="/" exact={true} component={Landing} />
        <Route path="/tweet" exact={true} component={Tweet} />
      </Router>
    </Container>
  );
}

export default App;
