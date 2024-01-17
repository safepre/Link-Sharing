/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import LinkAddition from '../components/LinkAddition'
import linkIcon from '../assets/images/icon-link.svg'
import selectedLinkIcon from '../assets/images/ph-link-bold.svg'
import devlinkLogo from '../assets/images/logo-devlinks-large.svg'
import profileDetailIcon from '../assets/images/icon-profile-details-header.svg'
import selectedProfileDetailIcon from '../assets/images/ph-user-circle-bold.svg'
import illustrationEmpty from '../assets/images/illustration-empty.svg'
import phoneMockup from '../assets/images/illustration-phone-mockup.svg'
import image from '../assets/images/ph-image.svg'
import ellipse from '../assets/images/ellipse-3.svg'
import axios from 'axios'

const Home = () => {
  const [linkSections, setLinkSections] = useState([])
  const [isLinkSectionVisible, setLinkSectionVisible] = useState(false)
  const [isLinksBlockVisible, setLinksBlockVisible] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [isProfileSaveVisible, setProfileSaveVisible] = useState(false)

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

  // Function to handle changes in the first name input
  const handleFirstNameChange = event => {
    setFirstName(event.target.value)
    checkProfileSaveVisibility()
  }

  // Function to handle changes in the last name input
  const handleLastNameChange = event => {
    setLastName(event.target.value)
    checkProfileSaveVisibility()
  }

  // Function to handle changes in the email input
  const handleEmailChange = event => {
    setEmail(event.target.value)
    checkProfileSaveVisibility()
  }

  // Function to check whether to show the profile save button
  const checkProfileSaveVisibility = () => {
    setProfileSaveVisible(
      firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== ''
    )
  }
  // Function to handle the save button click
  const handleProfileSave = async () => {
    if (isProfileSaveVisible) {
      const token = localStorage.getItem('token')

      if (!token) {
        console.log('User not authenticated. Redirecting to login.')
        // Redirect to the login page or handle authentication as needed
        return
      }

      try {
        // Check if a profile with the given first name and last name already exists
        const existingProfile = await axios.get(
          `${import.meta.env.VITE_BASE_API}/profiles`,
          {
            params: {
              first_name: firstName,
              last_name: lastName,
            },
          }
        )

        if (existingProfile.data.length > 0) {
          // Profile already exists, update it using PUT request
          const response = await axios.put(
            `${import.meta.env.VITE_BASE_API}/profiles/${
              existingProfile.data[0].id
            }`,
            {
              first_name: firstName,
              last_name: lastName,
              email: email,
            },
            {
              headers: {
                Authorization: `bearer ${token}`,
              },
            }
          )

          console.log('Profile Updated:', response.data)
        } else {
          // Profile doesn't exist, create a new one using POST request
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_API}/profiles`,
            {
              first_name: firstName,
              last_name: lastName,
              email: email,
            },
            {
              headers: {
                Authorization: `bearer ${token}`,
              },
            }
          )

          console.log('Profile Created:', response.data)
        }
      } catch (error) {
        // Handle API errors
        console.error('API Error:', error.message)
      }
    } else {
      console.log('Form is incomplete. Cannot save.')
    }
  }

  const handleAddLinkClick = () => {
    // Limit the number of links to 3
    if (linkSections.length < 3) {
      setLinkSections(prevSections => [
        ...prevSections,
        {
          url: '',
          selectedPlatform: '', // Initialize with an empty platform
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
        // Construct the payload from linkSections
        const payload = {
          url: linkSections[0].url, // Assuming you're working with the first link, adjust as needed
          platform: linkSections[0].selectedPlatform,
        }

        console.log('Payload:', payload)

        // Make a POST request to your API endpoint with the authorization header
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_API}/links`,
          payload,
          {
            headers: {
              Authorization: `bearer ${token}`,
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
                  <span className="header-rect-1">
                    {firstName}
                    {lastName}
                  </span>
                  <span className="header-rect-2">{email}</span>
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
                    placeholder="e.g. John"
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                </div>
                <div className="profile-last-name">
                  <span className="profile-lastname">Last name*</span>
                  <input
                    className="profile-last-name-input"
                    placeholder="e.g. Appleseed"
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                </div>
                <div className="profile-email">
                  <span className="profile-emails">Email</span>
                  <input
                    className="profile-email-input"
                    placeholder="e.g. email@example.com"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
            </div>
            <div className="profile-save">
              <span className="rectangle-dropdown-2"></span>
              <div className="profile-save-area">
                <button
                  className="profile-save-btn"
                  onClick={handleProfileSave}
                  style={{
                    display: isProfileSaveVisible ? 'block' : 'none',
                  }}>
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
