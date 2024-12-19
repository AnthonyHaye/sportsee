import { userMockData } from "./mockData";

export const fetchUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userMockData);
    }, 500);
  });
};
