

const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	water: '#DEF3FD',
	ground: '#F4E7DA',
	poison: '#98d7a5',
	bug: '#F8D5A3',
	flying: '#F5F5F5',
	electric: '#FCF7DE'
}
let isFormDisplay = false

document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('form').addEventListener('submit', (e) => handleSubmitForm(e))
	displayForm()
	fetchKantoPokemon()
})

function fetchKantoPokemon() {
	fetch("http://localhost:3000/pokemons")
		.then(response => response.json())
		.then(allpokemon => allpokemon.forEach(poke => loadPokemon(poke)))
		.catch(err => console.error('There is an error: ', err))
}

function loadPokemon(poke) {
	const div = document.createElement('div')
	div.className = 'card'
	div.style.backgroundColor = colors[poke.type]
	const img = document.createElement('img')
	const name = document.createElement('h5')
	const type = document.createElement('p')
	const weight = document.createElement('p')
	const likeBtn = document.createElement('button')
	likeBtn.className = 'btn'
	likeBtn.addEventListener('click', () => {
		poke.like = !poke.like
		handleLike(poke)

		likeBtn.textContent = poke.like ? "❤️" : "♡"
	})
	img.setAttribute('src', poke.img_url)
	const x = poke.name[0].toUpperCase()
	name.textContent = x + poke.name.slice(1)
	type.textContent = "Type: " + poke.type
	weight.textContent = "Weight: " + poke.weight + " lb"

	likeBtn.textContent = poke.like ? "❤️" : "♡"
	div.append(img, name, type, weight, likeBtn)


	document.querySelector('.container').append(div)

}

function handleLike(poke) {
	fetch(`http://localhost:3000/pokemons/${poke.id}`, {
		method: "PATCH",
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(poke)
	})
}

function displayForm() {
	if (isFormDisplay) {
		document.querySelector('form').style.display = 'block'
	} else {
		document.querySelector('form').style.display = 'none'
	}
}
function handleDisplayForm() {
	isFormDisplay = !isFormDisplay
	displayForm()
}

function handleSubmitForm(e) {
	e.preventDefault()

	const name = document.querySelector('#name').value

	const img = document.querySelector('#img').value

	const type = document.querySelector('#type').value

	const weight = document.querySelector('#weight').value

	const poke = {
		"name": name,
		"img_url": img,
		"like": false,
		"type": type,
		"weight": weight

	}

	fetch('http://localhost:3000/pokemons', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(poke)
	})
		.then(res => res.json())
		.then(allpokemon => allpokemon.forEach(poke => loadPokemon(poke)))
		.catch(err => console.error('There is an error: ', err))

	isFormDisplay = !isFormDisplay
	displayForm()
}