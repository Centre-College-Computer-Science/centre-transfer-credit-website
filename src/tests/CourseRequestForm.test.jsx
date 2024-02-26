import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseRequestForm from '../CourseRequestForm';
import { LevelContext } from '../LevelContext';

describe('CourseRequestForm', () => {
    //  check if the component renders without any errors
    // Check that the router renders this thingy :3
    it('renders without crashing', () => {
        // Render the component within its context provider, passing a mock value for the context
        render(
            <LevelContext.Provider value={{ currentInstitution: 'Test Institution' }}>
                <CourseRequestForm />
            </LevelContext.Provider>
        );

        // Assert that a specific part of the component is rendered as expected
        expect(screen.getByText(/Enter name of course to transfer in:/i)).toBeInTheDocument();
    });

    // Test case to verify that user input is handled correctly
    it('allows user to input course name, upload file, and select department', async () => {
        // Render the component as before
        const { getByLabelText, getByText } = render(
            <LevelContext.Provider value={{ currentInstitution: 'Test Institution' }}>
                <CourseRequestForm />
            </LevelContext.Provider>
        );

        // Simulate user typing in the course name input field
        fireEvent.change(getByLabelText(/Enter name of course to transfer in:/i), { target: { value: 'Introduction to Español' } });
        // Simulate user changing the department selection
        fireEvent.change(getByLabelText(/Choose department the course would belong under:/i), { target: { value: 'SPA' } });

        // Create a mock file to simulate user uploading a file
        const file = new File(['dummy content'], 'syllabus.pdf', { type: 'application/pdf' });
        const fileInput = getByLabelText(/Upload syllabus:/i);
        // Override the files property to simulate a file being selected
        Object.defineProperty(fileInput, 'files', { value: [file] });
        // Simulate file upload event
        fireEvent.change(fileInput);

        // Assert that the component state has been updated to reflect user actions
        expect(screen.getByLabelText(/Enter name of course to transfer in:/i).value).toBe('Introduction to Español');
        expect(screen.getByLabelText(/Choose department the course would belong under:/i).value).toBe('SPA');
        expect(fileInput.files[0]).toBe(file);
        expect(fileInput.files).toHaveLength(1);
    });

    // Test case to verify that the form resets its fields upon submission
    it('resets form fields upon submission', () => {
        // Render the component as before
        const { getByText, getByLabelText } = render(
            <LevelContext.Provider value={{ currentInstitution: 'Test Institution' }}>
                <CourseRequestForm />
            </LevelContext.Provider>
        );

        // Simulate filling out and submitting the form
        fireEvent.change(getByLabelText(/Enter name of course to transfer in:/i), { target: { value: 'Test Course' } });
        fireEvent.click(getByText(/Submit Request/i));

        // Assert that the input fields are reset to their initial state after form submission
        expect(getByLabelText(/Enter name of course to transfer in:/i).value).toBe('');
        expect(getByLabelText(/Choose department the course would belong under:/i).value).toBe('AAS'); // Checks for default value, I think that the default value should be spanish or CSC :3
    });
});
