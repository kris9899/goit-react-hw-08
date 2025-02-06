import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/auth/operations';
import * as Yup from 'yup';
import css from './RegistartionForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function RegistrationForm() {
  const initialValues = {
    password: '',
    email: '',
    name: '',
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, options) => {
    console.log(values);
    dispatch(registerThunk(values))
      .unwrap()
      .then(() => navigate('/'));
    options.resetForm();
  };
  return (
    <div className={css.registerWrap}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.registerForm}>
          <h3 className={css.registerTitle}> Register</h3>
          <label className={css.registerLabel}>
            <span className={css.registerSpan}>Name:</span>
            <Field
              name="name"
              autoComplete="name"
              className={css.registerField}
            />
          </label>
          <label className={css.registerLabel}>
            <span className={css.registerSpan}>Email:</span>
            <Field
              name="email"
              autoComplete="email"
              className={css.registerField}
            />
          </label>
          <label className={css.registerLabel}>
            <span className={css.registerSpan}>Password:</span>
            <Field
              name="password"
              type="password"
              autoComplete="new-password"
              className={css.registerField}
            />
          </label>
          <button type="submit" className={css.registerBtn}>
            Register
          </button>
          <p className={css.registerText}>
            You already have account?
            <Link to="/login" className={css.registerLink}>
              Login!
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
}
