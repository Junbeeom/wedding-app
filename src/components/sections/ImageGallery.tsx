import classNames from 'classnames/bind'
import { useState, useRef } from 'react'
import styles from './ImageGallery.module.scss'

import Section from '../shared/Section'
import ImageViewer from '../ImageViewer'

const cx = classNames.bind(styles)

function ImageGallery({ images }: { images: string[] }) {
  const [selectedIdx, setSelected] = useState(-1)
  const [showAll, setShowAll] = useState(false)
  const open = selectedIdx > -1
  const startX = useRef(0)
  const currentX = useRef(0)
  const isDragging = useRef(false)

  const handleSelectedImage = (idx: number) => {
    setSelected(idx)
  }

  const handleClose = () => {
    setSelected(-1)
  }

  const handleShowAll = () => {
    setShowAll(true)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
    isDragging.current = true
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging.current) {
      currentX.current = e.touches[0].clientX
    }
  }

  const handleTouchEnd = () => {
    if (isDragging.current) {
      const deltaX = startX.current - currentX.current
      if (deltaX > 50) {
        handleNextImage()
      } else if (deltaX < -50) {
        handlePrevImage()
      }
    }
    isDragging.current = false
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX
    isDragging.current = true
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      currentX.current = e.clientX
    }
  }

  const handleMouseUp = () => {
    if (isDragging.current) {
      const deltaX = startX.current - currentX.current
      if (deltaX > 50) {
        handleNextImage()
      } else if (deltaX < -50) {
        handlePrevImage()
      }
    }
    isDragging.current = false
  }

  const handlePrevImage = () => {
    setSelected((prevIdx) => (prevIdx > 0 ? prevIdx - 1 : images.length - 1))
  }

  const handleNextImage = () => {
    setSelected((prevIdx) => (prevIdx < images.length - 1 ? prevIdx + 1 : 0))
  }

  const visibleImages = showAll ? images : images.slice(0, 9)

  return (
    <>
      <Section title="사진첩">
        <ul className={cx('wrap-images')}>
          {visibleImages.map((src, idx) => (
            <li
              key={idx}
              className={cx('wrap-image')}
              onClick={() => {
                handleSelectedImage(idx)
              }}
            >
              <img src={src} alt="사진첩 이미지" />
            </li>
          ))}
          {!showAll && images.length > 9 && (
            <li className={cx('show-more-container')}>
              <button className={cx('show-more')} onClick={handleShowAll}>
                더보기
              </button>
            </li>
          )}
        </ul>
      </Section>
      {open && (
        <div
          className={cx('selected-overlay')}
          onClick={handleClose}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <button
            className={cx('close-button')}
            onClick={(e) => {
              e.stopPropagation()
              handleClose()
            }}
          >
            <svg className={cx('close-icon')} viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13l-1.41 1.41L12 13.41l-3.59 3.59L7 15l3.59-3.59L7 7.83 8.41 6.41 12 9.83l3.59-3.42L17 7.83l-3.59 3.58L17 15z" />
            </svg>
          </button>
          <img src={images[selectedIdx]} alt="Selected" />
        </div>
      )}
    </>
  )
}

export default ImageGallery
