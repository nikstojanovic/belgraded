let priceValues = [];

// if article height is less than viewport height, raise height of article
// for better UX this code is written here instead in window.onload
let articles = document.getElementsByTagName("article");

for (let i = 0; i < articles.length; i++) {
    articles[i].style.minHeight = window.innerHeight + "px";
}

// if currency is changed in dropdown, do the conversion
document.getElementById("currencyDropdown").addEventListener("change", function() {
    let pricesToConvert = document.getElementsByClassName("convert");
    let currencyShort = document.getElementsByClassName("currency");
    let currencyDropdown = document.getElementById("currencyDropdown");
    let indexOfOption = 0;
    let currencies = ["RSD", "EUR", "USD", "CHF", "RUB"];

    // make an array of all prices shown on site
    for (let i = 0; i < pricesToConvert.length; i++) {
        priceValues.push(Number(pricesToConvert[i].innerHTML));
    }

    // get the index of currency selected in dropdown menu
    for (let i = 0; i < currencyDropdown.childElementCount; i++) {
        if (currencyDropdown[i].selected) {
            indexOfOption = i;
        }
    }
    
    // convert all prices in document
    for (let i = 0; i < pricesToConvert.length; i++) {
        pricesToConvert[i].innerHTML = (priceValues[i] / document.getElementById("currencyDropdown").value).toFixed(2);
        currencyShort[i].innerHTML = currencies[indexOfOption];
    }
});

// update shuttle bus time
function startTime() {
    let airportDepartures = [60,120,300,360,440,460,480,500,520,540,560,580,600,620,640,660,680,700,720,740,760,780,800,820,840,860,880,900,920,940,960,980,1000,1020,1040,1060,1080,1100,1120,1170,1230,1320,1380,1440];
    let slaviaDepartures = [90,200,260,320,380,400,420,440,460,480,500,520,540,560,580,600,620,640,660,680,700,720,740,760,780,800,820,840,860,880,900,920,940,960,980,1000,1020,1040,1060,1080,1100,1120,1140,1160,1230,1290,1380,1440];

    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let currentTime = (h * 60) + m;

    document.getElementById('arrive').innerHTML = calcNextDeparture(airportDepartures, currentTime);
    document.getElementById('leave').innerHTML = calcNextDeparture(slaviaDepartures, currentTime);
    var t = setTimeout(startTime, 5000);
}

function calcNextDeparture(location, currentTime) {
    let departure;

    for (let i = 0; i < location.length; i++) {
        departure = location[i] - currentTime;
        if (location[i] > currentTime) {
            if (departure > 60) {
                departure = "in " + Math.trunc(departure / 60) + " h " + Math.round(((departure / 60) - Math.trunc(departure / 60)) * 60) + " min";
                break;
            } else {
                departure = "in " + departure + " min";
                break;
            }
        } else if (location[i] === currentTime) {
            departure = "right now!";
            break;
        }
    }
    return departure;
}

// toggle menu for mobile
document.getElementById("menu-mobile").addEventListener("click", function () {
	let navBar = document.getElementsByTagName("nav")[0];

	if (navBar.style.display === "block") {
		navBar.style.display = "none";
	} else {
		navBar.style.display = "block";
	}
});