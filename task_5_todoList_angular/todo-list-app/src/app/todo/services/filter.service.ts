import {Injectable} from '@angular/core';

@Injectable()
export class FilterService {
static alltodosHtmlElement=null;
  constructor() {
  }

  insertData(htmlElement) {
    FilterService.alltodosHtmlElement=htmlElement;
  }
}
