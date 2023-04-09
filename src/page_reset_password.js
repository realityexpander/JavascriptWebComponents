import { LitElement, html } from 'lit';
import { styles } from './material-components-web.min.css.js';

class ResetPassword extends LitElement {

  static get properties() {
    return {
      passwordResetToken: { type: String },
      isPasswordVisible: { type: Boolean }
    }
  }

  // static get observedAttributes() {
  //   return ['isPasswordVisible'];
  // }

  //static styles = styles;

  constructor() {
    super();
    this.passwordResetToken = null;
    this.isPasswordVisible = false;
  }

  // get isPasswordVisible() {
  //   return this.getAttribute('isPasswordVisible');
  // }

  // set isPasswordVisible(value) {
  //   this._isPasswordVisible = value;
  //   this.render();
  // }

  render() {
    // If provided, the properties for type and day are taking from the path.
    return html`
    <style>
      ${styles}

      
    </style>
    <div class="wrapper">
      <h1>Reset Password</h1>
      <p>Please choose a new password.</p>
      <br>
      <br>

      <p>PasswordResetToken: ${this.passwordResetToken}</p>
      <br>
      <br>

      <div class="mdc-text-field mdc-text-field--outlined" style="width: 40%;">
        <div class="mdc-notched-outline">
          <div class="mdc-notched-outline__leading"></div>
          <div class="mdc-notched-outline__notch" >
            <label for="my-text-field" class="mdc-floating-label" id="my-label-id">New Password</label>
          </div>
          <div class="mdc-notched-outline__trailing"></div>
        </div>
        <input 
          type="${this.isPasswordVisible ? 'text' : 'password'}" 
          class="mdc-text-field__input" id="text-new-password" aria-labelledby="my-label-id" required minlength="8"
        >
        <i @click="${() => this.togglePasswordVisibility()}" 
          class="mdc-itext-field-icon material-icons mdc-text-field__icon mdc-text-field__icon--trailing" 
          tabindex="0" 
          role="button">
            ${this.isPasswordVisible ? 'visibility_off' : 'visibility'}
        </i>
      </div>
      <br>
      <br>

      <div class="mdc-text-field mdc-text-field--outlined" style="width: 40%;">
        <span class="mdc-notched-outline">
          <span class="mdc-notched-outline__leading"></span>
          <span class="mdc-notched-outline__notch">
            <label class="mdc-floating-label" id="my-label-id">Confirm Password</label>
          </span>
          <span class="mdc-notched-outline__trailing"></span>
        </span>
        <input 
          type="${this.isPasswordVisible ? 'text' : 'password'}"
          class="mdc-text-field__input" id="text-confirm-password" aria-labelledby="my-label-id" required minlength="8"
        >
        <i @click="${() => this.togglePasswordVisibility()}" 
          class="mdc-itext-field-icon material-icons mdc-text-field__icon mdc-text-field__icon--trailing" 
          tabindex="0" 
          role="button">
            ${this.isPasswordVisible ? 'visibility_off' : 'visibility'}
        </i>
      </div>
      <br>
      <br>

      <br><br>

      <button @click=${() => this.resetPassword()} id="btn-reset-password" class="mdc-button mdc-button--raised">
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label">Reset Password</span>
      </button>
              
    </div>
      `
  }

  firstUpdated() {
    this.setupListeners();
  }


  setupListeners() {
    // add ripple effect to buttons
    const buttons = this.shadowRoot.querySelectorAll('.mdc-button');
    for (let i = 0, button; button = buttons[i]; i++) {
      mdc.ripple.MDCRipple.attachTo(button);
    }

    // add ripple effect to text fields
    const textFields = this.shadowRoot.querySelectorAll('.mdc-text-field');
    for (let i = 0, textField; textField = textFields[i]; i++) {
      mdc.textField.MDCTextField.attachTo(textField);
    }

    // setup all icons
    const icons = this.shadowRoot.querySelectorAll('.mdc-itext-field-icon');
    for (let i = 0, icon; icon = icons[i]; i++) {
      mdc.ripple.MDCRipple.attachTo(icon);
      mdc.textField.MDCTextFieldIcon.attachTo(icon);
    }
  }

  togglePasswordVisibility() {

    this.isPasswordVisible = !this.isPasswordVisible;

    // const passwordField = this.shadowRoot.getElementById('text-new-password');
    // if (this.isPasswordVisible) {
    //   passwordField.type = 'text';
    // } else {
    //   passwordField.type = 'password';
    // }

    // Get all the password fields
    // const passwordFields = this.shadowRoot.querySelectorAll('input[type="password"]');
    // debugger
    // this.shadowRoot.innerHTML = this.render();
  }

  resetPassword() {
    // get new password
    const newPassword = this.shadowRoot.getElementById('text-new-password').value;
    const confirmPassword = this.shadowRoot.getElementById('text-confirm-password').value;

    // Check if blank
    if (newPassword === "" || confirmPassword === "") {
      alert("Please enter a password & confirm password.");
      return;
    }

    // Check if password is at least 8 characters
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      // Show error message
      alert("Passwords do not match");
      return;
    }

    // Confirm Reset Password with an option dialog
    if (window.confirm("Are you sure you want to reset your password?")) {
      const url = `${window.location.origin}/api/reset-password`;
      const data = {
        passwordResetToken: this.passwordResetToken,
        newPassword: newPassword
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          // Get the error Body (JSON)
          if (!res.ok) return res.json().then(data => { throw new Error(res.statusText + ":" + data.error) })

          return res.json()
        }).then(data => {
          //console.log('Success:', data);

          if (data.success) {
            // Show success message
            alert("Password reset successful. Please login with your new password.");

            // Redirect to login page
            window.location.href = "/login";

          } else {
            // Show error message
            alert(`Password reset failed. Please try again.`);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert(`Password reset failed. Please try again. ${error}`);
        });

    }
  }

}
customElements.define('page-reset-password', ResetPassword);