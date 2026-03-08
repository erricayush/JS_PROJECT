// utilities.js
export const saveToLocalStorage = (key, data) => {
    try {
        
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key, serializedData);
        console.log(`Data successfully saved under key: ${key}`);
    } catch (error) {
        console.error("Error saving to localStorage", error);
    }
};