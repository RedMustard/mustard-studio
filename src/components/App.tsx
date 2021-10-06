import { Fragment, FunctionalComponent, h } from 'preact';
import { Route, Router, RouterOnChangeArgs } from 'preact-router';
import { useEffect } from 'preact/hooks';

import Studio from '../routes/studio';
import NotFoundPage from '../routes/notfound';
import Header from './header';
import { StudioServiceStore } from '../lib/studioService/StudioServiceStore';
import { setMidiAccess } from '../lib/inputDevices/midi/midi';
import { setKeyboardAccess } from '../lib/inputDevices/keyboard/keyboard';

const App: FunctionalComponent = () => {
    // @ts-expect-error
    let currentUrl: string;

    const handleRoute = (e: RouterOnChangeArgs) => {
        currentUrl = e.url;
    };

    useEffect(() => {
        setKeyboardAccess();
        setMidiAccess();
    }, []);

    return (
        <StudioServiceStore>
            <div id="app">
                <Fragment>
                    <Header />
                    <Router onChange={handleRoute}>
                        <Route path="/" component={Studio} />
                        <NotFoundPage default />
                    </Router>
                </Fragment>
            </div>
        </StudioServiceStore>
    );
};

export default App;
