import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Memos from "./pages/Memos";
import CreateMemos from "./pages/createMemos";
import {grey} from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#d83143'
    },
	secondary:grey
  },

})

function App() {
	
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Memos />
            </Route>
            <Route path="/create-memo">
              <CreateMemos />
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
