import * as THREE from 'three';
import Clipboard from 'clipboard';
import { LegacyJSONLoader } from '../contrib/LegacyJSONLoader';
import { LitElement, html, css } from 'lit-element';

import { thisDotTheme } from '../styles/theme';

const blogPostLink =
  'https://labs.thisdot.co/blog/webgl-morph-targets-and-ginger-modernizing-for-todays-web';

const styles = css`
  :host {
    display: block;
    background-color: var(--grey800);
    color: var(--grey100);
    overflow: hidden;
  }

  .hidden {
    display: none;
  }

  .title {
    margin-bottom: 24px;
  }

  .title > * {
    margin: 0;
  }

  .panel {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 24px;
    background-color: var(--grey800);
  }

  .panel > * {
    margin: 24px 0;
  }

  .panel label {
    display: block;
    margin-bottom: 16px;
  }

  .flex-container {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .flex-stretch > * {
    flex: 1 1 0;
  }

  .flex-space-between {
    justify-content: space-between;
  }

  .dual-pane > div {
    padding: 0 8px;
  }

  .dual-pane > div:first-child {
    padding-left: 0;
  }

  .dual-pane > div:last-child {
    padding-right: 0;
  }

  .button-container > * {
    padding: 0 24px;
  }

  .full-shadow {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .modal {
    position: absolute;
    z-index: 100;
    top: 10%;
    left: 10%;
    right: 10%;
    padding: 24px;
    background-color: var(--grey800);
  }

  .ginger-header {
    position: absolute;
    left: 0;
    right: 0;
    background-color: var(--grey800);
  }

  #screenshot-modal > .modal {
    display: flex;
    flex: 1;
    justify-content: stretch;
    flex-direction: column;
    bottom: 10%;
  }

  #screenshot-image-container {
    max-height: calc(100% - 48px - 24px); /* HACK */
  }

  #screenshot-image {
    display: block;
    max-width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  #counter {
    position: absolute;
    top: calc(50% - 50px - 75px);
    left: calc(50% - 100px);
    width: 200px;
    height: 100px;
    padding: 5px;
    line-height: 100px;
    text-align: center;
    font-size: 64px;
    border-radius: 25px;
    background: rgba(0, 0, 0, 0.75);
    color: white;

    -webkit-user-select: none; /* Chrome all / Safari all */
    -moz-user-select: none; /* Firefox all */
    -ms-user-select: none; /* IE 10+ */
    user-select: none; /* Likely future */
  }

  #share-link {
    width: 100%;
    height: 50px;
  }

  #morph-range {
    width: 100%;
  }

  @media (max-width: 767px) {
    #screenshot-image-container {
      max-height: calc(100% - 95px - 24px); /* HACK */
    }

    .title {
      flex-wrap: wrap;
      justify-content: center;
    }

    .title > * {
      flex-basis: 100%;
    }

    .title h1 {
      text-align: center;
      margin-bottom: 8px;
    }

    .panel {
      max-height: 200px;
      overflow-y: scroll;
    }

    .dual-pane {
      flex-wrap: wrap;
    }

    .dual-pane > div {
      flex-basis: 100%;
      padding: 8px 0;
    }

    .button-container {
    }

    .button-container > div {
      flex-grow: 1;
      padding: 0 4px;
    }

    .button-container button {
      padding: 0;
      width: 100%;
      max-width: 230px;
    }

    .td-header {
      justify-content: center;
    }

    .td-header > div {
      padding: 8px 8px;
    }

    .td-logo-container {
      width: 100%;
      text-align: center;
    }
  }

  @media (max-width: 450px) {
    .button-container {
      flex-wrap: wrap;
    }

    .button-container > div {
      flex-grow: 1;
      flex-basis: 100%;
      padding: 8px 0;
    }

    .button-container button {
      width: 100%;
      max-width: unset;
    }
  }
`;

/**
 * `ginger-app` top-level element containing the ginger application
 *
 * @customElement
 * @polymer
 */
