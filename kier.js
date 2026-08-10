let newKlasa = "nrk"; 


// CURRENTLY WY ANY ZNAK
function getActiveSign() {
    let signId = document.getElementById("tabchoose").value;
    return document.getElementById(signId);
}

// ZMIENIANIE KOLORU CIENIA ZNAKU NA KTÓRYM OPERUJEMY
function updateSelectedSignShadow(){
    document.querySelectorAll(".sign").forEach(sign => {
        sign.style.boxShadow = "0 0 10px 2px gray";
    });

    let activeSign = getActiveSign();
    if(activeSign){
        activeSign.style.boxShadow = "0 0 10px 2px #FAB387";
    }
}
document.getElementById("tabchoose").addEventListener("change", updateSelectedSignShadow);
updateSelectedSignShadow();

// 0.0F ZMIANA CZCIONKI ===================================================================================================================================================
function czcionkowanie(){
    let siteFont = document.querySelector("#sitefont").value;
    let stylist = document.querySelector("#stylist");

    document.documentElement.style.setProperty('--main-font', `${siteFont}, monospace`);

    if(siteFont == "French"){
        document.documentElement.style.setProperty('--p-spacing', '0.45rem');
    }else{
        document.documentElement.style.setProperty('--p-spacing', 'normal');
    }

    if(siteFont == " itish"){
        document.documentElement.style.setProperty('--span-padding', '0.27em 0.3em 0.15em 0.3em');
    }
    else{
        document.documentElement.style.setProperty('--span-padding', '0.15em 0.3em 0.15em 0.3em');
    }
}
let seleSiteFont = document.querySelector("#sitefont");
seleSiteFont.addEventListener("change", czcionkowanie);

// 0.1. DODAWANIE NOWEGO ZNAKU ============================================================================================================================================
document.getElementById("dodsign").addEventListener("click", addSign)
let startbtn = document.getElementById("start");
startbtn.addEventListener("click", addSign)

function addSign(e) {
    e.preventDefault();
    startbtn.style.display = "none";
    let selectTab = document.getElementById("tabchoose");
    let mainContainer = document.querySelector("main");

    let maxNum = 0;
    for(let i = 1; i < selectTab.options.length; i++){
        let currentNum = parseInt(selectTab.options[i].text);
        if(currentNum > maxNum){
            maxNum = currentNum;
        }
    }
    let nextNum = maxNum + 1;

    let newSignId = "s" + nextNum;
    let newNumId = "num" + nextNum;
    let newStalaId = "stala" + nextNum;

    let newOption = document.createElement("option");
    newOption.value = newSignId;
    newOption.textContent = nextNum;
    selectTab.appendChild(newOption);

    let newSignHTML = `
        <div class="sign" id="${newSignId}">
            <div class="numa3 numa3left" id="${newNumId}a3left"  style="margin: 0;">
            </div>
            <div class="mid">
                <div class="midcontent">
                    <div class="num numtop" id="${newNumId}top"  style="margin: 0;"></div>

                    <div class="stala" id="${newStalaId}"></div>
                    
                    <div class="num numbtm" id="${newNumId}btm"  style="margin: 0;"></div>
                </div>
            </div>
            <div class="numa3 numa3right" id="${newNumId}a3right"  style="margin: 0;">
            </div>
        </div>
    `;

    mainContainer.insertAdjacentHTML("beforeend", newSignHTML);
    selectTab.value = newSignId;
    console.log(`Dodano nowy znak o ID: ${newSignId}`);
    updateSelectedSignShadow();
};


// 0.2. USUWANIE ZNAKU ==================================================================================================================================================
document.getElementById("removesign").addEventListener("click", function(e) {
    e.preventDefault();

    let selectTab = document.getElementById("tabchoose");
    let selectedValue = selectTab.value;
    if(selectTab.options.length == 1){
        alert("There are no signs left to remove!");
        return;
    }

    let selectedIndex = selectTab.selectedIndex; //WYBIERA KTÓRY INDEX JEST WY ANY PRZEZ USERA NA SELECTCIE
    let optionText = selectTab.options[selectedIndex].text; //BIERZE TEKST Z OPTIONA Z TEGO INDEXU

    if(optionText == "None"){
        alert("No selected sign");
    }
    else if(confirm(`Are you sure you want to permanently remove sign number ${optionText}?`)){
        
        let signToRemove = document.getElementById(selectedValue);
        if(signToRemove){
            signToRemove.remove();
        }

        selectTab.remove(selectedIndex);

        if(selectTab.options.length > 1){
            if(selectedIndex >= selectTab.options.length){
                selectTab.selectedIndex = selectTab.options.length - 1;
            }
            else{
                selectTab.selectedIndex = selectedIndex;
            }
        }
        else{
            startbtn.style.display = "block";
            selectTab.value = "none";
        }
    }
    updateSelectedSignShadow();
});


// 1. KOLOROWANIE TABLICY ===============================================================================================================================================
let seleColor = document.getElementById("tabcolor");
let seleFontColor = document.getElementById("tabfontcolor");
let seleBgColor = document.getElementById("tabcustomcolor");
seleColor.addEventListener("change", koloruj);
seleFontColor.addEventListener("change", koloruj);
seleBgColor.addEventListener("change", koloruj);

