import { FunctionalComponent, h } from 'preact';
import { Route, Router, RouterOnChangeArgs } from 'preact-router';

import Studio from '../routes/studio';
import NotFoundPage from '../routes/notfound';
import Header from './header';
import { StudioServiceStore } from '../lib/studioService/StudioServiceStore';

const App: FunctionalComponent = () => {
    // @ts-expect-error
    let currentUrl: string;
    const handleRoute = (e: RouterOnChangeArgs) => {
        currentUrl = e.url;
    };

    return (
        <StudioServiceStore>
            <div id="app">
                <Header />
                <Router onChange={handleRoute}>
                    <Route path="/" component={Studio} />
                    {/* <Route path="/profile/" component={Profile} user="me" /> */}
                    {/* <Route path="/profile/:user" component={Profile} /> */}
                    <NotFoundPage default />
                </Router>
            </div>
        </StudioServiceStore>
    );
};

export default App;
