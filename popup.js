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
    //var childNodeLst;
    //var childNodeLen;

    //  const getData = () => {
            
    //  }


    //you get the element here 
    console.log("hello");
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
                            let sportType;
                            let date;
                            let opponent_score;
                            let home_score;
                            let game_attributes = x[i].children; //the list of game attributes
                            console.log("game attributes", game_attributes)
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
                                    sportType = "sport: " + attribute.innerHTML
                                    console.log(sportType)
                                  }else if (attribute.nodeName == "date"){
                                    date = "date: " + attribute.innerHTML
                                    console.log(date)
                                  }else if (attribute.nodeName == "opponent_score"){
                                    opponent_score = "opponent_score: " + attribute.innerHTML
                                    if (attribute.innerHTML == "") {
                                      opponent_score = "opponent_score: No score yet";
                                    }
                                    console.log(opponent_score)
                                  }else if (attribute.nodeName == "team_score"){
                                    home_score = "home_score: " + attribute.innerHTML
                                    if (attribute.innerHTML == "") {
                                      home_score = "home_score: No score yet";
                                    }
                                    console.log(home_score)
                                  }

                            }
                            txt += date + " " + sportType + " " + home_score + " " + opponent_score + "<br>\n";

                            // console.log(sportType);
                            // if (sportType == "WBB"){
                            //         //the date plus the sport type plus the opponent
                            //         console.log(count);
                            //         // txt += x[i].children.namedItem("date").innerHTML + ": " + sportType + " vs " + x[i].children.namedItem("opponent").innerHTML + "<br>"
                            // }
                            // count +=1;
                    }
                    // console.log(count)
                    console.log(txt);
                    // document.getElementById("demo").innerHTML = txt;
    

            }
    };
    //xhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://riceowls.com/services/calendar.ashx?type=rss", true);
    
    //open prepares an http request to be sent
    xhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://riceowls.com/services/scores.aspx", true); 
    //this actually sends the request
    xhttp.send();     
    var checkPageButton = document.getElementById('checkPage');
    //and then you listen for something to happen to that element(a click in this case)
    //and then the anonymous function below is executed
    checkPageButton.addEventListener('click', function() {
            
            // document.getElementById('surprise').innerHTML=Date();
            document.getElementById('surprise').innerHTML = txt;
    }, false);
}, false);
