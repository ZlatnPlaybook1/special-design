// Retrieve the main color from localStorage
let mainColor = localStorage.getItem("color_option");
if (mainColor != null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  // Remove Active from all colors list items
  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active");
    if (ele.dataset.color == mainColor) {
      // Add Active class
      ele.classList.add("active");
    }
  });
}

// Background Random Option
let backgroundoption = true;
// Variable to control Interval
let backGroundInterval;

// Toggle spin class on icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // Toggle class fa-spin for rotation on self
  this.classList.toggle("fa-spin");
  // Toggle class to open and close the settings
  document.querySelector(".setting-box").classList.toggle("open");
};

// Switch colors
const colorLi = document.querySelectorAll(".colors-list li");
colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    const color = e.target.getAttribute("data-color");
    document.documentElement.style.setProperty("--main-color", color);
    localStorage.setItem("color_option", color);

    handelActive(e);
  });
});

// Switch Background Option
const randomBackGround = document.querySelectorAll(".option-box .random span");
randomBackGround.forEach((span) => {
  span.addEventListener("click", (e) => {
    handelActive(e);
    if (e.target.dataset.background == "yes") {
      backgroundoption = true;
      randomizeImage();
    } else {
      backgroundoption = false;
      clearInterval(backGroundInterval);
    }
  });
});

// Landing changes
let landingPage = document.querySelector(".landing-page");

let imgArray = ["img0.jpg", "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"];

function randomizeImage() {
  if (backgroundoption == true) {
    backGroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgArray.length);
      landingPage.style.backgroundImage = `url("photo/${imgArray[randomNumber]}")`;
    }, 4000);
  }
}
randomizeImage();

// Select Skills
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;
  // Skills Outer Height
  let skillsOffsetHeight = ourSkills.offsetHeight;
  // Window Height
  let windowHeight = this.innerHeight;
  // Window Scrll Top
  let windowScrollTop = this.scrollY;
  if (windowScrollTop > skillsOffsetTop + skillsOffsetHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skills-progress  span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

////    مش شغال
document.addEventListener("DOMContentLoaded", () => {
  let ourGallery = document.querySelectorAll(".gallary img");

  ourGallery.forEach((img) => {
    img.addEventListener("click", (e) => {
      // Create Overlay Element
      let overlay = document.createElement("div");
      // Add class to overlay
      overlay.className = "popup-overlay";
      // Append overlay to body
      document.body.appendChild(overlay);

      // Create Popup Element
      let popupBox = document.createElement("div");
      // Add class to Popup Box
      popupBox.className = "popup-box";
      // Create the Image
      let popupImage = document.createElement("img");
      // Set Image Source
      popupImage.src = img.src;
      // Add Image to popup Box
      popupBox.appendChild(popupImage);

      // Append the Popup Box to overlay
      overlay.appendChild(popupBox);

      // Close the popup when clicking outside the image
      overlay.addEventListener("click", function () {
        overlay.remove();
      });

      // Prevent closing the popup when clicking on the image
      popupBox.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    });
  });
});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// Select All Links
const allLinks = document.querySelectorAll(".link a");
function ScrllTosSomeWhere(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      const linked = document.querySelector(e.target.dataset.section);
      if (linked) {
        linked.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
}
ScrllTosSomeWhere(allBullets);
ScrllTosSomeWhere(allLinks);

// Handel Active State
function handelActive(ev) {
  // Remove Active class from all children
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  // Add Active class on self
  ev.target.classList.add("active");
}

let bulletspan = document.querySelectorAll(".bullet-option span");
let bulletBox = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullet-option");

if (bulletLocalItem != null) {
  console.log("Not Empty");
  bulletspan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletBox.style.display = "block";
    document.querySelector(".bullet-option .yes").classList.add("active");
  } else {
    bulletBox.style.display = "none";
    document.querySelector(".bullet-option .no").classList.add("active");
  }
}

bulletspan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletBox.style.display = "block";
      localStorage.setItem("bullet-option", "block");
    } else if (span.dataset.display === "hide") {
      bulletBox.style.display = "none";
      localStorage.setItem("bullet-option", "none");
    }
    handelActive(e);
  });
});

//reset Button
document.querySelector(".button-reset").onclick = function () {
  // localStorage.clear() ;
  localStorage.removeItem("bullet-option");
  localStorage.removeItem("random");

  window.location.reload();
};
