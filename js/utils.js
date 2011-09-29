window.feedback = function(msg) {
	if ($("#feedback").is(":visible")) {
		if (feedback.timeout) { clearTimeout(feedback.timeout); }
	} else {
		$("#feedback ul").empty();
	}
	$("#feedback ul").append("<li>" + msg + "</li>").parent().show('fast', function(){
		feedback.timeout = setTimeout(function(){$("#feedback").hide('slow')},5000);
	});
}
window.time = function(callback, msg) {
	msg = msg || "";
	var start = new Date();
	callback();
	var stop = new Date();
	console.log(msg + (stop.getTime() - start.getTime()));
}
