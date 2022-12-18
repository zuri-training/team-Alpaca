// Navbar menu functionality

const menu = document.querySelector('.links')
const menuBtn = document.querySelector('#open-menu-btn')
const closeBtn = document.querySelector('#close-menu-btn')

menuBtn.addEventListener('click', () => {
    menu.style.display = 'flex'
    closeBtn.style.display = 'inline-block'
    menuBtn.style.display = 'none'
})

closeBtn.addEventListener('click', () => {
    menu.style.display = 'none'
    closeBtn.style.display = 'none'
    menuBtn.style.display = 'inline-block'
})

//search functionality

function searchFunction(){
    var input= document.getElementById('search-bar').value
    input = input.toLowerCase();
    var x = document.getElementsByClassName("grid-item");
    

    for(i=0; i < x.length; i++){
        if(!x[i].innerHTML.toLowerCase().includes(input)){
            x[i].style.display="none";
        }

        else{
            x[i].style.display="block"
        }
    }
}
searchFunction();
