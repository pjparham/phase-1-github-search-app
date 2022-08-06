const formOne = document.getElementById("github-form")
console.log(formOne)
let userList = document.getElementById('user-list')
// let li = document.createElement('li')
let repoList = document.getElementById('repos-list')
console.log(repoList)
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
        let profilePic = responseData.items[0].avatar_url
        let pageURL = `https://github.com/${search}`
        let li = document.createElement('li')
        // console.log(responseData.items[0])
        userList.appendChild(li)
        li.innerHTML = `<img id="userAvatar" src="${profilePic}" /> ${search}, <a href="${pageURL}">${pageURL}</a>`
        let userAvatar = document.getElementById("userAvatar")
        // console.log(userAvatar)
        // console.log(profilePic)
        // console.log(pageURL)
    })
    .then(() => {
        userAvatar.addEventListener('click',getRepos)
    })

    function getRepos(){
        return fetch(`https://api.github.com/users/${search}/repos`)
        .then(res => res.json())
        .then(res=> {
            for (i = 0; i < res.length; i++){
                let li = document.createElement('li')
                console.log(res)
                repoList.appendChild(li)
                li.innerText = `- ${res[i].name}`
                console.log(res[i].name)
            }


            // let li = document.createElement('li')
            // console.log(res)
            // repoList.appendChild(li)
            // li.innerText = `${res[12].name}`
            // console.log(res[12].name)
        })
    }
}


// function getRepos(){
//     fetch()
// }



// `https://api.github.com/search/users?q=${usernameInput}`
