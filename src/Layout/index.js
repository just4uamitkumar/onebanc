
import { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Home from '../Screens/Home';

const Routing = () => {

    return (
        <Switch>
            <Suspense fallback={'...Loading'}>
                <Route exact path="/"> <Home /></Route>
            </Suspense>
        </Switch>
    );
};

function Layout() {
    return (
        <Router>
            <Header />
            <main>
                <Routing />
            </main>
            <Footer />
        </Router>
    );
}

export default Layout;