function koloruj(e) {
    e.preventDefault();
    let sign = getActiveSign();
    if (!sign) return;

    let tabColor = document.getElementById("tabcolor").value;
    let pozioma = sign.querySelector(".pozioma");
    let labelTabFontColor = document.getElementById("labeltabfontcolor");
    let labelTabBgColor = document.getElementById("labeltabcustomcolor");
    let tabFontColor = document.getElementById("tabfontcolor").value;
    let tabBgColor = document.getElementById("tabcustomcolor").value;
    let optionWhiteFont = document.getElementById("whitefont");

    sign.style.backgroundColor = tabColor;
    sign.style.color = "white";
    sign.style.borderColor = "white";
    if (pozioma) pozioma.style.backgroundColor = "white";
    labelTabFontColor.style.display = "none";
    labelTabBgColor.style.display = "none";
    optionWhiteFont.style.display = "none";

    if(tabColor === "white"){
        sign.style.backgroundColor = "white";
        labelTabFontColor.style.display = "block";
        sign.style.color = tabFontColor;
        sign.style.borderColor = tabFontColor;
        if (pozioma) pozioma.style.backgroundColor = tabFontColor;
        optionWhiteFont.style.display = "none";
    } 
    else if(tabColor === "gold"){
        sign.style.color = "black";    
        sign.style.borderColor = "black";
        if (pozioma) pozioma.style.backgroundColor = "black";
        labelTabFontColor.style.display = "none";
        labelTabBgColor.style.display = "none";
        optionWhiteFont.style.display = "none";
    }
    else if(tabColor === "custom"){
        labelTabFontColor.style.display = "block";
        labelTabBgColor.style.display = "block";
        optionWhiteFont.style.display = "block";
        sign.style.backgroundColor = tabBgColor;
        sign.style.color = tabFontColor;
        sign.style.borderColor = tabFontColor;
        if (pozioma) pozioma.style.backgroundColor = tabFontColor;
    }

// --- STRZAŁKI ---

    let colorLetter = ""; 
    let currentColor = sign.style.color;
    if(currentColor === "white"){
        colorLetter = "W";
    } 
    else if(currentColor === "darkred"){
        colorLetter = "R";
    } 
    else if(currentColor === "blue"){
        colorLetter = "B";
    }
    else if(currentColor === "black"){
        colorLetter = "K";
    }

    // Strzałki H1
    let allAro = sign.querySelectorAll(".aroimgh1");
    allAro.forEach(aro => {
        let currentSrc = aro.getAttribute("src");
        let match = currentSrc.match(/\/([a-zA-Z]+)[WRBK]\.png$/);
        if(match && match[1]){
            let aroDirection = match[1];
            let newAroSrc = `arrows/arrows_lower/${aroDirection}/${aroDirection}${colorLetter}.png`;
            aro.setAttribute("src", newAroSrc);
        }
    });

    // Strzałki H2
    let allAroH2 = sign.querySelectorAll(".aroimgh2");
    allAroH2.forEach(aro => {
        let currentSrc = aro.getAttribute("src");
        let match = currentSrc.match(/\/([a-zA-Z]+)[WRBK]\.png$/);
        if(match && match[1]){
            let aroDirection = match[1];
            let newAroSrc = `arrows/arrows_lower_2/${aroDirection}/${aroDirection}${colorLetter}.png`;
            aro.setAttribute("src", newAroSrc);
        }
    });

    // Strzałki H3
    let allAroH3 = sign.querySelectorAll(".a3");
    allAroH3.forEach(aro => {
        let currentSrc = aro.getAttribute("src");
        let match = currentSrc.match(/\/([a-zA-Z]+)[WRBK]\.png$/);
        if(match && match[1]){
            let aroDirection = match[1];
            let newAroSrc = `arrows/arrows_lower_3/${aroDirection}/${aroDirection}${colorLetter}.png`;
            aro.setAttribute("src", newAroSrc);
        }
    });
    

    let allMscAro = sign.querySelectorAll(".mscaroimg");
    allMscAro.forEach(mscAro => {
        let currentSrc = mscAro.getAttribute("src");
        let match = currentSrc.match(/arrows\/(arrows_normal(?:_\d+)?)\/([a-zA-Z]+)[WRBK]\.png$/);
        if(match && match[1] && match[2]){
            let folderName = match[1];
            let aroDirection = match[2];
            let newMscAroSrc = `arrows/${folderName}/${aroDirection}${colorLetter}.png`;
            mscAro.setAttribute("src", newMscAroSrc);
        }
    });


    let allIntersections = sign.querySelectorAll(".divincsharp, .divincrounded");
    allIntersections.forEach(inc => {
        inc.style.borderColor = sign.style.borderColor;
        if(inc.classList.contains("intersection")){
            inc.style.backgroundColor = sign.style.backgroundColor;
            inc.style.color = sign.style.color;
        }
        let incImage = inc.querySelector(".incimage");
        if(incImage){
            let currentSrc = incImage.getAttribute("src");
            let match = currentSrc.match(/([a-zA-Z]+\/[a-zA-Z]+)[WRBK]\.png$/); 
            if (match && match[1]) {
                let baseSrc = match[1];
                let newIncSrc = `${baseSrc}${colorLetter}.png`;
                incImage.setAttribute("src", newIncSrc);
            }
        }
    });
}


// 2. OTWIERANIE OKNA DLA NOWEJ BLASZKI ===============================================================================================================================================
let btnDodBla = document.getElementById("dodbla");
btnDodBla.addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("blanum").value = "";

    let okno = document.getElementById("secdodbla");
    okno.style.display = "block";
});

