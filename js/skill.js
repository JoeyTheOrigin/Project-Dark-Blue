var skillMenus = document.getElementsByClassName("skillMenu");
var skillBarContainers = document.getElementsByClassName("skillBarContainer");
var skillContainer = document.getElementById("skillContainer");
var skillBarElements = document.getElementsByClassName("skillBarElement");
var tempHeight = "0px";


//add event listener
for(e of skillMenus) {
	AddOnClickEvent(e, SkillMenuOnclickFunction);
}

for(e of skillBarElements) {
	AddOnTransitionEndEvent(e,SkillBarTransitionEndFunction);
}

//initiate function
SkillMenuOnclickFunction(skillMenus[0]);

//functions

function SkillBarTransitionEndFunction(skillBarElement) {
	let next = skillBarElement.nextElementSibling;
	let bar = skillBarElement.getElementsByClassName("skillBar")[0].getElementsByTagName("div")[0];
	bar.style.display = "none";
	setTimeout(function() {
		
		bar.style.display = "block";
	},10);
	if(next != null) {
		next.style.opacity = 1;
		//next.getElementsByClassName("skillBar")[0].classList.remove("hide");
	}
}

function SkillMenuOnclickFunction(menuElement) {
	let skillBarContainerId = menuElement.id.slice(0, menuElement.id.length-4) + "SkillBarContainer";
	let skillBarContainer = document.getElementById(skillBarContainerId);

	if(window.getComputedStyle(skillBarContainer).display != "none") {
		return;
	}

	//reset all skill bar element's opacity 
	for(e of skillBarContainer.getElementsByClassName("skillBarElement")) {
		e.style.opacity = 0;
	}

	//update skill menu
	for(e of skillMenus) {
		e.classList.add("skillMenuNormalColor");
		e.classList.remove("skillMenuActiveColor");
	}
	menuElement.classList.add("skillMenuActiveColor");


	//update skill bars containers display
	for(e of skillBarContainers) {
		e.classList.add("hide");
	}
	skillBarContainer.classList.remove("hide");

	//update skill bars container height
	skillBarContainer.style.height = tempHeight;


	//let after = GetHeight(skillContainer);
	//skillContainer.style.height = before;


	//reset skill bars to toggle transition
	let localSkillBarElements = skillBarContainer.children;
	for(e of localSkillBarElements) {
		e.style.opacity = 0;
		e.getElementsByClassName("skillBar")[0].getElementsByTagName("div")[0].style.display = "none";
	}


	setTimeout(function() {
		localSkillBarElements[0].style.opacity = 1;
		skillBarContainer.style.height = GetSkillContainerHeight(skillBarContainer);
		tempHeight = skillBarContainer.style.height;
	}, 10);
}

function AddOnTransitionEndEvent(element, callBackFunction) {
	element.ontransitionend = function() {
		callBackFunction(element);
	}
}


function AddOnClickEvent(element, callBackFunction) {
	element.onclick = function() {
		callBackFunction(element);
	}
}

function GetHeight(element) {
	return element.clientHeight + "px";
}

function GetSkillContainerHeight(skillBarContainer) {
	let padding = ExtractCssValue(getComputedStyle(document.documentElement).getPropertyValue('--skillBarContainerPadding'));
	let screenWidth = document.documentElement.clientWidth;
	let textHeight = 23;
	
	let subMargin = 6;
	let mainMargin = 2.5*screenWidth/100;
	let n = skillBarContainer.children.length;
	//console.log("padding:" + padding + " textHeight:" +textHeight+ " subMargin:" +subMargin+ " mainMargin:" + mainMargin + "n:" + n);
	return (padding*2 + (textHeight + subMargin + mainMargin)*n) + "px";
}

function ExtractCssValue(cssString) {
	let ans = "";
	let validCharacter = "1234567890.";
	for(i=0;i<cssString.length;i++) {
		if(validCharacter.includes(cssString[i])) {
			ans += validCharacter[i];
		}
	}

	return parseFloat(ans);
}




