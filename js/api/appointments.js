import { request } from "./api.js";

export function getAppointments() {
  return request("/clients");
}

export function createAppointment(data) {
  return request("/clients", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// listar horários por data 
export function getDateHours(data) {
  return request("/scheduleAt", {
    method: "POST",
    body: JSON.stringify(data)
  })
}