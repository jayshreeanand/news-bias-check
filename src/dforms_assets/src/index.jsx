import * as React from 'react';
import { render } from 'react-dom';
import { dforms as canister } from "../../declarations/dforms";

import { dforms } from "../../declarations/dforms";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

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
        <h1>News Source Bias Check</h1>
        <div>
          Insert or update a new news agency bias/accuracy entry:
          <table>
            <tbody>
              <tr><td>Domain:</td><td><input required id="newEntryDomain"></input></td></tr>
              <tr><td>Bias:</td><td><input required id="newEntryBias"></input></td></tr>
              <tr><td>Accuracy:</td><td><input required id="newEntryAccuracy" type="tel" ></input></td></tr>
              <tr><td>Source Link:</td><td><input  id="newEntrySource" ></input></td></tr>

            </tbody>
          </table>
          <Button  onClick={() => this.doInsert()} variant="primary">Button #1</Button>
          <button onClick={() => this.doInsert()}>Insert or Update</button>
        </div>
        <div>
          Lookup News Source: <input id="lookupDomain"></input> <button onClick={
            () => this.lookup()
          }>Lookup</button>
        </div>
      </div>
    );
  }
}

render(<NewsSources />, document.getElementById('app'));
