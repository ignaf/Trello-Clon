const sideBar = document.querySelector(".sidebar");

sideBar.addEventListener("click",function(){
    this.classList.toggle("sidebar--expanded");
});