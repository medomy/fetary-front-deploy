import React from 'react'
import ReactImageMagnify from 'image-magnify'
function ImageMagnify({imgSrc}) {
  return (
    <ReactImageMagnify {...{
        smallImage: {
            alt: 'item-image',
            isFluidWidth: true,
            src: imgSrc
        },
        largeImage: {
            src: imgSrc,
            width: 1200,
            height: 1800
        }
    }} />
  )
}

export default ImageMagnify