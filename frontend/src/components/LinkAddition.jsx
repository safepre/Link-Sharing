/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// LinkAddition.js

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import dropdownBtn from '../assets/images/vector-1.svg'
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
import facebookIcon from '../assets/images/icon-facebook.svg'
import { useAuth } from '../services/authContext'

// ... (your imports)

// eslint-disable-next-line react/prop-types
// ... (your imports)

// eslint-disable-next-line react/prop-types
const LinkAddition = ({
  linkNumber,
  onClickRemove,
  onPlatformSelect,
  onUrlChange,
  linkSections,
  setLinkSections,
  showRemoveButton,
  isLastLink,
  areLinksSaved,
  handleSaveLink,
  selectedPlatformProp,
  urlProp,
}) => {
  const [isContentVisible, setIsContentVisible] = useState(true)
  const [selectedPlatform, setSelectedPlatform] = useState(null)

  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [url, setUrl] = useState('')
  const [lastSelectedPlatform, setLastSelectedPlatform] = useState(null)

  const { token, user } = useAuth()

  const isSaved = linkSections[linkNumber - 1]?.isSaved || false

  const handleUrlChange = e => {
    if (isSaved === false) {
      const newUrl = e.target.value
      setUrl(newUrl)
      onUrlChange(linkNumber, newUrl)
    }
  }

  useEffect(() => {
    // Update local state based on props when they change
    setSelectedPlatform(selectedPlatformProp)
    setUrl(urlProp)
  }, [selectedPlatformProp, urlProp])

  useEffect(() => {
    // Additional initialization logic if needed
  }, []) // Empty dependency array to run the effect once after the initial render

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

  const handlePlatformHover = platform => {
    platformStates[platform][1](true)
  }

  const handlePlatformLeave = platform => {
    platformStates[platform][1](false)
  }
  const handleRemoveLink = async linkIndexToRemove => {
    console.log('Home button clicked')
    try {
      // Get the link ID from the backend based on the platform name
      const linkToDelete = linkSections[linkIndexToRemove]
      const platformName = linkToDelete.selectedPlatform
      const urlName = linkToDelete.url

      const userProfileResponse = await axios.get(
        `${import.meta.env.VITE_BASE_API}/users`
      )
      console.log('lets see ' + userProfileResponse)
      const userProfile = userProfileResponse.data.find(
        email => email.email_address === user
      )
      console.log('lets see ' + userProfile)

      if (userProfile) {
        const profileResponse = await axios.get(
          `${import.meta.env.VITE_BASE_API}/links`
        )
        console.log('delete backend ' + profileResponse)
        const linkToDeleteBackend = profileResponse.data.find(
          link => link.platform === platformName && link.url === urlName
        )
        console.log('delete backend ' + linkToDeleteBackend)
        if (linkToDeleteBackend) {
          console.log('Link to delete from backend:', linkToDeleteBackend)

          // Delete the link on the backend
          const deleteResponse = await axios.delete(
            `${import.meta.env.VITE_BASE_API}/links/${linkToDeleteBackend.id}`,
            {
              headers: {
                Authorization: `bearer ${token}`,
              },
            }
          )

          console.log('Link deleted from backend:', deleteResponse.data)
        }
      }

      // Update the order when removing a link on the frontend
      setLinkSections(prevSections => {
        const updatedSections = prevSections.filter(
          (_, index) => index !== linkIndexToRemove
        )

        // Update the order when removing a link
        updatedSections.forEach((section, index) => {
          section.order = index + 1
        })

        console.log('Updated sections after removing link:', updatedSections)

        return updatedSections
      })
    } catch (error) {
      console.error('Error removing link:', error.message)
    }
  }
  const handleRectangleLinkClick = () => {
    setIsContentVisible(prevValue => !prevValue)
  }

  // Inside handleDropdownClick function
  const handleDropdownClick = () => {
    // Only toggle the dropdown if it is not selected
    if (!selectedPlatform) {
      setIsDropdownVisible(prevValue => !prevValue)

      if (!isDropdownVisible && lastSelectedPlatform) {
        // Find the index of lastSelectedPlatform in linkSections
        const index = linkSections.findIndex(
          section => section.platform === lastSelectedPlatform
        )

        // Display the icon and platform at the found index
        if (index !== -1) {
          setSelectedPlatform(linkSections[index].platform)
          setLastSelectedPlatform(linkSections[index].platform)
        }
      }
    }
  }

  const handlePlatformClick = platform => {
    setLinkSections(prevSections => {
      const updatedSections = [...prevSections]
      updatedSections[linkNumber - 1] = {
        ...updatedSections[linkNumber - 1],
        platform: platform,
      }
      return updatedSections
    })

    setSelectedPlatform(platform) // Update the selected platform state
    onPlatformSelect(linkNumber, platform)

    // Keep the dropdown disabled after selecting a platform
    // Comment the following line
    setLastSelectedPlatform(platform)

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
          {isLastLink && (
            <button
              className="remove-button"
              onClick={() => handleRemoveLink(linkNumber - 1)}>
              Remove
            </button>
          )}
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
                    {lastSelectedPlatform && (
                      <>
                        <img
                          className={`${lastSelectedPlatform.toLowerCase()}-icon`}
                          src={
                            images[`${lastSelectedPlatform.toLowerCase()}Icon`]
                          }
                          alt={`${lastSelectedPlatform} Icon`}
                        />
                        <span
                          className={`${lastSelectedPlatform.toLowerCase()}`}>
                          {lastSelectedPlatform}
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
                placeholder={`e.g. https://www.${selectedPlatform?.toLowerCase()}.com`}
                value={url}
                onChange={handleUrlChange}
                readOnly={isSaved ? 'readOnly' : undefined}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default LinkAddition
