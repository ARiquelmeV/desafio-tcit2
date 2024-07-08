import { Seguro } from "../types/Seguro";

export const fetchSeguros = async (): Promise<Seguro[]> => {
    const response = await fetch('https://localhost:7143/api/seguros/GetSeguros');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };