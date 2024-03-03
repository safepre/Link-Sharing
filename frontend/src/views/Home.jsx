/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react'
import LinkAddition from '../components/LinkAddition'
import { Link, useNavigate } from 'react-router-dom'

import linkIcon from '../assets/images/icon-link.svg'
import selectedLinkIcon from '../assets/images/ph-link-bold.svg'
import devlinkLogo from '../assets/images/logo-devlinks-large.svg'
import profileDetailIcon from '../assets/images/icon-profile-details-header.svg'
import selectedProfileDetailIcon from '../assets/images/ph-user-circle-bold.svg'
import illustrationEmpty from '../assets/images/illustration-empty.svg'
import phoneMockup from '../assets/images/illustration-phone-mockup.svg'
import image from '../assets/images/ph-image.svg'
import ellipse from '../assets/images/ellipse-3.svg'
import defaultPic from '../assets/images/default.jpg'
import axios from 'axios'
import githubIcon from '../assets/images/white-github.svg'
import youtubeIcon from '../assets/images/white-youtube.svg'
import twitchIcon from '../assets/images/white-twitch.svg'
import stackoverflowIcon from '../assets/images/white-stackoverflow.svg'
import linkedinIcon from '../assets/images/white-linkedin.svg'
import gitlabIcon from '../assets/images/white-gitlab.svg'
import devtoIcon from '../assets/images/white-devto.svg'
import freecodecampIcon from '../assets/images/white-freecodecamp.svg'
import frontendmentorIcon from '../assets/images/white-frontendmaster.svg'
import hashnodeIcon from '../assets/images/white-hashnode.svg'
import codepenIcon from '../assets/images/white-codepen.svg'
import codewarsIcon from '../assets/images/white-codewars.svg'
import khanacademyIcon from '../assets/images/White-KhanAcademy.svg'
import leetcodeIcon from '../assets/images/White-LeetCode.svg'
import xIcon from '../assets/images/White-X.svg'
import replitIcon from '../assets/images/White-Replit.svg'
import facebookIcon from '../assets/images/white-facebook.svg'
import { useAuth } from '../services/authContext'

