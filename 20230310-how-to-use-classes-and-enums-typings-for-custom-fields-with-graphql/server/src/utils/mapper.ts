import { RestaurantGuestResponse, FoodReservation } from "../types/restaurant";

export const restaruantGuestMapper = (guest: RestaurantGuestResponse) => {
  if (!guest) {
    return null;
  }

  return {
    id: guest.id,
    name: guest.name,
    phoneNumber: guest.phoneNumber,
    email: guest.email,
    foodReservation: guest.b_3249258?.id === FoodReservation.Yes,
  };
};