class GingerApp extends LitElement {
  static get properties() {
    return {
      // Asset metadata.
      textures: { type: Object },
      meshes: { type: Object },
      morphs: { type: Object },

      // Three.js scene objects.
      scene: { type: Object },
      camera: { type: THREE.PerspectiveCamera },
      renderer: { type: THREE.WebGLRenderer },
      ginger: { type: Object },
      leftEye: { type: Object },
      rightEye: { type: Object },

      // Internal state.
      queue: { type: Array },
      aspect: { type: Number },
      isMouseTracking: { type: Boolean },
      isTakingScreenshot: { type: Boolean },
      leftEyeOrigin: { type: Object },
      rightEyeOrigin: { type: Object },
      selected: { type: String },
      screenshotCounter: { type: Number },
    };
  }

  static get styles() {
    return [thisDotTheme, styles];
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();

    this.queue = [];
    this.aspect = 0;
    this.isMouseTracking = false;
    this.selected = 'eyes';
    this.screenshotCounter = 0;

    this.ginger = new THREE.Object3D();
    this.leftEye = new THREE.Object3D();
    this.rightEye = new THREE.Object3D();

    this.leftEyeOrigin = null;
    this.rightEyeOrigin = null;

    this.textures = {
      gingercolor: {
        path: 'static/model/ginger_color.jpg',
        texture: null,
      },
      gingercolornormal: {
        path: 'static/model/ginger_norm.jpg',
        texture: null,
      },
    };
    this.meshes = {
      gingerhead: {
        path: 'static/model/gingerhead.json',
        texture: this.textures.gingercolor,
        normalmap: null,
        morphTargets: true,
        mesh: null,
      },
      gingerheadband: {
        path: 'static/model/gingerheadband.json',
        texture: this.textures.gingercolor,
        normalmap: null,
        morphTargets: false,
        mesh: null,
      },
      gingerheadphones: {
        path: 'static/model/gingerheadphones.json',
        texture: null,
        normalmap: null,
        color: new THREE.Color('rgb(180, 180, 180)'),
        morphTargets: false,
        mesh: null,
      },
      gingerlefteye: {
        path: 'static/model/gingerlefteye.json',
        texture: this.textures.gingercolor,
        normalmap: null,
        morphTargets: false,
        parent: this.leftEye,
        position: new THREE.Vector3(-0.96, -6.169, -1.305),
        mesh: null,
      },
      gingerrighteye: {
        path: 'static/model/gingerrighteye.json',
        texture: this.textures.gingercolor,
        normalmap: null,
        morphTargets: false,
        parent: this.rightEye,
        position: new THREE.Vector3(0.96, -6.169, -1.305),
        mesh: null,
      },
      gingerteethbot: {
        path: 'static/model/gingerteethbot.json',
        texture: this.textures.gingercolor,
        normalmap: null,
        morphTargets: true,
        mesh: null,
      },
      gingerteethtop: {
        path: 'static/model/gingerteethtop.json',
        texture: this.textures.gingercolor,
        normalmap: null,
        morphTargets: true,
        mesh: null,
      },
      gingertongue: {
        path: 'static/model/gingertongue.json',
        texture: this.textures.gingercolor,
        normalmap: null,
        morphTargets: true,
        mesh: null,
      },
    };
    this.morphs = {
      eyes: {
        value: 0,
        mesh: this.meshes.gingerhead,
        targets: [0, 1, 7, 8],
        thresholds: [-1, 0, 0, 0.1],

        // Move the eyes based on the sex of ginger. Man eyes are smaller and
        // are moved backed to fit the appearance.
        behavior: function (value) {
          var sex = this.morphs.sex.value;
          var recede = this.linear(sex, 0, -0.125, 1);

          if (this.leftEyeOrigin === null) {
            this.leftEyeOrigin = this.leftEye.position.clone();
          }
          if (this.rightEyeOrigin === null) {
            this.rightEyeOrigin = this.rightEye.position.clone();
          }

          this.leftEye.position.x = this.leftEyeOrigin.x + recede;
          this.leftEye.position.z = this.leftEyeOrigin.z + recede;
          this.rightEye.position.x = this.rightEyeOrigin.x - recede;
          this.rightEye.position.z = this.rightEyeOrigin.z + recede;
        },
      },
      eyelookside: {
        value: 0,
        mesh: this.meshes.gingerhead,
        targets: [2, 3],
        thresholds: [-1, 0],
      },
      expression: {
        value: 0,
        mesh: this.meshes.gingerhead,
        targets: [20, 9],
        thresholds: [-1, 0],
      },
      jawrange: {
        value: 0,
        mesh: this.meshes.gingerhead,
        targets: [10, 11],
        thresholds: [0, 0],

        // Move the tongue down when moving the jaw.
        behavior: function (value) {
          this.morphs.tonguedown.value = value;
        },
      },
      jawtwist: {
        value: 0,
        mesh: this.meshes.gingerhead,
        targets: [12, 13],
        thresholds: [-1, 0],

        // Move the tongue down when moving the jaw.
        behavior: function (value) {
          this.morphs.tonguetwist.value = value;
        },
      },
      symmetry: {
        value: 0,
        mesh: this.meshes.gingerhead,
        targets: [14],
        thresholds: [0],
      },
      lipcurl: {
        value: 0,
        mesh: this.meshes.gingerhead,
        targets: [15, 16],
        thresholds: [-1, 0],
      },
      lipsync: {
        value: 0,
        mesh: this.meshes.gingerhead,
        targets: [17, 18, 19],
        thresholds: [-1, 0, 0.5],
      },
      sex: {
        value: 0,
        mesh: this.meshes.gingerhead,
        targets: [22],
        thresholds: [0],
      },
      width: {
        value: 0,
        mesh: this.meshes.gingerhead,
        targets: [23, 24],
        thresholds: [-1, 0],
      },
      tongue: {
        value: 0,
        mesh: this.meshes.gingertongue,
        targets: [4],
        thresholds: [0],
      },
      tonguedown: {
        value: 0,
        mesh: this.meshes.gingertongue,
        targets: [1],
        thresholds: [0],
      },
      tonguetwist: {
        value: 0,
        mesh: this.meshes.gingertongue,
        targets: [2, 3],
        thresholds: [-1, 0],
      },
      teethopenbot: {
        value: 0,
        mesh: this.meshes.gingerteethbot,
        targets: [3, 0],
        thresholds: [0, 0],

        behavior: function (value) {
          var jawrange = this.morphs.jawrange.value;
          this.morphs.teethopenbot.value = jawrange;
        },
      },
      teethopentop: {
        value: 0,
        mesh: this.meshes.gingerteethtop,
        targets: [3, 0],
        thresholds: [0, 0],

        behavior: function (value) {
          var jawrange = this.morphs.jawrange.value;
          this.morphs.teethopentop.value = jawrange;
        },
      },
      teethsidebot: {
        value: 0,
        mesh: this.meshes.gingerteethbot,
        targets: [1, 2],
        thresholds: [-1, 0],

        behavior: function (value) {
          var jawtwist = this.morphs.jawtwist.value;
          this.morphs.teethsidebot.value = jawtwist;
        },
      },
      teethsidetop: {
        value: 0,
        mesh: this.meshes.gingerteethtop,
        targets: [1, 2],
        thresholds: [-1, 0],

        behavior: function (value) {
          var jawtwist = this.morphs.jawtwist.value;
          this.morphs.teethsidetop.value = jawtwist;
        },
      },
    };
    this.controls = {
      eyes: {
        control: 'eyes',
        min: -1,
        max: 1,
        morph: this.morphs.eyes,
      },
      expression: {
        control: 'expression',
        min: -1,
        max: 1,
        morph: this.morphs.expression,
      },
      jawrange: {
        control: 'jawrange',
        min: 0,
        max: 1,
        morph: this.morphs.jawrange,
      },
      jawtwist: {
        control: 'jawtwist',
        min: -1,
        max: 1,
        morph: this.morphs.jawtwist,
      },
      symmetry: {
        control: 'symmetry',
        min: 0,
        max: 1,
        morph: this.morphs.symmetry,
      },
      lipcurl: {
        control: 'lipcurl',
        min: -1,
        max: 1,
        morph: this.morphs.lipcurl,
      },
      lipsync: {
        control: 'lipsync',
        min: -1,
        max: 1,
        morph: this.morphs.lipsync,
      },
      sex: {
        control: 'sex',
        min: 0,
        max: 1,
        morph: this.morphs.sex,
      },
      width: {
        control: 'width',
        min: -1,
        max: 1,
        morph: this.morphs.width,
      },
      tongue: {
        control: 'tongue',
        min: 0,
        max: 1,
        morph: this.morphs.tongue,
      },
    };
  }

