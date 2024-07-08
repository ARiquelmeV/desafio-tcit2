import { Seguro } from "../types/Seguro";

const apiUrl = 'https://localhost:7143/api/seguros/CreateSeguro';
async function createSeguro(seguro: Seguro): Promise<void> {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(seguro)
        });

        if (!response.ok) {
            throw new Error('Error al enviar el seguro');
        }

        // const data = await response.json();
    } catch (error) {
        console.error('Error al crear el seguro:', error);
    }
}

export { createSeguro };