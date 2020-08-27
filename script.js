let colors = ['#EEEDF0', '#A1B5C1', '#F9ACA7', '#68747D', '#CF365F']
let prevColors = [];
let timerMessage = ''


function rgbToHex(rgbArray) {
    let [r, g, b] = rgbArray
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function addListeners() {
    document.addEventListener('keydown', (e) => {
        if (e.code == 'KeyC') {
            copyToClipboard(colors)
            showMessage('Current palette copied to your clipboard');
            document.querySelector('.btn_copy').setAttribute('data-active', '')
            setTimeout(() => {
                document.querySelector('.btn_copy').removeAttribute('data-active', '')
            }, 200)
        } else if (e.code == 'Space') {
            nextPalette()
            document.querySelector('.btn_generate').setAttribute('data-active', '')
            setTimeout(() => {
                document.querySelector('.btn_generate').removeAttribute('data-active', '')
            }, 200)
        } else if (e.code == 'KeyZ') {
            prevPalette()
        }
    });
    document.querySelectorAll('.palette-card').forEach(card => {
        card.addEventListener('click', function () {
            copyToClipboard(this.innerText)
            showMessage(`Color ${this.innerText} copied to your clipboard`);
        })
    })
    document.querySelector('.btn_generate').addEventListener('click', nextPalette)
    document.querySelector('.btn_copy').addEventListener('click', () => {
        copyToClipboard(colors)
        showMessage('Current palette copied to your clipboard');
    })
}

function createCards(colors) {
    let container = document.querySelector('.palette-container')
    for (let i = 0; i < colors.length; i++) {
        let color = colors[i]

        let card = document.createElement('div')
        card.classList.add('palette-card')

        let cardColor = document.createElement('div')
        cardColor.classList.add('palette-color')
        cardColor.style.backgroundColor = color;
        card.appendChild(cardColor)

        let cardTitle = document.createElement('div')
        cardTitle.classList.add('palette-title')
        cardTitle.innerText = color
        card.appendChild(cardTitle)

        container.appendChild(card)
    }
}

function init() {
    createCards(colors)
    addListeners()
}

async function nextPalette() {
    document.querySelector('.btn_generate').disabled = true
    prevColors = colors
    colors = await getColors()
    changeColors(colors)
    document.querySelector('.btn_generate').disabled = false
}
function prevPalette() {
    [prevColors, colors] = [colors, prevColors]
    changeColors(colors)
}

function changeColors(palette) {
    let cards = document.querySelectorAll('.palette-card')
    let cardsBg = document.querySelectorAll('.palette-color')
    let cardTitles = document.querySelectorAll('.palette-title')
    
    for (let i = 0; i < palette.length; i++) {
        setTimeout(() => {
            cards[i].classList.add('rotate-card')
            cardsBg[i].style.backgroundColor = palette[i]
            cardTitles[i].classList.add('hide')
            setTimeout(() => {
                cardTitles[i].innerText = palette[i]
                cardTitles[i].classList.remove('hide')
            }, 450)
        }, i * 100)
    }

    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.remove('rotate-card')
        })
    }, 900)
}

function showMessage(message) {
    if (timerMessage) {
        clearTimeout(timerMessage)
    }
    let messageContainer = document.querySelector('.message')
    messageContainer.innerText = message;
    messageContainer.classList.add('show')
    timerMessage = setTimeout(() => {
        messageContainer.classList.remove('show')
    }, 3000)
}

async function getColors() {
    try {
        const response = await axios({
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: 'http://colormind.io/api/',
            data: {"model": "default"}
          })
        return response.data.result.map(colorRGB => rgbToHex(colorRGB))
    } catch (e) {
        console.log(`😱 Request failed: ${e}`);
    }
}

function copyToClipboard(obj) {
    var tempInput = document.createElement('input');
    document.body.appendChild(tempInput)
    tempInput.value = obj
    tempInput.select();
    document.execCommand('copy');
    tempInput.remove();
}

init()