  /**
   * Implement to describe the element's DOM using lit-html.
   * Use the element current props to return a lit-html template result
   * to render into the element.
   */
  render() {
    return html`
      <div class="ginger-header">
        <header id="header" class="td-header">
          <div class="td-logo-container">
            <a
              href="https://labs.thisdot.co/"
              class="td-logo"
              title="This Dot Labs"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                width="152"
                height="34"
                data-name="Layer 1"
                viewBox="0 0 279.93 34.62"
              >
                <defs>
                  <style>
                    .cls-1 {
                      fill: #626d8e;
                    }
                    .cls-2 {
                      fill: #f46663;
                    }
                    .cls-3 {
                      fill: #9faccc;
                    }
                  </style>
                </defs>
                <title>
                  thisdot-publication
                </title>
                <path
                  d="M8.94,6.42H0V.59H24.77V6.42H15.83V34.07H8.94Z"
                  class="cls-1"
                />
                <path
                  d="M40,.59h6.91V15.5h12V.59h6.88V34.07H58.9V21.35h-12V34.07H40Z"
                  class="cls-1"
                />
                <path d="M90.58.59V34.07H83.7V.59Z" class="cls-1" />
                <path
                  d="M106.84,25.16h7c.24,2.39,1.91,3.54,4.26,3.54S122,27.31,122,25.16s-1.34-3.4-5.89-5.26c-6.67-2.75-9-5.9-9-10.82,0-5.5,4-9.09,10.47-9.09C123.5,0,128,3.54,128,9.37h-7a3.28,3.28,0,0,0-3.59-3.44c-2.25,0-3.4,1.39-3.4,3.06,0,2,1.39,3.18,6.07,5.19,6.69,2.87,8.84,5.88,8.84,10.57,0,5.9-4.21,9.87-10.95,9.87S107.22,30.52,106.84,25.16Z"
                  class="cls-1"
                />
                <path
                  d="M162.61,34.07H151.43V.59h11.19c10.85,0,18.17,6.12,18.17,16.74S173.47,34.07,162.61,34.07Zm.05-27.64h-4.35V28.22h4.35c6.27,0,11.14-3.63,11.14-10.85S168.93,6.42,162.66,6.42Z"
                  class="cls-1"
                />
                <path
                  d="M264.11,6.42h-8.95V.59h24.77V6.42H271V34.07h-6.88Z"
                  class="cls-1"
                />
                <circle cx="218.03" cy="17.03" r="10.41" class="cls-2" />
                <polygon
                  points="234.1 0.29 225.53 0.29 238.38 17.03 225.53 33.76 234.1 33.76 246.96 17.03 234.1 0.29"
                  class="cls-3"
                />
                <polygon
                  points="201.96 0.29 210.53 0.29 197.67 17.03 210.53 33.76 201.96 33.76 189.11 17.03 201.96 0.29"
                  class="cls-3"
                />
              </svg>
            </a>
          </div>
          <div>
            <a
              id="hide-header-btn"
              class="td-button td-button-outline"
              href="#"
              @click="${this.handleHideHeader}"
              >Hide This Header ❌</a
            >
          </div>
          <div>
            <a
              href="${blogPostLink}"
              target="_blank"
              rel="noopener noreferrer"
              class="td-button td-button-outline"
              title="Learn how we built this"
              >Learn More &raquo;</a
            >
          </div>
        </header>
      </div>

      <div id="renderer"></div>

      <div class="panel">
        <div class="flex-container flex-stretch dual-pane">
          <div>
            <!-- Controls for changing the morphs. -->
            <label for="range">Range of Motion</label>
            <input
              id="morph-range"
              class="td-range"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value="0"
              @change="${this.handleRangeSlide}"
              @input="${this.handleRangeSlide}"
            />
          </div>
          <div>
            <label for="morph">Morph Target</label>
            <select
              id="morph"
              class="td-select"
              @change="${this.handleMorphSelect}"
            >
              <option value="eyes">Eyes</option>
              <option value="expression">Expression</option>
              <option value="jawrange">Jaw Height</option>
              <option value="jawtwist">Jaw Twist</option>
              <option value="symmetry">Symmetry</option>
              <option value="lipcurl">Lip Curl</option>
              <option value="lipsync">Lip Sync</option>
              <option value="sex">Face Structure</option>
              <option value="width">Jaw Width</option>
              <option value="tongue">Tongue</option>
            </select>
          </div>
        </div>
        <div class="flex-container button-container">
          <div>
            <button
              id="share"
              class="td-button"
              type="button"
              @click="${this.handleShare}"
            >
              Share Pose
            </button>
          </div>
          <div>
            <button
              id="screenshot"
              class="td-button"
              type="button"
              @click="${this.handleScreenshot}"
            >
              Take Screenshot
            </button>
          </div>
          <div>
            <button
              id="mousetrack"
              class="td-button"
              type="button"
              class="buttoncolor-OFF"
              @click="${this.handleMouseTrack}"
            >
              Follow OFF
            </button>
          </div>
        </div>
      </div>

      <div id="screenshot-modal" class="hidden">
        <div class="full-shadow"></div>
        <div class="modal">
          <div class="title flex-container flex-space-between">
            <h1>Screenshot</h1>
            <button
              id="copytoclipboard-image"
              class="td-button"
              type="button"
              @click="${this.handleDownloadScreenshot}"
            >
              Download
            </button>
          </div>
          <div id="screenshot-image-container">
            <img id="screenshot-image" />
          </div>
        </div>
      </div>

      <div id="share-modal" class="hidden">
        <div class="full-shadow"></div>
        <div class="modal">
          <div class="title flex-container flex-space-between">
            <h1>Share Link</h1>
            <button
              id="copytoclipboard-share"
              class="td-button"
              data-clipboard-target="#share-link"
              type="button"
            >
              Copy to Clipboard
            </button>
          </div>
          <textarea id="share-link"></textarea>
        </div>
      </div>

      <div id="counter" class="hidden"></div>
    `;
  }

