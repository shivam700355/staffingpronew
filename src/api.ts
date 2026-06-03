const API_BASE = "https://api.staffingpro.in/api";

type Json = Record<string, any>;

const defaultApiKey = (import.meta.env && (import.meta.env.VITE_API_KEY as string)) || "STAFFINGPRO123";

async function apiPost(path: string, payload: Json = {}) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ api_key: defaultApiKey, ...payload });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const res = await fetch(`${API_BASE}/${path}`, requestOptions);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function getCities() {
  return apiPost("city");
}

export async function getJobTitles() {
  return apiPost("jobtitle");
}

export async function postTo(path: string, payload: Json = {}) {
  return apiPost(path, payload);
}

export default {
  getCities,
  postTo,
};
