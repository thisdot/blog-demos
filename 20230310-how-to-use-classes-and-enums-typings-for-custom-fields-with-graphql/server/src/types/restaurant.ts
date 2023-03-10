export enum FoodReservation {
  "Yes" = 53425867,
  "No" = 53425868,
}

type RestaurantGuestFieldLookup<
  TId extends string | number | "" | null,
  TValue extends string | null
> = {
  id: TId;
  value: TValue;
};

class RestaurantGuest {
  id!: number;
  name!: string;
  email!: string;
  phoneNumber!: string;
  /** foodReservation */
  b_3249258?: RestaurantGuestFieldLookup<
    FoodReservation,
    keyof typeof FoodReservation
  >;
}

export type RestaurantGuestResponse = {
  [g in keyof RestaurantGuest]: RestaurantGuest[g];
};
