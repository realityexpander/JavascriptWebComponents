import { LitElement, html } from 'lit';
import { styles } from './material-components-web.min.css.js';

// Source: https://gist.github.com/prof3ssorSt3v3/1ba5a0f01e5cb45d0d2f81b17036bc27
// VIdeo: https://www.youtube.com/watch?v=7fybEXre70o
// Steve Griffith - Prof3ssorSt3v3

class Files extends LitElement {

  static get properties() {
    return {
      category: { type: String },
      someOtherGlobalProp: { type: String }
    }
  }

  static styles = styles;

  constructor() {
    super();
    this.category = '';
    this.someOtherGlobalProp = '';
  }

  firstUpdated() {
    this.shadowRoot.getElementById('inputFile').addEventListener('change', this.filesPicked.bind(this));

    this.shadowRoot.getElementById('btnToggle').addEventListener('click', this.toggleInput.bind(this));
    this.shadowRoot.getElementById('btnPick').addEventListener('click', this.askForFiles.bind(this));
    this.shadowRoot.getElementById('btnInfo').addEventListener('click', this.showFileInfo.bind(this));

    this.shadowRoot.getElementById('btnUpload').addEventListener('click', this.uploadFiles.bind(this));
  }

  filesPicked(ev) {
    //any time one or more files are picked in the file picker dialog
    let input = ev.target;
    let files = input.files;
    console.log({ files });
    if (files.length > 0) {
      this.showFileInfo(ev);
    }
  }

  toggleInput(ev) {
    //hide or show the <input type="file">
    ev.preventDefault();
    let control = this.shadowRoot.getElementById('inputFile').parentElement;
    //we want to apply this class to the parent
    control.classList.toggle('hidden');
  }

  askForFiles(ev) {
    //open the file picker dialog
    ev.preventDefault();
    let control = this.shadowRoot.getElementById('inputFile');
    control.click();
  }

  uploadFiles(ev) {
    //upload the files to the server
    ev.preventDefault();
    let files = this.shadowRoot.getElementById('inputFile').files;
    let fileCount = files.length;
    if (fileCount > 0) {
      //let url = 'https://jsonplaceholder.typicode.com/users';
      let url = 'http://localhost:3000/upload';
      // let h = new Headers();
      // h.append('content-type', files[0].type); // must be added manually for a single file
      // h.append('content-length', files[0].size); // must be added manually for a single file
      //  "Content-disposition": "Multipart/Form-Data;boundary=--asdlkasjdflksdjflkds" // automatically added by browser when using FormData
      let fd = new FormData();
      fd.append('name', 'Steve'); // add a field to the form dataå
      for (let i = 0, len = files.length; i < len; i++) {
        fd.append(`files-${i}`, files[i], files[i].name);
      }
      let request = new Request(url, {
        //body: files[0], // uploads a single file, requires use of manual added headers
        body: fd, // changes encoding to multipart/form-data
        // headers: h,
        // credentials: 'include',

        // Note: "mode: 'no-cors'" is not needed if the server is setup to allow CORS. 
        // If using "mode: 'no-cors'", the response will be opaque and the `response.ok` will be false 
        // but the `response.status` will be 200. The response will not be able to be parsed as JSON.
        // The request will still be sent to the server, but the response will not be returned to the client.
        // mode: 'no-cors', 
        method: 'POST',
      });
      fetch(request)
        .then((response) => {
          console.log(response.status, response.statusText);
          this.addMessageToOutput('info', `response.ok=${response.ok}, 
            status=${response.status}:${response.statusText}
          `.trim());

          // intercept for CORS invalid response
          if (!response.ok) {
            throw new Error(`Check CORS configuration. response.ok=${response.ok}, status=${response.status}:${response.statusText}`);
            return {};
          }

          return response.json();
        })
        .then(json => {
          console.log(json);
          this.addMessageToOutput('success', JSON.stringify(json));
        }).catch((e) => {
          console.warn(e);
          this.addMessageToOutput('error', e.message);
        });

    }
  }

  addMessageToOutput(type, message) {
    let output = this.shadowRoot.getElementById('output');
    let li = document.createElement('li');

    if (type == undefined) type = 'info';
    li.classList.add(type);
    li.innerHTML = type + ": " + message;
    output.appendChild(li);
  }

  showFileInfo(ev) {
    if (ev.type == 'click') ev.preventDefault();
    //loop through all the files in the filelist
    //and display the name, size, type, and lastModified date
    let files = this.shadowRoot.getElementById('inputFile').files;
    let output = this.shadowRoot.getElementById('output');
    output.innerHTML = '';
    let len = files.length;
    for (let i = 0; i < len; i++) {
      console.group();
      console.log(files[i].name);
      console.log(files[i].size);
      console.log(files[i].type);
      console.log(files[i].lastModified);
      console.groupEnd();

      let li = document.createElement('li');
      li.innerHTML = `
        <p><strong>${files[i].name}</strong></p>
        <p>Size: ${files[i].size}</p>
        <p>Type: ${files[i].type}</p>
        <p>Last Modified: ${files[i].lastModified}</p>
      `;
      output.appendChild(li);
    }
  }

  render() {
    // If provided, the properties for type and day are taking from the path.
    return html`
    <style>
        * {
          box-sizing: border-box;
          font: inherit;
        }
        html {
          font-size: 20px;
          font-family: sans-serif;
          margin: 0;
        }
        body {
          margin: 0;
        }
        header {
          padding: 1rem 3rem;
          background-color: coral;
          color: white;
          border-bottom: 1px solid #000;
        }
        :is(main, footer) {
          padding: 1rem 3rem;
        }
        header h1 {
          font-size: 2rem;
        }
        form {
          padding: 0 4rem;
        }
        .hidden {
          opacity: 0;
          height: 0;
          line-height: 0;
          overflow: hidden;
          padding: 0;
          margin: 0;
        }
        footer img {
          width: 300px;
        }
    </style>
    <div class="wrapper">
      <main>
        <h2>Gather Your Files</h2>
        <form name="myform" id="myform" action="#">
          <p>
            <label>Pick Files</label>
            <input type="file" id="inputFile" multiple
              accept=".png,.jpg,.gif,.webp,image/jpeg,image/gif,image/webp,image/png" />
          </p>
          <!-- 
              text/html,.html,text/xml,.xml
              text/css,.css
              application/json,.json,text/json
              image/*,.png,.jpg,.gif,.webp,image/jpeg,image/gif,image/webp,image/png  
            -->
          <p><button id="btnToggle">Toogle File Input</button></p>
          <p><button id="btnPick">Pick Files</button></p>
          <p><button id="btnInfo">Show File Info</button></p>
          <p><button id="btnUpload">Upload Files</button></p>
        </form>
        <br>
        <br>
        <ul id="output"></ul>
      </main>
    </div>
      `
  }

}
customElements.define('page-files', Files);