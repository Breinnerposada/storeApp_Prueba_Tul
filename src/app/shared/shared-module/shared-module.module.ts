import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCarouselModule,
    NzBadgeModule,
    NzAlertModule,
    NzCardModule,
    NzRateModule,
    NzModalModule,
    NzDescriptionsModule,
    NzInputNumberModule,
    NzDrawerModule,
    NzPopoverModule,
    NzSkeletonModule
  ],
  exports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCarouselModule,
    NzBadgeModule,
    NzAlertModule,
    NzCardModule,
    NzRateModule,
    NzModalModule,
    NzDescriptionsModule,
    NzInputNumberModule,
    NzDrawerModule,
    NzPopoverModule,
    NzSkeletonModule
  ]
})
export class SharedModuleModule { }
