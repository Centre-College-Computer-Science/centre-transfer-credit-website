import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";

//regulates styling for the navigation bar 
const StyledLink = styled(Link)`
  text-align: center;
  color: #051c2c;
  text-decoration: none;
  font-weight: bold;
  background-color: ##f2f2f2;
  padding: 20px;
  margin: auto;
  width: 100%;
`;

//JS implementation of the navigation bar
export default function Layout() {
  return (
    <div className = "testing">
      <div className="navBarPadding">
        {/* html for the navigation bar, makes sure the default page is transfer credits */}
        <nav className="navigationInLine">
          <ul className="spaced_out positionInRow">
            <li className="nav--li">
              <StyledLink to="/">Transfer Credits</StyledLink>
            </li>
            <li className="nav--li">
              <StyledLink to="/APCredits">AP Credits</StyledLink>
            </li>
            <li className="nav--li">
              <StyledLink to="/StudyAbroad">Study Abroad</StyledLink>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
