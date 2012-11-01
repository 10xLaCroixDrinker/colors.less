window.onload = function() {
	var baseColor;
	picker = new Color.Picker({
		color: "#FD00FF", // accepts rgba(), or #hex
		display: true,
		size: 200,
		callback: function(rgba, state, type) {
			baseColor = Color.Space(rgba, "RGBA>W3");
			less.modifyVars({
        '@baseColor': baseColor
      });
		}
	});
//	picker.element.style.top = swatch.offsetTop + "px";
//	picker.element.style.left = (swatch.offsetLeft - 285) + "px";
};