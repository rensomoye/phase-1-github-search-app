document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded")

    const form = document.getElementById("github-form")
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        // event.target[0].value
        fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
        .then(response => response.json())
        .then (response => {
            // console.log("response", response))
            // login, avatar_url, url
            const userList = document.querySelector("#user-list")
            userList.innerHTML = ""
            const reposList = document.getElementById("repos-list")
            reposList.innerHTML = ""
            response.items.map(item => {
                const li = document.createElement("li")
                const h2 = document.createElement("h2")
                h2.textContent = item.login
                h2.addEventListener("click", e => showUserRepos(item.login, e))
                
                const img = document.createElement("img")
                img.src = item.avatar_url

                li.append(h2, img)
                userList.append(li)
            })
        })
        // to clear form after submit is clicked:
        form.reset()
    })
})

function showUserRepos(username, e){
    const reposList = document.getElementById("repos-list")
    reposList.innerHTML = ""
    e.preventDefault()
    // console.log("username", username)
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    // .then(response => console.log("user repos", response))
    .then(response => response.map(repo => {
        const li = document.createElement("li")
        const h1 = document.createElement("hi")
        h1.textContent = repo. name
        li.append(h1)
        reposList.append(li)
    }))   
}
