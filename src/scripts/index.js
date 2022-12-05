function userCard(user){
    let cardDiv = document.createElement("div");
    let userImg = document.createElement("img");
    let textDiv = document.createElement("div");
    let userName = document.createElement("strong");
    let userOcupation = document.createElement("p");

    userImg.src = user.img;
    userImg.alt = user.user;
    userName.innerText = user.user;
    userOcupation.innerText = user.stack;

    
    userImg.classList.add("userImg");
    cardDiv.classList.add("divCard");
    textDiv.classList.add("divText");
    userName.classList.add("user-name");
    userOcupation.classList.add("user-ocupation");

    textDiv.append(userName, userOcupation);
    cardDiv.append(userImg, textDiv);

    return cardDiv;
}

function loggedUser(user){
    let logFormDiv = document.querySelector(".logged-form");
    
    logFormDiv.appendChild(userCard(user));
}

function createForm(){
    let logFormDiv = document.querySelector(".logged-form");
    let postForm = document.createElement("form");
    let titleInput = document.createElement("input");
    let postInput = document.createElement("input");
    let postItButton = document.createElement("button");
    

    titleInput.placeholder = "Digitar título do post";
    postInput.placeholder = "Digitar descrição do post";
    postItButton.innerText = "Postar";
    
    
    titleInput.classList.add("titleInput");
    postInput.classList.add("postInput")
    postItButton.classList.add("buttonPost"); 

    postForm.append(titleInput, postInput, postItButton);
    logFormDiv.appendChild(postForm);
}

searchUserId = (userId) => {
    for(let i = 0; users.length; i++){
        if(users[i].id === userId){
            return users[i];
        }
    }
}

createSuggestions = () => {
    let mainDiv = document.querySelector(".div_main");
    let suggestionDiv = document.createElement("div");
    let suggestionTitle = document.createElement("p");
    let suggestionUsers = document.createElement("div");
    let stickyDiv = document.createElement("div");
    
    suggestionTitle.innerText = "Sugestões para você seguir";

    
    suggestionDiv.classList.add("suggestDiv");
    suggestionUsers.classList.add("suggest-users_div");
    suggestionTitle.classList.add("suggest-title");
    stickyDiv.classList.add("sticky-div");

    
    for(let i = 0; i < sugestUsers.length; i++){
        let followCard = document.createElement("div");
        let followButton = document.createElement("button");
        
        followButton.innerText = "Seguir";
        followButton.classList.add("follow-button");
        followCard.classList.add("follow-card_div");

        followCard.append(userCard(searchUserId(sugestUsers[i])), followButton);
        suggestionUsers.appendChild(followCard);

        let toggleFollow = true;
        followButton.addEventListener("click", () => {
            toggleFollow = !toggleFollow;

            if(toggleFollow){
                followButton.classList.remove("follow-button-purple");
                followButton.classList.add("follow-button");

                followButton.innerText = "Seguir";
            }else{
                followButton.classList.remove("follow-button");
                followButton.classList.add("follow-button-purple");

                followButton.innerText = "Seguindo";
            }
        })
    }

    suggestionDiv.append(suggestionTitle, suggestionUsers);
    stickyDiv.appendChild(suggestionDiv);
    mainDiv.appendChild(stickyDiv); 
}

createPostPreview = (post) => {
    let user = searchUserId(post.user);
    let cardUser = userCard(user);
    let modalWrap = document.querySelector(".modal-wrapper");
    let postDiv = document.createElement("div");
    let postTitle = document.createElement("strong");
    let postContent = document.createElement("p");
    let bottomDiv = document.createElement("div");
    let buttonOpenPost = document.createElement("button");
    let likes = document.createElement("p");
    let likeHeart = document.createElement("img");

    postTitle.innerText = post.title;
    postContent.innerText = post.text;
    buttonOpenPost.innerText = "Abrir Post";
    likes.innerText = "25";
    likeHeart.src = "./src/assets/img/gray_heart.svg";
    likeHeart.alt = "Like Heart"    
    
    buttonOpenPost.addEventListener("click",() => {
        modalWrap.classList.toggle("flex");
        fillModal(post);
    });

    let toggleHeart = true;

    likeHeart.addEventListener("click", () => {
        toggleHeart = !toggleHeart;

        if(toggleHeart){
            likeHeart.src = "./src/assets/img/gray_heart.svg";
            likes.innerText = "25";
        }else{
            likeHeart.src = "./src/assets/img/red_heart.svg";
            likes.innerText = "26";
        }
    })
    
    postDiv.classList.add("posts-div");
    bottomDiv.classList.add("post-bottom");
    buttonOpenPost.classList.add("open-post-button");
    postTitle.classList.add("post-title");
    postContent.classList.add("post-content");
    likes.classList.add("likes");

    bottomDiv.append(buttonOpenPost, likeHeart, likes);
    postDiv.append(cardUser, postTitle, postContent, bottomDiv);

    return postDiv;
}

createPostSection = () => {
    let mainDiv = document.querySelector(".div_main");
    let postsSection = document.createElement("section");
    let sectionTitle = document.createElement("strong");
    let wrapPostsPreview = document.createElement("div");

    sectionTitle.innerText = "Posts";
    wrapPostsPreview.classList.add("wrap-posts-preview");
    
    postsSection.classList.add("post-section");
    sectionTitle.classList.add("post-title");

    postsSection.appendChild(sectionTitle);

    for(let i = 0; i < posts.length; i++){
        let postPreview = createPostPreview(posts[i]);
        wrapPostsPreview.appendChild(postPreview);
    }

    postsSection.appendChild(wrapPostsPreview);
    mainDiv.appendChild(postsSection);
}

createPostModal = (post) => {
    let user = searchUserId(post.user);
    let cardUser = userCard(user);

    let postDiv = document.createElement("div");
    let postTitle = document.createElement("strong");
    let postContent = document.createElement("p");

    postTitle.innerText = post.title;
    postContent.innerText = post.text;
    
    
    postDiv.classList.add("posts-div-modal");
    postTitle.classList.add("post-title");
    postContent.classList.add("post-content");

    
    postDiv.append(cardUser, postTitle, postContent, );

    return postDiv;
}

fillModal = (post) => {
    let modalDiv = document.querySelector(".modal");
    modalDiv.innerHTML = " ";
    let modalWrap = document.querySelector(".modal-wrapper");
    let closeModalButton = document.createElement("button");
    let postContent = createPostModal(post);
    
    closeModalButton.innerText = "X";
    closeModalButton.classList.add("close-modal");

    closeModalButton.addEventListener("click", () => {
        modalWrap.classList.toggle("flex");
        modalDiv.innerHTML = " "
    })

    modalDiv.append(closeModalButton, postContent);
}

let insertNewPost = () => {
    let wrapPosts = document.getElementsByClassName("wrap-posts-preview");
    let buttonPost = document.getElementsByClassName("buttonPost");
    let inputTitle = document.getElementsByClassName("titleInput");
    let inputPost = document.getElementsByClassName("postInput");

    buttonPost[0].addEventListener("click", function(e) {
        let newPostData = {
            id_post: posts.length + 1, 
            user: users[0].id, 
            title: inputTitle[0].value,
            text: inputPost[0].value
        };

        let newPost = createPostPreview(newPostData);

        wrapPosts[0].appendChild(newPost); 
        
        posts.push(newPostData); 
        
        e.preventDefault();
    })
} 


loggedUser(users[0]);
createForm();
createSuggestions();
createPostSection();
insertNewPost();