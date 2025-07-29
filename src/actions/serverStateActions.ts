
import { BASE_URL } from "../helpers/constants";

const checkServerStatusAction = async () => {
  const response = await fetch(`${BASE_URL}/api/health`);
  return response.ok;
};

export default checkServerStatusAction;
