const form = document.getElementById("github-form")
let userList = document.getElementById('user-list')
let repoList = document.getElementById('repos-list')
form.addEventListener('submit', searchUser)

function searchUser(e){
    e.preventDefault()

    var search = document.getElementById(`search`).value
    fetch(`https://api.github.com/search/users?q=${search}`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        }
    })
    
    .then((response) => response.json())
    .then((responseData) => {
        for (i = 0; i < responseData.items.length; i++){
            //pull elements out of data
            let profilePic = responseData.items[i]?.avatar_url
            let pageURL = responseData.items[i].html_url
            let login = responseData.items[i].login
            //create elements to insert our data
            let li = document.createElement('li')
            let img = document.createElement('img')
            let a = document.createElement('a')
            let p = document.createElement('p')
            p.innerText = `${login}`
            img.src = `${profilePic}`
            a.href = `${pageURL}`
            userList.appendChild(li)
            li.append(img, a)
            a.append(p)
            img.addEventListener('click', () => getRepos(login))
            li.appendChild(a)
        }
    })
    
    function getRepos(login){
        let reposList = document.getElementById("repos-list")
        //this wihle clears the repo list 
        while (reposList.lastElementChild){
            reposList.removeChild(reposList.firstChild);
            console.log('working in backgroun')
        }
        fetch(`https://api.github.com/users/${login}/repos`)
        .then(res => res.json())
        .then(res=> {
            for (i = 0; i < res.length; i++){
                let li = document.createElement('li')
                repoList.appendChild(li)
                li.innerText = `- ${res[i].name}`
            }
        })
    }
}


