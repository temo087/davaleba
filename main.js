const toggle = document.querySelector('.toggle')
const doma = document.querySelector('.doma')
const sans = document.querySelector('.sans')
const serif = document.querySelector('.serif')
const mono = document.querySelector('.mono')
const baro = document.querySelector('.baro')
const arrow = document.querySelector('.arrow')
const box = document.querySelector('.box')
let input = document.querySelector('input')
const form = document.querySelector('form')
const phonetic = document.querySelector('.phonetic')
const soundbtn = document.querySelector('.fr')
const vali = document.querySelector('.validation')
const ul = document.querySelector('ul')
const synonym = document.querySelector('.nota')
const ulori = document.querySelector('.meoreul')
const descript = document.querySelector('.descript')
const src = document.querySelector('.src')
const h1 = document.querySelector('h1')
const verb = document.querySelector('.verb')
const noun = document.querySelector('.noun')
const show = document.querySelector('.nihuiasebe')
const hide = document.querySelector('.nihuiasebe2')
const a = document.querySelector('a')
const line2 = document.querySelector('.line2')
const line1 = document.querySelector('.line1')
const line3 = document.querySelector('.line3')
let darkmode = false;
let chartuli = false;


form.addEventListener('submit', async (e) => {
    e.preventDefault()

    if(input.value.trim() === ''){
        vali.textContent = "Input Can't Be Empty"
    }else{
        vali.textContent = ""
        await getData()
        showdata();
    }

})

toggle.addEventListener('click', () => {
    if(darkmode === false){
        darkmode = true
        toggle.src = "assets/changed.svg"
        document.body.style.backgroundColor = "#050505"
        verb.style.color = "#FFF"
        noun.style.color = "#FFF"
        doma.style.color = "#FFF"
        src.style.color = "#FFF"
        input.style.backgroundColor = "#1F1F1F"
        input.style.color = "#FFF"
        line2.style.backgroundColor = "#3A3A3A"
        line3.style.backgroundColor = "#3A3A3A"
        line1.style.backgroundColor = "#3A3A3A"
        h1.style.color = "#FFF"

    }else if(darkmode === true){
        darkmode = false
        console.log('first')
        toggle.src = "assets/tavidan.svg"
        document.body.style.backgroundColor = "#FFF"
        verb.style.color = ""
        noun.style.color = ""
        doma.style.color = ""
        src.style.color = ""
        input.style.backgroundColor = ""
        input.style.color = ""
        line2.style.backgroundColor = ""
        line3.style.backgroundColor = ""
        line1.style.backgroundColor = ""
        h1.style.color = ""
    }
})

baro.addEventListener('click', () => {

    if(chartuli === false){
        arrow.classList.add('rotate')
        box.style.display = "flex"
        chartuli = true;
    }else{
        arrow.classList.remove('rotate')
        box.style.display = "none"
        chartuli = false;
    }
})
if(document.body.backgroundColor === "#050505"){
    document.box.style.backgroundColor = "#050505"
}
else{
    document.box.style.backgroundColor = "white"
}
sans.addEventListener('click', () => {

    document.body.style.fontFamily = "Inter"

})
serif.addEventListener('click', () => {

    document.body.style.fontFamily = "Lora"

})
mono.addEventListener('click', () => {

    document.body.style.fontFamily = "Inconsolata"

})

async function getData() {
    let res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`);
    
    if(res.status === 404){
        show.style.display = 'none'
        hide.style.display = 'flex'
        return;
    }else{
        show.style.display = 'flex'
        show.style.flexDirection = 'column'
        show.style.alignItems = 'center'
        show.style.justifyContent = 'center'
        hide.style.display = 'none'
    }

    data = await res.json();
}

function showdata() {
    const existingLi = ul.querySelector('li');

    if(existingLi){
        ul.removeChild(existingLi);
    }
    const existingLiori = ulori.querySelector('li');

    if(existingLiori){
        ulori.removeChild(existingLiori);
    }

    let lierti = document.createElement("li");

    input.value = '';
    phonetic.innerHTML = `${data[0].phonetic}`;
    doma.innerHTML = `${data[0].word}`;
    synonym.innerHTML = `${data[0].meanings[0].synonyms[0]}`

    lierti.textContent = `${data[0].meanings[0].definitions[0].definition}`;
    ul.appendChild(lierti);

    let liori = document.createElement("li");

    liori.textContent = `${data[0].meanings[1].definitions[0].definition}`
    descript.textContent = `"${data[0].meanings[1].definitions[0].example}"`
    src.textContent = `${data[0].sourceUrls[0]}`
    a.href = `${data[0].sourceUrls[0]}`

    ulori.appendChild(liori);
    
    if(darkmode === true){
        lierti.style.color = "#FFF";
        liori.style.color = "#FFF";

    } else if(darkmode === false){
        lierti.style.color = "#2D2D2D";
        liori.style.color = "#2D2D2D";

    }
}

soundbtn.addEventListener('click', () => {
    let sound = document.createElement('audio');

    sound.src = `${data[0].phonetics[2].audio}`;

    document.body.appendChild(sound);

    sound.play();
});
