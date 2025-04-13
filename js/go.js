var c_base =
  '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0"  width="48" height="48"><param name="movie" value="/img/color.swf"><param name="quality" value="high"><param name="wmode" value="transparent"><embed src="/img/color.swf" quality="high" pluginspage="https://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" width="48" height="48"></embed></object>';

String.prototype.replaceAll = function (find, replace_to) {
  return this.replace(new RegExp(find, "g"), replace_to);
};

function loadflash() {
  var c_green = c_base.replaceAll("color", "green");
  var c_blue = c_base.replaceAll("color", "blue");
  var c_orange = c_base.replaceAll("color", "orange");
  var divs = document.getElementsByTagName("DIV");
  for (var i = 0; i < divs.length; i++) {
    if (divs[i].style.color == "green") {
      divs[i].innerHTML = c_green;
    }
  }
  var divs = document.getElementsByTagName("DIV");
  for (var i = 0; i < divs.length; i++) {
    if (divs[i].style.color == "blue") {
      divs[i].innerHTML = c_blue;
    }
  }
  var divs = document.getElementsByTagName("DIV");
  for (var i = 0; i < divs.length; i++) {
    if (divs[i].style.color == "orange") {
      divs[i].innerHTML = c_orange;
    }
  }
}