  /**
   * Called when the element's DOM has been updated and rendered.
   * @param {*} changedProperties
   */
  updated(changedProperties) {
    if (this.shadowRoot.querySelector('#renderer>canvas')) return;

    this.init();
  }

  /**
   * Called when the slider is moved and updates the selected morph target.
   * @param {Event} event
   */
  handleRangeSlide(event) {
    const progress = event.target.valueAsNumber;
    this.updateMorph(null, progress);
    this.morph();
  }

  /**
   * Changes the selected morph target.
   * @param {Event} event
   */
  handleMorphSelect(event) {
    const value = event.target.value;
    this.select(value);
  }

  /**
   * Displays the share modal.
   * @param {Event} event
   */
  handleShare(event) {
    const modal = this.shadowRoot.getElementById('share-modal');
    modal.classList.remove('hidden');

    const shareLink = this.shadowRoot.getElementById('share-link');
    shareLink.value = this.generateShareLink();
  }

  /**
   * Takes a screenshot after finishing a countdown.
   * @param {Event} event
   */
  handleScreenshot(event) {
    const seconds = 3;
    this.countdownScreenshot(seconds);
  }

  /**
   * Toggles Ginger's mouse tracking. If enabled her head follows the cursor.
   * @param {Event} event
   */
  handleMouseTrack(event) {
    this.isMouseTracking = !this.isMouseTracking;

    const elButton = this.shadowRoot.getElementById('mousetrack');
    const currentStateLabel = this.isMouseTracking ? 'ON' : 'OFF';
    const currentState = this.isMouseTracking ? 'active' : 'inactive';
    const oppositeState = !this.isMouseTracking ? 'active' : 'inactive';
    elButton.textContent = `Follow ${currentStateLabel}`;
    elButton.classList.add(`td-button-${currentState}`);
    elButton.classList.remove(`td-button-${oppositeState}`);
  }

