const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    let errorMessage = "Something went wrong";
    
    if (errorBody.detail) {
      if (typeof errorBody.detail === "string") {
        errorMessage = errorBody.detail;
      } else if (Array.isArray(errorBody.detail)) {
        errorMessage = errorBody.detail.map((err: any) => err.msg || JSON.stringify(err)).join(", ");
      } else if (typeof errorBody.detail === "object") {
        errorMessage = JSON.stringify(errorBody.detail);
      }
    }
    
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
