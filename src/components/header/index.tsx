import { FunctionalComponent, h } from 'preact';
import { route } from 'preact-router';
import { useEffect } from 'preact/hooks';

const Header: FunctionalComponent = () => {
    useEffect(() => {
        route('/');
    });

    return (
        <header class="header">
            <h1>Mustard Studio</h1>
        </header>
    );
};

export default Header;
