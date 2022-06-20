// set showGoogle as a fail-safe in case storage.sync is not set
var showGoogle = true

chrome.storage.sync.get('biasCheckSettings', function(results){
  if(!results['biasCheckSettings']){
    // default to showing if there are no saved settings
    showGoogle = true;
  }else if(results['biasCheckSettings']['google'] == undefined){
    // default to showing if Google is not set
    showGoogle = true;
  }else{
    showGoogle = results['biasCheckSettings']['google']
  }
  if(showGoogle){
    runBiasCheck();
  }
});

// only run if showGoogle

function runBiasCheck(){

  // function to add decal to target element
  function updateHTML(el, sourceHash){
    // SPECIAL CASES
    if(el[2].match(/borowitz-report/)){
      var sourceData = sourceHash["https://www.newyorker.com/humor/borowitz-report"];
    }else{
      var sourceMatch = el[1];
      // dig one level deeper for domain if no match exists in sourceHash
      if(sourceHash[sourceMatch] != null){
        var sourceData = sourceHash[sourceMatch];
      }else{
        var sourceMatch = sourceMatch.match(/(?:.*?)\.(.*)/);
        if(sourceMatch){
          var sourceData = sourceHash[sourceMatch[1]];
        }
      }
    }
    
    // unsure whether to include "blog" in regex -- better to have false negatives or false positives?
    var opRegex = /opinion/;
    var opinion = el[2].match(opRegex);

    if(sourceData != null){
      if(sourceData['href'] != "NO URL FOUND"){
        var url = sourceData['href'];
      }else{
        var url = '#';
      }
      switch(sourceData['bias']){
        case 'left':
          biasStyle = "background-color: rgb(0,0,150); color: white";
          break;
        case 'left-center':
          biasStyle = "background-color: rgb(0,185,175); color: white";
          break;
        case 'least biased':
          biasStyle = "background-color: rgb(0,150,0); color: white";
          break;
        case 'pro-science':
          biasStyle = "background-color: rgb(0,150,0); color: white";
          break;
        case 'right-center':
          biasStyle = "background-color: rgb(150,125,0); color: white";
          break;
        case 'right':
          biasStyle = "background-color: rgb(150,0,0); color: white";
          break;
        case 'questionable':
          biasStyle = "background-color: rgb(0,0,0); color: rgb(255,150,150)";
          break;
        case 'conspiracy/pseudoscience':
          biasStyle = "background-color: rgb(0,0,0); color: rgb(255,150,150)";
          break;
        case 'conspiracy':
          biasStyle = "background-color: rgb(0,0,0); color: rgb(255,150,150)";
          break;
        case 'unlisted':
          biasStyle = "background-color: rgb(225,225,225); color: black";
          break;
        case 'satire':
          biasStyle = "background-color: rgb(200,0,200); color: white";
          break;      
        default:
          biasStyle = "background-color: rgb(225,225,225); color: black";
          break;
      }

      switch(sourceData['accuracy']){
        case 'very low':
          accStyle = "background-color: rgb(0,0,0); color: rgb(255,150,150)";
          break;
        case 'low':
          accStyle = "background-color: rgb(125,50,50); color: white";
          break;
        case 'mixed':
          accStyle = "background-color: rgb(225,175,0); color: white";
          break;
        case 'mostly factual':
          accStyle = "background-color: rgb(175,200,0); color: white";
          break;
        case 'very high':
          accStyle = "background-color: rgb(0,150,0); color: white";
          break;
        case 'high':
          accStyle = "background-color: rgb(125,150,0); color: white";
          break;
        case 'unlisted':
          accStyle = "background-color: rgb(225,225,225); color: black";
          break;
        case 'satire':
          accStyle = "background-color: rgb(200,0,200); color: white";
          break;      
        default:
          if(sourceData['bias'] == "satire"){
            accStyle = biasStyle;
            sourceData['accuracy'] = "satire";
          }else{
            accStyle = "background-color: rgb(225,225,225); color: black";
          }
          break;
      }
    }else{
      accStyle = "background-color: rgb(225,225,225); color: black";
      biasStyle = "background-color: rgb(225,225,225); color: black";
    }

    var decalOpSpan = document.createElement("span");

    // size down if card
    if(el[3]){
      var size = "font-size: 75%; "
    }else{
      var size = ""
    }

    // create opinion HTML
    if(opinion != null){
      decalOpSpan.classList.add('bias-check-txt');
      decalOpSpan.style = size + "white-space: nowrap; background-color: darkgray; color: white; border-radius: 5px; padding-left: 3px; padding-right: 2px; margin-right: 2px"
      decalOpSpan.textContent = "OpEd";
    }else{
      decalOpSpan.textContent = ' ';  
    }

    if(sourceData == null){
      el[0].insertAdjacentElement('afterend', decalOpSpan);
      console.log('Source ' + el[1] + ' not identified in MBFC master list');
      return true;
    }else{
      // create DOM elements to add
      var decalContainer = document.createElement("div");
      var decalLink = document.createElement("a");
      var decalAccSpan = document.createElement("span");
      var decalBiasSpan = document.createElement("span");
      // create acc HTML
      decalAccSpan.classList.add("bias-check-txt");
      decalAccSpan.style = size + "white-space: nowrap; border-radius: 5px; padding-left: 3px; padding-right: 2px; margin-right: 5px; margin-left: 2px; " + accStyle;
      decalAccSpan.textContent = " Acc: " + sourceData['accuracy'].toUpperCase() + " ";
      // create bias HTML
      decalBiasSpan.classList.add("bias-check-txt");
      decalBiasSpan.style = size + "white-space: nowrap; border-radius: 5px; padding-left: 3px; padding-right: 2px; margin-right: 5px; " + biasStyle;
      decalBiasSpan.textContent = " Bias: " + sourceData['bias'].toUpperCase() + " ";
      // create and populate link HTML
      decalLink.href = url;
      decalLink.target = "_blank";
      decalLink.addEventListener("mouseover", function(){
        this.setAttribute('style', 'opacity: 0.3; text-decoration: none');
      });
      decalLink.addEventListener("mouseout", function(){
        this.setAttribute('style', 'opacity: 1.0; text-decoration: none');
      });
      decalLink.setAttribute('class', 'bias-check-tag');
      decalLink.appendChild(decalAccSpan);
      decalLink.appendChild(decalBiasSpan);
      decalLink.appendChild(decalOpSpan);
      decalContainer.appendChild(decalLink);
      decalContainer.style = "margin-left: 5px; margin-bottom: 7px"

      el[0].insertAdjacentElement('afterend', decalContainer);

      return true;
    }
  }

  // function to identify target elements
  function run(sourceHash){
    var tab = document.getElementsByClassName('hdtb-msel')
    if(tab.length == 0){
      console.log("Not a bias-check-eligible page");
      return true;
    }else if(tab[0].textContent == "All"){
      // Default tab
      var linkClass = ".iUh30";
      var cardClass = ".xCURGd";
      var vidCardClass = ".P94G9b";
      var quotCardClass = ".byt6U";
      // get link elements
      var standard = document.querySelectorAll(linkClass);
      var cards = document.querySelectorAll(cardClass);
      var vidCards = document.querySelectorAll(vidCardClass);
      var quotCards = document.querySelectorAll(quotCardClass);
      // add bias-check class to each element to make sure that script isn't run multiple times on the same element
      standard.forEach(function(e){ e.classList.add('bias-check') });
      cards.forEach(function(e){ e.classList.add('bias-check') });
      vidCards.forEach(function(e){ e.classList.add('bias-check') });
      quotCards.forEach(function(e){ e.classList.add('bias-check') });
      // convert to array
      var standardArray = Array.from(standard).filter(function(e){ return getComputedStyle(e).visibility == "visible" });
      var cardsArray = Array.from(cards);
      var vidCardsArray = Array.from(vidCards);
      var quotCardsArray = Array.from(quotCards);

      var linkRegex = /(?:https?\:\/\/)?(?:www\.)?([A-Za-z0-9\_\-\.]+)\/?/;
      // run script to add decals to each target identified
      // [targetEl, baseLink, fullLinkText, card]
      var standardLinks = standardArray.filter(function(e){ return e.closest('a') }).map(function(e){ return [e.closest('a'), e.closest('a').href.match(linkRegex)[1], e.closest('a').href, false] });
      var cardLinks = cardsArray.map(function(e){ return [e.closest('a'), e.closest('a').href.match(linkRegex)[1], e.closest('a').href, true] });
      var vidCardLinks = vidCardsArray.map(function(e){ return [e.children[0].children[0], e.querySelector('a').href.match(linkRegex)[1], e.querySelector('a').href, true] });
      var quotCardLinks = quotCardsArray.map(function(e){ return [e.children[0].children[0], e.querySelector('a').href.match(linkRegex)[1], e.querySelector('a').href, true] });

      // combine
      var baseLinks = standardLinks.concat(cardLinks, vidCardLinks, quotCardLinks);
      
      baseLinks.forEach(function(e){
        updateHTML(e, sourceHash);
      });

    }else if(tab[0].textContent == "News"){
      // News tab
      var linkClass = ".KWQBje";
      var cardClass = ".F9rcV";
      var cardClassAdjust = "Tsx23b";
      // get link elements
      var standard = document.querySelectorAll(linkClass);
      var cards = document.querySelectorAll(cardClass);
      // add bias-check class to each element to make sure that script isn't run multiple times on the same element
      standard.forEach(function(e){ e.classList.add('bias-check') });
      cards.forEach(function(e){ e.classList.add('bias-check') });
      // convert to array
      var standardArray = Array.from(standard).filter(function(e){ return getComputedStyle(e).visibility == "visible" });
      var cardsArray = Array.from(cards);
      // move card class from link to parent div to accommodate decals
      cardsArray.forEach(function(e){ var link = e.querySelector('a'); link.classList.remove(cardClassAdjust); link.parentElement.classList.add(cardClassAdjust); })

      var linkRegex = /(?:https?\:\/\/)?(?:www\.)?([A-Za-z0-9\_\-\.]+)\/?/;
      // run script to add decals to each target identified
      // [targetEl, baseLink, fullLinkText, card]
      var standardLinks = standardArray.map(function(e){ return [e.closest('a'), e.closest('a').href.match(linkRegex)[1], e.closest('a').href, false] }).filter(function(e) { return e[0] });
      var cardLinks = cardsArray.map(function(e){ return [e.querySelector('a'), e.querySelector('a').href.match(linkRegex)[1], e.querySelector('a').href, true] })

      // combine
      var baseLinks = standardLinks.concat(cardLinks);
      
      baseLinks.forEach(function(e){
        updateHTML(e, sourceHash);
      });

    }else if(tab[0].textContent == "Videos"){
      // Video tab
      var linkClass = ".iUh30";
      // get link elements
      var vids = document.querySelectorAll(linkClass);
      // add bias-check class to each element to make sure that script isn't run multiple times on the same element
      vids.forEach(function(e){ e.classList.add('bias-check') });
      // convert to array
      var vidArray = Array.from(vids).filter(function(e){ return getComputedStyle(e).visibility == "visible" });

      var linkRegex = /(?:https?\:\/\/)?(?:www\.)?([A-Za-z0-9\_\-\.]+)\/?/;
      // run script to add decals to each target identified
      // [targetEl, baseLink, fullLinkText, card]
      var baseLinks = vidArray.map(function(e){ return [e.closest('a'), e.textContent.match(linkRegex)[1], e.textContent, false] }).filter(function(e) { return e[0] });
      
      baseLinks.forEach(function(e){
        updateHTML(e, sourceHash);
      });
    }else{
      console.log("Not a bias-check-eligible page");
      return true;
    }

  }

  url = chrome.runtime.getURL('sources/sources.json');

  var sourceHash;

  async function getData(){
    const response = await fetch(url);
    const json = await response.json();

    return json
  }

  getData().then(json => {
    sourceHash = json;
  }).then(function(){
    run(sourceHash);
  });
}