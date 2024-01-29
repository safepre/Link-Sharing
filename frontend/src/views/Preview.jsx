import React, { useState, useRef } from 'react'
import axios from 'axios'

const Preview = () => {
  return (
    <>
      <div className="preview-page">
        <div className="preview-rectangle-view"></div>
        <div className="preview-ui-view">
          <div className="preview-ui-area">
            <div className="preview-ui-top">
              <span className="preview-ellipse"></span>
              <div className="preview-font-area"></div>
            </div>
          </div>
        </div>
        <div className="preview-navbar-view">
          <div className="preview-navbar-bar">
            <div className="preview-bar"></div>
            <button className="editor-btn"></button>
            <button className="share-link"></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Preview
