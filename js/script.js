var header = document.getElementsByTagName("header")[0];

var prevScrollpos = window.pageYOffset;

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    header.style.transform = "translate(0%, 0%)";
  } else {
    header.style.transform = "translate(0%, -100%)";
  }
  prevScrollpos = currentScrollPos;
}