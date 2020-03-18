document.addEventListener("DOMContentLoaded", () => {
  console.log("we're up");
  const form = document.getElementById("github-form");
  const search = document.getElementById("search");
  const githubUserList = document.getElementById("user-list");
  const reposList = document.getElementById("repos-list");

  const getRepoList = json => {
    console.log(json);
    json.forEach(row => {
      let repo = document.createElement("li");
      repo.innerText = row.name;
      reposList.appendChild(repo);
    });
  };

  const createUser = json => {
    console.log(json);
    let user = document.createElement("div");

    let username = document.createElement("li");
    username.setAttribute("class", "user");
    username.innerText = json.items[0].login;
    user.appendChild(username);

    let githubUrl = document.createElement("a");
    githubUrl.innerHTML = "github url";
    githubUrl.href = json.items[0].html_url;
    user.appendChild(githubUrl);

    let avatar = document.createElement("img");
    avatar.src = json.items[0].avatar_url;
    user.appendChild(avatar);

    githubUserList.append(user);

    user.addEventListener("click", () => {
      let username = json.items[0].login;
      const API = `https://api.github.com/users/${username}/repos`;
      fetch(API)
        .then(response => response.json())
        .then(repo => getRepoList(repo));
    });
  };

  const LoadUserInfo = event => {
    event.preventDefault();
    const API = `https://api.github.com/search/users?q=${search.value}`;
    console.log(search.value);
    fetch(API, {
      headers: { Accept: "application/vnd.github.v3+json" }
    })
      .then(response => response.json())
      .then(data => createUser(data));
  };

  form.addEventListener("submit", event => {
    event.preventDefault();
    LoadUserInfo(event);
  });
});
