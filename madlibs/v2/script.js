(function(){
    "use strict";
    console.log('reading js');
    
    const myForm = document.querySelector('#myform');
    const madlib = document.querySelector('#madlib');
    const words = [];

    const page1Form = document.querySelector('#page1form');
    const page1Instruction = document.querySelector('#page1instruction');
    const page2story = document.querySelector('#page2story');
    const page2Instruction = document.querySelector('#page2instruction');

    myForm.addEventListener('submit', function(event){
        event.preventDefault();

        const formData = document.querySelectorAll('input[type=text]');
        for (let i=0; i<formData.length; i++){
            words.push(formData[i].value);
            formData[i].value = "";
        }

        const myText = `This morning, I got out of bed and immediately stubbed my toe on a <b>${words[0]}</b> . What a <b>${words[1]}</b> way to start the day. After that, I got dressed and grabbed some <b>${words[2]}</b> for breakfast.<br><br>
                    
        Making my way to campus, I made it to class where my professor announced there would be a quiz today. I panicked because I had been <b>${words[3]}</b> instead of studying last night. By the time it was over, I felt <b>${words[4]}</b> but happy to survive.<br><br>
                    
        After getting lunch, I realized I was running late for my <b>${words[5]}</b> lecture. I <b>${words[6]}</b> as fast as I could, almost crashing into a <b>${words[7]}</b>. <br><br>

        Finishing that lecture, I thought I could relax, but instead, something <b>${words[8]}</b> happened. As I turned the corner to my apartment, I saw a <b>${words[9]}</b> standing in front of my door. I <b>${words[10]}</b> walked past it and <b>${words[11]}</b> for the rest of the day.`;
        console.log('1');

        page1Form.style.display = 'none';
        page1instruction.style.display = 'none';

        page2story.style.display = 'block';
        page2instruction.style.display = 'flex';
        madlib.innerHTML = myText;
        console.log('2');
    })

})();