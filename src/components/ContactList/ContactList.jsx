import css from './ContactList.module.css';
import Contact from '../Contact/Contact';
import { useSelector } from 'react-redux';

export default function ContactList() {
  const contacts = useSelector(state => state.contacts.items);
  const filters = useSelector(state => state.filters.name);

  const visibleContacts = contacts.filter(item =>
    item.name.trim().toLowerCase().includes(filters.trim().toLowerCase())
  );

  return (
    <ul className={css.list}>
      {visibleContacts.map(({ id, name, tel }) => (
        <li key={id}>
          <Contact id={id} name={name} tel={tel} />
        </li>
      ))}
    </ul>
  );
}
