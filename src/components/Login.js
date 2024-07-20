import React from 'react';
import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components';
import useForm from '../hooks/useForm';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

const FormContainer = styled.div`
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
`;

const validateLogin = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  return errors;
};
const Login = () => {
    const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
      onCompleted: ({ login }) => {
        localStorage.setItem('token', login.token);
        // Redirect to dashboard or update app state
        console.log('Login successful:', login);
      },
      onError: (error) => {
        console.error('Login error:', error);
        console.error('GraphQL Errors:', error.graphQLErrors);
        console.error('Network Error:', error.networkError);
      }
    });
  
    const { values, errors, handleChange, handleSubmit } = useForm(
      { email: '', password: '' },
      validateLogin
    );
  
    const onSubmit = () => {
      login({ 
        variables: { email: values.email, password: values.password },
        errorPolicy: 'all'
      });
    };
  
    if (loading) return <p>Loading...</p>;
  
    return (
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          <Button type="submit">Login</Button>
        </form>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </FormContainer>
    );
  };
  
  export default Login;