document.querySelector("#cancelbla").addEventListener("click", function(e){
    e.preventDefault();
    let okno = document.getElementById("secdodbla");
    okno.style.display = "none";
});


// 3. WYBÓR KATEGORII (KLASY) BLASZKI ===============================================================================================================================================
let seleBlaKat = document.getElementById("blakat");
let cusDiv = document.getElementById("cusdiv");
if (cusDiv) cusDiv.style.display = "none";

seleBlaKat.addEventListener("change", function() {
    if(seleBlaKat.value === "k"){
        newKlasa = "nrk";
        cusDiv.style.display = "none";
    } 
    else if(seleBlaKat.value === "w"){
        newKlasa = "nrw";
        cusDiv.style.display = "none";
    } 
    else if(seleBlaKat.value === "e"){
        newKlasa = "nre";
        cusDiv.style.display = "none";
    } 
    else if(seleBlaKat.value === "c"){
        newKlasa = "nrc";
        cusDiv.style.display = "block";
    }
});


// 5. ZAPISANIE DODANEJ BLASZKI ===============================================================================================================================================
let zatBla = document.getElementById("zatbla"); 

zatBla.addEventListener("click", function(e) {
    e.preventDefault();
    let cusBgc = document.getElementById("cusbgc").value;
    let cusCol = document.getElementById("cuscol").value;
    let cusBor = document.getElementById("cusbor").value;
    let blaPosition = document.getElementById("blaposition").value;
    let divNum;
    let sign = getActiveSign();
    if (!sign) return;

    let blaNum = document.getElementById("blanum").value;
    if(blaNum.trim() === ""){
        alert("The number must not be empty!");
        return;
    }

    if(blaPosition == "top"){
        divNum = sign.querySelector(".numtop");
    }
    else if(blaPosition == "btm"){
        divNum = sign.querySelector(".numbtm");
    }      

    let badgeHtml = "";

    if(newKlasa === "nrc"){
        let seleCusShape = document.querySelector("#cusshape");
        let cusShape = seleCusShape.value;
        if(cusShape == "cuskol"){
            if(blaNum.length > 3){
                alert("Number in circle cannot be longer than 3 signs");
                return;
            }
            else if(blaNum.length == 2){
                badgeHtml = `<span class="${newKlasa} kol" style="color: ${cusCol} !important; background-color: ${cusBgc} !important; border-color: ${cusBor} !important; font-size: 200%;">${blaNum}</span>`;
            }
            else if(blaNum.length == 3){
                badgeHtml = `<span class="${newKlasa} kol" style="color: ${cusCol} !important; background-color: ${cusBgc} !important; border-color: ${cusBor} !important; font-size: 150%;">${blaNum}</span>`;
            }
            else{
                badgeHtml = `<span class="${newKlasa} kol" style="color: ${cusCol} !important; background-color: ${cusBgc} !important; border-color: ${cusBor} !important;">${blaNum}</span>`;
            }
        }
        else if(cusShape == "cushex"){
            badgeHtml = `<div class="${newKlasa} hexborder" style="background-color: ${cusBor} !important;"><div class="hex" style="background-color: ${cusBgc} !important;"><p style="color: ${cusCol} !important;">${blaNum}</p></div></div>`;
        }
        else{
            badgeHtml = `<span class="${newKlasa}" style="color: ${cusCol} !important; background-color: ${cusBgc} !important; border-color: ${cusBor} !important;">${blaNum}</span>`;
        }
    }
    else{
        badgeHtml = `<span class="${newKlasa}">${blaNum}</span>`;
    }

    divNum.innerHTML += badgeHtml;

    document.getElementById("blanum").value = "";
    document.getElementById("secdodbla").style.display = "none";
});


// 6. USUWANIE BLASZKI ===============================================================================================================================================
document.addEventListener("click", function(e){
    if(e.target.matches(".num span")){
        e.preventDefault();
        if(confirm("Are you sure you want to remove this number?")){
            let usuBla = e.target.closest("span");
            if(usuBla){
                usuBla.remove();
            }
        }
    }
    else if(e.target.matches(".num .hexborder .hex p")){
        e.preventDefault();
        if(confirm("Are you sure you want to remove this number?")){
        let usuBla = e.target.closest(".hexborder");
            if(usuBla){
                usuBla.remove();
            }
        }
    }
});


//7. Sekcja siódma usunieta, bo już typy miast nie są w radio.


// 8. DODAWANIE MIEJSCOWOŚCI ================================================================================================================================================
let btnDodMsc = document.getElementById("dodmsc");
btnDodMsc.addEventListener("click", function(e) {
    e.preventDefault();
    let okno = document.getElementById("secdodmsc");
    okno.style.display = "block";
});

document.querySelector("#cancelmsc").addEventListener("click", function(e){
    e.preventDefault();
    let okno = document.getElementById("secdodmsc");
    okno.style.display = "none";
});

document.querySelector("#msctype").addEventListener("change", function(){
    let mscType = document.querySelector("#msctype").value;
    if(mscType == "abroad" || mscType == "harbour"){
        document.querySelector("#carcode").style.visibility = "visible";
    }
    else{
        document.querySelector("#carcode").style.visibility = "hidden";
    }
})

