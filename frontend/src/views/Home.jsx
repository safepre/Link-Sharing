import React from "react";
import linkIcon from "../assets/images/icon-link.svg";
import devlinkLogo from "../assets/images/logo-devlinks-large.svg";
import profileDetailIcon from "../assets/images/icon-profile-details-header.svg";
import illustrationEmpty from '../assets/images/illustration-empty.svg';
import phoneMockup from '../assets/images/illustration-phone-mockup.svg'
import '../assets/css/home.css'

const Home = () => {
  const images = {
    linkIcon,
    devlinkLogo,
    profileDetailIcon,
    illustrationEmpty,
    phoneMockup
  };
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <div className="home-parent">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar__left">
          <div className="logo">
            <img src={images.devlinkLogo} alt="devlink logo" />
          </div>
        </div>

        <div className="navbar__center flex gap-4">
          <div className="links link-active">
            <img
              src={images.linkIcon}
              alt="link icon"
              className="links__icon"
            />
            <span className="links__text">Links</span>
          </div>
          <div className="profile-details">
            <img
              src={images.profileDetailIcon}
              alt="profile details icon"
              className="profile-details__icon"
            />
            <span className="profile-details__text">Profile Details</span>
          </div>
        </div>
        <div className="navbar__right">
          <button className="btn btn-outline">Preview</button>
        </div>
      </div>

      <div className="home-content-parent">
        {/* Left side - Mobile */}
        <div className="ls-mobile p-6 flex justify-center items-center">
          <img src={images.phoneMockup} alt="phone mockup" />
        </div>

        {/* Right side - Links */}
        <div className="rs-links">
          <div className="p-10">
            <div className="rs-links__top mb-6">
              <div className="heading-primary">Customize your links</div>
              <div className="desc-primary mb-10">
                Add/edit/remove links below and then share all your profiles
                with the world!
              </div>
              <div>
                <button className="btn btn-outline w-full">+ Add new link</button>
              </div>
            </div>

            {/* No links view */}
            {false && <div className="rs-links__bottom border p-5 mb-5 flex justify-center items-center flex-col">
              <img src={images.illustrationEmpty} alt="empty illustration" />
              <div className="heading-primary mt-10 mb-6">Let's get you started</div>
              <div className="desc-primary text-center">
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We're here to help
                you share your profiles with everyone!
              </div>
            </div>}

            {/* Links view */}
            <div className="links-view-parent border">
              <div className="single-link-parent p-5">
                <div className="top flex items-center justify-between pb-3">
                  <div className="flex">
                    <div className="icon mr-2">icon</div>
                    <div className="link-no base-grey-style font-bold">Link #1</div>
                  </div>
                  <div className="remove base-grey-style font-normal">Remove</div>
                </div>
                <div className="plateform pb-3 input-label">Plateform</div>
                <div className="form-group">
            <div className="form-label input-label">Link</div>
            {/* Dropdown */}
            <div className="dropdown">
      <div className="selected-option"
      // onClick={() => setIsOpen(!isOpen)}
      >
        {'Select an option'}
      </div>
      {true && (
        <div className="options">
          {options.map((option) => (
            <div
              key={option.value}
              className="option"
              // onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
            <div className="input-with-icon">
              <span className="input-icon">
                <img src={linkIcon} alt="" />
              </span>
              <input
                className="w-full"
                type="text"
                id="url"
                // ref={emailRef}
                placeholder="e.g. https://www.github.com/numan-iftikhar"
                required
              />
            </div>
          </div>
              </div>
            </div>
          </div>

          {/* Footer - Save Button */}
          <div className="footer px-10 py-6 border flex justify-end">
            <button className="btn btn-fill">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
