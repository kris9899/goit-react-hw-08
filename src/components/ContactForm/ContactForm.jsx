import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage } from 'formik';
import styles from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addContact } from '../../redux/contactsSlice';

const ContactForm = () => {
  const dispatch = useDispatch();

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    number: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  const initialValues = {
    name: '',
    number: '',
  };

  const handleSubmit = (values, options) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    dispatch(addContact(newContact));
    options.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={formSchema}
    >
      <Form className={styles.formWrap}>
        <div className={styles.fieldWrap}>
          <label htmlFor="name" className={styles.fieldLabel}>
            Name
          </label>
          <Field
            type="text"
            name="name"
            id="name"
            className={styles.field}
            autoComplete="off"
          />
          <ErrorMessage
            name="name"
            component="p"
            className={styles.fieldError}
          />
        </div>

        <div className={styles.fieldWrap}>
          <label htmlFor="number" className={styles.fieldLabel}>
            Number
          </label>
          <Field
            type="text"
            name="number"
            id="number"
            className={styles.field}
            autoComplete="off"
          />
          <ErrorMessage
            name="number"
            component="p"
            className={styles.fieldError}
          />
        </div>

        <button type="submit" className={styles.formBtn}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
