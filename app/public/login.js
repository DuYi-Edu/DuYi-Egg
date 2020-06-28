var inputs = document.getElementsByTagName("input");
for (const inp of inputs) {
  inp.oninput = function () {
    const err = document.querySelector(".error");
    if (err) {
      err.remove();
    }
  };
}
