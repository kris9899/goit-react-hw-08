import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';
export const AuthNav = () => {
  return (
    <div>
      <NavLink to="/register" className={css.link}>
        Register
      </NavLink>
      <NavLink to="/login" className={css.link}>
        Log in
      </NavLink>
    </div>
  );
};
