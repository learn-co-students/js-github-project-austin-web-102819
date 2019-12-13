window.addEventListener('DOMContentLoaded', (e) => {
	const search = document.getElementById('search');
	const submit = document.getElementById('submit');

	userButton.addEventListener('click', (e) => {
		e.preventDefault();
		fetchUserAPI();
	});

	repoButton.addEventListener('click', (e) => {
		fetchRepoAPI(document.getElementById('search').value);
	});

	let userConfigObject = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application / vnd.github.v3 + json'
		}
	};

	let repoConfigObject = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application / vnd.github.v3 + json'
		}
	};

	function fetchUserAPI() {
		let url = `https://api.github.com/search/users?q=${search.value}`;
		fetch(url, userConfigObject)
			.then((response) => response.json())
			.then((object) => {
				listUsers(object);
			});
	}

	function listUsers(users) {
		const user_list = document.getElementById('user-list');
		for (key in users['items']) {
			const li = document.createElement('li');
			li.innerHTML = `${users['items'][key].login} - <a href='${users['items'][key].avatar_url}'>Avatar</a>`;
			li.id = users['items'][key].login;
			li.setAttribute('data-username', `${users['items'][key].login}`);
			li.addEventListener('click', function() {
				fetchRepoAPI(this.id);
			});
			user_list.appendChild(li);
		}
	}

	function fetchRepoAPI(arg) {
		console.log(arg['data-username']);

		let url = `https://api.github.com/users/${arg}/repos`;
		console.log(url);

		fetch(url, repoConfigObject)
			.then((response) => response.json())
			.then((object) => {
				listRepos(object);
			});
	}

	function listRepos(repos) {
		let img = document.createElement('img');
		const user_list = document.getElementById('repos-list');
		user_list.innerHTML = '';
		for (key in repos) {
			const li = document.createElement('li');
			li.innerText = repos[key].name;
			user_list.appendChild(li);
		}
	}
});
