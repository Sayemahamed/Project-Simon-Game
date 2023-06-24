let element = (element) => document.querySelector(element);
let drawUi = () => {
  return (element("#board").innerHTML = data
    .map((item) => {
      return `        
    <div class="players">
    <span>${item.name}</span>
    <span>${item.score}</span>
  </div>`;
    })
    .join(""));
};
drawUi();
