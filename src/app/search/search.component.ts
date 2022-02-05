import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { History } from './search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  readonly HISTORY = 'history';

  searchForm: FormGroup = this.fb.group({
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(\\+?[0-9]{1,3}[ -]?|0)[0-9]{2}[ -]?[0-9]{3}[ -]?[0-9]{2}[ -]?[0-9]{2}\\b')])
  });

  history: History[] = [];

  get phoneNumber(): FormControl {
    return this.searchForm.get('phoneNumber') as FormControl;
  }

  constructor(private fb: FormBuilder, private storage: Storage) {
    this.storage.create();
  }

  ngOnInit() {
    this.init();
  }

  async init() {
    const history = (await this.storage.get(this.HISTORY) as History[]);
    this.history = history || [];
  }

  wpRoute() {
    const phoneInputValue = this.phoneNumber.value as string;

    this.phoneNumber.setValue('');

    this.addPhoneToHistory(phoneInputValue);

    let phoneTrimmed = phoneInputValue.replace(/([^0-9])+/g, '');
    if (phoneTrimmed.length === 10)
      phoneTrimmed = '994' + phoneTrimmed.slice(1, phoneTrimmed.length);

    window.location.href = `https://wa.me/${phoneTrimmed}`;
  }

  addPhoneToHistory(phone: string) {
    this.history = [{ phoneNumber: phone, date: new Date() }, ...this.history];
    this.storage.set(this.HISTORY, this.history);
  }

  deletePhoneFromHistory(index: number) {
    this.history = this.history.filter((_, i) => i !== index);
    this.storage.set(this.HISTORY, this.history);
  }
}
