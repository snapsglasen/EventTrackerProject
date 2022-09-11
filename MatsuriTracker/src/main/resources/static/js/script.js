window.addEventListener('load', function() {
	console.log('script.js loaded');
	init();
});


function init() {
	//event handlers for buttons and stuff
	loadAllEvents();

	document.addMatsuriForm.addMatsuri.addEventListener('click', function(evt) {
		evt.preventDefault();
		console.log("Adding matsuri now");
		let matsuri = {};
		matsuri.name = addMatsuriForm.name.value;
		matsuri.reason = addMatsuriForm.reason.value;
		matsuri.food = addMatsuriForm.food.value;
		matsuri.date = addMatsuriForm.date.value;
		matsuri.presents = addMatsuriForm.presents.value;
		addNewMatsuri(matsuri)
	});

	document.matsuriForm.lookup.addEventListener('click', function(evt) {
		evt.preventDefault();
		let matsuriId = document.matsuriForm.matsuriId.value;
		if (!isNaN(matsuriId) && matsuriId > 0) {
			getMatsuri(matsuriId);
		}
	});
	document.matsuriForm.delete.addEventListener('click', function(evt) {
		evt.preventDefault();
		let matsuriId = document.matsuriForm.matsuriId.value;
		if (!isNaN(matsuriId) && matsuriId > 0) {
			deleteMatsuri(matsuriId);
		}
	});
	document.updateMatsuriForm.update.addEventListener('click', function(evt) {
		evt.preventDefault();
		let matsuriId = document.updateMatsuriForm.matsuriId.value;
		if (!isNaN(matsuriId) && matsuriId > 0) {
		updateMatsuri(matsuriId);
		}
	});
}

function loadAllEvents() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/matsuris');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				displayEvents(JSON.parse(xhr.responseText));
			}
			else {
				console.error("Error loading events: " + xhr.status);
			}
		}
	};
	xhr.send();

}

function displayEvents(matsuriList) {
//	let dataDiv = document.getElementById("eventList");
//	dataDiv.textContent = '';
//	let ul = document.createElement('ul');
//	dataDiv.appendChild(ul);
//	for (let matsuri of matsuriList) {
//		let li = document.createElement('li');
//		li.textContent = matsuri.name;
//		ul.appendChild(li);
let tbody = document.querySelector('#eventList>table>tbody');
	tbody.textContent = '';
	for (let matsuri of matsuriList) {
		let tr = document.createElement('tr');
		tbody.appendChild(tr);
		let td = document.createElement('td');
		td.textContent = matsuri.id;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = matsuri.name;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = matsuri.reason;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = matsuri.food;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = matsuri.date;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = matsuri.presents;
		tr.appendChild(td);
		tr.addEventListener('click', function(evt){
			evt.preventDefault();
			console.log('Selected matsuri ' + matsuri.id);
		});
	
	}
}

function addNewMatsuri(matsuri) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/matsuris');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				console.log("matsuri created")
				displayMatsuri(JSON.parse(xhr.responseText));
			}
			else if (xhr.status === 400) {
				displayError('Invalid data');
			}
			else {
				displayError("Error creating matsuri: " + xhr.status);
			}
		}
	}
	xhr.setRequestHeader("Content-type", "application/json");
	let matsuriJson = JSON.stringify(matsuri);
	xhr.send(matsuriJson);
}

function displayMatsuri(matsuri) {
	let dataDiv = document.getElementById('matsuriData');
	dataDiv.textContent = '';
	let name = document.createElement('h1');
	name.textContent = matsuri.name;
	dataDiv.appendChild(name);
	let details = document.createElement('ul');
	let li1 = document.createElement('li')
	li1.textContent = "Date of Matsuri: " + matsuri.date;
	let li2 = document.createElement('li')
	li2.textContent = "Are Presents Given: " + matsuri.presents;
	details.appendChild(li1);
	details.appendChild(li2);
	dataDiv.appendChild(details);
	let food = document.createElement('blockquote');
	food.textContent = "Food Served: " + matsuri.food;
	let reason = document.createElement('blockquote');
	reason.textContent = "Reason for the Season: " + matsuri.reason;
	dataDiv.appendChild(reason);
	dataDiv.appendChild(food);
	
}

function displayError(msg) {
	let dataDiv = document.getElementById('matsuriData');
	dataDiv.textContent = '';
	dataDiv.textContent = msg;

}

function getMatsuri(matsuriId) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/matsuris/' + matsuriId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('Matsuri found')
				console.log(xhr.responseText);
				let matsuri = JSON.parse(xhr.responseText);
				displayMatsuri(matsuri);
			} else {
				console.log('Not Found')
				displayError('Matsuri ' + matsuriId + ' not found.')

			}
		}
	}
	xhr.send();
}

function deleteMatsuri(matsuriId) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/matsuris/' + matsuriId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 204) {
				console.log('Matsuri deleted')


			}

		}
	}
	xhr.send();

}

function updateMatsuri(matsuriId) {
	let matsuri = {
	    name : document.updateMatsuriForm.name.value,
		reason : document.updateMatsuriForm.reason.value,
		food : document.updateMatsuriForm.food.value,
		date : document.updateMatsuriForm.date.value,
		presents : document.updateMatsuriForm.presents.value
		}
	let xhr = new XMLHttpRequest();
	xhr.open('PATCH', 'api/matsuris/' + matsuriId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('Matsuri found')
				console.log(xhr.responseText);
				let matsuri = JSON.parse(xhr.responseText);
				displayMatsuri(matsuri);
			} else {
				console.log('Not Found')
				displayError('Matsuri ' + matsuriId + ' not found.')

			}
		}
	}
	xhr.setRequestHeader("Content-type", "application/json");
	let matsuriJson = JSON.stringify(matsuri);
	xhr.send(matsuriJson);


}

function displayRecipes(eventList) {
	let tbody = document.querySelector('#eventList>table>tbody');
	tbody.textContent = '';
	for (let matsuri of eventList) {
		let tr = document.createElement('tr');
		tbody.appendChild(tr);
		let td = document.createElement('td');
		td.textContent = matsuri.id;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = matsuri.name;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = matsuri.reason;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = matsuri.food;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = matsuri.date;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = matsuri.presents;
		tr.appendChild(td);
		tr.addEventListener('click', function(evt){
			console.log('Selected matsuri ' + matsuri.id);
		});
	}
}

