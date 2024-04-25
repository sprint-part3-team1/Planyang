import React, { useState, useRef, ChangeEvent, SetStateAction } from 'react';
import axios from 'axios';
// import Image from 'next/image';
import styles from './ImageInput.module.css';
import PlusIcon from '../../../../../../public/assets/icons/plusIcon.svg';
import ImageEditIcon from '../../../../../../public/assets/icons/imageEditIcon.svg';

type Type = {
  selectedImagePath: any;
  setSelectedImagePath: React.Dispatch<SetStateAction<any>>;
};
const ImageInput = ({ selectedImagePath, setSelectedImagePath }: Type) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showImageUrl, setShowImageUrl] = useState<string | null>(null);

  const formData = new FormData();

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setShowImageUrl(imageURL);

      formData.append('image', file);
      const accessToken = localStorage.getItem('accessToken');
      try {
        const response = await axios.post(
          'https://sp-taskify-api.vercel.app/4-1/users/me/image',
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        setSelectedImagePath(response.data.profileImageUrl);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onDeleteImageButtonClickHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e?.preventDefault();
    setShowImageUrl(null);
    setSelectedImagePath(null);
  };

  return (
    <div
      className={`${styles.container} ${selectedImagePath ? styles.imageContainer : styles.noImageDiv}`}
    >
      {(!showImageUrl && !selectedImagePath) || (
        <button
          type="button"
          className={styles.deleteImageButton}
          onClick={onDeleteImageButtonClickHandler}
        >
          X
        </button>
      )}
      <label htmlFor="fileInput" className={styles.customFileInput}>
        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          onChange={handleImageChange}
          className={styles.fileInput}
          accept=".png, .jpg, .jpeg"
        />
        {showImageUrl || selectedImagePath ? (
          <div className={styles.imageDiv}>
            <img
              src={selectedImagePath}
              alt="프로필 이미지"
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
