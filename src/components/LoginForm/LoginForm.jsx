import { Formik, Form, Field } from 'formik';
import css from './LoginForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../redux/auth/operations';

const LoginForm = () => {
  const initialValues = {
    password: '',
    email: '',
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values, options) => {
    console.log(values);
    dispatch(loginThunk(values))
      .unwrap()
      .then(() => navigate('/contacts'));
    options.resetForm();
  };
  return (
    <div className={css.loginWrap}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.loginForm}>
          <h3 className={css.loginTitle}> Login</h3>
          <label className={css.loginLabel}>
            <span className={css.loginSpan}>Email:</span>
            <Field
              name="email"
              autoComplete="email"
              className={css.loginField}
            />
          </label>
          <label className={css.loginLabel}>
            <span className={css.loginSpan}>Password:</span>
            <Field
              name="password"
              type="password"
              autoComplete="current-password"
              className={css.loginField}
            />
          </label>
          <button type="submit" className={css.loginBtn}>
            Login
          </button>
          <p className={css.loginText}>
            You do not have an account yet?
            <Link to="/register" className={css.loginLink}>
              Lets's create one!
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
};
export default LoginForm;
