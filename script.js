let rub1 = document.querySelector(".rub1");
let rub2 = document.querySelector(".rub2");
let usd1 = document.querySelector(".usd1");
let usd2 = document.querySelector(".usd2");
let eur1 = document.querySelector(".eur1");
let eur2 = document.querySelector(".eur2");
let gbp1 = document.querySelector(".gbp1");
let gbp2 = document.querySelector(".gbp2");
let text1 = document.querySelector(".card1 p");
let text2 = document.querySelector(".card2 p");

let internet = document.querySelector(".internet");

let input1 = document.querySelector(".card1 input");
let input2 = document.querySelector(".card2 input");

let from = "RUB";
let to = "USD";
let selected = "input1";

const key = "41f56b15a2907880552b1f44ed4e2c28";

function convert(from, to, total) {
  if (from === to) {
    input1.value = total;
    input2.value = total;
    text1.textContent = `1 ${from} = 1 ${to}`;
    text2.textContent = `1 ${to} = 1 ${from}`;
    return total;
  }
  fetch(`https://api.exchangerate.host/convert?access_key=${key}&from=${from}&to=${to}&amount=${total}`)
    .then((response) => response.json())
    .then((data) => {
      return data.result;
    })
    .then((result) => {
      if (selected === "input1") {
        input2.value = result.toFixed(5);
      } else {
        input1.value = result.toFixed(5);
      }

      text1.textContent = `1 ${from} = ${(result / total).toFixed(5)} ${to}`;
      text2.textContent = `1 ${to} = ${(total / result).toFixed(5)} ${from}`;
    });
}

input1.addEventListener("input", () => {
  let inp = input1.value;

  inp = inp.replace(",", ".");

  inp = inp.replace(/[^0-9.]/g, "");


  if (inp[0] === ".") {
    inp = "";
  }

  if (inp === "00") {
    inp = "0";
  }

  let noqte = inp.split(".");
  if (noqte.length > 2) {
    inp = noqte[0] + "." + noqte.slice(1).join("");
  }
  if (noqte[1]) {
    if (noqte[1].length > 5) {
      inp = noqte[0] + "." + noqte[1].slice(0, 5);
    }
  }

  input1.value = inp;

  if (inp) {
    if (inp !== ".") {
      selected = "input1";
      convert(from, to, parseFloat(inp));
    }
  }
});

input2.addEventListener("input", () => {
  let inp = input2.value;

  inp = inp.replace(",", ".");

  inp = inp.replace(/[^0-9.]/g, "");

  if (inp[0] === ".") {
    inp = "";
  }

  if (inp === "00") {
    inp = "0";
  }

  let noqte = inp.split(".");
  if (noqte.length > 2) {
    inp = noqte[0] + "." + noqte.slice(1).join("");
  }

  if (noqte[1]) {
    if (noqte[1].length > 5) {
      inp = noqte[0] + "." + noqte[1].slice(0, 5);
    }
  }

  input2.value = inp;

  if (inp) {
    if (inp !== ".") {
      selected = "input2";
      convert(to, from, parseFloat(inp));
    }
  }
});

let group1 = [rub1, usd1, eur1, gbp1];

group1.forEach((a) => {
  a.addEventListener("click", (e) => {
    group1.forEach((x) => {
      x.style.backgroundColor = "";
    });
    rub1.style.backgroundColor = "white";
    rub1.style.color = "#C6C6C6";

    if (e.target === rub1) {
      from = "RUB";
    } else if (e.target === usd1) {
      from = "USD";
    } else if (e.target === eur1) {
      from = "EUR";
    } else if (e.target === gbp1) {
      from = "GBP";
    }


    if (selected === "input1" && input1.value) {
      convert(from, to, parseFloat(input1.value));
    } else if (selected === "input2" && input2.value) {
      convert(to, from, parseFloat(input2.value));
    }

    e.target.style.backgroundColor = "#833AE0";
    e.target.style.transition = "0.4s";
  });

  a.addEventListener("mouseover", (e) => {
    e.target.style.color = "black";
  });

  a.addEventListener("mouseout", (e) => {
    e.target.style.color = "#C6C6C6";
    e.target.style.transition = "0.4s ease";
  });
});

let group2 = [rub2, usd2, eur2, gbp2];

group2.forEach((a) => {
  a.addEventListener("click", (e) => {
    group2.forEach((x) => {
      x.style.backgroundColor = "";
    });
    usd2.style.backgroundColor = "#FFFFFF";
    usd2.style.color = "#C6C6C6";

    if (e.target === rub2) {
      to = "RUB";
    } else if (e.target === usd2) {
      to = "USD";
    } else if (e.target === eur2) {
      to = "EUR";
    } else if (e.target === gbp2) {
      to = "GBP";
    }

    if (selected === "input1" && input1.value) {
      convert(from, to, parseFloat(input1.value));
    } else if (input2.value) {
      convert(to, from, parseFloat(input2.value));
    }

    e.target.style.backgroundColor = "#833AE0";
    e.target.style.transition = "0.4s";
  });

  a.addEventListener("mouseover", (e) => {
    e.target.style.color = "black";
  });

  a.addEventListener("mouseout", (e) => {
    e.target.style.color = "#C6C6C6";
    e.target.style.transition = "0.4s ease";
  });
});

function internetYoxlama() {
  if (!navigator.onLine) {
    internet.style.display = "block";
    input1.disabled = true;
    input2.disabled = true;
    input1.style.backgroundColor = "white";
    input2.style.backgroundColor = "white";
  } else {
    internet.style.display = "none";
    input1.disabled = false;
    input2.disabled = false;
  }
}
window.addEventListener("offline", internetYoxlama);
window.addEventListener("online", internetYoxlama);

internetYoxlama();
