document.addEventListener("DOMContentLoaded", () => {
  console.log("we're up");
  const form = document.getElementById("github-form");
  const search = document.getElementById("search");

  form.addEventListener("submit", event => {
    event.preventDefault();
    console.log(search.value);

    const API = `https://api.github.com/search/users?q=${search.value}`;
    console.log(API);
    fetch(API, {
      headers: { Accept: "application/vnd.github.v3+json" }
    })
      .then(response => response.json())
      .then(data => console.log(data));
  });
});
