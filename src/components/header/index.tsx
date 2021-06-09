import { FunctionalComponent, h } from 'preact';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';
import { useEffect } from 'preact/hooks';

const Header: FunctionalComponent = () => {
    useEffect(() => {
        route('/');
    });

    return (
        <header class="header">
            <h1>Mustard Studio</h1>
            <nav>
                <Link activeClassName="active" href="/">
                        Home
                </Link>
                <Link activeClassName="active" href="/profile">
                        Me
                </Link>
                <Link activeClassName="active" href="/profile/john">
                        John
                </Link>
            </nav>
        </header>
    );
};

export default Header;
