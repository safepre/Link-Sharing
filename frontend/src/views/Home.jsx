/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import LinkAddition from '../components/LinkAddition'
import linkIcon from '/Users/safelgp/work/Link-Sharing/frontend/src/assets/images/icon-link.svg'
import selectedLinkIcon from '../assets/images/ph-link-bold.svg'
import devlinkLogo from '../assets/images/logo-devlinks-large.svg'
import profileDetailIcon from '../assets/images/icon-profile-details-header.svg'
import selectedProfileDetailIcon from '../assets/images/ph-user-circle-bold.svg'
import illustrationEmpty from '../assets/images/illustration-empty.svg'
import phoneMockup from '../assets/images/illustration-phone-mockup.svg'
import image from '/Users/safelgp/work/Link-Sharing/frontend/src/assets/images/ph-image.svg'
import ellipse from '/Users/safelgp/work/Link-Sharing/frontend/src/assets/images/ellipse-3.svg'
import axios from 'axios'

const Home = () => {
  const [linkSections, setLinkSections] = useState([])
  const [isLinkSectionVisible, setLinkSectionVisible] = useState(false)
  const [isLinksBlockVisible, setLinksBlockVisible] = useState(true)

  const images = {
    linkIcon,
    devlinkLogo,
    profileDetailIcon,
    illustrationEmpty,
    phoneMockup,
    selectedProfileDetailIcon,
    selectedLinkIcon,
    ellipse,
    image,
  }

  const toggleLinksBlockVisibility = visible => {
    setLinksBlockVisible(visible)
  }

  const handleUrlChange = (linkNumber, url) => {
    // Update the URL for the corresponding link
    setLinkSections(prevSections => {
      const updatedSections = [...prevSections]
      const index = linkNumber - 1
      updatedSections[index] = {
        ...updatedSections[index],
        url,
      }
      return updatedSections
    })
  }

  const getColorForPlatform = platform => {
    // You can define your color mappings here based on the platform
    const colorMappings = {
      GitHub: '#000000',
      YouTube: '#FF0000',
      LinkedIn: '#0077B5',
      // ... (other platforms and colors)
    }

    return colorMappings[platform] || '' // Return the color or an empty string if not found
  }

  const isReadyToPublish = () => {
    // Check if all link sections have both platform and URL filled
    return linkSections.every(
      section => section.selectedPlatform && section.url
    )
  }

  const handlePlatformSelect = (linkNumber, platform) => {
    // Add the selected platform to the corresponding link
    setLinkSections(prevSections => {
      const updatedSections = [...prevSections]
      const index = linkNumber - 1 // Adjust index to start from 0
      updatedSections[index] = {
        ...updatedSections[index],
        selectedPlatform: platform,
      }
      return updatedSections
    })

    // Make the link section visible after selecting a platform
    setLinkSectionVisible(true)
  }

  const handleAddLinkClick = () => {
    // Limit the number of links to 3
    if (linkSections.length < 3) {
      setLinkSections(prevSections => [
        ...prevSections,
        {
          // Add any initial data you want for each link section
        },
      ])
      // Make the link section visible after adding a link
      setLinkSectionVisible(true)
    }
  }

  const handleRemoveLink = linkIndexToRemove => {
    setLinkSections(prevSections =>
      prevSections.filter((section, index) => index !== linkIndexToRemove)
    )
    setLinkSectionVisible(prevVisible => {
      return linkSections.length - 1 === 0 ? false : prevVisible
    })
  }

  const handleDevlinkLogoClick = () => {
    // Navigate to the home directory or any desired route
    window.location.reload()
  }

  const handleSave = async () => {
    if (isReadyToPublish()) {
      const token = localStorage.getItem('token')

      if (!token) {
        // If token is not present, handle the case (e.g., redirect to login)
        console.log('User not authenticated. Redirecting to login.')
        // You can add logic here to redirect to the login page or handle authentication
        return
      }

      try {
        // Make a POST request to your API endpoint with the authorization header
        const response = await axios.post(
          'http://localhost:3001/api/links',
          linkSections,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        // Handle the API response as needed
        console.log('API Response:', response.data)
      } catch (error) {
        // Handle API errors
        console.error('API Error:', error.message)
      }
    } else {
      // Display a message or handle incomplete form case
      console.log('Form is incomplete. Cannot save.')
    }
  }
  return (
    <>
      <img src={images.outer}></img>
      <div className="navbar-outer ">
        <div className="outer">
          <div className="navbar">
            <button
              className="devlink-logo-btn"
              onClick={handleDevlinkLogoClick}>
              <img className="devlink-logo" src={images.devlinkLogo}></img>
            </button>
            <div className="link-profile">
              <button
                className="link-box"
                onClick={() => toggleLinksBlockVisibility(true)}>
                <img className="link-icon" src={images.selectedLinkIcon}></img>
                <span className="link-font"> Links </span>
              </button>
              <button
                className="profile-box"
                onClick={() => toggleLinksBlockVisibility(false)}>
                <img
                  className="profile-icon"
                  src={images.profileDetailIcon}></img>
                <span className="profile-font"> Profile Details </span>
              </button>
            </div>

            <button className="preview-box">
              <span className="preview-font">Preview</span>
            </button>
          </div>
        </div>
      </div>
      <div className="phonecase-links">
        <div className="phonecase-block">
          <div className="preview-section">
            <span className="outer-case"></span>
            <span className="inner-case"></span>
            <div className="ui-case">
              <div className="header-case">
                <img className="ellipse-icon" src={images.ellipse}></img>
                <div className="bottom-header">
                  <span className="header-rect-1"></span>
                  <span className="header-rect-2"></span>
                </div>
              </div>
              <div className="bottom-case">
                <div className="bottom-case">
                  {linkSections.map((linkSection, index) => (
                    <button
                      key={index}
                      className={`rectangle-link rectangle-show-${index + 1} ${
                        linkSection.selectedPlatform
                          ? linkSection.selectedPlatform
                              .toLowerCase()
                              .replace(/\s+/g, '-')
                          : ''
                      }`}
                      style={{
                        backgroundColor: getColorForPlatform(
                          linkSection.selectedPlatform
                        ),
                      }}>
                      {linkSection.selectedPlatform}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="links-block"
          style={{ display: isLinksBlockVisible ? 'block' : 'none' }}>
          <div className="links-area">
            <div className="links-top">
              <span className="links-font-header"> Customize your links</span>
              <span className="links-font">
                Add/edit/remove links below and then share all your profiles
                with the world!
              </span>

              <div className="links-bottom">
                <button className="add-link" onClick={handleAddLinkClick}>
                  + Add new link
                </button>
                {isLinkSectionVisible ? (
                  linkSections.map((linkSection, index) => (
                    <LinkAddition
                      key={index}
                      linkNumber={index + 1}
                      onClickRemove={() => handleRemoveLink(index)}
                      onPlatformSelect={handlePlatformSelect}
                      onUrlChange={handleUrlChange}
                    />
                  ))
                ) : (
                  <div className="illustration-area">
                    <div className="illustration-area-text">
                      <img src={images.illustrationEmpty}></img>
                      <div className="illustration-text">
                        <span className="top-text"> Let's get you started</span>
                        <span className="bottom-text">
                          Use the “Add new link” button to get started. Once you
                          have more than one link, you can reorder and edit
                          them. We’re here to help you share your profiles with
                          everyone!
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="link-save">
            <span className="rectangle-dropdown-2"></span>
            <div className="link-rectangle-format">
              <div
                className="link-button-style"
                style={{
                  backgroundColor: isReadyToPublish()
                    ? 'var(--Purple, #633cff)'
                    : 'transparent',
                }}>
                <button className="link-save-publish" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        {isLinksBlockVisible === false && (
          <div className="profile-area">
            <div className="profile-block">
              <div className="profile-header">
                <span className="profile-header-font">Profile Details</span>
                <span className="profile-subheader-font">
                  Add your details to create a personal touch to your profile
                </span>
              </div>
              <div className="profile-upload-form">
                <div className="profile-upload-area">
                  <div className="profile-upload">
                    <span className="profile-upload-font">Profile picture</span>
                    <div className="profile-image-area">
                      <button className="profile-uploadimage">
                        <div className="profile-image">
                          <img
                            className="profile-default"
                            src={images.image}></img>
                          <span className="profile-default-font">
                            + Upload Image
                          </span>
                        </div>
                      </button>
                      <span className="profile-image-validation">
                        Image must be below 1024x1024px. Use PNG or JPG format.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-input-form">
                <div className="profile-first-name">
                  <span className="profile-firstname">First name*</span>
                  <input
                    className="profile-first-name-input"
                    placeholder="e.g. John"></input>
                </div>
                <div className="profile-last-name">
                  <span className="profile-lastname">Last name*</span>
                  <input
                    className="profile-last-name-input"
                    placeholder="e.g. Appleseed"></input>
                </div>
                <div className="profile-email">
                  <span className="profile-emails">Email</span>
                  <input
                    className="profile-email-input"
                    placeholder="e.g. email@example.com"></input>
                </div>
              </div>
            </div>
            <div className="profile-save">
              <span className="rectangle-dropdown-2"></span>
              <div className="profile-save-area">
                <button className="profile-save-btn">
                  <span className="profile-save-font"> Save </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Home
