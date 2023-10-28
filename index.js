const carsouel = document.getElementsByClassName("carsouel")[0];
const wrapper = document.querySelector(".wrapper");
const sliderBtns = document.querySelectorAll(".wrapper .slider-btn");
const carsouelCards = [...carsouel.children];

console.log(carsouel.offsetWidth, carsouel.scrollWidth);

console.log(wrapper)

const boxWidth = document.getElementsByClassName("box")[0].offsetWidth;

let cardPerPage = Math.round(carsouel.offsetWidth / boxWidth);

carsouelCards
  .slice(-cardPerPage)
  .reverse()
  .forEach((card) => {
    //'beforeBegin', 'afterBegin', 'beforeEnd', or 'afterEnd'. it only can be one of these
    carsouel.insertAdjacentHTML("afterBegin", card.outerHTML);
    // after end means when the element ends means it's talking about the vertical end of the element
    // after begin means the horizontal end
  });

carsouelCards
  .slice(0, cardPerPage)
  .reverse()
  .forEach((card) => {
    //'beforeBegin', 'afterBegin', 'beforeEnd', or 'afterEnd'. it only can be one of these
    carsouel.insertAdjacentHTML("beforeEnd", card.outerHTML);
    // after end means when the element ends means it's talking about the vertical end of the element
    // after begin means the horizontal end
  });

let isDragging = false,
  startX,
  timeOut,
  startScrollLeft;

sliderBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // carsouel.style.translateX=`${startScrollLeft+boxWidth}px`
    carsouel.scrollLeft += btn.id === "right" ? boxWidth : -boxWidth;
  });
});

const dragging = (e) => {
  if (!isDragging) return;

  carsouel.classList.toggle("dragging");
  carsouel.scrollLeft = startScrollLeft - (e.pageX - startX);

  console.log(e.pageX);
  console.log("minus krke ", e.pageX - startX);
  console.log("scroll Left ", carsouel.scrollLeft);
};

const dragStart = (e) => {
  isDragging = true;
  startX = e.pageX;
  startScrollLeft = carsouel.scrollLeft;
  console.log(`start x :${startX} startScrollLeft :${startScrollLeft}`);
};

const dragStop = () => {
  isDragging = false;
};

const autoPlay=()=>{
   timeOut=setInterval(() => {
    carsouel.scrollLeft += boxWidth;
  }, 5000);
}

autoPlay();

const infinteScroll = () => {
  if (carsouel.scrollLeft === 0) {
    console.log("left End");

    carsouel.classList.add("no-transition");
    carsouel.scrollLeft = carsouel.scrollWidth - 2 * carsouel.offsetWidth;
    carsouel.classList.remove("no-transition");

  } else if (
    Math.ceil(carsouel.scrollLeft) ===
    carsouel.scrollWidth - carsouel.offsetWidth
  ) {
    carsouel.classList.add("no-transition");
    carsouel.scrollLeft = carsouel.offsetWidth;
    carsouel.classList.remove("no-transition");

    console.log("right end");
  }

  clearInterval(timeOut);
  if(!wrapper.matches(":hover")) autoPlay();
};

carsouel.addEventListener("mousemove", dragging);
carsouel.addEventListener("mousedown", dragStart);
carsouel.addEventListener("mouseup", dragStop);
carsouel.addEventListener("scroll", infinteScroll);
wrapper.addEventListener("mouseenter", ()=>clearInterval(timeOut));
wrapper.addEventListener("mouseleave",autoPlay);
