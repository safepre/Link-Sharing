/* eslint-disable react/prop-types */
// LinkAddition.js

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react'

import dropdownBtn from '/Users/safelgp/work/Link-Sharing/frontend/src/assets/images/vector-1.svg'
import linkIcon from '../assets/images/icon-link.svg'
import githubIcon from '../assets/images/icon-github.svg'
import youtubeIcon from '../assets/images/icon-youtube.svg'
import twitchIcon from '../assets/images/icon-twitch.svg'
import stackoverflowIcon from '../assets/images/icon-stack-overflow.svg'
import linkedinIcon from '../assets/images/icon-linkedin.svg'
import gitlabIcon from '../assets/images/icon-gitlab.svg'
import devtoIcon from '../assets/images/icon-devto.svg'
import freecodecampIcon from '../assets/images/icon-freecodecamp.svg'
import frontendmentorIcon from '../assets/images/icon-frontend-mentor.svg'
import hashnodeIcon from '../assets/images/icon-hashnode.svg'
import codepenIcon from '../assets/images/icon-codepen.svg'
import codewarsIcon from '../assets/images/icon-codewars.svg'
import khanacademyIcon from '../assets/images/khan-academy-icon-svgrepo-com.svg'
import leetcodeIcon from '../assets/images/leetcode-svgrepo-com.svg'
import xIcon from '../assets/images/X_logo_2023_original.svg'
import replitIcon from '../assets/images/New_Replit_Logo.svg'
import facebookIcon from '/Users/safelgp/work/Link-Sharing/frontend/src/assets/images/icon-facebook.svg'

