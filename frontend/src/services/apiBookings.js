import { API_URL } from "./apiURL";

export async function getBookings(authenticationKey) {
  // GET from the API /animals
  const res = await fetch(API_URL + "/bookings", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
  });

  const { data } = await res.json();

  return data;
}

export async function deleteBooking(bookingId) {
  const response = await fetch(API_URL + "/bookings/" + bookingId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
}
