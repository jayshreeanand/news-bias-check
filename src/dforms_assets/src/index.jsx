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
        console.log(value)
       trval = trval + '<tr>';

         trval = trval+'<td>'+ value[0][1]["domain"] +'</td>';
         trval = trval+'<td>'+ value[0][1]["bias"] +'</td>';
         trval = trval+'<td>'+ value[0][1]["accuracy"] +'</td>';
         trval = trval+'<td>'+ value[0][1]["source"] +'</td>';
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
    </Container>
    </div>
    );
  }
}

render(<NewsSources />, document.getElementById('app'));
