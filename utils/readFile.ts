import { resolveObjectURL } from 'buffer';
import { preProcessFile } from 'typescript';

const processFile = (currentFile: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.readAsDataURL(currentFile);
    reader.onload = () => {
      const result = reader.result;
      resolve(result);
    };
  });
};

export const readFile = async (currentFile: File) => {
  const readedFile: string | ArrayBuffer | null = await processFile(currentFile);

  return readedFile;
};
