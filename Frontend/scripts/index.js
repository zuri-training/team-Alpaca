const likeBtn = document.querySelectorAll(".fa-thumbs-up");
const download = document.querySelectorAll(".fa-cloud");
const footerDate = document.getElementById("curent-date");
const selectCourse = document.querySelectorAll("#view-course");
const navLink = document.querySelector(".nav-list");
let numLikes = document.querySelectorAll("#num-likes");
const navBar = document.querySelector(".menu-bar");
const header = document.querySelector(".header");
const navCancle = document.querySelector(".fa-times");
let colorInterTurn = true;
let addNum = 0;
let interactColor;
let colorLike = "blue";

let add = true;

const seen = document.querySelectorAll(".fa-eye");

//date
let currentdate = new Date().getFullYear();

footerDate.textContent = currentdate;

///////////////////////////////  like  number

///////////////////////////////  like bnt

likeBtn.forEach((like, likeI) => {
  like.addEventListener("click", (e) => {
    e.preventDefault();
    const clickbtn = e.target;

    if (like === clickbtn && colorInterTurn === true) {
      interactColor = like.style.color = colorLike;
      colorInterTurn = false;
      addNum++;
      numLikes.forEach(function (num, i) {
        if (likeI === i) {
          num.textContent = `${addNum} likes`;
        }
      });
    } else {
      like.style.color = "#853030";

      addNum--;
      colorInterTurn = true;
      numLikes.forEach(function (num, i) {
        if (likeI === i) {
          num.textContent = `${addNum} likes`;
        }
      });
    }
    // numLikes.forEach((num) => {
    //   if (num) {
    //     num.textContent = `${addNum} likes`;
    //   }
    // });
  });
});

///////////////// downoad
download.forEach((download) => {
  download.addEventListener("click", (e) => {
    const clickbtn = e.target;

    if (download === clickbtn && colorInterTurn === true) {
      interactColor = download.style.color = colorLike;
      alert("download now");
      colorInterTurn = false;
    } else {
      download.style.color = "#853030";
      colorInterTurn = true;
    }
  });
});

// VIEW COURSE

let elementClick = false;
selectCourse.forEach((view, viewI) => {
  view.addEventListener("click", () => {
    console.log("man");
    if (elementClick === false) {
      seen.forEach((seen, i) => {
        if (i === viewI) {
          seen.style.color = "blue";
        }
      });
    } else {
    }
  });
});

navBar.addEventListener("click", function () {
  navLink.style.display = "block";
  navLink.classList.add("header-show");
  navCancle.classList.add("fa-times-show");
  // header.classList.add("header-show");
});
navCancle.addEventListener("click", function () {
  navLink.style.display = "none";
  navLink.classList.remove("header-show");
  navCancle.classList.remove("fa-times-show");
  // header.classList.add("header-show");
});