  /**
   * Points Ginger's head at the cursor whenever the mouse moves.
   * @param {Event} event
   */
  handleMouseMove(event) {
    // Mock a touch event so we don't need to handle both mouse and touch events
    // inside the look at function.
    const data = {
      touches: [{ clientX: event.clientX, clientY: event.clientY }],
      type: 'mousemove',
    };
    this.lookAtCursor(data);
  }

  /**
   * Points Ginger's head at the cursor whenever the touch point moves.
   * @param {Event} event
   */
  handleTouchMove(event) {
    this.lookAtCursor(event);
  }

  /**
   * Called when the window is resized.
   * @param {Event} event
   */
  handleWindowResize(event) {
    this.recalculateAspect();
    this.renderer.setSize(this.clientWidth, this.clientHeight);
  }

  /**
   * Called after the clipboard library successfully copies the share text.
   * @param {Event} event
   */
  handleCopy(event) {
    const clipboardButton = this.shadowRoot.getElementById(
      'copytoclipboard-share'
    );
    clipboardButton.textContent = 'Copied!';
    setTimeout(() => {
      clipboardButton.textContent = 'Copy to Clipboard';
    }, 2000);
  }

  /**
   * Downloads the screenshot that was taken last.
   * @param {Event} event
   */
  handleDownloadScreenshot(event) {
    const image = this.shadowRoot.getElementById('screenshot-image').src;
    const timestamp = Math.floor(Date.now() / 1000);
    const download = document.createElement('a');
    download.href = image;
    download.download = 'ginger-' + timestamp + '.jpg';
    download.click();
    download.remove();
  }

