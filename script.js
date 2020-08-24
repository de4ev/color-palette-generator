let palette = ['#EEEDF0', '#A1B5C1', '#F9ACA7', '#68747D', '#CF365F']
let palette2 = ['#CF365F', '#F9ACA7', '#68747D', '#A1B5C1', '#EEEDF0']
// let colors = [[238, 237, 240], [161, 181, 193],[249, 172, 167],[104, 116, 125],[207, 54, 95]]

document.addEventListener('keydown', (e) => {
    if (e.code == 'KeyC') {
        document.querySelector('.btn_copy').setAttribute('data-active', '')
        setTimeout(()=>{
            document.querySelector('.btn_copy').removeAttribute('data-active', '')
        }, 200)
    } else if (e.code == 'Space') {
        changeColors()
        document.querySelector('.btn_generate').setAttribute('data-active', '')
        setTimeout(()=>{
            document.querySelector('.btn_generate').removeAttribute('data-active', '')
        }, 200)
    }
})
 
function createCards(colors) {
    let container = document.querySelector('.palette-container')
    for (let i = 0; i < colors.length; i++) {
        let card = document.createElement('div')
        card.classList.add('palette-card')
        let cardColor = document.createElement('div')
        cardColor.classList.add('palette-color')
        cardColor.style.backgroundColor = colors[i];
        let cardTitle = document.createElement('div')
        cardTitle.classList.add('palette-title')
        cardTitle.innerText = colors[i]
        card.appendChild(cardColor)
        card.appendChild(cardTitle)
        container.appendChild(card)
    }
}
createCards(palette)

document.querySelectorAll('.palette-card').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('is-flipped');
    })
})


let btnGenerate = document.querySelector('.btn_generate')
btnGenerate.addEventListener('click', changeColors)

function changeColors() {
    btnGenerate.disabled = true
    let cards = document.querySelectorAll('.palette-card')
    let cardsBg = document.querySelectorAll('.palette-color')
    let cardTitles = document.querySelectorAll('.palette-title')
    for (let i = 0; i < palette.length; i++) {
        setTimeout(() => {
            cards[i].classList.add('rotate-card')
            cardsBg[i].style.backgroundColor = palette2[i]
            cardTitles[i].classList.add('hide')
            setTimeout(()=> {
                cardTitles[i].innerText = palette2[i]
                cardTitles[i].classList.remove('hide')
            }, 300)
        }, i*200)
    }
    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.remove('rotate-card')
        })
        btnGenerate.disabled = false
    }, 2000)
    
}



let timer  = ''
function showMessage() {
    if (timer) {
        clearTimeout(timer)
    }
    document.querySelector('.message').classList.add('show')
    timer = setTimeout( () => {
        document.querySelector('.message').classList.remove('show')
    },3000)
}
