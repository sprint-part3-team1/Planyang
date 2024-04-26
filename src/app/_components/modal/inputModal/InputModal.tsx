import React, { useState, useRef, ChangeEvent, forwardRef } from 'react';
import Image from 'next/image';
import styles from './InputModal.module.css';
import ImageEditIcon from '../../../../../public/assets/icons/imageEditIcon.svg';
import PlusIcon from '../../../../../public/assets/icons/plusIcon.svg';

/** 임의로 만든 input 입니다. */

type InputModalProps = {
  title: string;
  type: string;
  required?: boolean;
  inputRef?: React.MutableRefObject<any>;
};

const InputModal = forwardRef<HTMLDivElement, InputModalProps>(
  ({ title, type, required = false, inputRef }, imageRef) => {
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

    const handleBackgroundDivClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
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
              className={`${selectedImagePath ? styles.imageContainer : styles.noImageDiv}`}
            >
              {selectedImagePath && (
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
          </div>
        );
      default:
        return (
          <div className={styles.container}>
            <p id={styles.title}>
              {title} {required && <span className={styles.essential}>*</span>}
            </p>
            <input className={styles.input} ref={inputRef} />
          </div>
        );
    }
  },
);

InputModal.displayName = 'InputModal';

export default InputModal;