document.querySelector("#mscdodarobtn").addEventListener("click", function(e){
    e.preventDefault();
    let mscdodarodiv = document.querySelector("#mscdodarodiv");
    if(mscdodarodiv.style.display === "block"){
        mscdodarodiv.style.display = "none";
        document.querySelector("#mscaroposition").value = "none";
        document.querySelector("#mscarodirection").value = "none";
        document.querySelector("#mscarocolor").value = "none";
    }
    else{
        mscdodarodiv.style.display = "block";
    }
})

document.querySelector("#mscdodnumbtn").addEventListener("click", function(e){
    e.preventDefault();
    let mscdodnumdiv = document.querySelector("#mscdodnumdiv");
    if(mscdodnumdiv.style.display === "block"){
        mscdodnumdiv.style.display = "none";
    }
    else{
        mscdodnumdiv.style.display = "block";
    }
})

let newDalKlasa = "nrk";
let selebladalkat = document.getElementById("bladalkat");
let cusdaldiv = document.getElementById("cusdaldiv");

selebladalkat.addEventListener("change", function(){
    if(selebladalkat.value === "k"){
        newDalKlasa = "nrk";
        cusdaldiv.style.display = "none";
    } 
    else if(selebladalkat.value === "w"){
        newDalKlasa = "nrw";
        cusdaldiv.style.display = "none";
    } 
    else if(selebladalkat.value === "e"){
        newDalKlasa = "nre";
        cusdaldiv.style.display = "none";
    } 
    else if(selebladalkat.value === "c"){
        newDalKlasa = "nrc";
        cusdaldiv.style.display = "block";
    }
});

