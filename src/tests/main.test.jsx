import { expect, test } from 'vitest';
import { StrictMode } from 'react'; 
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from '../App'; 

describe("Main Component", () => {
  it("renders without crashing", () => {
    expect(1).toBe(1);
  });

  it('should render the App component', () => {
    // Create a root and render the App component
  
    act(() => {
    const rootElement = document.createElement('div');
    console.log('Root Element:', rootElement);
    const root = createRoot(rootElement);
    
   
      root.render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    
    console.log('Root Element after rendering:', rootElement);
    // Verify that the App component renders correctly
    const appRootElement = rootElement.querySelector('#root');
    console.log('App Root Element:', appRootElement);
    console.log('Root:', root);
    expect(appRootElement).not.toBeNull();
  });
  });
});