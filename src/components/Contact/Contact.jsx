import { useDispatch } from 'react-redux';
import css from './Contact.module.css';
import { FaUser, FaPhoneAlt } from 'react-icons/fa';
import { deleteContact } from '../../redux/contacts/operations';

export default function Contact({ id, name, number, onDeleteClick }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    onDeleteClick({ id, name, number });
  };

  return (
    <div className={css.mainWrapper}>
      <div className={css.contactWrapper}>
        <p className={css.contactInfo}>
          <FaUser className={css.contactIcon} />
          {name}
        </p>
        <p className={css.contactInfo}>
          <FaPhoneAlt className={css.contactIcon} />
          {number}
        </p>
      </div>
      <button
        className={css.contactButton}
        type="button"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}