let zatMsc = document.getElementById("zatmsc"); 
zatMsc.addEventListener("click", function(e) {
    e.preventDefault();
    let sign = getActiveSign();
    if (!sign) return;
    
    let mscName = document.getElementById("mscname").value;
    if(mscName.trim() === ""){
        alert("Provide all required data");
        return;
    }

    let carCode = document.querySelector("#carcode").value;
    let mscType = document.querySelector("#msctype").value;
    let stala = sign.querySelector(".stala");
    if (!stala) return;

    // --- GENEROWANIE NUMERU DROGI (jeśli sekcja jest widoczna) ---
    let nowyDalNum = "";
    let mscdodnumdiv = document.querySelector("#mscdodnumdiv");
    
    if (mscdodnumdiv.style.display === "block") {
        let blaDalNum = document.getElementById("bladalnum").value;
        if (blaDalNum.trim() === "") {
            alert("The number must not be empty!");
            return;
        }

        let cusDalBgc = document.getElementById("cusdalbgc").value;
        let cusDalCol = document.getElementById("cusdalcol").value;
        let cusDalBor = document.getElementById("cusdalbor").value;

        if (newDalKlasa === "nrc") {
            let seleCusDalShape = document.querySelector("#cusdalshape");
            let cusDalShape = seleCusDalShape.value;

            if (cusDalShape === "cusdalkol") {
                if (blaDalNum.length > 3) {
                    alert("Number in circle cannot be longer than 3 signs");
                    return;
                } else if (blaDalNum.length === 3) {
                    nowyDalNum = `<span class="${newDalKlasa} dal kol" style="color: ${cusDalCol} !important; background-color: ${cusDalBgc} !important; border-color: ${cusDalBor} !important; font-size: 60%;">${blaDalNum}</span> `;
                } else if (blaDalNum.length === 2) {
                    nowyDalNum = `<span class="${newDalKlasa} dal kol" style="color: ${cusDalCol} !important; background-color: ${cusDalBgc} !important; border-color: ${cusDalBor} !important; font-size: 80%;">${blaDalNum}</span> `;
                } else {
                    nowyDalNum = `<span class="${newDalKlasa} dal kol" style="color: ${cusDalCol} !important; background-color: ${cusDalBgc} !important; border-color: ${cusDalBor} !important;">${blaDalNum}</span> `;
                }
            } else if (cusDalShape === "cusdalhex") {
                nowyDalNum = `<span class="${newDalKlasa} hexborder" style="display: inline-flex !important; background-color: ${cusDalBor} !important; font-size: 100%; margin-right: 0.8rem;"><span class="hex" style="background-color: ${cusDalBgc} !important; border: none !important;"><span style="color: ${cusDalCol} !important; border: none !important;">${blaDalNum}</span></span></span> `;
            } else {
                nowyDalNum = `<span class="${newDalKlasa} dal" style="color: ${cusDalCol} !important; background-color: ${cusDalBgc} !important; border-color: ${cusDalBor} !important;">${blaDalNum}</span> `;
            }
        } else {
            nowyDalNum = `<span class="${newDalKlasa} dal">${blaDalNum}</span> `;
        }
    }

    // --- BUDOWANIE TREŚCI Z MIEJSCOWOŚCIĄ I NUMEREM ---
    let htmlContent = "";
    if (mscType === "district") {
        htmlContent = `<div class="mscdiv">${nowyDalNum}<p class="place">${mscName}</p></div>`;
    } else if (mscType === "harbour") {
        htmlContent = `<div class="mscdiv">${nowyDalNum}<p class="place">${mscName} <img src="prom.jpg" alt="prom" class="mscgraf"></p><b>${carCode}</b></div>`;
    } else if (mscType === "airport") {
        htmlContent = `<div class="mscdiv">${nowyDalNum}<p class="place"><img src="samolot.jpg" alt="samolot" class="mscgraf">${mscName}</p></div>`;
    } else if (mscType === "abroad") {
        htmlContent = `<p class="abroad">${nowyDalNum}${mscName}<b>${carCode}</b></p>`;
    } else if (mscType === "tourist") {
        htmlContent = `<div class="mscdiv">${nowyDalNum}<p class="tourist">${mscName}</p></div>`;
    } else {
        htmlContent = `<p>${nowyDalNum}${mscName}</p>`;
    }

    // --- BUDOWANIE STRZAŁKI ---
    let mscAroPosition = document.querySelector("#mscaroposition").value;
    let mscAroDirection = document.querySelector("#mscarodirection").value;
    let mscAroColor = document.querySelector("#mscarocolor").value;
    let mscAroType = document.querySelector("#mscarotype").value;
    let mscAroFolder;
    let mscAroSciezka = "";
    let mscAroContent = "";
    let mscAroDivClass = "";

    if (mscAroColor !== "none" && mscAroDirection !== "none" && mscAroPosition !== "none" && mscAroType !== "none"){
        if (mscAroType !== "Y") {
            if(mscAroType == "a1"){
                mscAroFolder = "arrows_normal";
            }
            else if(mscAroType == "a2"){
                mscAroFolder = "arrows_normal_2";
            }
            else if(mscAroType == "a3"){
                mscAroFolder = "arrows_normal_3";
                if(["rightup", "rightdown", "leftup", "leftdown"].includes(mscAroDirection)){
                    alert("Arrow 3 type is currently only avaible with up, down, left and right directions");
                    return;
                }
            } 
            mscAroSciezka = `arrows/${mscAroFolder}/${mscAroDirection}${mscAroColor}.png`;
            if (["up", "down", "rightup", "rightdown", "leftup", "leftdown"].includes(mscAroDirection)) {
                mscAroContent = `<img src="${mscAroSciezka}" alt="mscaro" class="mscaroimgpion mscaroimg">`;
                mscAroDivClass = "mscarodivpion";
            } else if (mscAroDirection === "right" || mscAroDirection === "left") {
                mscAroContent = `<img src="${mscAroSciezka}" alt="mscaro" class="mscaroimgpoziom mscaroimg">`;
                mscAroDivClass = "mscarodivpoziom";
            }
        } else if (mscAroType === "Y") {
            if (["rightup", "leftup", "rightdown", "leftdown"].includes(mscAroDirection)) {
                alert("While yellow arrows, those are only possible options to choose:\nup\ndown\nleft\nright");
                return;
            }
            mscAroSciezka = `arrows/arrowsY/arrowY${mscAroDirection}.jpg`;
            mscAroContent = `<img src="${mscAroSciezka}" alt="mscaro" class="mscaroimgyellow">`;
            mscAroDivClass = "mscarodivyellow";
        }

        if (mscAroPosition === "leftside") {
            stala.insertAdjacentHTML('beforeend', `<div class="mscarodiv ${mscAroDivClass}">${mscAroContent}${htmlContent}</div>`);
        } else if (mscAroPosition === "rightside") {
            stala.insertAdjacentHTML('beforeend', `<div class="mscarodiv ${mscAroDivClass}">${htmlContent}${mscAroContent}</div>`);
        } else if (mscAroPosition === "bothsides") {
            stala.insertAdjacentHTML('beforeend', `<div class="mscarodiv mscarobothsides ${mscAroDivClass}">${mscAroContent}${htmlContent}${mscAroContent}</div>`);
        }
    } else {
        stala.insertAdjacentHTML('beforeend', htmlContent);
    }

    // --- RESETOWANIE FORMULARZA ---
    document.getElementById("secdodmsc").style.display = "none";
    document.getElementById("mscname").value = "";
    document.getElementById("bladalnum").value = "";
    document.getElementById("mscdodnumdiv").style.display = "none";
    document.getElementById("mscdodarodiv").style.display = "none";
    document.getElementById("cusdaldiv").style.display = "none";
    
    document.querySelector("#mscaroposition").value = "none";
    document.querySelector("#mscarodirection").value = "none";
    document.querySelector("#mscarocolor").value = "none";
    
    newDalKlasa = "nrk";
    selebladalkat.value = "k";
});


