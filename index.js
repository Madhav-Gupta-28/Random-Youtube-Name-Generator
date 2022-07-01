import { namesOne, namesTwo } from "./names.js";

const initapp = function () {
  document
    .getElementById("submit-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      clearSuggestions();
      //   generarte names
      const namesArr = generateNames();
      console.log(namesArr);

      // display names
      displayNames(namesArr);
    });
};

document.addEventListener("DOMContentLoaded", initapp);

// clearering the previous suggestions

const clearSuggestions = function () {
  const displaySection = document.getElementById("suggestionSection");
  if (!displaySection.classList.contains("hidden"))
    displaySection.classList.toggle("hidden");

  const list = document.querySelector(".suggestionSection ol");

  list.innerHTML = "";
};

const generateNames = function () {
  const randomNumArr = [];
  for (let i = 0; i < 4; ) {
    const randomNumber = Math.floor(Math.random() * 10);
    if (randomNumArr.includes(randomNumber)) continue;
    randomNumArr.push(randomNumber);
    i++;
  }
  const suggestion1 = namesOne[randomNumArr[0]] + namesTwo[randomNumArr[3]];
  const suggestion2 = namesOne[randomNumArr[1]] + namesTwo[randomNumArr[0]];
  const suggestion3 = namesOne[randomNumArr[2]] + namesTwo[randomNumArr[2]];
  const suggestion4 = namesOne[randomNumArr[3]] + namesTwo[randomNumArr[1]];

  return [suggestion1, suggestion2, suggestion3, suggestion4];
};

const displayNames = (namesArray) => {
  const list = document.querySelector(".suggestionSection ol");
  const rawFirstName = document.getElementById("submit-form__input").value;
  const firstName = sanitizeInput(rawFirstName);
  namesArray.forEach((name) => {
    list.innerHTML += `<li>
            <a href="https://youtube.com/${name}" target="_blank">${name}</a></li>`;
    list.innerHTML += `<ul>
            <li><a href="https://youtube.com/${firstName}s${name}" target="_blank">${firstName}s${name}</a></li> 
            <li><a href="https://youtube.com/${name}With${firstName}" target="_blank">${name}With${firstName}</a></li>
            </ul>`;
  });
  const display = document.getElementById("suggestionSection");
  if (display.classList.contains("hidden")) display.classList.toggle("hidden");
};

const sanitizeInput = (inputValue) => {
  const div = document.createElement("div");
  div.textContent = inputValue;
  return div.innerHTML;
};