const Home = () => {
  const navigate = useNavigate()
  const [linkSections, setLinkSections] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [platforms, setPlatforms] = useState([])
  const [activeButton, setActiveButton] = useState('profile')
  const [isLinkSectionVisible, setLinkSectionVisible] = useState(true)
  const [isLinksBlockVisible, setLinksBlockVisible] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [isProfileSaveVisible, setProfileSaveVisible] = useState(false)
  const fileInputRef = useRef(null)
  const [profilePictureUrl, setProfilePictureUrl] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [links, setLinks] = useState([]) // Initialize links state as an empty array

  const [isUploading, setIsUploading] = useState(false)

  const { isLoggedIn, logout, token, user } = useAuth()

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
    defaultPic,
  }

  const icons = {
    githubIcon,
    linkIcon,
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

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Make an API request to fetch user profile data using the user's token
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_API}/profiles`
        )
        const userProfile = response.data.find(
          profile => profile.user.email_address === user
        )
        if (response.status === 200 || response.status === 201) {
          const { first_name, last_name, email } = userProfile
          // Set the fetched profile data to the state
          setFirstName(first_name)
          setLastName(last_name)
          setEmail(email)

          if (userProfile.image) {
            setProfilePictureUrl(userProfile.image.image_data)
          }
          const userLinks = userProfile.links || []

          // ... (rest of the code for setting links, firstName, lastName, etc.)

          const platforms = userLinks.map(link => link.platform)

          // Set the platforms in state
          setPlatforms(platforms)

          setLinks(userLinks)

          // Automatically open links section and populate it
          const linkSectionsData = userLinks.map((link, index) => {
            const selectedPlatform = link.platform

            const mappedLink = {
              url: link.url,
              platform: selectedPlatform,
              date: link.date,
              isLastLink: index === userLinks.length - 1,
            }

            return mappedLink
          })

          setLinkSections(linkSectionsData)
        } else {
          console.error('Failed to fetch profile data')
        }
      } catch (error) {
        console.error('Error fetching profile data', error)
      }
    }

    if (isLoggedIn) {
      fetchProfileData() // Fetch profile data only if the user is logged in
    }
  }, [isLoggedIn, token])

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
    navigate('/login')
  }
  const toggleLinksBlockVisibility = (visible, buttonName) => {
    setLinksBlockVisible(visible)
    setActiveButton(buttonName)
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
    const colorMappings = {
      GitHub: '#000000',
      YouTube: '#FF0000',
      LinkedIn: '#0077B5',
      LeetCode: '#FFBF00',
      Facebook: '#2D68FF',
      Twitch: '#6441a5',
      Devto: '#333333',
      Replit: '#EB4925',
      X: '#666666',
      freeCodeCamp: '#302267',
      KhanAcademy: '#AFE1AF',
      StackOverflow: '#EC7100',
      FrontendMentor: '#D7D7D7',
      Hashnode: '#0330D1',
      Codewars: '#8A1A50',
      CodePen: '#222222',
      GitLab: '#EB4925',
    }

    const color = colorMappings[platform] || ''

    return color
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
  const checkProfileSaveVisibility = () => {
    setProfileSaveVisible(prevVisibility => {
      const newVisibility =
        firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== ''
      console.log('Checking profile save visibility:', newVisibility)
      return newVisibility
    })
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
              preview_link: 'l1nk',
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
              preview_link: 'l1nk',
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
            preview_link: 'l1nk',
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

      console.log('isProfileSaveVisible before:', isProfileSaveVisible)

      // Explicitly check and update the profile save visibility
      checkProfileSaveVisibility()

      console.log('isProfileSaveVisible after:', isProfileSaveVisible)
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

  // eslint-disable-next-line no-unused-vars
  const handleSaveLink = (linkNumber, url) => {
    setLinkSections(prevSections => {
      const updatedSections = [...prevSections]
      updatedSections[linkNumber - 1].isSaved = true
      return updatedSections
    })
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

        // Construct the payload for each link
        const savePromises = linkSections.map(async (linkSection, index) => {
          await handleSaveLink(index + 1, linkSection.url)

          // Check if the link is filled
          if (linkSection.selectedPlatform && linkSection.url) {
            // Check if there is an existing link with the same platform and URL
            const existingLink = userLinks.find(
              link =>
                link.platform === linkSection.selectedPlatform &&
                link.url === linkSection.url
            )

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
  links.forEach(link => {
    console.log(link.platform)
  })

  return (
    <>
      {isLoggedIn && (
        <div className="whole-page">
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
                    className={`link-box ${
                      activeButton === 'links' ? 'active' : ''
                    }`}
                    onClick={() => toggleLinksBlockVisibility(true, 'links')}>
                    <img
                      className={`link-icon ${
                        activeButton === 'links' ? 'active' : ''
                      }`}
                      src={images.selectedLinkIcon}
                      alt="Link Icon"></img>
                    <span
                      className={`link-font ${
                        activeButton === 'links' ? 'active' : ''
                      }`}>
                      Links
                    </span>
                  </button>

                  <button
                    className={`profile-box ${
                      activeButton === 'profile' ? 'active' : ''
                    }`}
                    onClick={() =>
                      toggleLinksBlockVisibility(false, 'profile')
                    }>
                    <img
                      className={`profile-icon ${
                        activeButton === 'profile' ? 'active' : ''
                      }`}
                      src={images.profileDetailIcon}
                      alt="Profile Icon"></img>
                    <span
                      className={`profile-font ${
                        activeButton === 'profile' ? 'active' : ''
                      }`}>
                      Profile Details
                    </span>
                  </button>
                </div>
                {isLoggedIn && (
                  <Link to="/preview">
                    <div className="preview-box">
                      <span className="preview-font">Preview</span>
                    </div>
                  </Link>
                )}
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
                          <img src={images.defaultPic}></img>
                        </div>
                      )}
                    </div>
                    <div className="bottom-header">
                      {!firstName && <span className="header-rect-1"></span>}
                      <span className="first-name-render">
                        {' '}
                        {firstName} {lastName}
                      </span>

                      {!email && <span className="header-rect-2"></span>}
                      <span className="email-render"> {email} </span>
                    </div>
                  </div>
                  <div className="bottom-case">
                    {linkSections.map((linkSection, index) => (
                      <button
                        key={index}
                        className={`rectangle-link rectangle-show-${
                          index + 1
                        } ${
                          linkSection.selectedPlatform
                            ? linkSection.selectedPlatform
                                .toLowerCase()
                                .replace(/\s+/g, '-')
                            : ''
                        }`}
                        style={{
                          backgroundColor:
                            getColorForPlatform(linkSection.selectedPlatform) ||
                            (platforms[index] &&
                              getColorForPlatform(platforms[index])),
                        }}>
                        {linkSection.selectedPlatform ? (
                          <>
                            <img
                              className={`${linkSection.selectedPlatform.toLowerCase()}-white`}
                              src={
                                icons[
                                  `${linkSection.selectedPlatform.toLowerCase()}Icon`
                                ]
                              }
                              alt={`${linkSection.selectedPlatform} Icon`}
                            />
                            <span
                              className={`${linkSection.selectedPlatform.toLowerCase()}-font`}>
                              {linkSection.selectedPlatform}
                            </span>
                          </>
                        ) : (
                          platforms[index] && (
                            <>
                              <img
                                className={`${platforms[
                                  index
                                ].toLowerCase()}-white`}
                                src={
                                  icons[`${platforms[index].toLowerCase()}Icon`]
                                }
                                alt={`${platforms[index]} Icon`}
                              />
                              <span
                                className={`${platforms[
                                  index
                                ].toLowerCase()}-font`}>
                                {platforms[index]}
                              </span>
                            </>
                          )
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="links-block"
              style={{ display: isLinksBlockVisible ? 'flex' : 'none' }}>
              <div className="links-area">
                <div className="links-top">
                  <span className="links-font-header">
                    {' '}
                    Customize your links
                  </span>
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
                          handleSaveLink={handleSaveLink} // Pass handleSaveLink as a prop
                          selectedPlatformProp={linkSection.platform} // Pass selectedPlatform as a prop
                          urlProp={linkSection.url} // Pass url as a prop
                        />
                      ))
                    ) : (
                      <div className="illustration-area">
                        <div className="illustration-area-text">
                          <img src={images.illustrationEmpty}></img>
                          <div className="illustration-text">
                            <span className="top-text">
                              {' '}
                              Let's get you started
                            </span>
                            <span className="bottom-text">
                              Use the “Add new link” button to get started. Once
                              you have more than one link, you can reorder and
                              edit them. We’re here to help you share your
                              profiles with everyone!
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
                      Add your details to create a personal touch to your
                      profile
                    </span>
                  </div>
                  <div className="profile-upload-form">
                    <div className="profile-upload-area">
                      <div className="profile-upload">
                        <span className="profile-upload-font">
                          Profile picture
                        </span>
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
                            Image must be below 1024x1024px. Use PNG or JPG
                            format.
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
                    {isProfileSaveVisible && (
                      <button
                        className="profile-save-btn"
                        onClick={handleProfileSave}>
                        <span className="profile-save-font"> Save </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Home
