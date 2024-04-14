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

export async function createBooking(bookingData) {
  try {
    const response = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during booking creation:", error);
    throw error;
  }
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
