let studentList = document.querySelector(".list");
let btnLoad = document.querySelector(".load");
let nameStudent = document.querySelector("input[name='names']");
let finalGroup = document.querySelector(".finalGroup");
let numStudents = document.querySelector("input[name='numStudents']");

var simplon = [];
var savedList = localStorage.getItem("simplon");
// Add student

// bind input students
nameStudent.addEventListener("input", function (e) {
  nameStudent.value = e.target.value;
});

nameStudent.addEventListener("click", (e) => {
  nameStudent.value = "";
});

function clean() {
  simplon = [];
  nameStudent.value = "";
  numStudents.value = "";
}
// Manipulate the dom
function createDOM(what, how, where) {
  let myDiv = document.createElement("div");
  let myP = document.createElement("p");
  myP.innerText = what;
  myDiv.setAttribute("class", how);
  where.appendChild(myDiv);
  myDiv.appendChild(myP);
}

// reload the DOM
function reload(element) {
  var container = document.querySelector(element);
  var content = container.innerHTML;
  container.innerHTML = content;
}

// Add the student to the selected div and  also to an array
document.querySelector(".add").addEventListener("click", (e) => {
  e.preventDefault();
  if (nameStudent.value == "") {
    nameStudent.value = "You must add someone";
  } else if (nameStudent.value == "You must add someone") {
    nameStudent.value = "";
  } else {
    createDOM(nameStudent.value, "student", studentList);
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
  } else {
    // ----- The hard logic comes here ----------
    finalGroup.innerHTML = "";
    const total = makeGroups(numStudents.value);
    console.log(total);

    // ----- The hard logic ENDS here ----------

    // Print

    for (i = 0; i < total.length; i++) {
      let myP = document.createElement("p");
      myP.innerText = "Group " + (i + 1);
      myP.setAttribute("class", "grouptitle");
      finalGroup.appendChild(myP);
      createDOM(total[i], "student", finalGroup);
    }
  }
});

// LOAD THE LOCAL STORAGED LIST
btnLoad.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(simplon);
  if (simplon.length == 0) {
    simplon = savedList.split(",");
    // print each different line
    for (i = 0; i < simplon.length; i++) {
      createDOM(simplon[i], "student", studentList);
    }
  }
});

// ------------------------- Logic -----------------------------

// Make a list of students
// list of final group
// list of remaining students
// list of current group selon le nombre
// shuffle
//  while il y a de remaining students
// select pop an student
// current group has space ?  push it
// else, back to  the beggining

const makeGroups = (maxNum) => {
  let allGroups = [];
  remainingStudents = [...simplon];
  remainingStudents.sort(() => Math.random() - 0.5);
  let currentGroup = [];

  while (remainingStudents.length > 0) {
    var currentStudent = remainingStudents.pop();
    console.log(currentStudent);
    if (currentGroup.length >= maxNum) {
      allGroups.push(currentGroup);
      currentGroup = [];
    }
    currentGroup.push(currentStudent);
  }
  allGroups.push(currentGroup);
  console.log(allGroups);
  return allGroups;
};
//////////// Visual Effects //////////
