//Make Request
export async function fetchDataWithTimeout(resource, options = {}) {
    try {
        const {timeout = 8000} = options;
        const controller = new AbortController();
        const timeoutId = setTimeout(()=> controller.abort , timeout);
        const response = await fetch(resource, { ...options, signal: controller.signal });
        clearTimeout(timeoutId);
        return response.json();
    } catch (error) {
        console.error('Error fetching cats:', error);
        //TODO:request recovery
    }
}