// 9. USUWANIE ======================================================================================
document.addEventListener("click", function(e){
    let sign = getActiveSign();
    if (!sign) return;

    if(e.target.closest(".stala p")){
        e.preventDefault();
        if(confirm("Are you sure you want to remove this city from another rbroad?")){
            let pRow = e.target.closest("p");
            if(pRow){
                pRow.remove();
            }
        }
    }
    else if(e.target.closest(".stala .mscdiv")){
        e.preventDefault();
        if(confirm("Are you sure you want to remove this city from another rbroad?")){
            let pRow = e.target.closest(".mscdiv");
            if(pRow){
                pRow.remove();
            }
        }
    }
    else if(e.target.closest(".aroblockcen .aroimg, .aroblockcor .aroimg")){
        e.preventDefault();
        if(confirm("Are you sure you want to remove this arrow?")){
            let aroRow = e.target.closest(".aroimg");
            if(aroRow){
                let aroBlock = aroRow.closest(".aroblockcen, .aroblockcor"); 
                aroRow.remove();
                if(aroBlock && aroBlock.querySelectorAll(".aroimg").length === 0){
                    aroBlock.remove();
                }
            }
        }
    }
    else if(e.target.closest(".sign .pozioma")){
        e.preventDefault();
        if(confirm("Are you sure you want to remove the line?")){
            let pozioma = e.target.closest(".pozioma");
            if(pozioma){
                pozioma.remove();
            }
        }
    }
    else if(e.target.closest(".sign .mscarodiv")){
        e.preventDefault();
        if(confirm("Are you sure you want to remove this city?")){
            let pozioma = e.target.closest(".mscarodiv");
            if(pozioma){
                pozioma.remove();
            }
        }
    }
    else if(e.target.closest(".sign .divincsharp")){
        e.preventDefault();
        if(confirm("Are you sure you want to remove this intersection?")){
            let divInc = e.target.closest(".divincsharp");
            if(divInc){
                divInc.remove();
            }
        }
    }
    else if(e.target.closest(".sign .divincrounded")){
        e.preventDefault();
        if(confirm("Are you sure you want to remove this intersection?")){
            let divInc = e.target.closest(".divincrounded");
            if(divInc){
                divInc.remove();
            }
        }
    }
    else if(e.target.closest(".sign .numa3 .a3")){
        e.preventDefault();
        if(confirm("Are you sure you want to remove this arrow?")){
            let a3 = e.target.closest(".a3");
            if(a3){
                a3.remove();
            }
        }
    }
});


// 10. NA INNEJ DRODZE MIEJSCOWOŚĆ (MERGE Z 8) ============================================================================================================================


// 11. HIGHWAY ARROWS  ===============================================================================================================================================
document.querySelector("#dodaro").addEventListener("click", function(e){
    e.preventDefault();
    let okno = document.getElementById("secdodaro");
    okno.style.display = "block";
});

document.querySelector("#cancelaro").addEventListener("click", function(e){
    e.preventDefault();
    let okno = document.getElementById("secdodaro");
    okno.style.display = "none";
});

document.querySelector("#arotype").addEventListener("change", arrowSettingsVisibility);
document.querySelector("#aroplacement").addEventListener("change", arrowSettingsVisibility);
document.querySelector("#aronum").addEventListener("change", arrowSettingsVisibility);
function arrowSettingsVisibility(){
    let aroType = document.querySelector("#arotype").value;
    let aroPlacement = document.querySelector("#aroplacement").value;
    let aroNum = parseInt(document.querySelector("#aronum").value);
    if((aroNum == 1 && aroPlacement == "cor") || (aroType == "h3" && aroNum == 1)){
        document.querySelector("#labelaroside").style.display = "block";
    }
    else{
        document.querySelector("#labelaroside").style.display = "none";
    }

    if(aroType == "h3"){
        document.querySelector("#labelaroplacement").style.display = "none";
    }
    else{
        document.querySelector("#labelaroplacement").style.display = "block";
    }
}

document.querySelector("#zataro").addEventListener("click", function(e){
    e.preventDefault();

    let sign = getActiveSign();
    let mid = sign.querySelector(".mid");
    if (!sign) return;
    
    let i = parseInt(document.querySelector("#aronum").value);
    
    let selectTab = document.getElementById("tabchoose");
    let signNum = selectTab.value.replace("s", ""); // Wyciąga np. "1" z "s1"

    let aroType = document.querySelector("#arotype").value;
    let aroDirection = document.querySelector("#arodirection").value;
    let aroPlacement = document.querySelector("#aroplacement").value;
    let aroSide = document.querySelector("#aroside").value;
    let aroSciezka = "";
    let arrowsHTML = "";
    let aroClassH3;
    let computedColor = window.getComputedStyle(sign).color;
    let colorLetter = "W";

    if (computedColor.includes("255, 255, 255") || computedColor === "white") {
        colorLetter = "W";
    } else if (computedColor.includes("139, 0, 0") || computedColor === "darkred") {
        colorLetter = "R";
    } else if (computedColor.includes("0, 0, 255") || computedColor === "blue") {
        colorLetter = "B";
    } else if (computedColor.includes("0, 0, 0") || computedColor === "black") {
        colorLetter = "K";
    } else {
        let tabFont = document.getElementById("tabfont").value;
        if (tabFont === "darkred") colorLetter = "R";
        else if (tabFont === "blue") colorLetter = "B";
        else if (tabFont === "black") colorLetter = "K";
        else colorLetter = "W"; 
    }

    if(aroType == "h1" || aroType == "h2"){
        if(aroType == "h1"){
            aroSciezka = `arrows/arrows_lower/${aroDirection}/${aroDirection}${colorLetter}.png`;
            for (let j = 0; j < i; j++) {
                arrowsHTML += `<img src="${aroSciezka}" alt="aro" class="aroimg aroimgh1">`;
            }
        }
        else if(aroType == "h2"){
            aroSciezka = `arrows/arrows_lower_2/${aroDirection}/${aroDirection}${colorLetter}.png`;
            for (let j = 0; j < i; j++) {
                arrowsHTML += `<img src="${aroSciezka}" alt="aro" class="aroimg aroimgh2">`;
            }
        }

        if(aroPlacement == "cen"){
            let existingAroBlock = sign.querySelector(".aroblockcen");
                
            if (existingAroBlock) {
                existingAroBlock.innerHTML += arrowsHTML;
            } else {
                mid.innerHTML += `<div id="aroBlock${signNum}" class="aroblockcen">${arrowsHTML}</div>`;
            }
        }
        else if(aroPlacement == "cor"){
            if(i == 1){
                if(aroSide == "left"){
                    let existingAroBlock = sign.querySelector(".aroblockcor");
                    if (existingAroBlock) {
                        existingAroBlock.innerHTML += arrowsHTML;
                    } else {
                        mid.innerHTML += `<div id="aroBlock${signNum}" class="aroblockcor corleft">${arrowsHTML}</div>`;
                    }
                }
                else{
                    let existingAroBlock = sign.querySelector(".aroblockcor");
                    if (existingAroBlock) {
                        existingAroBlock.innerHTML += arrowsHTML;
                    } else {
                        mid.innerHTML += `<div id="aroBlock${signNum}" class="aroblockcor corright">${arrowsHTML}</div>`;
                    }
                }
            }
            else{
                let existingAroBlock = sign.querySelector(".aroblockcor");
                if (existingAroBlock) {
                    existingAroBlock.innerHTML += arrowsHTML;
                } else {
                    mid.innerHTML += `<div id="aroBlock${signNum}" class="aroblockcor">${arrowsHTML}</div>`;
                }
            }
        }
    }
    else if(aroType == "h3"){
        aroSciezka = `arrows/arrows_lower_3/${aroDirection}/${aroDirection}${colorLetter}.png`;
        if(aroDirection !== "up" && aroDirection !== "top"){
            aroClassH3 = `a3 curvedh3${aroSide}`;
        }
        else{
            aroClassH3 = "a3";
        }
        if(i == 2){
            sign.querySelector(".numa3left").innerHTML = `<img src="${aroSciezka}" alt="a3" class="${aroClassH3} a3left">`;
            sign.querySelector(".numa3right").innerHTML = `<img src="${aroSciezka}" alt="a3" class="${aroClassH3} a3right">`;
        }
        else if(i == 1){
            if(aroSide == "left"){
                sign.querySelector(".numa3left").innerHTML = `<img src="${aroSciezka}" alt="a3" class="${aroClassH3} a3left">`
            }
            else if(aroSide == "right"){
                sign.querySelector(".numa3right").innerHTML = `<img src="${aroSciezka}" alt="a3" class="a${aroClassH3} a3right">`
            }
        }
        else{
            alert("Maximum 2 type 3 arrows can be placed in one sign.")
        }
    }

    document.getElementById("secdodaro").style.display = "none";
});

