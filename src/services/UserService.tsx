import { User } from "../common/models";

const basePath = "profile";

export async function updateProfile(value: User) {
  const url = process.env.REACT_APP_API_URL + basePath;
  const data = new FormData();
  data.append("id", value.id!.toString());
  data.append("name", value.name!);
  data.append("email", value.email!);
  await fetch(url, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "multipart/form-data",
      Authrization: "Bearer <token>"
    }
  });
}