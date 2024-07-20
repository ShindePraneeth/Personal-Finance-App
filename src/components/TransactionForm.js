import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components';

const ADD_TRANSACTION_MUTATION = gql`
  mutation AddTransaction($description: String!, $category: String!, $amount: Float!, $date: String!) {
    addTransaction(description: $description, category: $category, amount: $amount, date: $date) {
      id
      description
      category
      amount
      date
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
  background-color: #17a2b8;
  color: white;
  border: none;
  cursor: pointer;
`;

const TransactionForm = () => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const [addTransaction, { loading, error }] = useMutation(ADD_TRANSACTION_MUTATION, {
    onCompleted: () => {
      // Clear form or update UI
      setDescription('');
      setCategory('');
      setAmount('');
      setDate('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({ variables: { description, category, amount: parseFloat(amount), date } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button type="submit">Add Transaction</Button>
      </form>
    </FormContainer>
  );
};

export default TransactionForm;