  /**
   * Removes the site header when the hide link is clicked.
   * @param {Event} event
   */
  handleHideHeader(event) {
    this.shadowRoot.getElementById('header').remove();
    this.camera.position.y = 4;
  }

  /**
   * Shows the screenshot counter modal and takes a screenshot after finishing
   * a countdown.
   * @param {number} seconds
   */
  async countdownScreenshot(seconds) {
    if (this.isTakingScreenshot) return;

    try {
      this.isTakingScreenshot = true;
      const counter = this.shadowRoot.getElementById('counter');
      counter.classList.remove('hidden');

      while (seconds > 0) {
        this.screenshotCounter = seconds;
        counter.innerHTML = seconds; // FIXME
        await new Promise((resolve) => setTimeout(resolve, 1000));
        seconds -= 1;
      }
      this.takeScreenshot();

      counter.classList.add('hidden');
    } finally {
      this.isTakingScreenshot = false;
    }
  }

  /**
   * Show the screenshot modal, take a screenshot, and display it in the modal.
   */
  takeScreenshot() {
    const modal = this.shadowRoot.getElementById('screenshot-modal');
    modal.classList.remove('hidden');

    const image = this.shadowRoot.getElementById('screenshot-image');
    image.src = this.renderer.domElement.toDataURL('image/jpeg', 0.8);
  }

  /**
   * Points ginger's head at the cursor.
   * @param {Event} event
   */
  lookAtCursor(event) {
    if (this.isMouseTracking) {
      const mouse = new THREE.Vector3(
        (event.touches[0].clientX / this.clientWidth) * 2 - 1,
        -(event.touches[0].clientY / this.clientHeight) * 2 + 1,
        0.5
      );
      mouse.unproject(this.camera);

      // When getting the direction, flip the x and y axis or the eyes will
      // look the wrong direction.
      let direction = mouse.sub(this.camera.position).normalize();
      direction.x *= -1;
      direction.y *= -1;

      const distance = this.camera.position.z / direction.z;
      const position = this.camera.position
        .clone()
        .add(direction.multiplyScalar(distance));

      // Track the cursor with the eyes with no adjustments.
      this.leftEye.lookAt(position);
      this.rightEye.lookAt(position);

      // Track the cursor with the head, but dampened. If we don't dampen the
      // head tracking then she will always try to face the cursor head on.
      this.ginger.lookAt(position);
      this.ginger.rotation.x /= 5;
      this.ginger.rotation.y /= 5;
      this.ginger.rotation.z = 0;
    }
  }

  /**
   * Calculates a new aspect using the size of the window and generate a new
   * projection matrix for the main perspective camera.
   */
  recalculateAspect() {
    this.aspect = this.clientWidth / this.clientHeight;
    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();
  }

  /**
   * Adds a callback to the action queue that will be executed right before the
   * next frame is rendered.
   * @param {Function} callback
   * @param {Object} args
   */
  queueNextFrame(callback, args) {
    this.queue.push({
      callback: callback,
      args: args,
    });
  }

