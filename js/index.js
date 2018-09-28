window.onload = function() {
	var toggle_button = document.getElementById("toggleSettings");

	toggle_button.onclick = function() {
		var options_menu = document.getElementById("options");
		console.log(options_menu.style.display);
		if (options_menu.style.display != "block")
			options_menu.style.display = "block";
		else
			options_menu.style.display = "none";
	}	


}
