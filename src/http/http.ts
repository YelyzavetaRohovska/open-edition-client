import { HttpOpt } from "./http.types";

const httpRequest = async <T, D>(
  { endpoint, token, method }: HttpOpt,
  body?: D
): Promise<T> => {
  if (!endpoint || !token || !method) {
    throw new Error("Bad http request configuration");
  }

  const response = await fetch(`${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: (body && JSON.stringify(body)) ?? null,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const Get = async <T>(opt: Omit<HttpOpt, "method">): Promise<T> => {
  return httpRequest({ ...opt, method: "GET" });
};

export const Post = async <T, D>(
  opt: Omit<HttpOpt, "method">,
  body: D
): Promise<T> => {
  return httpRequest({ ...opt, method: "POST" }, body);
};
