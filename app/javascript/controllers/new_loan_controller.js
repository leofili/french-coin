import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ['hiddenCurrencyInput', 'currencyInput'];

  connect() {
    console.log(this.currencyInputTarget);
    console.log(this.hiddenCurrencyInputTarget);
  }

  changeCurrency() {
    this.hiddenCurrencyInputTarget.value = this.currencyInputTarget.value;
    this.hiddenCurrencyInputTarget.dispatchEvent(new Event('change'));
  }
}