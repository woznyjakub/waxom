import styles from "../sass/style.scss";
import Glide from "@glidejs/glide";

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
    window.scroll({
      top:
        document.querySelector(`.${e.target.getAttribute("data-scroll-to")}`)
          .offsetTop - nav.offsetHeight,
      behavior: "smooth"
    });
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

/* projects elem loading */
const projectsElems = document.querySelectorAll(".projects__project");
document
  .querySelector(".projects__btn-load-more")
  .addEventListener("click", e => {
    projectsElems.forEach(elem => {
      elem.style.display = "block";
    });
    e.target.style.display = "none";
  });

/* video uncover */
document
  .querySelector(".presentation__btn-play")
  .addEventListener("click", () => {
    document.querySelector(".presentation__intro").classList.toggle("hidden");
  });

/* slider from section 'blog' */
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
