

const url = "https://restcountries.com/v2/all";

let ayush = (url) => {
  fetch(url, {
      method: "GET"
    })
    .then((data) => data.json())
    .then((response) => {
      console.log(response)
      fetchdiv(response);
    })
    .catch((error) => {
      console.log(error);
    });
};


ayush(url);


let fetchdiv = (dataresponse) => {
  console.log(dataresponse.length);

  for (let i = 0; i < dataresponse.length;) {
    //div of main body 
    var divElement = document.createElement("div");
    divElement.className = "maindiv";

    for (let j = 0; j < 3; j++) {

      if (i + j < dataresponse.length) {
        //div of the part
        let divElementsub = document.createElement("div");
        divElementsub.className = "part";

        //image for the data 
        let imagesec = document.createElement("img");
        imagesec.className = "imagedetails";
        imagesec.src = dataresponse[i + j].flags.png;

        //div for the name 
        let highlighted = document.createElement("div");
        highlighted.className = "fontsize";
        highlighted.innerHTML ="Country :"+dataresponse[i + j].name;

        //Creating the button 
        let buttonclick = document.createElement("button");
        buttonclick.className = "detailsbutton";
        buttonclick.innerHTML = "Check Weather";
        
        //Calling the Second API 
        let t = i + j
        buttonclick.addEventListener('click', async function handleClick(event) {
          console.log(dataresponse[t])

          const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${dataresponse[t].capital}&appid=2d93814d69790ea311d6d8abe253ae4b`
          fetch(url2)
            .then((data) => data.json())
            .then((response) => {
              console.log(response)
              t = response.weather[0].main + "  " + response.main.temp
              let newdiv=document.createElement("div");
              newdiv.className="detailsweather";
              newdiv.innerHTML=t;
              
              divElementsub.appendChild(newdiv)
              buttonclick.style.display = "none"
            })
            .catch((error) => {
              t = "Data Not Found"
              let newdiv=document.createElement("div");
              newdiv.className="detailsweather";
              newdiv.innerHTML=t;
              divElementsub.appendChild(newdiv)
              buttonclick.style.display = "none"
            });
        });

        //creating a child for image 
        divElementsub.appendChild(imagesec);
        divElement.appendChild(divElementsub);

        //creating child of name
        divElementsub.appendChild(highlighted);
        divElement.appendChild(divElementsub);

        //creating child of button
        divElementsub.appendChild(buttonclick);
        divElement.appendChild(divElementsub)


      }
    }
    i = i + 3;
    document.body.appendChild(divElement)
    //console.log(i);
  }


}