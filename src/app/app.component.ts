import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { StateAndSettingsService } from './services/state-and-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),

      transition('void => *', [
        animate(400)
      ]),

      transition('* => void', [
        animate(400)
      ])
    ])
  ]

})

export class AppComponent implements OnInit {

  constructor(
    private stateAndSettingsService: StateAndSettingsService
  ) { }

  modalIsOpen: boolean = this.stateAndSettingsService.getSettings().modalIsOpen

  ngOnInit(): void {
    this.stateAndSettingsService.settingsChanged.subscribe(
      settings => this.modalIsOpen = settings.modalIsOpen
    );
  }
}
