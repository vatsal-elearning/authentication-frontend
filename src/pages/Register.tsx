import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const Register = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center mt-10">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: 'user',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().min(3, 'Too Short!').required('Required'),
          lastName: Yup.string().min(3, 'Too Short!').required('Required'),
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string()
            .min(6, 'Minimum 6 characters')
            .required('Required'),
          role: Yup.string()
            .oneOf(['user', 'admin'], 'Invalid role')
            .required('Required'),
        })}
        onSubmit={async (values) => {
          setIsSubmitting(true);
          try {
            const response = await axios.post(
              `${API_URL}/auth/register`,
              values,
            );
            toast.success(
              response.data?.message || 'User registered successfully.',
            );
            navigate('/login');
          } catch (error: any) {
            toast.error(error?.message || 'Something went wrong!');
            console.error('Registration Error:', error.response.data);
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        <Form className="p-6 bg-white shadow-md rounded w-96">
          <h2 className="text-xl font-semibold mb-4">Register</h2>

          <label>First Name</label>
          <Field
            name="firstName"
            type="text"
            className="border p-2 w-full rounded"
          />
          <ErrorMessage
            name="firstName"
            className="text-red-500 text-sm"
            component="div"
          />

          <label>Last Name</label>
          <Field
            name="lastName"
            type="text"
            className="border p-2 w-full rounded"
          />
          <ErrorMessage
            name="lastName"
            className="text-red-500 text-sm"
            component="div"
          />

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

          <label>Role</label>
          <Field as="select" name="role" className="border p-2 w-full rounded">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Field>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded w-full"
            disabled={submitting}
          >
            {submitting ? 'Please wait...' : 'Register'}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
