// (function(){
//     "use strict";
//     console.log('running js');

//     const sections = document.querySelectorAll('section');
//     const headerImg = document.querySelector('#imgcontainer');
//     let sectionTops = [];
//     let pagetop;
//     let counter = 1;
//     let prevCounter = 1;

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
//         }
//     });

//     function onSectionChange(){
//         switch(counter){
//             case 1: headerImg.innerHTML = "<img src='images/image1_2.png' height='400px' width='300px'>"; break;
//             case 2: headerImg.innerHTML = "<img src='images/image2_2.png' height='400px' width='300px'>"; break;
//             case 3: headerImg.innerHTML = "<img src='images/image3_2.png' height='400px' width='300px'>"; break;
//             case 4: headerImg.innerHTML = "<img src='images/image4.png' height='400px' width='300px'>"; break;
//             case 5: headerImg.innerHTML = "<img src='images/image4.png' height='400px' width='300px'>"; break;
//             default: headerP.innerHTML = "Ooops something went wrong!"; break;
//         }

//         // for( const eachPost of sections){
//         for(let i=0; i<sections.length; i++){
//             sections[i].className = 'offscreen';
//         }
//         document.querySelector(`#section0${counter}`).className = 'onscreen';

//         prevCounter = counter;
//     };
// })();