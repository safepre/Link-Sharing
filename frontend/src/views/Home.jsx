import React from "react";
import linkIcon from "../assets/images/icon-link.svg";
import devlinkLogo from "../assets/images/logo-devlinks-large.svg";
import profileDetailIcon from "../assets/images/icon-profile-details-header.svg";
import illustrationEmpty from '../assets/images/illustration-empty.svg';
import phoneMockup from '../assets/images/illustration-phone-mockup.svg'

const Home = () => {
  const images = {
    linkIcon,
    devlinkLogo,
    profileDetailIcon,
    illustrationEmpty,
    phoneMockup
  };

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
            <div className="rs-links__bottom border p-5 mb-5 flex justify-center items-center flex-col">
              <img src={images.illustrationEmpty} alt="empty illustration" />
              <div className="heading-primary mt-10 mb-6">Let's get you started</div>
              <div className="desc-primary text-center">
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We're here to help
                you share your profiles with everyone!
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
