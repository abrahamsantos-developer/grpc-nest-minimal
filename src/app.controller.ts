// src/app.controller.ts
import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface NotificationService {
  SendNotification(data: any): Observable<any>;
}

@Controller()
export class AppController implements OnModuleInit {
  private notificationService: NotificationService;

  constructor(@Inject('NOTIFICATION_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.notificationService = this.client.getService<NotificationService>('NotificationService');
  }

  @Get()
  testGrpc() {
    return this.notificationService.SendNotification({
      channel: 'email',
      transport: 'hubspot',
      contact: {
        email: 'asantos@tiprotec.com',
        firstName: 'David',
        lastName: 'Chavez',
        phone: '+5215510000001',
      },
      template: {
        id: 'default-template',
        variables: {
          contact_us: 'https://sandbox-insurance-services.woowpay.mx/contacto',
          first_name: 'David',
          nombre_producto: 'Mascota',
          order_id: 'ORD20250614-0015-1751563632424008944',
          tipo_notificacion: '5',
          url_pago_en_linea: 'https://sandbox-insurance-services.woowpay.mx/checkout?id=orden_001&t=5',
        },
      },
      enableTracking: true,
      priority: 2, // PRIORITY_NORMAL (enum int)
      scheduledAt: '',
      metadata: {
        orderId: 'ORD20250614-0015',
        campaign: 'test-notificacion',
        eventId: '',
        createdAt: Math.floor(Date.now() / 1000), // int64 (segundos)
      },
      deal: {
        id: '',
        dealname: '0005',
        stage: '',
        amount: '',
        closeDate: '',
        description: '',
        nombreProducto: 'Mascota',
        tipoNotificacion: 5,
        urlPagoEnLinea: 'https://sandbox-insurance-services.woowpay.mx/checkout?id=orden_001&t=5',
        contactUs: 'https://sandbox-insurance-services.woowpay.mx/contacto',
      },
    });
  }
}
