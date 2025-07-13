import './Header.css';
import { Link, useLocation } from 'react-router';

const Header = () => {
  const location = useLocation().pathname;

  return (
    <header className="header">
      <Link className={'link-btn ' + (location === '/' && 'selected')} to={'/'}>Все
        пёсики</Link>
      <Link className={'link-btn ' + (location === '/favorite' && 'selected')}
            to={'/favorite'}>Любимые пёсики</Link>
    </header>
  );
};

export default Header;