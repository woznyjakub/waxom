import styles from "../sass/style.scss";
import Glide from "@glidejs/glide";
import CountUp from "countup.js";

const nav = document.querySelector(".nav");
document.querySelector(".nav .hamburger").addEventListener("click", () => {
  nav.classList.toggle("active");
});

document.addEventListener("scroll", () => {
  if (window.scrollY > 0) nav.classList.add("dark-bg");
  else nav.classList.remove("dark-bg");
});

// scrolling on click
document.querySelectorAll("[data-scroll-to]").forEach(item => {
  item.addEventListener("click", e => {
    nav.classList.remove("active");
    if (window.innerWidth >= 900) {
      window.scroll({
        top:
          document.querySelector(`.${e.target.getAttribute("data-scroll-to")}`)
            .offsetTop - nav.offsetHeight,
        behavior: "smooth"
      });
    } else {
      setTimeout(() => {
        window.scroll({
          top:
            document.querySelector(
              `.${e.target.getAttribute("data-scroll-to")}`
            ).offsetTop - nav.offsetHeight,
          behavior: "smooth"
        });
      }, 600);
    }
  });
});

/* header slider */
new Glide(".header__slider", {
  type: "carousel",
  animationDuration: 800,
  autoplay: 8000,
  gap: 8
}).mount();

/* mobile effects clear, optimize .about__main-image */
const AboutMainImage = document.querySelector(".about__main-image");
if (window.innerWidth <= 900) {
  AboutMainImage.src = "img/screenshots-mobile.png";
}
window.addEventListener("resize", () => {
  if (window.innerWidth >= 900) {
    nav.classList.remove("active");
    AboutMainImage.src = "img/screenshots.png";
  } else {
    AboutMainImage.src = "img/screenshots-mobile.png";
  }
});

/* projects elem dispplay switching */
const projectElems = [...document.querySelectorAll(".projects__project")];
document
  .querySelector(".projects__btn-load-more")
  .addEventListener("click", e => {
    projectElems.forEach(elem => {
      elem.style.display = "block";
    });
    e.target.style.display = "none";
  });
let lastActiveBtn = document.querySelector(
  ".projects__btn.btn--small:first-of-type"
);
document.querySelectorAll(".projects__btn.btn--small").forEach(btn => {
  btn.addEventListener("click", e => {
    lastActiveBtn.classList.remove("active");
    e.target.classList.add("active");
    lastActiveBtn = e.target;
    projectElems.forEach(item => (item.style.display = "none"));
    projectElems
      .filter(
        item =>
          e.target.dataset.keyword === item.dataset.keyword ||
          e.target.dataset.keyword === "all"
      )
      .forEach(item => (item.style.display = "block"));
  });
});

/* video uncover */
document
  .querySelector(".presentation__btn-play")
  .addEventListener("click", () => {
    document.querySelector(".presentation__intro").classList.toggle("hidden");
  });

/* slider in section 'blog' */
new Glide(".blog__slider", {
  type: "carousel",
  startAt: 1,
  perView: 3,
  focusAt: "center",
  breakpoints: {
    900: {
      perView: 2,
      focusAt: 1
    },
    480: {
      perView: 1,
      focusAt: 1 // it's necessary to start with the first slide on mobile
    }
  }
}).mount();

/* counting amination */
const counterWrapper = document.querySelector(".presentation__bg-container");
const countedElems = document.querySelectorAll(".presentation__counter-number");
let countingExecuted = false;
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight - counterWrapper.offsetHeight / 2 >
      counterWrapper.offsetTop &&
    window.scrollY - counterWrapper.offsetHeight / 2 < counterWrapper.offsetTop
  ) {
    counterWrapper.classList.add("visible");
    if (!countingExecuted) {
      setTimeout(() => {
        countedElems.forEach(elem => {
          const options = {
            useEasing: true,
            useGrouping: true,
            separator: "",
            decimal: "."
          };
          const counter = new CountUp(
            elem,
            0,
            elem.getAttribute("data-count-to"),
            0,
            5,
            options
          );
          if (!counter.error) counter.start();
          else console.error(counter.error);
        });
      }, 1500);
    }
    countingExecuted = true;
  }
});
