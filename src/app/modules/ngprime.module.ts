import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
	imports: [ButtonModule, CardModule, ChartModule, MessageModule, MessagesModule, TableModule, ToastModule, MenubarModule],
	exports: [ButtonModule, CardModule, ChartModule, MessageModule, MessagesModule, TableModule, ToastModule, MenubarModule],
	providers: [MessageService],
})
export class NGPrimeModule {}
