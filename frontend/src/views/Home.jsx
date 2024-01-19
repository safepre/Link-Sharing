/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react'
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
import { useAuth } from '../services/authContext'

const Home = () => {
  const [linkSections, setLinkSections] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)

  const [isLinkSectionVisible, setLinkSectionVisible] = useState(false)
  const [isLinksBlockVisible, setLinksBlockVisible] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [isProfileSaveVisible, setProfileSaveVisible] = useState(false)
  const fileInputRef = useRef(null)
  const [profilePictureUrl, setProfilePictureUrl] = useState(null)

  const [isUploading, setIsUploading] = useState(false)

  const { isLoggedIn, logout, token, user } = useAuth()
  const [userLinks, setUserLinks] = useState([])

  useEffect(() => {
    const fetchUserLinks = async () => {
      try {
        const userLinksResponse = await axios.get(
          `${import.meta.env.VITE_BASE_API}/links`
        )
        setUserLinks(userLinksResponse.data)
      } catch (error) {
        console.error('Error fetching user links:', error.message)
      }
    }

    fetchUserLinks()
  }, [])

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

  // Add this useEffect hook at the end of your component
  useEffect(() => {
    setLinkSectionVisible(linkSections.length > 0)

    // Reorder linkSections based on their original order
    const reorderedSections = linkSections.map((section, index) => ({
      ...section,
      order: index + 1,
    }))

    setLinkSections(reorderedSections)
  }, [linkSections.length]) // Only trigger the effect when the length of linkSections changes

  // Function to handle the logout button click
  const handleLogout = () => {
    // Call the logout function from the context
    logout()
  }
  const toggleLinksBlockVisibility = visible => {
    setLinksBlockVisible(visible)
  }

  const handleFileChange = event => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const handleImageUpload = async () => {
    if (isUploading) {
      console.log('Upload already in progress.')
      return
    }

    try {
      setIsUploading(true)

      const userProfileResponse = await axios.get(
        `${import.meta.env.VITE_BASE_API}/profiles`
      )

      const userProfile = userProfileResponse.data.find(
        profile => profile.user.email_address === user
      )

      if (!selectedFile) {
        console.log('No file selected for upload.')
        return
      }

      const formData = new FormData()
      formData.append('image', selectedFile)

      if (userProfile) {
        // User profile exists
        if (userProfile.image === null) {
          // User profile has no image, create a new one using POST request
          const uploadResponse = await axios.post(
            `${import.meta.env.VITE_BASE_API}/images/upload/${userProfile.id}`,
            formData,
            {
              headers: {
                Authorization: `bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          )
          setProfilePictureUrl(uploadResponse.data.image_data)
        } else {
          // User profile already has an image, update it using PUT request
          const uploadResponse = await axios.put(
            `${import.meta.env.VITE_BASE_API}/images/upload/${userProfile.id}`,
            formData,
            {
              headers: {
                Authorization: `bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          )

          console.log('Image Updated:', uploadResponse.data)

          setProfilePictureUrl(uploadResponse.data.image_data)
        }
      } else {
        // User profile doesn't exist, create a new one using POST request
        const uploadResponse = await axios.post(
          `${import.meta.env.VITE_BASE_API}/images/upload`,
          formData,
          {
            headers: {
              Authorization: `bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )

        setProfilePictureUrl(uploadResponse.data.image_data)
      }
    } catch (error) {
      // Handle API errors
      console.error('Image Upload Error:', error.message)
    } finally {
      setIsUploading(false)
    }
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
  const handleProfileSave = async () => {
    await handleImageUpload()

    if (!isLoggedIn) {
      console.log('User not authenticated. Redirecting to login.')
      // Redirect to the login page or handle authentication as needed
      return
    }

    try {
      // Check if the user's profile exists
      const userProfileResponse = await axios.get(
        `${import.meta.env.VITE_BASE_API}/profiles`
      )

      const userProfile = userProfileResponse.data.find(
        profile => profile.user.email_address === user
      )
      if (userProfile) {
        // User has a profile
        if (userProfile.profile === null) {
          // User has a null profile, create a new one using POST request
          const createResponse = await axios.post(
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

          console.log('Profile Created:', createResponse.data)
        } else {
          // User has a non-null profile, update it using PUT request
          const response = await axios.put(
            `${import.meta.env.VITE_BASE_API}/profiles/${userProfile.id}`,
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
        }
      } else {
        // User has no profile, create a new one using POST request
        const createResponse = await axios.post(
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

        console.log('Profile Created:', createResponse.data)
      }
    } catch (error) {
      // Handle API errors
      console.error('API Error:', error.message)
    }
  }

  const handleAddLinkClick = () => {
    // Limit the number of links to 3
    if (linkSections.length < 3) {
      // Ensure that the "Remove" button is visible only on the last link
      const isLastLink = linkSections.length === 2 // Set isLastLink to true only when there are existing links
      setLinkSections(prevSections => [
        ...prevSections,
        {
          url: '',
          selectedPlatform: '', // Initialize with an empty platform
          isLastLink, // Pass isLastLink to the new link
        },
      ])

      // Make the link section visible after adding a link
      setLinkSectionVisible(true)
    }
  }

  // Inside handleRemoveLink function
  const handleRemoveLink = linkIndexToRemove => {
    setLinkSections(prevSections => {
      const updatedSections = prevSections.filter(
        (section, index) => index !== linkIndexToRemove
      )

      // Update the order when removing a link
      updatedSections.forEach((section, index) => {
        section.order = index + 1
      })

      return updatedSections
    })
  }

  // Add this useEffect hook at the end of your component
  useEffect(() => {
    setLinkSectionVisible(linkSections.length > 0)
  }, [linkSections])

  const handleDevlinkLogoClick = () => {
    // Navigate to the home directory or any desired route
    window.location.reload()
  }

  const handleSave = async () => {
    if (isReadyToPublish()) {
      if (!token) {
        console.log('User not authenticated. Redirecting to login.')
        return
      }

      try {
        // Fetch user links
        const userLinksResponse = await axios.get(
          `${import.meta.env.VITE_BASE_API}/links`
        )
        const userLinks = userLinksResponse.data.filter(
          link => link.user.email_address === user.email_address
        )
        console.log('Selected Platform:', linkSections.selectedPlatform)
        console.log('URL:', linkSections.url)
        console.log('User Links:', userLinks)

        // Construct the payload for each link
        const savePromises = linkSections.map(async linkSection => {
          // Check if the link is filled
          if (linkSection.selectedPlatform && linkSection.url) {
            // Check if there is an existing link with the same platform and URL
            const existingLink = userLinks.find(
              link =>
                link.platform === linkSections.selectedPlatform &&
                link.url === linkSections.url
            )
            console.log('exisiting link' + existingLink)
            if (existingLink) {
              // Existing link found, perform a PUT request to update it
              console.log('Updating Existing Link...')
              const response = await axios.put(
                `${import.meta.env.VITE_BASE_API}/links/${existingLink.id}`,
                {
                  url: linkSection.url,
                  platform: linkSection.selectedPlatform,
                  userId: user.id,
                },
                {
                  headers: {
                    Authorization: `bearer ${token}`,
                  },
                }
              )

              console.log('Link Updated:', response.data)
              return response
            } else {
              // No existing link found, perform a POST request to create a new link
              console.log('Creating New Link...')
              const response = await axios.post(
                `${import.meta.env.VITE_BASE_API}/links`,
                {
                  url: linkSection.url,
                  platform: linkSection.selectedPlatform,
                  userId: user.id,
                },
                {
                  headers: {
                    Authorization: `bearer ${token}`,
                  },
                }
              )

              console.log('Link Created:', response.data)
              return response
            }
          }

          // If link is not filled, return null
          return null
        })

        // Filter out fulfilled promises and handle responses
        const results = await Promise.allSettled(savePromises)

        const fulfilledPromises = results
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value)

        console.log('All links saved successfully!', {
          updateResponses: fulfilledPromises.filter(response => response.data),
          createResponses: fulfilledPromises.filter(response => !response.data),
        })
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
      {isLoggedIn && (
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      )}
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
                <div className="ellipse-icon">
                  {profilePictureUrl ? (
                    <img
                      src={`data:image/png;base64,${profilePictureUrl}`}
                      alt="Profile"
                    />
                  ) : (
                    <div className="default-profile-image">
                      {/* Your default profile image here */}
                    </div>
                  )}
                </div>
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
                      linkSections={linkSections} // Pass linkSections as a prop
                      setLinkSections={setLinkSections} // Pass setLinkSections as a prop
                      isLastLink={linkSection.isLastLink} // Pass isLastLink prop
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
                      <button
                        className="profile-uploadimage"
                        onClick={() => fileInputRef.current.click()}>
                        <div className="profile-image">
                          <img
                            className="profile-default"
                            src={images.image}
                            alt="Upload Image"
                          />
                          <span className="profile-default-font">
                            + Upload Image
                          </span>
                        </div>
                      </button>
                      <input
                        type="file"
                        accept=".jpeg, .jpg, .png"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />
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
