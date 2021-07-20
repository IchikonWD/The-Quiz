function load_home() {
  document.getElementById("wrapper").innerHTML = "";
  document.getElementById("wrapper").innerHTML =
    '<object type="text/html" data="game.html" ></object>';
}

document.getElementById("play-btn").onclick = load_home;
