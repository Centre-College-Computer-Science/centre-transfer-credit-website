import APCourseListing from "./APCourseListing.jsx";

export default function APCredits() {
  const APCourses = [
    { test: "American History", equivalency: "elective", credits: 3 },
    { test: "Art History", equivalency: "elective", credits: 3 },
    {
      test: "Art: Studio, drawing",
      equivalency: "elective; review of portfolio for ARS 110",
      credits: 3,
    },
    { test: "Biology", equivalency: "elective", credits: 4 },
    { test: "Chemistry", equivalency: "CHE 131", credits: 4 },
    {
      test: "Chinese Language & Culture",
      equivalency: "CHN 210, 220",
      credits: "6*",
    },
    { test: "Computer Science A", equivalency: "CSC 170", credits: 4 },
    {
      test: "Computer Science Principles",
      equivalency: "elective; may bypass CSC 170 with department approval",
      credits: 3,
    },
    {
      test: "Economics: micro/macro",
      equivalency:
        "elective; ECO 110 if 4 or 5 in one exam & 3 or higher in other exam",
      credits: 3,
    },
    {
      test: "English Literature and Composition",
      equivalency: "elective",
      credits: 3,
    },
    {
      test: "Environmental Science",
      equivalency: "elective for 4, ENS 210 for 5",
      credits: 3,
    },
    { test: "European History***", equivalency: "elective", credits: 3 },
    {
      test: "French Language & Culture",
      equivalency: "FRE 210, 220",
      credits: "6*",
    },
    {
      test: "German Language & Culture",
      equivalency: "GER 210, 220",
      credits: "6*",
    },
    {
      test: "Government/Politics: American",
      equivalency: "elective",
      credits: 3,
    },
    {
      test: "Government/Politics: Comparative",
      equivalency: "elective",
      credits: 3,
    },
    { test: "Latin", equivalency: "LAT 210, 220", credits: "6*" },
    { test: "Music Theory", equivalency: "MUS 110", credits: 3 },
    { test: "Calculus AB", equivalency: "MAT 165", credits: 3 },
    {
      test: "Calculus BC",
      equivalency: "MAT 170, 171 - placed in MAT 230**",
      credits: 6,
    },
    {
      test: "Physics 1 (no credit for Physics 2)",
      equivalency: "PHY 110",
      credits: 4,
    },
    {
      test: "Physics C-Mech (no credit for Physics C-E&M)",
      equivalency: "PHY 110",
      credits: 4,
    },
    { test: "European History***", equivalency: "elective", credits: 3 },
    { test: "Psychology", equivalency: "PSY 110", credits: 4 },
    {
      test: "Spanish Language & Culture",
      equivalency: "SPA 210, 220",
      credits: "6*",
    },
    { test: "Statistics", equivalency: "MAT 130", credits: 3 },
    { test: "World History***", equivalency: "elective", credits: 3 },
  ];

  return (
    <div className="App">
      <div>
        <br></br>

        <h2>Advanced Placement (AP) Credit Policy</h2>
        <p>
          Our approved credits for transfering AP credits is highly selective,
          but those automatically approved by the registrar's office is listed
          below. If a course is not approved, it will be marked accordingly.
        </p>
        <h3>Approved Advanced Placement Credits</h3>
        <p>
          Grades of 4 and 5 are awarded credit accordingly (and grades of 3 in
          foreign languages*).
        </p>
        <div class="scrollable_table">
          <table>
            <thead>
              <tr>
                <th>Test</th>
                <th>Centre Equivalency</th>
                <th>Centre Credits</th>
              </tr>
            </thead>
            <tbody id="courses-list">
              {APCourses.map((course) => (
                <APCourseListing details={course} />
              ))}
            </tbody>
          </table>
        </div>
        <p>* Pending validation by placement test.</p>
        <p>
          **If BC score is 3, student will receive 3 hours credit equivalent to
          MAT 165. If BC has a subscore and the subscore is 4 or 5, student will
          receive 3 hours of credit equivalent to MAT 165.
        </p>
        <p> ***Credit not given for both world history and European history.</p>
      </div>
    </div>
  );
}
