// utils/imageUtils.js
export const bufferToBase64 = (buffer) => {
    const byteArray = new Uint8Array(buffer); // Convert the buffer to a Uint8Array
    let binaryString = '';
    byteArray.forEach(byte => {
      binaryString += String.fromCharCode(byte);
    });
    return btoa(binaryString); // Convert binary string to base64
};
