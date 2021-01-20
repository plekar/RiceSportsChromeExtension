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
    

    function openCity(evt, dateID) {
        console.log(dateID)
        // Declare all variables
        var i, tabcontent, tablinks;
        // Get all elements with class="date_div" and hide them
        tabcontent = document.getElementsByClassName("date_div")
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(dateID).style.display = "flex";
        evt.currentTarget.className += " active";
    }
    //Making the date from numericals to word and number. 1/23/21 -> Jan 23
    function prettify_date(date_str) {
      //Mapping numerical month to alphabetical month
      month_map = {"1": "Jan", "2": "Feb", "3": "Mar", "4": "Apr", "5": "May", "6": "Jun",
                    "7": "Jul", "8" : "Aug", "9": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"};
      //split the string into an array of the month, day, year, values
      date_arr = date_str.split("/"); // [1, 23, 21]
      return month_map[date_arr[0]] + " " + date_arr[1];
    }
    
    var xhttp = new XMLHttpRequest(); //prepping the XML Request
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

                            //iteration over the information
                            // for (valIdx = 0; valIdx < childNodeLen; valIdx++) { //iterating through the game's attributes
                            for (attribute of game_attributes) { //iterating through the game's attributes
                                   
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

                    console.log("datedict", dateDict)
                    
                    //Creating the structure of the pages
                    var tab_div = document.createElement("div");
                    tab_div.className = "tab"
                    for (const [date , gameList] of dateDict.entries()) {
                      console.log("date", date)
                      var date_div = document.createElement("div");
                      date_div.id = date
                      date_div.className = "date_div";
                      var date_button = document.createElement("button");
                      date_button.innerHTML = prettify_date(date)
                      date_button.className = "tablinks"
                      date_button.onclick = function(){openCity(event, date)};
                      tab_div.appendChild(date_button)
                      row_item_cnt = 0 //keeping track of how many items are in the row so far. 
                      row_div = document.createElement("div"); //Gonna have three divs
                      row_div.className = "row_div";
                      let row_limit = 3;
                      numgames = gameList.length;
                      console.log("numgames", numgames)
                      game_cnt = 1;
                      for (game of gameList) {
                          // console.log("game" + game)
                          var game_anchor = document.createElement("a");
                          game_anchor.href = game.get("link")
                          game_anchor.target = "_blank"
                          game_anchor.className = "link_wrapping"
                          // console.log("game link", game.get("link"))

                          var game_box_div = document.createElement("div")
                          game_box_div.className = "game_box";

                          //Adding Date Information
                          date_info = document.createElement("p")
                          date_info.innerText = date;
                          date_info.className = "date";
                          game_box_div.appendChild(date_info)
                          
                          //Adding Time Information
                          time = document.createElement("p")
                          time.innerText = "@" + game.get("time")
                          time.className = "time";
                          game_box_div.appendChild(time)

                          //Home Team sport
                          home_team = document.createElement("p")
                          home_team.innerText = game.get("sport")
                          home_team.className = "home_team";
                          game_box_div.appendChild(home_team)

                          //Home Team score
                          home_score = document.createElement("p")
                          home_score.innerText = game.get("home_score")
                          home_score.className = "home_score";
                          game_box_div.appendChild(home_score)

                          //Opposing Team 
                          // opp_team = document.createElement("p")
                          // opp_team.innerText = game.get("opponent_name")
                          // opp_team.className = "opponent_name";
                          // game_box_div.appendChild(opp_team)
                          
                          //Opponent logo
                          opp_logo = document.createElement("img")
                          opp_logo.src = game.get("opponent_logo")
                          opp_logo.className = "opponent_logo";
                          game_box_div.appendChild(opp_logo)

                          //Opposing Team score
                          opp_score = document.createElement("p")
                          opp_score.innerText = game.get("opponent_score")
                          opp_score.className = "opponent_score";
                          game_box_div.appendChild(opp_score)


                          // game_box_div.appendChild(word)
                          game_anchor.appendChild(game_box_div);
                          // date_div.appendChild(game_anchor);

                          row_div.appendChild(game_anchor)
                          if (row_item_cnt == row_limit - 1) { //We stop at row limit-1 because we're starting our count at 0
                            //add row div to the date div
                            date_div.appendChild(row_div);
                            //reset the row_item_cnt to 0
                            row_item_cnt = 0
                            //Create a new row div
                            row_div = document.createElement("div");
                            row_div.className = "row_div";
                          }else if (game_cnt == numgames){
                            date_div.appendChild(row_div);
                          } else {
                            row_item_cnt += 1
                          }
                          game_cnt += 1
                         
                      }
                      console.log("tempdiv", date_div)
                      document.body.appendChild(date_div)

                    }
                    document.body.prepend(tab_div)
            }



            
    };

    //open prepares an http request to be sent
    xhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://riceowls.com/services/scores.aspx", true); 
    //this actually sends the request
    xhttp.send();
    
    // var game_box_div = document.createElement("div")
    // word = document.createTextNode("injected div with js")
    // game_box_div.style.background = "white"
    // game_box_div.style.color = "blue";
    // game_box_div.appendChild(word)
    // document.body.appendChild(game_box_div)
}, false);


