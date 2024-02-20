import { useContext, useState } from "react";
import { LevelContext } from "./LevelContext";

export default function CourseRequestForm(props) {
    let context = useContext(LevelContext);
    const institution = context.currentInstitution;
    const [externalCourse, setExternalCourse] = useState("");
    const [syllabusFile, setSyllabusFile] = useState("");
    const [department, setDepartment] = useState("AAS");

    const handleSubmit = (e) => {
        // Prevent the page from being reset
        e.preventDefault();

        console.log("External course: ", externalCourse);
        console.log("Syllabus File: ", syllabusFile);
        console.log("Department: ", department);

        // Reset the forms fields
        setExternalCourse("");
        setDepartment("AAS");
        e.target.reset();
    }

    const handleFile = (e) => {
        const holder = e.target.files[0];
    
        // Ensure the uploaded file is a PDF
        if (holder.type != "application/pdf") {
          alert("Please enter a PDF");
    
          e.target.value = "";
        } else {
          setSyllabusFile(holder);
        }
      };    

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Enter name of course to transfer in:
                <input 
                    type = "text"
                    value = {externalCourse}
                    onChange = {(e) => setExternalCourse(e.target.value)}
                />
            </label>
            <label>
                Upload syllabus:
                <input 
                    type = "file"
                    onChange = {handleFile}
                />
            </label>
            <label>
                Choose department the course would belong under:
                <select 
                    value = {department}
                    onChange = {(e) => setDepartment(e.target.value)}
                >
                    <option value="AAS">AAS</option>
                    <option value="AES">AES</option>
                    <option value="AMS">AMS</option>
                    <option value="ANT">ANT</option>
                    <option value="ARB">ARB</option>
                    <option value="ASL">ASL</option>
                    <option value="ARH">ARH</option>
                    <option value="ARS">ARS</option>
                    <option value="ASN">ASN</option>
                    <option value="BIO">BIO</option>
                    <option value="BMB">BMB</option>
                    <option value="BNS">BNS</option>
                    <option value="BUS">BUS</option>
                    <option value="CHE">CHE</option>
                    <option value="CHN">CHN</option>
                    <option value="CLA">CLA</option>
                    <option value="CRW">CRW</option>
                    <option value="CSC">CSC</option>
                    <option value="DLM">DLM</option>
                    <option value="ECO">ECO</option>
                    <option value="EDU">EDU</option>
                    <option value="ENG">ENG</option>
                    <option value="ENS">ENS</option>
                    <option value="FLM">FLM</option>
                    <option value="FRE">FRE</option>
                    <option value="GER">GER</option>
                    <option value="GLC">GLC</option>
                    <option value="GNS">GNS</option>
                    <option value="GRK">GRK</option>
                    <option value="HIS">HIS</option>
                    <option value="HUM">HUM</option>
                    <option value="IST">IST</option>
                    <option value="JPN">JPN</option>
                    <option value="LAS">LAS</option>
                    <option value="LAT">LAT</option>
                    <option value="LIN">LIN</option>
                    <option value="MAT">MAT</option>
                    <option value="MUS">MUS</option>
                    <option value="NSC">NSC</option>
                    <option value="PHI">PHI</option>
                    <option value="PHY">PHY</option>
                    <option value="POL">POL</option>
                    <option value="PSY">PSY</option>
                    <option value="REL">REL</option>
                    <option value="SLJ">SLJ</option>
                    <option value="SOC">SOC</option>
                    <option value="SPA">SPA</option>
                    <option value="THR">THR</option>
                    <option value="WEL">WEL</option>
                </select>
            </label>
            <input type="submit" value="submit"/>
        </form>
    );
}