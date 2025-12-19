// wait for dom to load
document.addEventListener("DOMContentLoaded", () => {
  // dom elements
  const search = document.getElementById("search");
  const searchBtn = document.getElementById("search-btn");
  const profile = document.getElementById("profile-container");
  const error = document.getElementById("error-container");
  const avatar = document.getElementById("avatar");
  const name = document.getElementById("name");
  const username = document.getElementById("username");
  const bio = document.getElementById("bio");
  const location = document.getElementById("location");
  const joined = document.getElementById("joined-date");
  const profileLink = document.getElementById("profile-link");
  const followers = document.getElementById("followers");
  const following = document.getElementById("following");
  const repos = document.getElementById("repos");
  const company = document.getElementById("company");
  const blog = document.getElementById("blog");
  const twitter = document.getElementById("twitter");
  const reposContainer = document.getElementById("repos-container");

  // event listeners
  searchBtn.addEventListener("click", searchUser);
  search.addEventListener("keypress", (e) => e.key === "Enter" && searchUser());

  // search user
  async function searchUser() {
    const user = search.value.trim();
    if (!user) return alert("Please enter a username");

    try {
      profile.classList.add("hidden");
      error.classList.add("hidden");

      const res = await fetch(`https://api.github.com/users/${user}`);
      if (!res.ok) throw new Error("User not found");

      const data = await res.json();
      displayUser(data);
      fetchRepos(data.repos_url);
    } catch (err) {
      error.classList.remove("hidden");
    }
  }

  // fetch repositories
  async function fetchRepos(url) {
    reposContainer.innerHTML = '<div class="loading-repos">Loading repositories...</div>';

    try {
      const res = await fetch(url + "?per_page=6");
      const data = await res.json();
      displayRepos(data);
    } catch (err) {
      reposContainer.innerHTML = `<div class="no-repos">${err.message}</div>`;
    }
  }

  // display user
  const displayUser = (u) => {
    avatar.src = u.avatar_url;
    name.textContent = u.name || u.login;
    username.textContent = `@${u.login}`;
    bio.textContent = u.bio || "No bio available";
    location.textContent = u.location || "Not specified";
    joined.textContent = formatDate(u.created_at);
    profileLink.href = u.html_url;
    followers.textContent = u.followers;
    following.textContent = u.following;
    repos.textContent = u.public_repos;
    company.textContent = u.company || "Not specified";
    blog.textContent = u.blog || "No website";
    blog.href = u.blog ? (u.blog.startsWith("http") ? u.blog : `https://${u.blog}`) : "#";
    twitter.textContent = u.twitter_username ? `@${u.twitter_username}` : "No Twitter";
    twitter.href = u.twitter_username ? `https://twitter.com/${u.twitter_username}` : "#";
    profile.classList.remove("hidden");
  };

  // display repositories
  const displayRepos = (repos) => {
    repos.length === 0 ? (
      reposContainer.innerHTML = '<div class="no-repos">No repositories found</div>'
    ) : (
      reposContainer.innerHTML = repos.map(r => `
        <div class="repo-card">
          <a href="${r.html_url}" target="_blank" class="repo-name">
            <i class="fas fa-code-branch"></i> ${r.name}
          </a>
          <p class="repo-description">${r.description || "No description available"}</p>
          <div class="repo-meta">
            ${r.language ? `<div class="repo-meta-item"><i class="fas fa-circle"></i> ${r.language}</div>` : ""}
            <div class="repo-meta-item"><i class="fas fa-star"></i> ${r.stargazers_count}</div>
            <div class="repo-meta-item"><i class="fas fa-code-fork"></i> ${r.forks_count}</div>
            <div class="repo-meta-item"><i class="fas fa-history"></i> ${formatDate(r.updated_at)}</div>
          </div>
        </div>
      `).join("")
    );
  };

  // format date
  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  // default search
  search.value = "prvdnx";
  searchUser();
});
