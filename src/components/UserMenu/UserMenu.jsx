import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logoutThunk } from '../../redux/auth/operations';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={css.wrapper}>
      <p className={css.username}> Welcome, {user.name}</p>
      <button
        type="button"
        className={css.userBtn}
        onClick={() => dispatch(logoutThunk())}
      >
        Logout
      </button>
    </div>
  );
};
