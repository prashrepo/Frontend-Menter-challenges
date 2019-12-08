const menu = document.querySelector(".menu");
const close = document.querySelector(".close");
const ham = document.querySelector(".ham");
const tab = document.querySelectorAll(".feature-tab");
const tabInfo = document.querySelectorAll(".feature-info");
const faq = document.querySelectorAll(".faq");
const ans = document.querySelector(".faq__ans");

close.addEventListener("click", function() {
  menu.style.display === "block" ? (menu.style.display = "none") : (menu.style.display = "block");
});
ham.addEventListener("click", function() {
  menu.style.display = "block";
});

tab.forEach((el, index) => {
  tabInfo[index].style.display = "none";
  tabInfo[0].style.display = "";
  el.addEventListener("click", function() {
    tab.forEach((aa, index) => {
      aa.classList.remove("active");
      tabInfo[index].style.display = "none";
    });
    el.classList.add("active");
    tabInfo[index].style.display = "";
  });
});

faq.forEach(el => {
  el.childNodes[3].style.display = "none";
  el.addEventListener("click", function() {
    const rotate = el.children[0].children[1];
    el.childNodes[3].style.display === "none"
      ? (el.childNodes[3].style.display = "block")
      : (el.childNodes[3].style.display = "none");

    rotate.style.transform === "rotate(180deg)"
      ? (rotate.style.transform = "rotate(0deg)")
      : (rotate.style.transform = "rotate(180deg)");

    rotate.classList.toggle("arrow-stroke");
  });
});
