import { NgModule, Optional, SkipSelf } from '@angular/core';

import { DataService                  } from './data.service';
import { throwIfAlreadyLoaded         } from './module-import-guard';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [DataService]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
