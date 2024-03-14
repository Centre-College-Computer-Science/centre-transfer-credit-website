import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";

//regulates styling for the navigation bar 
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

//JS implementation of the navigation bar
export default function Layout() {
  return (
    <>
      <div>
        {/* html for the navigation bar, makes sure the default page is transfer credits */}
        <nav >
          <ul className="navigation">
            <li className="navRow">
              <StyledLink to="/">Transfer Credits</StyledLink>
            </li>
            <li className="navRow">
              <StyledLink to="/APCredits">AP Credits</StyledLink>
            </li>
            <li className="navRow">
              <StyledLink to="/StudyAbroad">Study Abroad</StyledLink>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
}
