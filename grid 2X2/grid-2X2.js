/*Time delation*/
async function delay(time) {
  return await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
let score = 0;
/*Queue implemntattion*/
class Queue {
  constructor() {
    this.front = 0;
    this.rear = 0;
    this.item = [];
  }

  enqueue(val) {
    if (this.front == 0) {
      this.front = 1;
      this.rear = 1;
    } else {
      this.rear = this.rear + 1;
    }
    this.item[this.rear] = val;
  }

  dequeue() {
    if (this.rear == this.front) {
      this.rear = 0;
      this.front = 0;
    } else {
      this.front = this.front + 1;
    }
  }

  size() {
    if (this.front == 0) {
      return 0;
    } else {
      return this.rear - this.front + 1;
    }
  }

  Front() {
    return this.item[this.front];
  }
}

/*global variable*/
var lvl,
  toStart = 1;
var storeTheSequence = new Queue();

/*---------------STARTS HERE---------------*/

document.addEventListener("keypress", function (event) {
  lvl = 0;
  levelup(event.key, toStart);
  document.querySelector(".score").style.display = "block";
  return;
});

async function levelup(key, start) {
  toStart = 0;
  if (key == "Enter" && start == 1) {
    lvl++;

    //task to do in each level

    document.querySelector("h1").innerHTML = "Level " + lvl; //update the level from the previous level
    await delay(1000);
    generateTheSequence(); //create a new sequence and make the computer to play the sequence
    await delay(lvl * 1000 + 500);
    userClick(); ////This function handles the buttons clicked by the user
  } else {
    document.querySelector("#gameOver").style.display = "flex";
    document.querySelector("#gameOver").style.pointerEvents = "visible";
    document.querySelector("#playerName").style.display = "block";
    document.querySelector("#playerName").style.pointerEvents = "all";
  }
}

//This function will create a new sequence and make the computer to play the sequence
async function generateTheSequence() {
  for (var i = 0; i < lvl; i++) {
    let x = Math.floor(Math.random() * 4 + 1);
    storeTheSequence.enqueue(x);
    var activeButton = document.querySelector(".btn" + x.toString());
    activeButton.classList.add("pressed");
    await delay(500);
    activeButton.classList.remove("pressed");
    await delay(500);
  }
}

//This function handles the buttons clicked by the user
function userClick() {
  for (var i = 0; i < 4; i++) {
    var element = document.querySelectorAll(".bt")[i];
    element.addEventListener("click", byClick);
  }
}

//This function will do the comparisons with the buttons clicked by the user and the generated sequence
async function byClick() {
  var buttonNum = this.innerHTML;
  var clickedButton = document.querySelector(".btn" + buttonNum);
  clickedButton.classList.add("pressed");
  await delay(200);
  clickedButton.classList.remove("pressed");
  if (storeTheSequence.Front() == buttonNum) {
    storeTheSequence.dequeue();
    score++;
    updateScore();
    if (storeTheSequence.size() == 0) {
      levelup("Enter", 1);
    }
  } else {
    while (storeTheSequence.size()) {
      storeTheSequence.dequeue();
    }
    levelup("a");
  }
}
let updateScore = () => {
  document.getElementById("score").innerHTML = score;
};
document.querySelector("#playerName").addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    data.push({
      name: document.querySelector("#playerName").value,
      score: score,
    });
    data.sort(a, b, () => {
      return a.score > b.score;
    });
    localStorage.setItem("data", JSON.stringify(data));
    window.location.href =
      "https://hasan8162.github.io/Project-Simon-Game/grid%202X2/leaderBoard.html";
  }
});
