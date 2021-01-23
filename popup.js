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
    var today = new Date()

    // Sport Images Dictionary
    let sportImgs = new Map();
    sportImgs.set("Swimming", 'women_swimming.png')
    sportImgs.set("Women's Basketball", 'women_basketball.png')
    sportImgs.set("Women's Tennis", 'women_tennis.png')
    sportImgs.set("Women's Volleyball", 'women_volleyball.png')
    sportImgs.set("Baseball", 'men_baseball.png')
    sportImgs.set("Men's Basketball", 'men_basketball.png')
    sportImgs.set("Men's Golf", 'men_golf.png')
    sportImgs.set("Men's Tennis", 'men_tennis.png')
    sportImgs.set("Track", 'women_track.JPG')
    sportImgs.set("Men's Football", 'men_football.png')
    sportImgs.set("Soccer", 'women_soccer.png')

      console.log("today's date", today)
    console.log("today's day", today.getDate())
    let dd = String(today.getDate());
    // console.log("today's month", today.getMonth() + 1) //January is 0
    let mm = String(today.getMonth() + 1);
    // console.log("today's yr", today.getFullYear()) //January is 0
    let yr = String(today.getFullYear())
    today_date = mm + "/" + dd + "/" + yr
    // console.log("current date", today_date)


    
    //This function changes the time to Final if the game is over and Postponed if the game was postponed
    function update_time(time, status) {
      if (status == "O") {
        return "Final"
      }
      if (status == "P") {
        return "Postponed"
      }
      return time
    }
    //Abbreviating the Opponent's school name into acronyms
    function abbreviate_name(name){
      //Removing numbers, #, and leading and trailing spaces
      name = name.replace(/[^A-Za-z\s]/g, "")
      name = name.trim()
      name_array = name.split(" ");
      if (name_array.length == 1) {
        return name
      }
      if (name_array.length > 1) {
        acronyms = ""
        for (word of name_array) {
          acronyms += word.charAt(0)
        }
        return acronyms.toUpperCase()
      }

    }

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
        document.getElementById(dateID).style.display = "block";//"flex";
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

    function choose_working_link(boxscore_link, recap_link) {
      if (recap_link != "") {
        return recap_link
      } else {
        return boxscore_link
      }

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
                                  if (attribute.nodeName == "sport") {
                                    gameDict.set("sport_fullname", attribute.innerHTML)
                                  }
                                  // console.log("spec attr", attribute)
                                  if (attribute.nodeName == "sport_abbrev"){
                                    // sportType = "sport: " + attribute.innerHTML
                                    gameDict.set("sport_abbrev", attribute.innerHTML)
                                    // console.log(sportType)
                                  }
                                  else if (attribute.nodeName == "opponent") {
                                    gameDict.set("opponent_name", attribute.innerHTML)
                                  }
                                  else if (attribute.nodeName == "status") {
                                    gameDict.set("status", attribute.innerHTML)
                                  }
                                  else if (attribute.nodeName == "boxscore_link") {
                                    gameDict.set("link", attribute.innerHTML)
                                  }
                                  else if (attribute.nodeName == "recap_link"){
                                    gameDict.set("recap_link", attribute.innerHTML)
                                  }
                                  else if (attribute.nodeName == "date"){
                                    date = "date: " + attribute.innerHTML;
                                    dateKey = attribute.innerHTML.split(" ")[0];
                                    console.log("date and time", attribute.innerHTML.split(" "))
                                    time_number = attribute.innerHTML.split(" ")[1]
                                    pm_or_am = attribute.innerHTML.split(" ")[2]
                                    adjusted_time = time_number.substring(0, time_number.length - 3)
                                    gameDict.set("time", adjusted_time + " " + pm_or_am + " CST")

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
                                      // if (attribute.innerHTML == "") {
                                      //     // home_score = "No score yet";
                                      //     opponent_logo = "N/A";
                                      // }
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
                      date_button.id = "tab_" + date;
                      date_button.onclick = function(){openCity(event, date)};
                      tab_div.appendChild(date_button)
                      row_item_cnt = 0 //keeping track of how many items are in the row so far. 
                      row_div = document.createElement("div"); //Gonna have three divs
                      row_div.className = "row_div";
                      let row_limit = 3;
                      numgames = gameList.length;
                      console.log("numgames", numgames)
                      game_cnt = 1;
                      // console.log(gameList)
                      for (game of gameList) {
                          // console.log("game" + game)
                          var game_anchor = document.createElement("a");
                          game_anchor.href = choose_working_link(game.get("link"), game.get("recap_link"))
                          game_anchor.target = "_blank"
                          game_anchor.className = "link_wrapping"
                          // console.log("game link", game.get("link"))
                          var game_box_div = document.createElement("div");
                          // game_box_div.className = "game_box_div";

                          // Game Header div, above each Game Body div
                          var game_header_div = document.createElement("div");
                          game_header_div.className = "game_header_div";

                          //Header - sport type
                          sport = document.createElement("p")
                          sport.innerText = game.get("sport_abbrev")
                          sport.className = "sport_type";
                          game_header_div.appendChild(sport)
                          var sportImg = document.createElement("img")
                          sportImg.className="sport_image"
                          sportImg.setAttribute("src", chrome.runtime.getURL(sportImgs.get(game.get("sport_fullname"))))

                          game_header_div.appendChild(sportImg)

                          var game_body_div = document.createElement("div")
                          game_body_div.className = "game_body";

                          //Adding Time Information
                          time = document.createElement("div")
                          time.innerText = update_time(game.get("time"), game.get("status")) 
                          time.className = "time";
                          game_body_div.appendChild(time)

                          //Creating the home team information div
                          home_team_div = document.createElement("div");
                          home_team_div.className = "home_team_div";

                          //Home logo
                          home_logo_span = document.createElement("span")
                          home_logo_span.className = "home_logo_span"
                          home_logo_img = document.createElement("img")
                          home_logo_img.setAttribute("src", chrome.runtime.getURL("rice_logo_from_xml.png"))
                          home_logo_img.className = "home_logo_img";
                          home_logo_span.appendChild(home_logo_img)
                          // game_body_div.appendChild(opp_logo)
                          home_team_div.appendChild(home_logo_span);

                          //Home Team sport
                          // home_team_name = document.createElement("p")
                          home_team_name = document.createElement("span")
                          // home_team.innerText = game.get("sport")
                          home_team_name.innerText = "Owls"
                          home_team_name.className = "home_team_name";
                          // game_body_div.appendChild(home_team)
                          home_team_div.appendChild(home_team_name)

                          //Home Team score
                          // home_score = document.createElement("p")
                          home_score = document.createElement("span")
                          home_score.innerText = game.get("home_score")
                          home_score.className = "home_score";
                          // game_body_div.appendChild(home_score)
                          home_team_div.appendChild(home_score)
                          game_body_div.appendChild(home_team_div)

                          opp_team_div = document.createElement("div")//Opponent team's div
                          opp_team_div.className = "opp_team_div";

                          //Opponent logo
                          opp_logo_span = document.createElement("span")
                          opp_logo_span.className = "opp_logo_span"
                          opp_logo = document.createElement("img")
                          opp_logo.src = game.get("opponent_logo")
                          opp_logo.className = "opponent_logo";
                          opp_logo_span.appendChild(opp_logo)
                          // game_body_div.appendChild(opp_logo)
                          opp_team_div.appendChild(opp_logo_span);

                          // Opposing Team 
                          // opp_team_name = document.createElement("p")
                          opp_team_name = document.createElement("span")
                          opp_team_name.innerText = abbreviate_name(game.get("opponent_name"))
                          opp_team_name.className = "opponent_name";
                          // game_body_div.appendChild(opp_team)
                          opp_team_div.appendChild(opp_team_name)
                          
                          

                          //Opposing Team score
                          opp_score = document.createElement("span")
                          opp_score.innerText = game.get("opponent_score")
                          opp_score.className = "opponent_score";
                          // game_body_div.appendChild(opp_score)
                          opp_team_div.appendChild(opp_score)

                          //Adding the opponent team information to the game body
                          game_body_div.appendChild(opp_team_div)



                          game_box_div.appendChild(game_header_div)
                          game_box_div.appendChild(game_body_div)
                          // game_body_div.appendChild(word)
                          game_anchor.appendChild(game_box_div);

                          // game_anchor.appendChild(game_body_div);
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
                    let dd = String(today.getDate());
                    // console.log("today's month", today.getMonth() + 1) //January is 0
                    let mm = String(today.getMonth() + 1);
                    // console.log("today's yr", today.getFullYear()) //January is 0
                    let yr = String(today.getFullYear())
                    today_date = mm + "/" + dd + "/" + yr
                    // today_date = "1" + "/" + "23" + "/" + "2021"
                    //Setting Default Tab

                    if (dateDict.has(today_date)){
                      document.getElementById("tab_" + today_date).click();
                    } else { //Get the closest date. Let's default to the third one
                      keylist = Array.from(dateDict.keys())
                      close_date = keylist[2]
                      console.log("close date", close_date)
                      document.getElementById("tab_" + close_date).click();
                    }
            }



            
    };

    //open prepares an http request to be sent
    xhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://riceowls.com/services/scores.aspx", true); 
    //this actually sends the request
    xhttp.send();
    
    // var game_body_div = document.createElement("div")
    // word = document.createTextNode("injected div with js")
    // game_body_div.style.background = "white"
    // game_body_div.style.color = "blue";
    // game_body_div.appendChild(word)
    // document.body.appendChild(game_body_div)
}, false);


