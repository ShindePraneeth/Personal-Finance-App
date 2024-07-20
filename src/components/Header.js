import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

const HeaderContainer = styled.header`
  background-color: #f0f0f0;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  margin: 0;
`;

const Nav = styled.nav`
  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    client.resetStore();
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <Logo>Personal Finance Manager</Logo>
      <Nav>
        <ul>
          {isLoggedIn ? (
            <>
              <li><NavLink to="/">Dashboard</NavLink></li>
              <li><NavLink to="/add-transaction">Add Transaction</NavLink></li>
              <li><LogoutButton onClick={handleLogout}>Logout</LogoutButton></li>
            </>
          ) : (
            <>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/register">Register</NavLink></li>
            </>
          )}
        </ul>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;