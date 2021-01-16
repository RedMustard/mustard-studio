import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';

const Header: FunctionalComponent = () => (
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

export default Header;
