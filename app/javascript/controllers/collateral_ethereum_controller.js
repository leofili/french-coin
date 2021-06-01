import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ['popup', 'answer'];

  connect() {
  }

  display() {
    const box = this.answerTargets.find((checkbox) => checkbox.checked );
    if (box.value === 'crypto_wallet') {
      this.popupTarget.classList.add('no-display');
    } else {
      this.popupTarget.classList.remove('no-display')
    }
  }
}
