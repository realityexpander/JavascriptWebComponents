import { LitElement, html } from 'lit';
import { styles } from './material-components-web.min.css.js';

class WebWorker extends LitElement {

  static styles = styles;

  #worker;
  #broadcastChannel;

  render() {
    // If provided, the properties for type and day are taking from the path.
    return html`
      <div class="wrapper">
        This is the page for web worker<br>
        <br>
        
        <button id="btnStart">Start Worker</button>
        <br>
        <br>

        <button id="btnCalculate">Run Calculation</button>
        <br>
        <br>

        <button id="btnStartInterval">Start Interval</button>
        <br>
        <br>

        <button id="btnStopInterval">Stop Interval</button>
        <br>
        <br>

        <button id="btnStop">Stop Worker</button>
        <br>
        <br>

        <div id="messages"></div>
      </div>
    `
  }


  firstUpdated() {
    let btnStart = this.shadowRoot.getElementById('btnStart');
    btnStart.addEventListener('click', this.onStartWorker.bind(this));

    let btnStop = this.shadowRoot.getElementById('btnStop');
    btnStop.addEventListener('click', this.onStopWorker.bind(this));

    let btnCalculate = this.shadowRoot.getElementById('btnCalculate');
    btnCalculate.addEventListener('click', this.onCalculate.bind(this));

    let btnStartInterval = this.shadowRoot.getElementById('btnStartInterval');
    btnStartInterval.addEventListener('click', this.onStartInterval.bind(this));

    let btnStopInterval = this.shadowRoot.getElementById('btnStopInterval');
    btnStopInterval.addEventListener('click', this.onStopInterval.bind(this));
  }

  onStartWorker() {
    if (this.#worker) {
      this.logWorkerMessage({ data: 'page_web_worker: Terminating Current WebWorker...' });
      this.#worker.terminate();
    }

    // Create a new worker
    this.#worker = new Worker('webworker.js');

    // Send a message to the worker
    this.#worker.postMessage('start');

    // Create BroadcastChannel
    this.#broadcastChannel = new BroadcastChannel('wkrp');

    // Listen for messages from the worker
    //this.#worker.addEventListener('message', this.logWorkerMessage.bind(this)); // alternative to the next line
    this.#worker.onmessage = (ev) => {
      this.logWorkerMessage(ev);
    }
  }

  onStopWorker() {
    if (this.#worker) {
      this.logWorkerMessage({ data: 'page_web_worker: Initiating Termination of WebWorker...' });

      this.#broadcastChannel.postMessage('stop');
      this.#worker = null;

      // this.#worker.terminate(); // immediately terminates the worker, no chance for cleanup

      return;
    }

    this.logWorkerMessage({ data: 'page_web_worker: WebWorker not started.' });
  }

  onCalculate() {
    if (this.#worker) {
      this.logWorkerMessage({ data: 'page_web_worker: Initiating Calculation...' });
      this.#broadcastChannel.postMessage('calculate');
      return;
    }

    this.logWorkerMessage({ data: 'page_web_worker: WebWorker not started.' });
  }

  onStartInterval() {
    if (this.#worker) {
      this.logWorkerMessage({ data: 'page_web_worker: Start Interval...' });
      this.#broadcastChannel.postMessage('start-interval');
      return;
    }

    this.logWorkerMessage({ data: 'page_web_worker: WebWorker not started.' });
  }

  onStopInterval() {
    if (this.#worker) {
      this.logWorkerMessage({ data: 'page_web_worker: Stop Interval...' });
      this.#broadcastChannel.postMessage('stop-interval');
      return;
    }

    this.logWorkerMessage({ data: 'page_web_worker: WebWorker not started.' });
  }

  logWorkerMessage(ev) {
    // Message received from the worker
    let messages = this.shadowRoot.getElementById('messages');
    messages.innerHTML += `<p>RECEIVED: ${JSON.stringify(ev.data)}</p>`;
  }

}
customElements.define('page-web-worker', WebWorker);