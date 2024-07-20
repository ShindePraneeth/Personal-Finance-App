import React from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import Card from '../components/UI/Card';

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    getTransactions {
      id
      description
      category
      amount
      date
    }
  }
`;

const DashboardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.large};
`;

const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.large};
`;

const SummaryCard = styled(Card)`
  flex: 1;
  margin: 0 ${props => props.theme.spacing.small};
  text-align: center;
`;

const TransactionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TransactionItem = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const Amount = styled.p`
  color: ${props => props.isExpense ? props.theme.colors.danger : props.theme.colors.success};
  font-weight: bold;
`;

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const transactions = data.getTransactions;

  const totalBalance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <DashboardContainer>
      <h2>Finance Dashboard</h2>
      <SummaryContainer>
        <SummaryCard>
          <h3>Balance</h3>
          <p>${totalBalance.toFixed(2)}</p>
        </SummaryCard>
        <SummaryCard>
          <h3>Income</h3>
          <p>${totalIncome.toFixed(2)}</p>
        </SummaryCard>
        <SummaryCard>
          <h3>Expenses</h3>
          <p>${totalExpenses.toFixed(2)}</p>
        </SummaryCard>
      </SummaryContainer>

      <h3>Recent Transactions</h3>
      <TransactionList>
        {transactions.map(transaction => (
          <TransactionItem key={transaction.id}>
            <div>
              <h4>{transaction.description}</h4>
              <p>{transaction.category}</p>
            </div>
            <div>
              <Amount isExpense={transaction.amount < 0}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </Amount>
              <p>{new Date(transaction.date).toLocaleDateString()}</p>
            </div>
          </TransactionItem>
        ))}
      </TransactionList>
    </DashboardContainer>
  );
};

export default Dashboard;