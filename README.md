# React + Vite

There is an additional folder in this repositiory named 'tools'. This folder contains a file named CleanCSV.py, whose main function is to take the name of a csv file and the desired output csv file title name, and eliminate all course redundancies within the csv file. Currently, the registrar's office is adding the past history of approved transfer credits to the spreadsheet, not the individually unique courses. This file scans through the inputted csv file and ensures that all the courses in this list have no duplicates within universities. To run this function, the command line must contain 'CleanCSV.py', the name of the file you are choosing to input, and the desired name of your new file. 


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
