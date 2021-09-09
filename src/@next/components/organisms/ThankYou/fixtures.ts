export const steps = [
  {
    index: 0,
    link: '/checkout/address',
    name: 'Datos de envío',
    nextActionName: 'Ir a Pago',
    nextStepLink: '/checkout/payment',
    onlyIfShippingRequired: true,
  },
  {
    index: 1,
    link: '/checkout/payment',
    name: 'Datos de Pago',
    nextActionName: 'Pagar y confirmar',
    nextStepLink: '/checkout/review',
    onlyIfShippingRequired: false,
  },
  {
    index: 2,
    link: '/checkout/review',
    name: '¡Listo!',
    nextActionName: 'Pagar y hacer pedido',
    nextStepLink: '/order-finalized',
    onlyIfShippingRequired: false,
  },
];
