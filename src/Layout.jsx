import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-align: center;
  font-family: "Roboto", sans-serif;
  color: #051c2c;
  text-decoration: none;
  font-weight: bold;
  background-color: ##f2f2f2;
  padding: 20px;
  margin: auto;
`;

export default function Layout() {
  return (
    <>
      <div>
        <nav>
          <ul class="navigation">
            {/* <li>
              <StyledLink to="/">Home</StyledLink>
            </li> */}
            <li>
              <StyledLink to="/">Transfer Credits</StyledLink>
            </li>
            <li>
              <StyledLink to="/APCredits">AP Credits</StyledLink>
            </li>
            <li>
              <StyledLink to="/StudyAbroad">Study Abroad</StyledLink>
            </li>
            {/* <li>
              <StyledLink to="/Forms">Forms</StyledLink>
  </li> */}
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
}
