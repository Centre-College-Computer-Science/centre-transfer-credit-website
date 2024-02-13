import { useState } from "react";
import "./styles.css";

function Forms() {
  //Things to store the value (From the video)
  const [institutionName, setInstitutionName] = useState("");
  const [syllabusFile, setSyllabusFile] = useState("");
  const [department, setDepartment] = useState("CSC");
  //This function is just for submit (Placing it here since its too much)
  const handleSubmit = (e) => {
    e.preventDefault(); //Prevent the page reloading Lmao
    console.log("Institution Name:", institutionName);
    console.log("Syllabus File:", syllabusFile);
    console.log("Department:", department);

    alert("Thank you for submitting!");

    email();

    //This reset the file and everything
    setInstitutionName("");
    setDepartment("CSC");
    e.target.reset();
  };

  const handleFile = (e) => {
    const holder = e.target.files[0];

    //This is checking for file is pdf I have to search online how to do this
    if (holder.type != "application/pdf") {
      alert("ENTER PDF PLEASE");

      e.target.value = "";
    } else {
      //I change this to Syllabus, I releaize I accident put Department
      setSyllabusFile(holder);
    }
  };

  return (
    <div class="App">
      <div class="infoBlock">
        <h1>Submit New Credit Form</h1>
        <h3>Don't see a class you have taken here?</h3>

        <div className="form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="finstitutionname">
              <b>Enter Name of Institution that Offers the Course:</b>
            </label>
            <br />
            <input
              type="text"
              id="finstitutionname"
              className="finstitutionname"
              name="finstitutionname"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
            />
            <br />
            <label htmlFor="fsyllabus">
              <b>Attach Syllabus in PDF form:</b>
            </label>
            <br />
            <input
              type="file"
              id="fsyllabus"
              className="fsyllabus"
              name="fsyllabus"
              onChange={handleFile}
            />
            <br />
            <label htmlFor="fdepartment">
              <b>Department Type: </b>
            </label>
            <select
              name="fdepartment"
              id="fdepartment"
              className="fdepartment"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="CSC">CSC</option>
              <option value="MUS">MUS</option>
              <option value="ARS">ARS</option>
              <option value="PHS">PHS</option>
              <option value="HIS">HIS</option>
              <option value="DLM">DLM</option>
              <option value="FLM">FLM</option>
              <option value="SOC">SOC</option>
            </select>
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Forms;
