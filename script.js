function openFeatures() {
  const allElems = document.querySelectorAll(".elem");
  const fullElemsPage = document.querySelectorAll(".fullelems");
  const FullElemsBackBtn = document.querySelectorAll(".fullelems .back");

  allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      fullElemsPage[elem.id].style.display = "block";
    });
  });

  FullElemsBackBtn.forEach((back) => {
    back.addEventListener("click", () => {
      fullElemsPage[back.id].style.display = "none";
    });
  });
}
openFeatures();