// document.addEventListener('DOMContentLoaded', function() {
//     var checkPageButton = document.getElementById('checkPage');
//     checkPageButton.addEventListener('click', function() {
//       document.getElementById('surprise').innerHTML=Date();
//     }, false);
//   }, false);



  document.addEventListener('DOMContentLoaded', function() {
    var x, i, xmlDoc;
    var txt = "";
    var orig_txt;
    let dateDict = new Map();
    // const dateDict = new Map();
      //var childNodeLst;
    //var childNodeLen;

    //  const getData = () => {
            
    //  }


    //you get the element here 
    // console.log("hello");
    //onclick="loadXMLDoc()"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
            
            if (this.readyState == 4 && this.status == 200) {
                    // console.log("The full xml", this.responseText);
                    
            //document.getElementById("demo").innerHTML = this.responseText;
                    orig_txt = this.responseText;
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(orig_txt,"text/xml")//First parameter is the xml text and the second parameter is the content type of the 
                    x = xmlDoc.documentElement.childNodes; //The games list
                    // console.log(x);
                    // console.log(x.length);
                    let count = 0;
                    
                    //iterating over all the games in the stream
                    for (i = 1; i < x.length-1; i = i+2) {
                            //console.log(i);
                            //console.log(i);
                          // console.log(x[i].childNodes.item(7));
                            //console.log(x[i].childNodes);
                            let gameDict = new Map();
                            // const gameDict = new Map();
                            let sportType;
                            let date;
                            let opponent_score;
                            let home_score;
                            let game_attributes = x[i].children; //the list of game attributes
                            let dateKey;
                            let opponent_logo;
                            // console.log("game attributes", game_attributes)
                            //console.log(childNodeLst.length);
                            // let childNodeLen = game_attributes.length;
                            // console.log(game_attributes.namedItem("sport_abbrev").innerHTML)


                            //iteration over the information
                            // for (valIdx = 0; valIdx < childNodeLen; valIdx++) { //iterating through the game's attributes
                            for (attribute of game_attributes) { //iterating through the game's attributes
                                    // console.log(childNodeLst[valIdx].innerHTML);
                                    // if (childNodeLst[valIdx].innerHTML == "WBB"){
                                    //         // console.log("does this check ever work?");
                                    //         console.log("sport_abbrev: " + childNodeLst[valIdx].innerHTML);
                                    //         sportType = "WBB";
                                    //         count += 1
                                    //         // txt += x[i].children.namedItem("date").innerHTML + ": " + sportType + " vs " + x[i].children.namedItem("opponent").innerHTML + "<br>"
                                    // }
                                  // console.log("spec attr", attribute)
                                  if (attribute.nodeName == "sport_abbrev"){
                                    // sportType = "sport: " + attribute.innerHTML
                                    gameDict.set("sport", attribute.innerHTML)
                                    // console.log(sportType)
                                  }
                                  else if (attribute.nodeName == "opponent") {
                                    gameDict.set("opponent_name", attribute.innerHTML)
                                }
                                  else if (attribute.nodeName == "time") {
                                      gameDict.set("time", attribute.innerHTML)
                                  }
                                  else if (attribute.nodeName == "boxscore_link") {
                                      gameDict.set("link", attribute.innerHTML)
                                  }
                                  else if (attribute.nodeName == "date"){
                                    date = "date: " + attribute.innerHTML;
                                    dateKey = attribute.innerHTML.split(" ")[0];

                                    if (!dateDict.has(dateKey)) {
                                        dateDict.set(dateKey, []);
                                    }
                                    // console.log(dateKey)
                                    // console.log(date)
                                  }else if (attribute.nodeName == "opponent_score"){
                                    opponent_score = attribute.innerHTML
                                    if (attribute.innerHTML == "") {
                                      // opponent_score = "No score yet";
                                      opponent_score = "N/A";
                                    }
                                    gameDict.set("opponent_score", opponent_score)
                                    // console.log(opponent_score)
                                  }else if (attribute.nodeName == "team_score"){
                                    home_score = attribute.innerHTML
                                    if (attribute.innerHTML == "") {
                                      // home_score = "No score yet";
                                      home_score = "N/A";
                                    }
                                    gameDict.set("home_score", home_score)
                                    // console.log(home_score)
                                  } else if (attribute.nodeName == "opponent_logo"){
                                      opponent_logo = attribute.innerHTML
                                      if (attribute.innerHTML == "") {
                                          // home_score = "No score yet";
                                          opponent_logo = "N/A";
                                      }
                                      gameDict.set("opponent_logo", opponent_logo)
                                  }
                            }

                            //form the game data string for a game
                            txt += date + " " + sportType + " " + home_score + " " + opponent_score + "<br>\n";
                            let currGame = date + " " + sportType + " " + home_score + " " + opponent_score + "<br>\n";
                            // console.log(dateKey);
                            // console.log(dateDict.get(dateKey));
                            // get the current games list associated to key
                            let arr = dateDict.get(dateKey);
                            // add new game data string to games list
                            arr.push(gameDict)
                            dateDict.set(dateKey, arr);
                            // console.log(arr)
                    }

                    // console.log(txt);
                    console.log(dateDict)
                    // console.log(dateDict.size)
                    

                    for (const [date , gameList] of dateDict.entries()) {
                      console.log("date", date)
                      for (game of gameList) {
                          console.log("game" + game)
                          var game_anchor = document.createElement("a");
                          game_anchor.href = game.get("link")
                          game_anchor.target = "_blank"
                          game_anchor.className = "link_wrapping"
                          console.log("game link", game.get("link"))

                          var newdiv = document.createElement("div")
                          newdiv.className = "grid-item"
                          // newdiv.style.background = "blue"
                          // newdiv.style.background = "#bcbcbc"
                          // word = document.createTextNode(date + game.get("sport") + game.get("time") + game.get("link") + game.get("home_score") + game.get("opponent_score"))
                          word = document.createElement("p")
                          word.innerHTML = date + "<br>" + game.get("sport") + "<br>" + game.get("time") + "<br>" + "<br>" + "home score: " + game.get("home_score") + "<br>" + "opponent score: " + game.get("opponent_score");
                          word.style.color = "black";
                          word.className = "game_text";

                          //Adding Date Information
                          date_info = document.createElement("p")
                          date_info.innerText = date;
                          date_info.className = "date";
                          newdiv.appendChild(date_info)
                          
                          //Adding Time Information
                          time = document.createElement("p")
                          time.innerText = "@" + game.get("time")
                          time.className = "time";
                          newdiv.appendChild(time)

                          //Home Team sport
                          home_team = document.createElement("p")
                          home_team.innerText = game.get("sport")
                          home_team.className = "home_team";
                          newdiv.appendChild(home_team)

                          //Home Team score
                          home_score = document.createElement("p")
                          home_score.innerText = game.get("home_score")
                          home_score.className = "home_score";
                          newdiv.appendChild(home_score)

                          //Opposing Team 
                          opp_team = document.createElement("p")
                          opp_team.innerText = game.get("opponent_name")
                          opp_team.className = "opponent_name";
                          newdiv.appendChild(opp_team)

                          opp_logo = document.createElement("img")
                          opp_logo.src = game.get("opponent_logo")
                          opp_logo.className = "opponent_logo";
                          newdiv.appendChild(opp_logo)

                          //Opposing Team score
                          opp_score = document.createElement("p")
                          opp_score.innerText = game.get("opponent_score")
                          opp_score.className = "opponent_score";
                          newdiv.appendChild(opp_score)


                          // newdiv.appendChild(word)
                          game_anchor.appendChild(newdiv);
                          document.body.appendChild(game_anchor)
                          console.log(word)
                      }
                    }
            }

            
    };

    //open prepares an http request to be sent
    xhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://riceowls.com/services/scores.aspx", true); 
    //this actually sends the request
    xhttp.send();
    
    // var newdiv = document.createElement("div")
    // word = document.createTextNode("injected div with js")
    // newdiv.style.background = "white"
    // newdiv.style.color = "blue";
    // newdiv.appendChild(word)
    // document.body.appendChild(newdiv)
}, false);
