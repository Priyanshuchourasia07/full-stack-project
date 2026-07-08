const buttons = document.querySelectorAll(".completeBtn");
const progressBar = document.getElementById("progress");
const progressText = document.getElementById("progressText");

let completed = 0;
const totalCourses = buttons.length;

buttons.forEach(button => {

button.addEventListener("click", function(){

if(!this.classList.contains("completed")){

this.classList.add("completed");

this.innerHTML="Completed ✓";

completed++;

let percent = (completed/totalCourses)*100;

progressBar.style.width = percent + "%";

progressText.innerHTML = Math.round(percent) + "% Completed";

}

});

});

const search = document.getElementById("search");

search.addEventListener("keyup", function(){

let filter = this.value.toLowerCase();

let courses = document.querySelectorAll(".course");

courses.forEach(course=>{

let title = course.querySelector("h2").innerText.toLowerCase();

if(title.includes(filter)){

course.style.display="block";

}else{

course.style.display="none";

}

});

});

const themeBtn=document.getElementById("themeBtn");

themeBtn.addEventListener("click",function(){

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

this.innerHTML="☀ Light Mode";

}else{

this.innerHTML="🌙 Dark Mode";

}

});