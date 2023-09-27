const modeIcon = document.querySelector('.mode-icon');


//check for user preference
if (localStorage.getItem('dark-mode')) {
    document.documentElement.classList.add('dark-mode');
}

//Switch mode on click
modeIcon.addEventListener("click", ()=>{
    if(!document.documentElement.classList.contains('dark-mode')) {
        document.documentElement.classList.add('dark-mode');
        //save user preference to local storage
        localStorage.setItem('dark-mode', 'true');
    } else {
        document.documentElement.classList.remove('dark-mode');
        localStorage.removeItem('dark-mode', 'false');
    }
});

