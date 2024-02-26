import { describe, it, expect, vi } from 'vitest';
import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InstitutionTable from '../InstitutionTable.jsx';
import { LevelContext } from '../LevelContext'; 

describe("Instiution Table", () => {
    it("renders", () =>{
        const institutionsName = ['School 1', 'School 2', 'Tech College', 'Centre College'];

        const courseDetails = {
            rewarding_institution: 'Institution Name',
            ri_courseTitle: 'RI Course Title',
            centre_courseTitle: 'Centre Course Title',
            centre_course_credits: '3',
            checked: false
        };
        const mockSearch = vi.fn();
        const searchName = 'School 1';

        render(
            <LevelContext.Provider value={{searchTerm: mockSearch}}>
                <InstitutionTable institutions={institutionsName} searchTerm={searchName}/>
            </LevelContext.Provider>
        )
        
        expect(screen.getByText('School Name')).toBeInTheDocument();
        

    })


})