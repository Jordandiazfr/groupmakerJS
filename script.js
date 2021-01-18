let studentList = document.querySelector(".list");
let btnLoad = document.querySelector(".load");
let nameStudent = document.querySelector("input[name='names']");
let finalGroup = document.querySelector(".finalGroup");
let numStudents = document.querySelector("input[name='numStudents']");

var simplon = [];
var savedList = localStorage.getItem("simplon");
// Add student

// bind input students
nameStudent.addEventListener("input", (e) => {
  nameStudent.value = e.target.value;
});

// Add the student to the selected div and  also to an array
document.querySelector(".add").addEventListener("click", (e) => {
  e.preventDefault();
  if (nameStudent.value == "") {
    alert("Please insert an student name or load the past list");
  } else {
    studentList.insertAdjacentHTML("beforeEnd", nameStudent.value + "<br>");
    simplon.push(nameStudent.value);
    localStorage.setItem("simplon", simplon);
    nameStudent.value = "";
  }
});

// Bind the number of students per group and the value
numStudents.addEventListener("input", (e) => {
  numStudents.value = e.target.value;
});

// Make group

document.querySelector(".makeGroups").addEventListener("click", (e) => {
  e.preventDefault();
  if (numStudents.value == "") {
    alert("Please specify how many students per group");
  }
  // ----- The hard logic comes here ----------
  finalGroup.innerHTML = "";
  const total = makeGroups(numStudents.value);
  console.log(total);

  // ----- The hard logic ENDS here ----------

  // Print

  for (i = 0; i < total.length; i++) {
    finalGroup.insertAdjacentHTML(
      "beforeEnd",
      "<h1>Group" + (i + 1) + "</h1>" + "<h2>" + total[i] + "</h2>"
    );
  }
});

// LOAD THE LOCAL STORAGED LIST
btnLoad.addEventListener("click", (e) => {
  e.preventDefault();

  simplon = savedList.split(",");
  // print each different line
  for (i = 0; i < simplon.length; i++) {
    studentList.insertAdjacentHTML("beforeEnd", simplon[i] + "<br>");
  }
});

if (typeof Storage !== "undefined") {
  // Code for localStorage/sessionStorage.
  // Store value
  // Retrieve value from local storage and assign to variable
} else {
  // Sorry! No Web Storage support..
}

// ------------------------- Logique -----------------------------

// Make a list of students
// list of final group
// list of remaining students
// list of current group selon le nombre
// shuffile
//  while il y a de remaining students
// select pop an student
// current group has space ?  push it
// else, back to  the beggining

const makeGroups = (maxNum) => {
  let allGroups = [];
  var remainingStudents = [...simplon];
  let currentGroup = [];
  console.log(remainingStudents);
  while (remainingStudents.length > 0) {
    let r = randomInt(0, remainingStudents.length);
    var currentStudent = remainingStudents.pop(r);
    console.log(currentStudent);
    if (currentGroup.length >= maxNum) {
      allGroups.push(currentGroup);
      currentGroup = [];
    }
    currentGroup.push(currentStudent);
  }
  allGroups.push(currentGroup);
  return allGroups;
};

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
