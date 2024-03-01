/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
import twitchIcon from '../assets/images/icon-twitch.svg'
import stackoverflowIcon from '../assets/images/icon-stack-overflow.svg'
import linkedinIcon from '../assets/images/white-linkedin.svg'
import gitlabIcon from '../assets/images/icon-gitlab.svg'
import devtoIcon from '../assets/images/icon-devto.svg'
import freecodecampIcon from '../assets/images/icon-freecodecamp.svg'
import frontendmentorIcon from '../assets/images/icon-frontend-mentor.svg'
import hashnodeIcon from '../assets/images/icon-hashnode.svg'
import codepenIcon from '../assets/images/icon-codepen.svg'
import codewarsIcon from '../assets/images/icon-codewars.svg'
import khanacademyIcon from '../assets/images/khan-academy-icon-svgrepo-com.svg'
import leetcodeIcon from '../assets/images/White-LeetCode.svg'
import xIcon from '../assets/images/X_logo_2023_original.svg'
import replitIcon from '../assets/images/New_Replit_Logo.svg'
import facebookIcon from '../assets/images/icon-facebook.svg'
import arrowIcon from '../assets/images/arrow.svg'
import { useAuth } from '../services/authContext'

const GeneratedLinkPage = () => {
  const [linkSections, setLinkSections] = useState([])
  const [profilePictureUrl, setProfilePictureUrl] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [prevLink, setPrevLink] = useState('')
  const [platforms, setPlatforms] = useState([])
  const [links, setLinks] = useState([]) // Initialize links state as an empty array
  let { generatedParam } = useParams()

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setPrevLink(generatedParam)
        // Make an API request to fetch user profile data using the user's token
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_API}/profiles`
        )
        const userProfile = response.data.find(
          profile => profile.preview_link === prevLink
        )
        console.log(userProfile)
        if (response.status === 200 || response.status === 201) {
          const { first_name, last_name, email } = userProfile
          // Set the fetched profile data to the state
          setFirstName(first_name)
          setLastName(last_name)
          setEmail(email)

          setProfilePictureUrl(userProfile.image.image_data)
          // Set links data

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

    fetchProfileData() // Fetch profile data ßnly if the user is logged in
  }, [prevLink])

  const renderSocialLinks = () => {
    return links.map((link, index) => {
      let platformIcon
      let platformColor
      switch (link.platform) {
        case 'GitHub':
          platformIcon = githubIcon
          platformColor = 'bg-black'
          break
        case 'YouTube':
          platformIcon = youtubeIcon
          platformColor = 'bg-red-700'
          break
        case 'LinkedIn':
          platformIcon = linkedinIcon
          platformColor = 'bg-blue-700'
          break
        case 'LeetCode':
          platformIcon = leetcodeIcon
          platformColor = 'bg-yellow-400'
          break
        // Add cases for other platforms here
        default:
          platformIcon = '' // Provide a default icon if needed
          platformColor = '' // Provide a default color if needed
          break
      }

      return (
        <a
          key={index}
          href={link.url}
          className={`${platformColor} text-white items-center flex gap-2 w-full p-4 rounded-lg`}>
          <img src={platformIcon} alt={`${link.platform} icon`} />
          <span className="capitalize">{link.platform}</span>
          <img src={arrowIcon} alt="forward arrow" className="ml-auto" />
        </a>
      )
    })
  }
  return (
    <section className='flex flex-col gap-20 relative md:after:content-[""] md:after:absolute md:after:h-2/5 md:after:w-full md:after:bg-accent z-20 md:after:-z-10 bg-[#FAFAFA] md:after:rounded-b-[2rem] min-h-screen'>
      <div className="flex flex-col items-center justify-center py-3 w-5/6 mx-auto gap-16 bg-white -mt-10 md:shadow-ml md:rounded-lg md:p-12 md:w-2/4 lg:w-1/4 md:mt-[5rem] min-h-[20rem]">
        <div className="flex flex-col gap-2 items-center">
          {/* user's image */}
          <div
            id="user-avatar"
            className="w-44 h-40 border-4 border-accent rounded-[6.5rem]">
            {profilePictureUrl ? (
              <img
                className="max-w-full max-h-full w-44 h-40 rounded-[6.5rem]"
                src={`data:image/png;base64,${profilePictureUrl}`}
                alt="Profile"
              />
            ) : (
              <div className="default-profile-image">
                <img className="" src={defaultPic}></img>
              </div>
            )}
          </div>
          {/* user's name */}
          <h2 className="capitalize text-dark-gray font-bold text-[2rem]">
            {firstName} {lastName}
          </h2>
          {/* user's email */}
          <p className="text-dark-grey">{email}</p>
        </div>

        {/* social links */}
        <div className="flex flex-col gap-3 w-full">{renderSocialLinks()}</div>
      </div>
    </section>
  )
}

export default GeneratedLinkPage
