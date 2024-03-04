import { describe, it, expect, vi } from 'vitest';
import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InstitutionSearch from '../InstitutionSearch.jsx';
import { LevelContext } from '../LevelContext'; 

describe('Institution Search testing', () => {
    it("render", () =>{
        //mock function
        const mockSearch = vi.fn();
        //The placeholder in search bar
        let nameHolder = "Search courses...";

    render(
        <LevelContext.Provider value={{setSearchTerm: mockSearch}}>
            <InstitutionSearch />
        </LevelContext.Provider>
    )
        //See if Enter College name is on the doc
        expect(screen.getByText('Enter college name:')).toBeInTheDocument();
        //See if the nameHolder is set as default in serach bar
        expect(screen.getByPlaceholderText(nameHolder)).toBeInTheDocument();
        //Use that nameholder
        const inputName = screen.getByPlaceholderText(nameHolder);
        //Retype it
        fireEvent.change(inputName, {target: {value: "Berry College"}});
        //See if the search has work
        expect(mockSearch).toHaveBeenCalledWith('Berry College');
    });

})