// 12. miało być city arrows ale nie ma bo to jednak w dodawaniu miast trzeba pogrzebać


// 13. INTERSECTIONS ======================================================================================================================================================================================
document.querySelector("#dodinc").addEventListener("click", function(e){
    e.preventDefault();
    let okno = document.getElementById("secdodinc");
    okno.style.display = "block";
})

document.querySelector("#cancelinc").addEventListener("click", function(e){
    e.preventDefault();
    let okno = document.getElementById("secdodinc");
    okno.style.display = "none";
});

document.querySelector("#incposition").addEventListener("change", function(){
    let incPosition = document.querySelector('#incposition').value;
    let labelincFullJustify = document.querySelector("#labelincFullJustify");
    if(incPosition == "fulltop" || incPosition == "fullbottom"){
        labelincFullJustify.style.display="block";
    }
    else{
        labelincFullJustify.style.display="none";
    }
})

document.querySelector("#incbgcolor").addEventListener("change", function(){
    let incBgColor = document.querySelector('#incbgcolor').value;
    let labelIncFontColor = document.querySelector("#labelincfontcolor");
    let labelIncCustomColor = document.querySelector('#labelinccustomcolor')
    let optionIncWhiteFont = document.querySelector('#incwhitefont');
    if(incBgColor == "custom"){
        labelIncCustomColor.style.display="block";
        labelIncFontColor.style.display="block";
        optionIncWhiteFont.style.display="block";
    }
    else if(incBgColor == "white"){
        labelIncFontColor.style.display="block";
        optionIncWhiteFont.style.display="none";
        labelIncCustomColor.style.display="none";
    }
    else{
        labelIncCustomColor.style.display="none";
        labelIncFontColor.style.display="none";
        optionIncWhiteFont.style.display="none";
    }
})

