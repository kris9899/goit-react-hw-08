import css from './ContactList.module.css';
import Contact from '../Contact/Contact';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilteredContacts,
  selectIsLoading,
} from '../../redux/contacts/selectors';
import { useEffect, useState } from 'react';
import { fetchContacts } from '../../redux/contacts/operations';
import Modal from '../Modal/Modal';
import { deleteContact } from '../../redux/contacts/operations';

export default function ContactList() {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState({ name: '', id: '' });

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteClick = contact => {
    setContactToDelete(contact);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (contactToDelete) {
      dispatch(deleteContact(contactToDelete.id));
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isLoading ? (
        <p className={css.contactListInfo}>Loading contacts...</p>
      ) : (
        <ul className={css.list}>
          {visibleContacts.length > 0 ? (
            visibleContacts.map(({ id, name, number }) => (
              <li key={id}>
                <Contact
                  id={id}
                  name={name}
                  number={number}
                  onDeleteClick={() => handleDeleteClick({ name, id })}
                />
              </li>
            ))
          ) : (
            <p className={css.contactListInfo}>No contacts found.</p>
          )}
        </ul>
      )}

      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          contact={contactToDelete}
        />
      )}
    </div>
  );
}
