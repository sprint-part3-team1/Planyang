const blobToDataURL = (blob: Blob): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(',')[1]); // Remove data:image/jpeg;base64, 부분
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
export default blobToDataURL;
