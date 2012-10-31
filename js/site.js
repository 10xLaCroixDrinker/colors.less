window.onload = function() {
	var swatch = document.getElementById("testSwatch");
	picker = new Color.Picker({
		color: "#FD00FF", // accepts rgba(), or #hex
		display: true,
		size: 200,
		callback: function(rgba, state, type) {
			swatch.style.background = Color.Space(rgba, "RGBA>W3");
		}
	});
	picker.element.style.top = swatch.offsetTop + "px";
	picker.element.style.left = (swatch.offsetLeft - 285) + "px";
	
	var less = require('less');

  less.render('@baseColor: ' + Color.Space(rgba, "RGBA>W3") + ';', function (e, css) {
    console.log(css);
  });
};