var newfaqList = document.querySelectorAll(".faqs li");
var newFaqListTitle = document.querySelectorAll(".faqs .title");
newFaqListTitle.forEach(function (thisDom) {
  console.log(444);
  thisDom.onclick = function (everyDom) {
    everyDom.stopPropagation();
    const isActive = thisDom.parentElement.className.includes("active");
    if (isActive) {
      thisDom.parentElement.className = thisDom.parentElement.className.replace(
        "active",
        ""
      );
    } else {
      thisDom.parentElement.className = thisDom.parentElement.className +=
        " active";
    }
  };
});
