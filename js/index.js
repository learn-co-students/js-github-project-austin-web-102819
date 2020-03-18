document.addEventListener("DOMContentLoaded", () => {
  console.log("we're up");
  const form = document.getElementById("github-form");
  const search = document.getElementById("search");
  const githubUserList = document.getElementById("user-list");

  const createUser = json => {
    console.log(json);
    let user = document.createElement("li");
    user.innerText = json.items[0].login;
    githubUserList.appendChild(user);

    let githubUrl = document.createElement("a");
    githubUrl.innerHTML = "github url";
    githubUrl.href = json.items[0].html_url;
    githubUserList.appendChild(githubUrl);

    let avatar = document.createElement("img");
    avatar.src = json.items[0].avatar_url;
    githubUserList.appendChild(avatar);
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
