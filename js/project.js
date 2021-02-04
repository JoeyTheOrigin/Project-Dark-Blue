var transformLeftToRightList = [document.getElementById("phase1")];
transformLeftToRightList.splice(0,0,"transformLeftToRight");

var transformRightToLeftList;
if(document.documentElement.clientWidth > 425) {
	transformRightToLeftList = [document.getElementById("phase2")];
	transformRightToLeftList.splice(0,0,"transformRightToLeft");
} else {
	transformLeftToRightList.push(document.getElementById("phase2"));
}
//var transformRightToLeftList = [document.getElementById("phase2")];
//transformRightToLeftList.splice(0,0,"transformRightToLeft");

var transformR2L768L2RList = [document.getElementById("phase2")];
transformR2L768L2RList.splice(0,0,"transformR2L768L2R");

var fadeInList = [
	document.getElementById("phase1").getElementsByTagName("h1")[0],
	document.getElementById("phase2").getElementsByTagName("h1")[0]];
fadeInList.push(document.getElementsByTagName("video")[0]);
fadeInList.push(document.getElementsByTagName("video")[1]);
fadeInList.splice(0,0,"fadeIn");






setInterval(function(){ UpdateAnimation(); }, 16.66666);

function UpdateAnimation() {

	UpdateAnimationList.apply(null, transformLeftToRightList);
	UpdateAnimationList.apply(null, transformR2L768L2RList);
	UpdateAnimationList.apply(null, fadeInList);

}

function UpdateAnimationList(arg) {
	let animationClass = arguments[0];
	for(let i=1; i<arguments.length; i++) {
		let e = arguments[i];
		if(IsOnScreen(e)) {
			e.classList.add(animationClass);
		}
	}
}

function IsOnScreen(element) {
	let screenHeight = window.innerHeight;
	let elementHeight = element.getBoundingClientRect().top;
	return (elementHeight > 0) && (elementHeight < screenHeight);

} 