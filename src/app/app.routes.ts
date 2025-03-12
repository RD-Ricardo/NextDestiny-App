import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderComponent } from './pages/order/order.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'checkout/:productId',
        component: CheckoutComponent
    },
    {
        path: 'order/:orderId',
        component: OrderComponent
    }
];
