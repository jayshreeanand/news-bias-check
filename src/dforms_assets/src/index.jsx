import * as React from 'react';
import { render } from 'react-dom';
import { dforms as canister } from "../../declarations/dforms";

import { dforms } from "../../declarations/dforms";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

// document.querySelector("form").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const button = e.target.querySelector("button");

//   const domain = document.getElementById("domain").value.toString();

//   button.setAttribute("disabled", true);

//   // Interact with foo actor, calling the greet method
//   const greeting = await dforms.greet(domain);

//   button.removeAttribute("disabled");

//   document.getElementById("greeting").innerText = greeting;

//   return false;
// });



class NewsSources extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  
  async fetchNewsSources() {
    var newsSources = await canister.getNewsSources().then( results => {
    console.log(results);
    var trval = "";

      if(results.length > 0) {
        results.forEach(function(value, index){
          console.log("value is")
        console.log(value[1])
       trval = trval + '<tr>';

         trval = trval+'<td>'+ value[1]["domain"] +'</td>';
         trval = trval+'<td>'+ value[1]["bias"] +'</td>';
         trval = trval+'<td>'+ value[1]["accuracy"] +'</td>';
         trval = trval+'<td><a href="'+ value[1]["source"] +'">Link</a></td>';
        trval = trval+'</tr>';

        });
        console.log(trval);
        let table = document.getElementById("newstable");
        table.innerHTML = trval;
      };
    });

  }

  async doInsert() {
    let domain = document.getElementById("newEntryDomain").value;
    let bias = document.getElementById("newEntryBias").value;
    let accuracy = document.getElementById("newEntryAccuracy").value;
    let source = document.getElementById("newEntrySource").value;
    canister.insert(domain, bias, accuracy, source);
    this.fetchNewsSources()
  }

  async lookup() {
    let domain = document.getElementById("lookupDomain").value;
    canister.lookup(domain).then(opt_entry => {
      let entry = opt_entry.length > 0 ? opt_entry[0] : null;
      if (entry === null || entry === undefined) {
        entry = {
          bias: "",
          accuracy: "",
          source: "",
        };
      }
      document.getElementById("newEntryDomain").value = domain;
      document.getElementById("newEntryBias").value = entry.bias;
      document.getElementById("newEntryAccuracy").value = entry.accuracy;
      document.getElementById("newEntrySource").value = entry.source;

    });
  }

  async bulkInsert() {
    // let sources ={"100percentfedup.com":{"bias":"questionable","accuracy":"low","href":"https://mediabiasfactcheck.com/100-percent-fed-up/"},"1010wins.radio.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/1010-wins-am/"},"10news.one":{"bias":"questionable","accuracy":"low","href":"https://mediabiasfactcheck.com/10news-one/"},"12news.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/12-news-kpnx/"},"12minutos.com":{"bias":"questionable","accuracy":"low","href":"https://mediabiasfactcheck.com/12minutos-com/"},"join1440.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/1440-newsletter/"},"whitehouse.gov":{"bias":"right","accuracy":"mostly factual","href":"https://mediabiasfactcheck.com/whitehouse-gov/"},"21stcenturywire.com":{"bias":"conspiracy/pseudoscience","accuracy":"mixed","href":"https://mediabiasfactcheck.com/21st-century-wire/"},"us24news.com":{"bias":"questionable","accuracy":"low","href":"https://mediabiasfactcheck.com/24-news/"},"247newsmedia.com":{"bias":"questionable","accuracy":"very low","href":"https://mediabiasfactcheck.com/247-news-media/"},"24ur.com":{"bias":"least biased","accuracy":"mostly factual","href":"https://mediabiasfactcheck.com/24ur-com/"},"secondamendmentdaily.com":{"bias":"questionable","accuracy":"low","href":"https://mediabiasfactcheck.com/2nd-amendment-daily-news/"},"2ndvote.com":{"bias":"right","accuracy":"mixed","href":"https://mediabiasfactcheck.com/2ndvote/"},"369news.net":{"bias":"conspiracy/pseudoscience","accuracy":"mixed","href":"https://mediabiasfactcheck.com/369news/"},"38north.org":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/38-north/"},"3ccorp.net":{"bias":"questionable","accuracy":"low","href":"https://mediabiasfactcheck.com/3ccorp-net/"},"604now.com":{"bias":"left-center","accuracy":"mostly factual","href":"https://mediabiasfactcheck.com/604-now/"},"680news.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/680-news/"},"70news.wordpress.com":{"bias":"fake","accuracy":"fake","href":"https://mediabiasfactcheck.com/70-news/"},"71republic.com":{"bias":"right-center","accuracy":"high","href":"https://mediabiasfactcheck.com/71-republic/"},"79days.news":{"bias":"conspiracy/pseudoscience","accuracy":"very low","href":"https://mediabiasfactcheck.com/79days-news/"},"7news.com.au":{"bias":"right-center","accuracy":"mixed","href":"https://mediabiasfactcheck.com/7news/"},"9news.com.au":{"bias":"right-center","accuracy":"high","href":"https://mediabiasfactcheck.com/9-news-australia/"},"911truth.org":{"bias":"conspiracy/pseudoscience","accuracy":"low","href":"https://mediabiasfactcheck.com/911truth-org/"},"972mag.com":{"bias":"left-center","accuracy":"high","href":"https://mediabiasfactcheck.com/972-magazine/"},"9news.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/9news-kusa/"},"asheepnomore.net":{"bias":"conspiracy/pseudoscience","accuracy":"low","href":"https://mediabiasfactcheck.com/a-sheep-no-more/"},"avoiceformen.com":{"bias":"questionable","accuracy":"low","href":"https://mediabiasfactcheck.com/a-voice-for-men/"},"abc.es":{"bias":"right-center","accuracy":"high","href":"https://mediabiasfactcheck.com/abc-spain/"},"abcnews.go.com":{"bias":"left-center","accuracy":"high","href":"https://mediabiasfactcheck.com/abc-news/"},"abc.net.au":{"bias":"left","accuracy":"high","href":"http://mediabiasfactcheck.com/abc-news-australia/"},"abc11.com":{"bias":"left-center","accuracy":"high","href":"https://mediabiasfactcheck.com/abc11-eyewitness-news/"},"abc12.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/abc12-news-wjrt/"},"abc7ny.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/abc7-new-york/"},"ABC7chicago.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/abc7chicago-com/"},"abcnews-us.com":{"bias":"questionable","accuracy":"very low","href":"https://mediabiasfactcheck.com/abcnews-us-com/"},"abcnews.com.co":{"bias":"fake","accuracy":"fake","href":"http://abcnews.com.co/"},"abeldanger.org":{"bias":"conspiracy/pseudoscience","accuracy":"mixed","href":"https://mediabiasfactcheck.com/abel-danger/"},"abort73.com":{"bias":"right","accuracy":"mixed","href":"https://mediabiasfactcheck.com/abort73/"},"abovethelaw.com":{"bias":"left-center","accuracy":"high","href":"https://mediabiasfactcheck.com/above-the-law/"},"abovetopsecret.com":{"bias":"conspiracy/pseudoscience","accuracy":"low","href":"https://mediabiasfactcheck.com/above-top-secret/"}};
    let sources = {"100percentfedup.com":{"bias":"questionable","accuracy":"low","href":"https://mediabiasfactcheck.com/100-percent-fed-up/"},"1010wins.radio.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/1010-wins-am/"},"10news.one":{"bias":"questionable","accuracy":"low","href":"https://mediabiasfactcheck.com/10news-one/"},"12news.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/12-news-kpnx/"},"12minutos.com":{"bias":"questionable","accuracy":"low","href":"https://mediabiasfactcheck.com/12minutos-com/"},"join1440.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/1440-newsletter/"},"whitehouse.gov":{"bias":"right","accuracy":"mostly factual","href":"https://mediabiasfactcheck.com/whitehouse-gov/"},"21stcenturywire.com":{"bias":"conspiracy/pseudoscience","accuracy":"mixed","href":"https://mediabiasfactcheck.com/21st-century-wire/"},"us24news.com":{"bias":"questionable","accuracy":"low","href":"https://mediabiasfactcheck.com/24-news/"},"247newsmedia.com":{"bias":"questionable","accuracy":"very low","href":"https://mediabiasfactcheck.com/247-news-media/"},"24ur.com":{"bias":"least biased","accuracy":"mostly factual","href":"https://mediabiasfactcheck.com/24ur-com/"},"secondamendmentdaily.com":{"bias":"questionable","accuracy":"low","href":"https://mediabiasfactcheck.com/2nd-amendment-daily-news/"},"2ndvote.com":{"bias":"right","accuracy":"mixed","href":"https://mediabiasfactcheck.com/2ndvote/"},"369news.net":{"bias":"conspiracy/pseudoscience","accuracy":"mixed","href":"https://mediabiasfactcheck.com/369news/"},"38north.org":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/38-north/"},"3ccorp.net":{"bias":"questionable","accuracy":"low","href":"https://mediabiasfactcheck.com/3ccorp-net/"},"604now.com":{"bias":"left-center","accuracy":"mostly factual","href":"https://mediabiasfactcheck.com/604-now/"},"680news.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/680-news/"},"70news.wordpress.com":{"bias":"fake","accuracy":"fake","href":"https://mediabiasfactcheck.com/70-news/"},"71republic.com":{"bias":"right-center","accuracy":"high","href":"https://mediabiasfactcheck.com/71-republic/"},"79days.news":{"bias":"conspiracy/pseudoscience","accuracy":"very low","href":"https://mediabiasfactcheck.com/79days-news/"},"7news.com.au":{"bias":"right-center","accuracy":"mixed","href":"https://mediabiasfactcheck.com/7news/"},"9news.com.au":{"bias":"right-center","accuracy":"high","href":"https://mediabiasfactcheck.com/9-news-australia/"},"911truth.org":{"bias":"conspiracy/pseudoscience","accuracy":"low","href":"https://mediabiasfactcheck.com/911truth-org/"},"972mag.com":{"bias":"left-center","accuracy":"high","href":"https://mediabiasfactcheck.com/972-magazine/"},"9news.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/9news-kusa/"},"asheepnomore.net":{"bias":"conspiracy/pseudoscience","accuracy":"low","href":"https://mediabiasfactcheck.com/a-sheep-no-more/"},"avoiceformen.com":{"bias":"questionable","accuracy":"low","href":"https://mediabiasfactcheck.com/a-voice-for-men/"},"abc.es":{"bias":"right-center","accuracy":"high","href":"https://mediabiasfactcheck.com/abc-spain/"},"abcnews.go.com":{"bias":"left-center","accuracy":"high","href":"https://mediabiasfactcheck.com/abc-news/"},"abc.net.au":{"bias":"left","accuracy":"high","href":"http://mediabiasfactcheck.com/abc-news-australia/"},"abc11.com":{"bias":"left-center","accuracy":"high","href":"https://mediabiasfactcheck.com/abc11-eyewitness-news/"},"abc12.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/abc12-news-wjrt/"},"abc7ny.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/abc7-new-york/"},"ABC7chicago.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/abc7chicago-com/"},"abcnews-us.com":{"bias":"questionable","accuracy":"very low","href":"https://mediabiasfactcheck.com/abcnews-us-com/"},"abcnews.com.co":{"bias":"fake","accuracy":"fake","href":"http://abcnews.com.co/"},"abeldanger.org":{"bias":"conspiracy/pseudoscience","accuracy":"mixed","href":"https://mediabiasfactcheck.com/abel-danger/"},"abort73.com":{"bias":"right","accuracy":"mixed","href":"https://mediabiasfactcheck.com/abort73/"},"abovethelaw.com":{"bias":"left-center","accuracy":"high","href":"https://mediabiasfactcheck.com/above-the-law/"},"abovetopsecret.com":{"bias":"conspiracy/pseudoscience","accuracy":"low","href":"https://mediabiasfactcheck.com/above-top-secret/"},"abriluno.com":{"bias":"satire","accuracy":"","href":"https://mediabiasfactcheck.com/abril-uno/"},"news.abs-cbn.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/abs-cbn-news/"},"acculturated.com":{"bias":"right","accuracy":"mostly factual","href":"https://mediabiasfactcheck.com/acculturated/"},"academia.org":{"bias":"right","accuracy":"mixed","href":"https://mediabiasfactcheck.com/accuracy-in-academia-aia/"},"aim.org":{"bias":"right","accuracy":"mixed","href":"https://mediabiasfactcheck.com/accuracy-in-media-aim/"},"aceflashman.wordpress.com":{"bias":"satire","accuracy":"","href":"https://mediabiasfactcheck.com/ace-flashman/"},"aceshowbiz.com":{"bias":"left-center","accuracy":"mixed","href":"https://mediabiasfactcheck.com/aceshowbiz-asb/"},"achnews.org":{"bias":"left","accuracy":"mostly factual","href":"https://mediabiasfactcheck.com/achnews/"},"aclu.org":{"bias":"left-center","accuracy":"mixed","href":"https://mediabiasfactcheck.com/american-civil-liberties-union-aclu/"},"latitudes.org":{"bias":"conspiracy/pseudoscience","accuracy":"mixed","href":"https://mediabiasfactcheck.com/acn-latitudes/"},"act.tv":{"bias":"left","accuracy":"mostly factual","href":"https://mediabiasfactcheck.com/act-tv/"},"acting-man.com":{"bias":"right","accuracy":"mixed","href":"https://mediabiasfactcheck.com/acting-man/"},"actionnews3.com":{"bias":"questionable","accuracy":"very low","href":"https://mediabiasfactcheck.com/action-news-3/"},"actionnewsjax.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/actionnewsjax-com/"},"activistmommy.com":{"bias":"questionable","accuracy":"low","href":"https://mediabiasfactcheck.com/activist-mommy/"},"activistpost.com":{"bias":"conspiracy/pseudoscience","accuracy":"low","href":"https://mediabiasfactcheck.com/activist-post/"},"adfontesmedia.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/all-generalizations-are-false-ad-fontes-media/"},"addictinginfo.com":{"bias":"left","accuracy":"mixed","href":"https://mediabiasfactcheck.com/addicting-info/"},"adobochronicles.com":{"bias":"satire","accuracy":"","href":"https://mediabiasfactcheck.com/the-adobo-chronicles/"},"theadvocates.org":{"bias":"right-center","accuracy":"mostly factual","href":"https://mediabiasfactcheck.com/advocates-for-self-government/"},"awdnews.com":{"bias":"conspiracy/pseudoscience","accuracy":"mixed","href":"https://mediabiasfactcheck.com/adw-news/"},"adweek.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/adweek/"},"aeon.co":{"bias":"left-center","accuracy":"high","href":"https://mediabiasfactcheck.com/aeon/"},"affinitymagazine.us":{"bias":"left-center","accuracy":"high","href":"https://mediabiasfactcheck.com/affinity-magazine/"},"africacheck.org":{"bias":"least biased","accuracy":"very high","href":"https://mediabiasfactcheck.com/africa-check/"},"africanews.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/africa-news/"},"africanarguments.org":{"bias":"left-center","accuracy":"high","href":"https://mediabiasfactcheck.com/african-arguments/"},"aftonbladet.se":{"bias":"left","accuracy":"mixed","href":"https://mediabiasfactcheck.com/aftonbladet/"},"ac2news.com":{"bias":"right","accuracy":"high","href":"https://mediabiasfactcheck.com/against-crony-capitialism/"},"agdaily.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/agdaily/"},"ageofautism.com":{"bias":"conspiracy/pseudoscience","accuracy":"low","href":"https://mediabiasfactcheck.com/age-of-autism/"},"ageofshitlords.com":{"bias":"questionable","accuracy":"low","href":"https://mediabiasfactcheck.com/age-of-shitlords/"},"afp.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/afp-agence-france-presse/"},"ansa.it":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/agenzia-nazionale-stampa-associata-ansa/"},"agerpres.ro":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/agerpres/"},"agweb.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/agweb/"},"english.ahram.org.eg":{"bias":"right-center","accuracy":"mixed","href":"https://mediabiasfactcheck.com/ahram-online/"},"ahvalnews.com":{"bias":"left-center","accuracy":"mixed","href":"https://mediabiasfactcheck.com/ahval-news/"},"airspacemag.com":{"bias":"pro-science","accuracy":"very high","href":"https://mediabiasfactcheck.com/air-space-magazine/"},"airforcetimes.com":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/air-force-times/"},"airwars.org":{"bias":"least biased","accuracy":"high","href":"https://mediabiasfactcheck.com/airwars/"},"ajuanews.com":{"bias":"questionable","accuracy":"very low","href":"https://mediabiasfactcheck.com/ajuanews-com/"},"akkadiantimes.com":{"bias":"left","accuracy":"high","href":"https://mediabiasfactcheck.com/akkadian-times/"},"beaconjournal.com":{"bias":"left-center","accuracy":"high","href":"https://mediabiasfactcheck.com/akron-beacon-journal/"},"english.alarabiya.net":{"bias":"questionable","accuracy":"mixed","href":"https://mediabiasfactcheck.com/al-arabiya/"},"albawaba.com":{"bias":"questionable","accuracy":"mixed","href":"https://mediabiasfactcheck.com/al-bawaba/"}}
    // var newsagencies = JSON.parse(sources)
    console.log(sources)
    for (const [key, value] of Object.entries(sources)) {
      console.log(key, value["bias"], value["accuracy"], value["href"] )
      canister.insert(key, value["bias"], value["accuracy"], value["href"] )

    }
  }
  render() {
    return (
      <div>
      <Container>
        <div>
          <h1>News Source Bias Check</h1>
          <div class="mt-4">
            Insert or update a new news agency bias/accuracy entry:
            <table class="mt-4 mb-3">
              <tbody>
                <tr class="mt-2"><td>Domain:</td><td><input class="form-control" required id="newEntryDomain"></input></td></tr>
                <tr class="mt-2"><td>Bias:</td><td><input class="form-control" required id="newEntryBias"></input></td></tr>
                <tr class="mt-2"><td>Accuracy:</td><td><input class="form-control" required id="newEntryAccuracy" type="tel" ></input></td></tr>
                <tr class="mt-2"><td>Source Link:</td><td><input  class="form-control" id="newEntrySource" ></input></td></tr>

              </tbody>
            </table>
            <Button onClick={() => this.doInsert()} variant="primary">Insert or Update</Button>
          </div>
          <div class="lookup mt-4 " >
            Lookup News Source: <input class=" mb-4 mt-4 col-sm-3 form-control" id="lookupDomain"></input> <Button class="mt-4" onClick={() => this.lookup()} variant="primary">Lookup</Button>
          </div>
        </div>
      </Container>
      <Container class="mt-5">
        {/* <h4 class="mt=5"> News Sources List </h4> */}
        <div class="lookup mt-4 " >
            Fetch recent news source entries:  <Button class="mt-4" onClick={() => this.fetchNewsSources()} variant="success">Go!</Button>
          </div>
      <table class="table table-striped mt-5 ">
      <thead>
        <tr>
          <th scope="col">Domain</th>
          <th scope="col">Bias</th>
          <th scope="col">Accuracy</th>
          <th scope="col">Source Link</th>
        </tr>
      </thead>
      <tbody id="newstable">
      
       
      </tbody>
    </table>
     <a href="#" type="button" class="mt-4" onClick={() => this.bulkInsert()}>Bulk insert rating data</a>

    </Container>
    </div>
    );
  }
}

render(<NewsSources />, document.getElementById('app'));
