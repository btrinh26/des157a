// (function(){
//     "use strict";
//     console.log('running js');

//     const sections = document.querySelectorAll('section');
//     const headerImg = document.querySelector('#imgcontainer');
//     let sectionTops = [];
//     let pagetop;
//     let counter = 1;
//     let prevCounter = 1;
//     const imageHTML = [
//         '<img src="images/image1_1.png" height="400px" width="300px" id="img1">',
//         '<img src="images/image2_1.png" height="400px" width="300px" id="img2">',
//         '<img src="images/image3_1.png" height="400px" width="300px" id="img3">',
//         '<img src="images/image4_1.png" height="400px" width="300px" id="img4">',
//         '<img src="images/image5_1.png" height="400px" width="300px" id="img5">'
//     ];

//     sections.forEach(function (eachSection) {
//         sectionTops.push(Math.floor(eachSection.getBoundingClientRect().top) + window.scrollY);
//     });

//     window.addEventListener('scroll', function () {
//         pagetop = window.scrollY + 150;        

//         if (pagetop > sectionTops[counter]) {
//             counter++;
//         }
//         else if (counter > 1 && pagetop < sectionTops[counter - 1]) {
//             counter--;
//         }

//         if (counter != prevCounter) {
//             // do stuff to the page here
//             onSectionChange();
//             console.log('work2');
//         }
//     });

//     function onSectionChange(){
//         switch(counter){
//             case 1: 
//                 imageHTML[0] = '<img src="images/image1_2.png" height="400px" width="300px">';
//                 break;
//             case 2: 
//                 imageHTML[1] = '<img src="images/image2_2.png" height="400px" width="300px">';
//                 break;
//             case 3: 
//                 imageHTML[2] = '<img src="images/image3_2.png" height="400px" width="300px">'; 
//                     break;
//             case 4: 
//                 imageHTML[3] = '<img src="images/image4_2.png" height="400px" width="300px">';
//                     break;
//             case 5:
//                 imageHTML[4] = '<img src="images/image5_2.png" height="400px" width="300px">';
//                     break;
//             default: 
//                 headerP.innerHTML = "Ooops something went wrong!"; break;
//         }

//         // for( const eachPost of sections){
//         for(let i=0; i<sections.length; i++){
//             sections[i].className = 'offscreen';
//         }
//         document.querySelector(`#section0${counter}`).className = 'onscreen';

//         prevCounter = counter;
//     };
// })();

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
