import { describe, it, expect, vi } from 'vitest';
import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InstitutionTable from '../InstitutionTable.jsx';
import { LevelContext } from '../LevelContext'; 

const institutionsName = ['School 1', 'School 2', 'Tech College', 'Centre College'];

describe("Instiution Table", () => {
    it("Search with one", () =>{
   
        const searchName = 'School 1';

        render(
            <LevelContext.Provider value={{institutions: institutionsName, searchTerm: searchName}}>
                <InstitutionTable />
            </LevelContext.Provider>
        )
        
        expect(screen.getByText('School 1')).toBeInTheDocument();
        expect(screen.queryByText('School 2')).not.toBeInTheDocument();
        expect(screen.queryByText('Tech College')).not.toBeInTheDocument();
        expect(screen.queryByText('Centre College')).not.toBeInTheDocument();

    });
    it("Search with all", () =>{
   
        const searchName = '';

        render(
            <LevelContext.Provider value={{institutions: institutionsName, searchTerm: searchName}}>
                <InstitutionTable />
            </LevelContext.Provider>
        )
        
        expect(screen.getByText('School 1')).toBeInTheDocument();
        expect(screen.getByText('School 2')).toBeInTheDocument();
        expect(screen.getByText('Tech College')).toBeInTheDocument();
        expect(screen.getByText('Centre College')).toBeInTheDocument();
        
    });
    it("Search with a single letter", () =>{
   
        const searchName = 't';

        render(
            <LevelContext.Provider value={{institutions: institutionsName, searchTerm: searchName}}>
                <InstitutionTable />
            </LevelContext.Provider>
        )
        
        expect(screen.getByText('Tech College')).toBeInTheDocument();
        expect(screen.getByText('Centre College')).toBeInTheDocument();
        expect(screen.queryByText('School 2')).not.toBeInTheDocument();
        expect(screen.queryByText('School 1')).not.toBeInTheDocument();
        
    });


})