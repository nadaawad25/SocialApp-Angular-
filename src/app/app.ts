import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Flowbite } from './core/services/flowbite';
import { initFlowbite } from 'flowbite';
import { Register } from "./components/register/register";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'LinkedIn';
  constructor(private flowbiteService: Flowbite) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
