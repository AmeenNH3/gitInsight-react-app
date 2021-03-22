import React from "react";
import styled from "styled-components";
import mainLogo from "../images/logo-main.png";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    isLoading,
  } = useAuth0();
  const isUser = isAuthenticated && user;

  return (
    <>
      <Wrapper>
        {isUser && user.picture && (
          <img src={user.picture} alt={user.name}></img>
        )}
        {isUser && user.name && (
          <h4>
            Welcome, <strong>{user.name.toUpperCase()}</strong>
          </h4>
        )}
        {isUser ? (
          <button
            onClick={() => {
              logout({ returnTo: window.location.origin });
            }}
            className="btn"
          >
            logout
          </button>
        ) : (
          <button onClick={loginWithRedirect}>login</button>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.nav`
  padding: 1rem;
  margin-bottom: 3rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;

  justify-content: end;
  align-items: center;

  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    background: var(--clr-primary-5);
    color: var(--clr-primary-10);
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);

    cursor: pointer;
  }
  .item-1 {
    grid-area: a;
  }
  .item-2 {
    grid-area: b;
  }
  .item-3 {
    grid-area: c;
  }
  .item-4 {
    grid-area: d;
  }
`;

export default Navbar;
