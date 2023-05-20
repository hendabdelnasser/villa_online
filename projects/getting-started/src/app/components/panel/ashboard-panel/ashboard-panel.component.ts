import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ashboard-panel',
  templateUrl: './ashboard-panel.component.html',
  styleUrls: ['./ashboard-panel.component.scss']
})
export class AshboardPanelComponent implements OnInit {

  constructor(public _router: Router,) { }

  ngOnInit(): void {
  }

}