document.querySelector("#zatinc").addEventListener("click", function(e){
    e.preventDefault();
    let sign = getActiveSign();
    if (!sign) return;
    let stala = sign.querySelector(".stala");

    let selectedInc = document.querySelector('input[name="inctype"]:checked');
    let incNum = document.querySelector('#incnum').value;
    let incPosition = document.querySelector('#incposition').value;
    let incCorners = document.querySelector('#inccorners').value;
    let incBgColor = document.querySelector("#incbgcolor").value;
    let incFontColor = document.querySelector('#incfontcolor').value;
    let incFullJustify = document.querySelector("#incFullJustify").value;
    let incCustomColor = document.querySelector("#inccustomcolor").value;
    let divIncClass = "";
    let htmlContent = ""

    let wezelImg = "";
    let zjazdImg = "";
    let bgColor = "";
    let textColor = "";
    let borderColor = "";    

    if(selectedInc, incNum, incPosition, incCorners){
        if(incBgColor == "s"){
            let signStyles = window.getComputedStyle(sign);
            bgColor = signStyles.backgroundColor;
            textColor = signStyles.color;
            borderColor = signStyles.borderColor;

            wezelImg = "wezelW";
            zjazdImg = "zjazdW";

            if (bgColor === "rgb(255, 255, 0)"){
                wezelImg = "wezelK";
                zjazdImg = "zjazdK";
                borderColor = "black";
            } 
            else if (textColor === "rgb(0, 0, 0)"){
                wezelImg = "wezelK";
                zjazdImg = "zjazdK";
            } else if (textColor === "rgb(0, 0, 255)"){
                wezelImg = "wezelB";
                zjazdImg = "zjazdB";
            } else if (textColor === "rgb(139, 0, 0)"){
                wezelImg = "wezelR";
                zjazdImg = "zjazdR";
            }
        }
        else if(incBgColor == "blue" || incBgColor == "green" || incBgColor == "chocolate" || incBgColor == "black"){
            bgColor = incBgColor;
            textColor = "white";
            wezelImg = "wezelW";
            zjazdImg = "zjazdW";
        }
        else if(incBgColor == "gold"){
            bgColor = incBgColor;
            textColor = "black";
            borderColor = "black";
            wezelImg = "wezelK";
            zjazdImg = "zjazdK";
        }
        else if(incBgColor == "white"){
            bgColor = incBgColor;
            textColor = incFontColor;
            borderColor = incFontColor;
            if (textColor === "black"){
                wezelImg = "wezelK";
                zjazdImg = "zjazdK";
            } else if (textColor === "blue"){
                wezelImg = "wezelB";
                zjazdImg = "zjazdB";
            } else if (textColor === "darkred"){
                wezelImg = "wezelR";
                zjazdImg = "zjazdR";
            }
        }
        else if(incBgColor == "custom"){
            bgColor = incCustomColor;
            textColor = incFontColor;
            borderColor = incFontColor;
            if (textColor === "black"){
                wezelImg = "wezelK";
                zjazdImg = "zjazdK";
            } else if (textColor === "blue"){
                wezelImg = "wezelB";
                zjazdImg = "zjazdB";
            } else if (textColor === "darkred"){
                wezelImg = "wezelR";
                zjazdImg = "zjazdR";
            } else if (textColor === "white"){
                wezelImg = "wezelW";
                zjazdImg = "zjazdW";
            }
        }

        if(incCorners == "sharp"){
            divIncClass = "divincsharp";
        }
        else if(incCorners == "rounded"){
            divIncClass = "divincrounded";
        }

        if (selectedInc.id === 'wezel'){
            if(incPosition == "insign"){
                stala.innerHTML += `<div class="${divIncClass}" style="border-color: ${borderColor}"><img src="wezel/${wezelImg}.png" alt="w" class="incimage"><p>${incNum}</p></div>`;
            }else{
                htmlContent = `<img src="wezel/${wezelImg}.png" alt="w" class="incimage"><p>${incNum}</p>`;
            }
        }else if (selectedInc.id === 'zjazd'){
            if(incPosition == "insign"){
            stala.innerHTML += `<div class="${divIncClass}" style="border-color: ${borderColor}"><img src="zjazd/${zjazdImg}.png" alt="z" class="incimage"><p>${incNum}</p></div>`;
            }else{
                htmlContent = `<img src="zjazd/${zjazdImg}.png" alt="z" class="incimage"><p>${incNum}</p>`
            }
        }

            const divInc = document.createElement("div");
            divInc.classList.add("intersection", incPosition, divIncClass);
            divInc.style.backgroundColor = bgColor;
            divInc.style.color = textColor;
            divInc.style.borderColor = borderColor;
            if(incPosition == "fulltop" || incPosition == "fullbottom"){
                divInc.style.display = "flex";
                divInc.style.justifyContent = incFullJustify;
            }
            divInc.innerHTML = htmlContent;
            sign.appendChild(divInc);
            
        document.getElementById("secdodinc").style.display = "none";
    }
    else{
        alert("Provide all required data");
    }
})


// 14. CORNERS AND BORDERS =============================================================================================================================================================================================
document.querySelector("#cornervalue").addEventListener("change", function(){
    let cornerValue = document.querySelector("#cornervalue").value;
    document.querySelector("#cornervaluespan").innerHTML = cornerValue + "rem";

    document.querySelectorAll(".sign").forEach(sign =>{
        sign.style.borderRadius = cornerValue + "rem";
    })
    document.querySelectorAll(".divincsharp").forEach(inc =>{
        inc.style.borderRadius = cornerValue + "rem";
    })
})

document.querySelector("#bordervalue").addEventListener("change", function(){
    let borderValue = document.querySelector("#bordervalue").value;
    document.querySelector("#bordervaluespan").innerHTML = borderValue + "rem";

    document.querySelectorAll(".sign").forEach(sign =>{
        sign.style.borderWidth = borderValue + "rem";
    })
    document.querySelectorAll(".divincsharp").forEach(inc =>{
        inc.style.borderWidth = borderValue + "rem";
    })
    document.querySelectorAll(".divincrounded").forEach(inc =>{
        inc.style.borderWidth = borderValue + "rem";
    })
    document.querySelectorAll(".pozioma").forEach(pozioma =>{
        pozioma.style.height = borderValue + "rem";
    })
})


// 15. DODAWANIE LINII
document.getElementById("dodlin").addEventListener("click", function(e){
    e.preventDefault();
    let sign = getActiveSign();
    let stala = sign.querySelector(".stala");
    let computedColor = window.getComputedStyle(sign).color;
    stala.innerHTML += `<div class="pozioma" style="background-color: ${computedColor}"></div>`;
})


