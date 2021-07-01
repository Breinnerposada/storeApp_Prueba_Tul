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
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzMessageModule,
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
    NzSkeletonModule,
    NzAvatarModule,
    NzDropDownModule,
    NzIconModule,
    NzStatisticModule
  ],
  exports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzMessageModule,
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
    NzSkeletonModule,
    NzAvatarModule,
    NzDropDownModule,
    NzIconModule,
    NzStatisticModule
  ]
})
export class SharedModuleModule { }
