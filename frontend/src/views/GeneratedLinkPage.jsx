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

    fetchProfileData() // Fetch profile data ßnly if the user is logged in
  }, [generatedParam, prevLink])

  const renderSocialLinks = () => {
    return links.map((link, index) => {
      let platformIcon
      let platformColor
      switch (link.platform) {
        case 'GitHub':
          platformIcon = githubIcon
          platformColor = 'bg-GitHub'
          break
        case 'YouTube':
          platformIcon = youtubeIcon
          platformColor = 'bg-red-700'
          break
        case 'LinkedIn':
          platformIcon = linkedinIcon
          platformColor = 'bg-LinkedIn'
          break
        case 'LeetCode':
          platformIcon = leetcodeIcon
          platformColor = 'bg-LeetCode'
          break
        case 'Facebook':
          platformIcon = facebookIcon
          platformColor = 'bg-Facebook-400'
          break
        case 'GitLab':
          platformIcon = gitlabIcon
          platformColor = 'bg-GitLab-400'
          break
        case 'StackOverflow':
          platformIcon = stackoverflowIcon
          platformColor = 'bg-StackOverflow-400'
          break
        case 'Twitch':
          platformIcon = twitchIcon
          platformColor = 'bg-Twitch-400'
          break
        case 'Devto':
          platformIcon = devtoIcon
          platformColor = 'bg-Devto-400'
          break
        case 'Replit':
          platformIcon = replitIcon
          platformColor = 'bg-Replit-400'
          break
        case 'X':
          platformIcon = xIcon
          platformColor = 'bg-X-400'
          break
        case 'freeCodeCamp':
          platformIcon = freecodecampIcon
          platformColor = 'bg-freeCodeCamp-400'
          break
        case 'KhanAcademy':
          platformIcon = khanacademyIcon
          platformColor = 'bg-KhanAcademy-400'
          break
        case 'FrontendMentor':
          platformIcon = frontendmentorIcon
          platformColor = 'bg-FrontendMentor-400'
          break
        case 'Hashnode':
          platformIcon = frontendmentorIcon
          platformColor = 'bg-Hashnode-400'
          break
        case 'Codewars':
          platformIcon = codewarsIcon
          platformColor = 'bg-Codewars-400'
          break
        case 'CodePen':
          platformIcon = codepenIcon
          platformColor = 'bg-CodePen-400'
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
              <img
                className="max-w-full max-h-full w-44 h-40 rounded-[6.5rem]"
                src={defaultPic}
                alt="Default"
              />
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
