export const enum SERVICE_TYPE {
  DELIVERY = "DELIVERY",
  PICKUP = "PICKUP",
  PAYMENT = "PAYMENT",
}

export class User {
  constructor(
    public name: string,
    public email: string,
    public mobile: string,
    public postcode: string,
    public service_type: SERVICE_TYPE
  ) {}
}

export interface Lead {
  service_type: SERVICE_TYPE
  totalVotes: string
}
