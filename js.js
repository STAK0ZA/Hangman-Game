// set the title of the page
document.title="Hangman Game"
// make an var contans all alpha
let allletters="abcdefghijklmnopqrstuvwxyz"
let arrallletters=Array.from(allletters)
// get the section to put the letters on it 
let alphasction = document.querySelector(".all-alpha div")
// add all the letters to the spans 
arrallletters.forEach(letter=>{
    let spanletter=document.createElement("span")
    spanletter.innerHTML=letter
    spanletter.className="letter"
    alphasction.appendChild(spanletter)
})
// make an object and categories 

let xx=fetch("./names.json").then(ddata=>{ //fetch the json file
    return ddata.json() //to open the file and make it promise
}).then(dx=>{
    return dx.categories //get the categories content
}).then(cats=>{ //take the cats that have all content of the json 
let randomcat = Object.keys(cats) //that for get all cats in this obj
let random_cat=Math.floor(Math.random()*randomcat.length) //that for get an random number that in range in keys in this opjects
let cat=[randomcat[random_cat]] // that for get the categore name 
let cat_content =cats[randomcat[random_cat]] // that for get the categore all content
let chosenword = cat_content[Math.floor(Math.random()*cat_content.length)] // that for get the radom word from the chosen categore

// get the span that should have the categore on the page 
document.querySelector(".header .section span").innerHTML=cat

// after i get the random word make that span that the same size of the word letter size
let last_section= document.querySelector(".word-section")
Array.from(chosenword).forEach((letter)=>{
    let spanbox=document.createElement("span")
    if(letter==" "){
        spanbox.classList.add("space")
    }
    last_section.appendChild(spanbox)
})

let spansbox=document.querySelectorAll(".word-section span")
// add event that when i click to an element to check if the letter correct or not 
let number_of_tries=0 //that for check for number of tries
let counter=0
document.addEventListener("click",(e)=>{
    if(e.target.classList=="letter")
        {
            e.target.classList.add("clicked")
            Array.from(chosenword).forEach((ele,index)=>{
            if(ele.toUpperCase() === e.target.innerHTML.toUpperCase()){
                spansbox[index].innerHTML=e.target.innerHTML
                counter++
            }
            })
            if(chosenword.toUpperCase().includes(e.target.innerHTML.toUpperCase()) ){
                let correct_audio=document.querySelector(".correct")
                correct_audio.currentTime =0
                correct_audio.play()
                
            }
            else{
                let false_audi=document.querySelector(".false")
                false_audi.currentTime =0
                false_audi.play()
                number_of_tries++
                document.querySelector(".man").classList.add(`wrong-${number_of_tries}`)
            }
            if( number_of_tries==8 || counter==chosenword.split(" ").join("").length){
                document.querySelector(".all-alpha").style.pointerEvents="none"
                endgame(number_of_tries);
            }
    }
})
function endgame(x){
    let pop =document.querySelector(".popup")
    let agian=document.querySelector(".btn")
    agian.style.display="block"
    agian.onclick=()=>{
        window.location.reload()
    }
    pop.style.opacity=1;
    if(x!=8){
        pop.classList.add("won")
        let time =setInterval((()=>{
            let winnig=document.querySelector(".servive")
            winnig.play()
            clearInterval(time)
        }),500)
        pop.innerHTML="NICE you won and save the man from dieing".toLocaleUpperCase()
    }
    else{
        document.querySelector(".theword span").innerHTML=chosenword
        document.querySelector(".theword").style.opacity=1
        pop.classList.add("lose")
        let time =setInterval((()=>{
            let losing=document.querySelector(".killed")
            losing.play()
            clearInterval(time)
        }),500)
        pop.innerHTML=" GAME OVER YOU KILLED THE MAN"
    }
}

})