// eslint-disable-next-line react/prop-types
const LinkAddition = ({
  linkNumber,
  onClickRemove,
  onPlatformSelect,
  onUrlChange,
}) => {
  const [isContentVisible, setIsContentVisible] = useState(true)
  const [selectedPlatform, setSelectedPlatform] = useState(null) // Updated state
  const [selectedPlatformsArray, setSelectedPlatformsArray] = useState([])

  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [url, setUrl] = useState('') // New state for URL input

  const images = {
    githubIcon,
    linkIcon,
    dropdownBtn,
    youtubeIcon,
    twitchIcon,
    devtoIcon,
    replitIcon,
    xIcon,
    freecodecampIcon,
    codepenIcon,
    codewarsIcon,
    khanacademyIcon,
    linkedinIcon,
    stackoverflowIcon,
    gitlabIcon,
    frontendmentorIcon,
    hashnodeIcon,
    leetcodeIcon,
    facebookIcon,
  }

  const platformStates = {
    GitHub: useState(false),
    YouTube: useState(false),
    LinkedIn: useState(false),
    Facebook: useState(false),
    Twitch: useState(false),
    Devto: useState(false),
    Replit: useState(false),
    X: useState(false),
    freeCodeCamp: useState(false),
    KhanAcademy: useState(false),
    StackOverflow: useState(false),
    FrontendMentor: useState(false),
    LeetCode: useState(false),
    Hashnode: useState(false),
    Codewars: useState(false),
    CodePen: useState(false),
    GitLab: useState(false),
  }

  const handleUrlChange = e => {
    const newUrl = e.target.value
    console.log(`Link ${linkNumber} URL changed: ${newUrl}`)

    setUrl(newUrl)
    // Call the onUrlChange callback with linkNumber and newUrl
    onUrlChange(linkNumber, newUrl)
  }

  const handlePlatformHover = platform => {
    platformStates[platform][1](true)
  }

  const handlePlatformLeave = platform => {
    platformStates[platform][1](false)
  }

  const handleRemoveClick = () => {
    // Call the remove function passed as a prop
    onClickRemove(linkNumber)

    // Remove the selected platform from the array when removing the link
    setSelectedPlatformsArray(prevArray =>
      prevArray.filter(item => item.linkNumber !== linkNumber)
    )
  }

  const handleRectangleLinkClick = () => {
    // Toggle the visibility of dropdown and input
    setIsContentVisible(prevValue => !prevValue)
  }

  const handleDropdownClick = () => {
    setIsDropdownVisible(prevValue => !prevValue)

    // Reset selectedPlatform when closing the dropdown
    !isDropdownVisible && setSelectedPlatform(null)
  }

  const handlePlatformClick = platform => {
    setSelectedPlatform(platform)

    // Check if the platform is already in the array for any link
    const existingPlatformIndex = selectedPlatformsArray.findIndex(
      item => item.linkNumber === linkNumber
    )

    if (existingPlatformIndex !== -1) {
      // Update the platform in the array
      setSelectedPlatformsArray(prevArray => {
        const newArray = [...prevArray]
        newArray[existingPlatformIndex].selectedPlatform = platform
        return newArray
      })
    } else {
      // Add a new entry to the array
      setSelectedPlatformsArray(prevArray => [
        ...prevArray,
        { linkNumber, selectedPlatform: platform },
      ])
    }

    // Call the onPlatformSelect callback with linkNumber and selectedPlatform
    onPlatformSelect(linkNumber, platform)
    setIsDropdownVisible(false)
  }

  return (
    <div className="link-addition">
      <div className="link-addition-container">
        <div className="link-num-remove-layer">
          <div className="link-container">
            <button
              className="rectangle-link"
              onClick={handleRectangleLinkClick}>
              <span className="rect-1"></span>
              <span className="rect-2"></span>
            </button>
            <span className="link-font-style"> Link #{linkNumber}</span>
          </div>
          <button className="remove-button" onClick={handleRemoveClick}>
            Remove
          </button>
        </div>

        {isContentVisible && (
          <>
            <div className="platform-spacing">
              <span className="platform-font-dropdown">Platform</span>
              <div className="dropdown" onClick={handleDropdownClick}>
                {selectedPlatform ? (
                  <>
                    <img
                      className={`${selectedPlatform.toLowerCase()}-icon`}
                      src={images[`${selectedPlatform.toLowerCase()}Icon`]}
                      alt={`${selectedPlatform} Icon`}
                    />
                    <span className={`${selectedPlatform.toLowerCase()}`}>
                      {selectedPlatform}
                    </span>
                    <button className="vector-button">
                      <img
                        className="vector"
                        src={images.dropdownBtn}
                        alt="Dropdown Icon"
                      />
                    </button>
                  </>
                ) : (
                  <span className="placeholder">
                    {selectedPlatformsArray.length > 0 && (
                      <>
                        <img
                          className={`${selectedPlatformsArray[
                            selectedPlatformsArray.length - 1
                          ].selectedPlatform.toLowerCase()}-icon`}
                          src={
                            images[
                              `${selectedPlatformsArray[
                                selectedPlatformsArray.length - 1
                              ].selectedPlatform.toLowerCase()}Icon`
                            ]
                          }
                          alt={`${
                            selectedPlatformsArray[
                              selectedPlatformsArray.length - 1
                            ].selectedPlatform
                          } Icon`}
                        />
                        <span
                          className={`${selectedPlatformsArray[
                            selectedPlatformsArray.length - 1
                          ].selectedPlatform.toLowerCase()}`}>
                          {
                            selectedPlatformsArray[
                              selectedPlatformsArray.length - 1
                            ].selectedPlatform
                          }
                        </span>
                      </>
                    )}
                  </span>
                )}
              </div>
              {isDropdownVisible && (
                <div className="dropdown-layouts">
                  {Object.keys(platformStates).map((platform, index) => (
                    <React.Fragment key={platform}>
                      <div
                        className={`${platform}-platform`}
                        onMouseEnter={() => handlePlatformHover(platform)}
                        onMouseLeave={() => handlePlatformLeave(platform)}
                        onClick={() => handlePlatformClick(platform)}>
                        <img
                          className={`selected${platform}`}
                          src={images[`${platform.toLowerCase()}Icon`]}
                          alt={`${platform} Icon`}
                          style={{
                            filter: platformStates[platform][0]
                              ? 'brightness(100%) sepia(100%) hue-rotate(260deg) saturate(100%) contrast(100%)'
                              : '',
                          }}
                        />
                        <span className={`selected${platform}-font`}>
                          {platform}
                        </span>
                      </div>
                      {index !== Object.keys(platformStates).length - 1 && (
                        <span
                          className={`rectangle-dropdown-${index + 2}`}></span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
            <div className="link-form">
              <img
                className="link-icon-image"
                src={images.linkIcon}
                alt="Link Icon"
              />
              <input
                className="link-input"
                placeholder="e.g. https://www.github.com/johnappleseed"
                value={url}
                onChange={handleUrlChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default LinkAddition
