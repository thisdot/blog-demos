import { restaruantGuestMapper } from "../utils/mapper";
import { FoodReservation } from "../types/restaurant";

const mockFoodRes = FoodReservation["Yes"];

const guestObject = {
  id: 1,
  name: "billy",
  email: "testemail@gmail.com",
  phoneNumber: "209-145-3253",
  b_3249258: {
    id: mockFoodRes,
    value: FoodReservation[mockFoodRes] as keyof typeof FoodReservation,
  },
};

export const resolvers = {
  Query: {
    restaurantGuest: (_: any, __: any, ___: any) => {
      return restaruantGuestMapper(guestObject);
    },
  },
};
