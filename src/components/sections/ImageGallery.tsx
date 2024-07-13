import classNames from 'classnames/bind'
import { useState } from 'react'
import styles from './ImageGallery.module.scss'

import Section from '../shared/Section'

import ImageViewer from '../ImageViewer'

const cx = classNames.bind(styles)

function ImageGallery({ images }: { images: string[] }) {
  const [selectedIdx, setselected] = useState(-1)
  const open = selectedIdx > -1

  const handleSelectedImage = (idx: number) => {
    setselected(idx)
  }

  const handleClose = () => {
    setselected(-1)
  }

  return (
    <>
      <Section title="사진첩">
        <ul className={cx('wrap-images')}>
          {images.map((src, idx) => (
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
        </ul>
      </Section>
      <ImageViewer
        images={images}
        open={open}
        selectedIdx={selectedIdx}
        onClose={handleClose}
      />
    </>
  )
}

export default ImageGallery
