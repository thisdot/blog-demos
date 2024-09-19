export function transformBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader?.result?.toString().split(',')[1] || '');
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
