import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage } from 'formik';
import styles from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';

const ContactForm = () => {
  const dispatch = useDispatch();

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    number: Yup.string()
      .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Invalid phone number')
      .required('Required'),
  });

  const initialValues = {
    name: '',
    number: '',
  };

  const handleSubmit = (values, options) => {
    const newContact = {
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
            type="tel"
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
