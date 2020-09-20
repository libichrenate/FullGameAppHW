function gameApp() {
  this.baseUrl = "https://games-world.herokuapp.com";
  this.allGames;
  this.game;
  this.postCreateButton = document.querySelector("#postCreateButton");
  this.postCreateButton.addEventListener("click", this.createGame.bind(this));
  this.postDeleteButton = document.querySelector("#postDeleteButton");
  this.postDeleteButton.addEventListener("click", this.deleteGame.bind(this));
}

gameApp.prototype.displayGames = (post) => {
  var postList = document.getElementById("gamesList");
  var item = document.createElement("li");
  var img = document.createElement("IMG");
  img.src = post.imageUrl;
  item.innerHTML = post.title + ": " + post.description;
  postList.appendChild(img);
  postList.appendChild(item);
};

gameApp.prototype.fetchGames = function () {
  const self = this;
  fetch(self.baseUrl + "/games", { method: "GET" })
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResp) {
      self.allGames = jsonResp;
      console.log(self);
      self.allGames.forEach(function (element) {
        self.displayGames(element);
      });
    });
};

gameApp.prototype.getGameData = function () {
  const postTitle = document.querySelector("#postTitle").value;
  const postGenre = document.querySelector("#postGenre").value;
  const postImg = document.querySelector("#postImgURL").value;
  const postDate = document.querySelector("#postDate").value;
  const postPub = document.querySelector("#postPublisher").value;
  const postDesc = document.querySelector("#postDesc").value;
  const postId = document.querySelector("#postId").value;

  return {
    title: postTitle,
    relDate: postDate,
    genre: postGenre,
    publisher: postPub,
    imageUrl: postImg,
    description: postDesc,
    _id: postId,
  };
};

gameApp.prototype.createGame = function () {
  console.log("start create game");
  const game = this.getGameData();
  console.log(game);
  const self = this;

  this.saveGamesOnServer(game)
    .then(function (response) {
      console.log(response);
      self.displayGames(game);
    })
    .catch(function (err) {
      console.log(err);
    });
};
gameApp.prototype.saveGamesOnServer = function (post) {
  const promise = fetch("https://games-world.herokuapp.com" + "/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).then(function (response) {
    return response.json();
  });

  return promise;
};

gameApp.prototype.deleteGame = function () {
  const self = this;
  var postId = this.getDeleteGameId();
  fetch(self.baseUrl + "/games/" + postId, { method: "DELETE" })
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      console.log("Deleted: ", jsonResponse);
    });
};

gameApp.prototype.getDeleteGameId = function () {
  const gameId = document.querySelector("#deleteId").value;
  return gameId;
};

var myGameApp = new gameApp();
myGameApp.fetchGames();
