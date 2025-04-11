const baseUrl = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://montpellier-bus-backend.vercel.app";


const checkServerStatusAction = async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  return response.ok;
};

export default checkServerStatusAction;
