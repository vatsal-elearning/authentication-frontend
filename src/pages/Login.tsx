import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { toast } from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex justify-center mt-10">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string().min(8).required('Required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const resultAction = await dispatch(login(values));

            if (login.fulfilled.match(resultAction)) {
              navigate('/dashboard');
            }
          } catch (error) {
            toast.error('An unexpected error occurred!');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="p-6 bg-white shadow-md rounded w-96">
          <h2 className="text-xl font-semibold mb-4">Login</h2>

          <label>Email</label>
          <Field
            name="email"
            type="email"
            className="border p-2 w-full rounded"
          />
          <ErrorMessage
            name="email"
            className="text-red-500 text-sm"
            component="div"
          />

          <label>Password</label>
          <Field
            name="password"
            type="password"
            className="border p-2 w-full rounded"
          />
          <ErrorMessage
            name="password"
            className="text-red-500 text-sm"
            component="div"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