  /**
   * The "game" loop where actions are executed and the renderer is invoked.
   */
  animate() {
    requestAnimationFrame(this.animate.bind(this));

    let i = this.queue.length;
    while (i--) {
      const args = this.queue[i].args;
      const callback = this.queue[i].callback;
      callback(args);
      this.queue.splice(i, 1);
    }

    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Selects a morph for editing.
   * @param {string} morph
   */
  select(morph) {
    let selectControl;
    let found = false;

    for (const control in this.controls) {
      if (this.controls[control].control == morph) {
        this.selected = morph;
        selectControl = this.controls[control];
        found = true;
        break;
      }
    }
    if (!found) {
      return;
    }

    const min = selectControl.min;
    const max = selectControl.max;
    const percent =
      ((selectControl.morph.value - min) * 100) / (max - min) / 100;

    const slider = this.shadowRoot.getElementById('morph-range');
    slider.value = percent;
  }

  /**
   * Apply morph target influences to the objects in the scene.
   */
  morph() {
    for (let item in this.morphs) {
      const morphTarget = this.morphs[item];

      if (morphTarget.behavior !== undefined) {
        morphTarget.behavior.bind(this)(morphTarget.value);
      }

      // Find which morph needs to have the value applied to. This is determined
      // using thresholds.
      let target;
      for (let i = 0; i < morphTarget.thresholds.length; i++) {
        const threshold = morphTarget.thresholds[i];

        if (morphTarget.value >= threshold) {
          target = i;
        }
      }

      for (let i = 0; i < morphTarget.targets.length; i++) {
        const index = morphTarget.targets[i];
        let value = 0;

        if (morphTarget.targets[i] === morphTarget.targets[target]) {
          value = Math.abs(morphTarget.value);
        }
        morphTarget.mesh.mesh.morphTargetInfluences[index] = value;
      }
    }
  }

  /**
   * Updates a morphs current value by name.
   * @param {string} morph
   * @param {number} progress
   */
  updateMorph(morph, progress) {
    let selectControl;
    let found = false;

    morph = morph || this.selected;

    for (const control in this.controls) {
      if (this.controls[control].control == morph) {
        selectControl = this.controls[control];
        found = true;
        break;
      }
    }
    if (!found) {
      return;
    }

    const min = selectControl.min;
    const max = selectControl.max;
    const value = (max - min) * progress + min;
    selectControl.morph.value = value;
  }

  /**
   * Returns a share link to share the currently morphed model.
   */
  generateShareLink() {
    const params = [];
    const url = `${location.protocol}//${location.host}${location.pathname}`;

    for (const control in this.controls) {
      const selectControl = this.controls[control];
      const min = selectControl.min;
      const max = selectControl.max;
      const percent =
        ((selectControl.morph.value - min) * 100) / (max - min) / 100;

      params.push([selectControl.control, percent.toString()]);
    }

    const paramsString = new URLSearchParams(params).toString();

    return `${url}?${paramsString}`;
  }

  /**
   * Loads in all required assets from the network.
   */
  async loadAssets() {
    const texturesPromise = this.loadTextures();
    const meshesPromise = this.loadMeshes();

    await meshesPromise;

    // Add loaded meshes into the scene and apply initial transformations. We
    // do the copies during the next animation frame so THREE doesn't
    // overwrite them during initialization.
    for (let mesh in this.meshes) {
      if (this.meshes[mesh].position !== undefined) {
        const args = {
          mesh: this.meshes[mesh],
        };
        this.queueNextFrame((args) => {
          args.mesh.mesh.position.copy(args.mesh.position);
        }, args);
      }

      if (this.meshes[mesh].parent !== undefined) {
        this.meshes[mesh].parent.add(this.meshes[mesh].mesh);
      } else {
        this.ginger.add(this.meshes[mesh].mesh);
      }
    }

    await Promise.all([texturesPromise, meshesPromise]);
  }

  /**
   * Loads a texture over the network.
   * @param {THREE.TextureLoader} textureLoader
   * @param {String} path
   * @param {String} mesh
   */
  async loadTexture(textureLoader, path, texture) {
    const loadedTexture = new Promise((resolve, reject) => {
      textureLoader.load(path, (loadedTexture) => {
        resolve(loadedTexture);
      });
    }).catch((err) => {
      throw err;
    });
    this.textures[texture].texture = loadedTexture;
    return loadedTexture;
  }

  /**
   * Loads in all required textures over the network.
   */
  async loadTextures() {
    const textureLoader = new THREE.TextureLoader();
    const promises = [];

    for (let texture in this.textures) {
      const path = this.textures[texture].path;
      promises.push(this.loadTexture(textureLoader, path, texture));
    }

    return Promise.all(promises);
  }

  /**
   * Loads a mesh over the network and creates the THREE objects for it.
   * @param {THREE.JSONLoader} jsonLoader
   * @param {String} path
   * @param {String} mesh
   */
  async loadMesh(jsonLoader, path, mesh) {
    const geometry = await new Promise((resolve, reject) => {
      jsonLoader.load(path, (geometry) => {
        resolve(geometry);
      });
    }).catch((err) => {
      throw err;
    });
    const bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);

    let texture, normalmap, color;
    if (this.meshes[mesh].texture !== null) {
      texture = await this.meshes[mesh].texture.texture;
    }
    if (this.meshes[mesh].normalmap !== null) {
      normalmap = await this.meshes[mesh].normalmap.texture;
    }
    if (this.meshes[mesh].color !== null) {
      color = this.meshes[mesh].color;
    }

    const materialParams = {
      vertexColors: THREE.FaceColors,
      flatShading: false,
      morphTargets: this.meshes[mesh].morphTargets,
    };
    if (texture) {
      materialParams.map = texture;
    }
    if (normalmap) {
      materialParams.normalMap = normalmap;
    }
    if (color) {
      materialParams.color = color;
    }
    const material = new THREE.MeshStandardMaterial(materialParams);
    this.meshes[mesh].mesh = new THREE.Mesh(bufferGeometry, material);
  }

