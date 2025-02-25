(function(){
    "use strict";
    console.log('running js');

    const sections = document.querySelectorAll('section');
    const images = document.querySelectorAll('#imgcontainer img');
    let sectionTops = [];
    let pagetop;
    let counter = 1;
    let prevCounter = 1;

    sections.forEach((eachSection) => {
        sectionTops.push(Math.floor(eachSection.getBoundingClientRect().top) + window.scrollY);
    });

    window.addEventListener('scroll', function () {
        pagetop = window.scrollY + 150;        

        if (counter < sectionTops.length && pagetop > sectionTops[counter]) {
            counter++;
        } 
        else if (counter > 1 && pagetop < sectionTops[counter - 1]) {
            counter--;
        }

        if (counter !== prevCounter) {
            onSectionChange();
            prevCounter = counter;
        }
    });

    function onSectionChange(){
        for (let i = 0; i < images.length; i++) {
            // images[i].className = "";
            images[i].style.opacity = "0.5";
            images[i].style.transform = "scale(1)";
            images[i].style.zIndex = "1";
        }

        if (images[counter - 1]) {
            // images[counter - 1].className = "highlight";
            images[counter - 1].style.opacity = "1";
            images[counter - 1].style.transform = "scale(1.5)"; 
            images[counter - 1].style.zIndex = "2";
        }

        for (let i = 0; i < sections.length; i++) {
            sections[i].className = "offscreen";
        }

        const targetSection = document.querySelector(`#section0${counter}`);
        if (targetSection) {
            targetSection.className = "onscreen"; 
        }
    }
})();
