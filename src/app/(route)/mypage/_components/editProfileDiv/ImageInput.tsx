import React, { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import styles from './ImageInput.module.css';
import PlusIcon from '../../../../../../public/assets/icons/plusIcon.svg';
import ImageEditIcon from '../../../../../../public/assets/icons/imageEditIcon.svg';

const ImageInput = () => {
  const [selectedImagePath, setSelectedImagePath] = useState<string | null>(
    null,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImagePath(imageUrl);
    }
  };
  return (
    <div
      className={`${selectedImagePath ? styles.imageContainer : styles.noImageDiv}`}
    >
      <label htmlFor="fileInput" className={styles.customFileInput}>
        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          onChange={handleImageChange}
          className={styles.fileInput}
        />
        {selectedImagePath ? (
          <div className={styles.imageDiv}>
            <Image
              fill
              src={selectedImagePath}
              alt="대시보드 이미지"
              className={styles.image}
            />
            <ImageEditIcon className={styles.editIcon} />
          </div>
        ) : (
          <PlusIcon />
        )}
      </label>
    </div>
  );
};

export default ImageInput;