  /**
   * Loads in all required meshes over the network.
   */
  async loadMeshes() {
    // FIXME: Replace LegacyJSONLoader with a supported loader once we get the
    // Ginger assets converted into a more modern format.
    const jsonLoader = new LegacyJSONLoader();
    const promises = [];

    for (let mesh in this.meshes) {
      const path = this.meshes[mesh].path;
      promises.push(this.loadMesh(jsonLoader, path, mesh));
    }

    return Promise.all(promises);
  }

  /**
   * Linear easing function.
   * @param {*} t current time
   * @param {*} b start value
   * @param {*} c change in value
   * @param {*} d duration
   */
  linear(t, b, c, d) {
    return (c * t) / d + b;
  }

  /**
   * Setup the Ginger three.js scene.
   */
  async init() {
    // Initialize the clipboard library used for the copy button.
    const clipboardButton = this.shadowRoot.getElementById(
      'copytoclipboard-share'
    );
    const clipboard = new Clipboard(clipboardButton, {
      target: (trigger) => this.shadowRoot.getElementById('share-link'),
    });
    clipboard.on('success', this.handleCopy.bind(this));

    const overlay = this.shadowRoot.querySelectorAll('.full-shadow');
    for (let i = 0; i < overlay.length; i++) {
      overlay[i].addEventListener('click', function (e) {
        var parent = e.target.parentNode;
        parent.classList.add('hidden');
      });
    }

    this.scene = new THREE.Scene();
    this.aspect = this.clientWidth / this.clientHeight;
    this.camera = new THREE.PerspectiveCamera(55, this.aspect, 0.1, 1000);
    this.camera.position.y = 5;
    this.camera.position.z = 14;

    // Create a renderer the size of the window and attach it to the DOM.
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
    });
    this.renderer.setSize(this.clientWidth, this.clientHeight);
    this.shadowRoot
      .getElementById('renderer')
      .appendChild(this.renderer.domElement);

    // Allow viewport resizing whenever the window resizes.
    window.addEventListener('resize', this.handleWindowResize.bind(this));

    // Setup mouse events so ginger's eyes can track the mouse.
    const renderer = this.shadowRoot.getElementById('renderer');
    this.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.addEventListener('touchmove', this.handleTouchMove.bind(this));

    // Set the initial values of ginger to the values in the GET params.
    const shareParams = new URLSearchParams(window.location.search);
    for (const control in this.controls) {
      const selectedControl = this.controls[control];
      if (shareParams.get(selectedControl.control) != null) {
        this.updateMorph(
          selectedControl.control,
          shareParams.get(selectedControl.control)
        );
      }
    }

    // Add everything to the scene.

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 1);
    this.scene.add(directionalLight);

    this.scene.add(this.ginger);

    this.leftEye.position.set(0.96, 6.169, 1.305);
    this.ginger.add(this.leftEye);
    this.rightEye.position.set(-0.96, 6.169, 1.305);
    this.ginger.add(this.rightEye);

    await this.loadAssets();
    this.select(this.selected);
    this.animate();
    this.morph();
  }
}

customElements.define('ginger-app', GingerApp);
