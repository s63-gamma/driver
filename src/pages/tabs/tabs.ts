import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {CarPage} from "../car/car";
import {InvoicePage} from "../invoice/invoice";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CarPage;
  tab3Root = InvoicePage;

  constructor() {

  }
}
