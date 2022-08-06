const formOne = document.getElementById("github-form")
// console.log(formOne)
let userList = document.getElementById('user-list')
// let li = document.createElement('li')
let repoList = document.getElementById('repos-list')
// console.log(repoList)
formOne.addEventListener('submit', searchUser)

function searchUser(e){
    // formOne.addEventListener('submit', function(e){
    e.preventDefault()

    var search = document.getElementById(`search`).value
    console.log(search)
    fetch(`https://api.github.com/search/users?q=${search}`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        }
    })
    
    .then((response) => response.json())
    .then((responseData) => {
        console.log(responseData.items)
        for (i = 0; i < responseData.items.length; i++){
            let profilePic = responseData.items[i]?.avatar_url
            let pageURL = responseData.items[i].html_url
            let login = responseData.items[i].login
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
            // li.innerText = `${login}`
            li.appendChild(a)
            // li.innerHTML = `<img class="userAvatar" src="${profilePic}" /> ${login}, <a href="${pageURL}">${pageURL}</a>`
            // console.log(document.getElementsByClassName("userAvatar"))
        }
        console.log(document.getElementsByClassName("userAvatar"))
    })
    // .then(() =>   console.log(document.getElementsByClassName("userAvatar")))

    // .then((responseData) => {
    //     let profilePic = responseData.items[0].avatar_url
    //     let pageURL = `https://github.com/${search}`
    //     let li = document.createElement('li')
    //     // console.log(responseData.items[0])
    //     userList.appendChild(li)
    //     li.innerHTML = `<img id="userAvatar" src="${profilePic}" /> ${search}, <a href="${pageURL}">${pageURL}</a>`
    //     let userAvatar = document.getElementById("userAvatar")
    //     // console.log(userAvatar)
    //     // console.log(profilePic)
    //     // console.log(pageURL)
    // })
    // .then(() => {
    //     userAvatar.addEventListener('click',getRepos)
    // })


    function getRepos(login){
        let reposList = document.getElementById("repos-list")
        while (reposList.lastElementChild){
            reposList.removeChild(reposList.firstChild);
            console.log('working in backgroun')
        }
        // console.log(reposListNodes)
        // return fetch(`https://api.github.com/users/${login}/repos`)
        fetch(`https://api.github.com/users/${login}/repos`)
        .then(res => res.json())
        .then(res=> {
            for (i = 0; i < res.length; i++){
                let li = document.createElement('li')
                // console.log(res)
                repoList.appendChild(li)
                li.innerText = `- ${res[i].name}`
                // console.log(res[i].name)
            }
        })
    }
}


