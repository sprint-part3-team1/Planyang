import React from 'react';

export type ImageInputProps = {
  selectedImagePath: string | null;
  setSelectedImagePath: React.Dispatch<React.SetStateAction<string | null>>;
};
