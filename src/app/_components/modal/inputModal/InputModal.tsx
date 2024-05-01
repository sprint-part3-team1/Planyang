import React, { useState, useRef, ChangeEvent, forwardRef } from 'react';
import axios from 'axios';
import styles from './InputModal.module.css';
import ImageEditIcon from '../../../../../public/assets/icons/imageEditIcon.svg';
import PlusIcon from '../../../../../public/assets/icons/plusIcon.svg';

/** 임의로 만든 input 입니다. */

type InputModalProps = {
  title: string;
  type: string;
  required?: boolean;
  inputRef?: React.MutableRefObject<any> | null;
  focusoutFunc?: () => void;
  imageInputProps?: {
    columnId: number;
    selectedImagePath: any;
    setSelectedImagePath: React.Dispatch<React.SetStateAction<any>>;
  };
};

const InputModal = forwardRef<HTMLDivElement, InputModalProps>(
  (
    { title, type, required = false, inputRef, focusoutFunc, imageInputProps },
    imageRef,
  ) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const formData = new FormData();
    const [showImageUrl, setShowImageUrl] = useState<string | null>(
      imageInputProps?.selectedImagePath,
    );

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file && imageInputProps) {
        const { columnId, selectedImagePath, setSelectedImagePath } =
          imageInputProps;
        const imageUrl = URL.createObjectURL(file);
        setShowImageUrl(imageUrl);

        formData.append('image', file);
        const accessToken = localStorage.getItem('accessToken');
        try {
          const response = await axios.post(
            `https://sp-taskify-api.vercel.app/4-1/columns/${columnId}/card-image`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
              },
            },
          );
          setSelectedImagePath(response.data.imageUrl);
        } catch (error) {
          console.error(error);
        }
      }
    };

    const handleBackgroundDivClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const onDeleteImageButtonClickHandler = (
      e: React.MouseEvent<HTMLButtonElement>,
    ) => {
      const { columnId, selectedImagePath, setSelectedImagePath } =
        imageInputProps;
      e?.preventDefault();
      setShowImageUrl(null);
      setSelectedImagePath(null);
    };

    switch (type) {
      case 'multiLine':
        return (
          <div className={styles.container}>
            <p id={styles.title}>
              {title} {required && <span className={styles.essential}>*</span>}
            </p>
            <textarea
              rows={2}
              className={`${styles.input} ${styles.multiLineInput}`}
              ref={inputRef}
              onChange={focusoutFunc}
            />
          </div>
        );
      case 'image':
        return (
          <div className={styles.container} ref={imageRef}>
            <p id={styles.title}>
              {title} {required && <span className={styles.essential}>*</span>}
            </p>
            <div
              className={`${showImageUrl ? styles.imageContainer : styles.noImageDiv}`}
            >
              {showImageUrl && (
                <div
                  className={styles.backgroundDiv}
                  onClick={handleBackgroundDivClick}
                  role="button"
                  aria-label="Upload Image"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleBackgroundDivClick();
                    }
                  }}
                >
                  <ImageEditIcon className={styles.editIcon} />
                </div>
              )}

              <label htmlFor="fileInput" className={styles.customFileInput}>
                <input
                  type="file"
                  id="fileInput"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className={styles.fileInput}
                />
                {showImageUrl ? (
                  <div>
                    <div className={styles.imageDiv}>
                      <img
                        src={showImageUrl}
                        alt="대시보드 이미지"
                        className={styles.image}
                      />
                      <ImageEditIcon className={styles.editIcon} />
                    </div>
                    <button
                      type="button"
                      className={styles.deleteImageButton}
                      onClick={onDeleteImageButtonClickHandler}
                    >
                      {' '}
                    </button>
                  </div>
                ) : (
                  <PlusIcon />
                )}
              </label>
            </div>
          </div>
        );
      default:
        return (
          <div className={styles.container}>
            <p id={styles.title}>
              {title} {required && <span className={styles.essential}>*</span>}
            </p>
            <input
              className={styles.input}
              ref={inputRef}
              onChange={focusoutFunc}
            />
          </div>
        );
    }
  },
);

InputModal.defaultProps = {
  required: false,
  inputRef: null,
  focusoutFunc: () => {},
  imageInputProps: {
    columnId: 0,
    selectedImagePath: '',
    setSelectedImagePath: (value: React.SetStateAction<any>) => {},
  },
};

InputModal.displayName = 'InputModal';

export default InputModal;
