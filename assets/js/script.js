// AOS animation js
AOS.init({ disable: "mobile" });

// for add active class in navbar
document.querySelectorAll(".navbar-nav li").forEach((button) => {
  button.addEventListener("click", function () {
    document.querySelectorAll(".navbar-nav li").forEach((list) => {
      list.classList.remove("active");
    });
    button.classList.add("active");
  });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
let countBox = document.getElementById("countBox");
let count = document.querySelectorAll(".count");
let hasCount = false;
window.onscroll = () => {
  let current = "";
  let isActiveLinkFound = false;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - sectionHeight / 2) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const parentLi = link.parentNode;
    const buttonByClass = document.querySelector(".navbar-toggler");
    const closestParent = parentLi.closest(".navbar-collapse");

    if (parentLi) {
      parentLi.classList.remove("active");
    }

    if (closestParent) {
      closestParent.classList.remove("show");
    }

    if (link.href.includes(current)) {
      parentLi.classList.add("active");
      isActiveLinkFound = true;
    }

    if (isActiveLinkFound) {
      const isExpanded = buttonByClass.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        buttonByClass.setAttribute("aria-expanded", String(!isExpanded));
      } else {
        buttonByClass.setAttribute("aria-expanded", String(isExpanded));
      }
    }
  });

  const countTop = countBox.offsetTop;
  const pageHeight = window.innerHeight;
  if (scrollY > countTop - pageHeight && !hasCount) {
    hasCount = true;
    count.forEach((item) => {
      let dataAtr = parseInt(item.getAttribute("data-count"), 10);
      let currentCount = 0;
      let increment = Math.ceil(dataAtr / 100);
      const updateCount = () => {
        if (currentCount < dataAtr) {
          currentCount += increment;
          item.textContent = Math.min(currentCount, dataAtr);
          setInterval(updateCount, 400);
        } else {
          item.textContent = dataAtr;
        }
      };
      updateCount();
    });
  }
}; // text animation let
text = document.querySelector(".secondText");
let typedItems = ["Web Designer", "UI Developer", "Frontend Developer"];
let currentIndex = localStorage.getItem("currentIndex")
  ? parseInt(localStorage.getItem("currentIndex"))
  : 0;
let charIndex = 0;

let textFunction = () => {
  // display text
  if (charIndex < typedItems[currentIndex].length) {
    text.textContent += typedItems[currentIndex].charAt(charIndex);
    charIndex++;
  } else {
    currentIndex++;
    if (currentIndex >= typedItems.length) {
      currentIndex = 0;
    }
    charIndex = 0;

    localStorage.setItem("currentIndex", currentIndex);
    // reset function
    setTimeout(() => {
      text.textContent = "";
      textFunction();
    }, 200);
    return;
  }
};

// Initial call to display the first item
textFunction();
setInterval(textFunction, 400);

// skill progress bar

let progressList = document.querySelectorAll(".progress");

progressList.forEach((item) => {
  let progressValue = item.getAttribute("aria-valuenow");

  item.childNodes.forEach((child) => {
    if (child.nodeType === Node.ELEMENT_NODE) {
      child.style.width = `${progressValue}%`;
      child.style.transition = "width 3s ease-in";
    }
  });
});

// for copyright date
document.getElementById("date").innerHTML = new Date().getFullYear();

// form data
let formData = document.querySelector("#formData");
const modalElement = document.getElementById("staticBackdrop"); // Get the modal element
const modalInstance = new bootstrap.Modal(modalElement); // Create a new instance of the modal
let modalClose = document.querySelector(
  ".contactModalForm .modal-footer button"
);

formData.addEventListener("submit", async (e) => {
  e.preventDefault();
  const getData = new FormData(formData);
  let data = Object.fromEntries(getData);
  let isValid = true;
  let firstNameError = document.getElementById("firstNameError");
  let emailError = document.getElementById("emailError");
  let subjectError = document.getElementById("subjectError");
  let messageError = document.getElementById("messageError");

  // after submit form remove error
  [firstNameError, emailError, subjectError, messageError].forEach((error) => {
    error.previousElementSibling.classList.remove("is-invalid");
    error.classList.remove("invalid-feedback");
    error.textContent = "";
  });

  // form validaiton
  if (data.firstName.trim() === "") {
    firstNameError.textContent = "A name is required.";
    firstNameError.previousElementSibling.classList.add("is-invalid");
    firstNameError.classList.add("invalid-feedback");
    isValid = false;
  }
  if (data.email.trim() === "") {
    emailError.textContent = "An email is required.";
    emailError.previousElementSibling.classList.add("is-invalid");
    emailError.classList.add("invalid-feedback");
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    emailError.textContent = "Please enter the valid email.";
    emailError.previousElementSibling.classList.add("is-invalid");
    emailError.classList.add("invalid-feedback");
    isValid = false;
  }
  if (data.subject.trim() === "") {
    subjectError.textContent = "A subject is required.";
    subjectError.previousElementSibling.classList.add("is-invalid");
    subjectError.classList.add("invalid-feedback");
    isValid = false;
  }
  if (data.message.trim() === "") {
    messageError.textContent = "A message is required.";
    messageError.previousElementSibling.classList.add("is-invalid");
    messageError.classList.add("invalid-feedback");
    isValid = false;
  }

  // form is validated submit the form
  if (isValid) {
    // Show the modal
    modalInstance.show();
    modalElement.classList.add("active");
    // const whatsappMessage = `Name: ${data.firstName}\nEmail: ${data.email}\nSubject: ${data.subject}\nMessage: ${data.message}`;
    // const whatsappNumber = "9131640486";
    // const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
    //   whatsappMessage
    // )}`;

    // window.open(whatsappUrl, "_blank");
    console.log(data, "data");
    e.target.reset();
  }
});

modalClose.addEventListener("click", function () {
  if (modalElement.classList.contains("active")) {
    modalElement.classList.remove("active");
  }
});

let scrollTop = document.querySelector(".scroll-top");

window.addEventListener("scroll", handleScrollTop);

function handleScrollTop() {
  if (scrollY >= 200) {
    scrollTop.style.display = "flex";
    scrollTop.style.opacity = "1";
    scrollTop.style.visibility = "visible";
    scrollTop.style.transition = "all 1s ease-in";
  } else {
    scrollTop.style.display = "none";
    scrollTop.style.opacity = "0";
    scrollTop.style.visibility = "hidden";
  }
}
