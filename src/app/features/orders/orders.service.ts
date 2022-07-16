import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrdersResponseModel} from "./models";
import {Observable} from "rxjs";

@Injectable()
export class OrdersService {

  constructor(
    private readonly _httpClient: HttpClient,
  ) { }

  public getOrders(): Observable<OrdersResponseModel> {
    return this._httpClient.get<OrdersResponseModel>('https://api.mocki.io/v2/79fb05cb');
  }
}
