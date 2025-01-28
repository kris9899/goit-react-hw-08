import css from './ContactList.module.css';
import Contact from '../Contact/Contact';
import { useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contactsSlice';
import { selectFilters } from '../../redux/filtersSlice';

export default function ContactList() {
  const contacts = useSelector(selectContacts);
  const filters = useSelector(selectFilters);

  const visibleContacts = contacts.filter(item =>
    item.name.trim().toLowerCase().includes(filters.trim().toLowerCase())
  );

  return (
    <ul className={css.list}>
      {visibleContacts.map(({ id, name, number }) => (
        <li key={id}>
          <Contact id={id} name={name} number={number} />
        </li>
      ))}
    </ul>
  );
}
