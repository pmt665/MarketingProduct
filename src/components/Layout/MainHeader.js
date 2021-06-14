import { NavLink } from 'react-router-dom';
import classes from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to='/add-offer'>AddOffer</NavLink>
          </li>
          <li>
            <NavLink  activeClassName={classes.active}to='/offers'>ViewOffers</NavLink>
          </li>
          <li>
            <NavLink  activeClassName={classes.active}to='/advertisements'>ViewAdvertisements</NavLink>
          </li>
          <li className={classes.paddingLeft}>
            <NavLink activeClassName={classes.active}to='/add-advertisement'>AddAdvertisement</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;