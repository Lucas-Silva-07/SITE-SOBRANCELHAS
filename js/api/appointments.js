import { request } from "./api.js";

export function getAppointments() {
  return request("/clients");
};

export function createAppointment(data) {
  return request("/clients", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// listar horários por data
export async function getDateHours(date) {
  return await request(`/scheduleAt?date=${date}`);
}