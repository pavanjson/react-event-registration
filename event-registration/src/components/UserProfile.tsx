import { useState } from "react";
import { useUser } from "../context/userContext";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { PopoverBody, PopoverHeader } from "react-bootstrap";
import "../assets/UserProfile.css";
const UserProfile = () => {
  const { userData } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const popover = (
    <Popover id="popover-basic">
      <PopoverHeader as="h3">
        <h6 className="text-center">
          {" "}
          {userData?.isOrganizer ? "Organizer Account" : "Audience Account"}
        </h6>
      </PopoverHeader>
      <PopoverBody>{userData ? userData.email : ""}</PopoverBody>
    </Popover>
  );

  return (
    <div className="user-profile">
      User Info :{" "}
      <OverlayTrigger
        trigger="click"
        key="right"
        placement="bottom"
        overlay={popover}
        show={isOpen}
      >
        <button
          className="btn btn-secondary"
          type="button"
          id="dropdownMenuButton"
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : "false"}
          onClick={toggleDropdown}
        >
          {userData ? userData.firstName : "User"}
        </button>
      </OverlayTrigger>
    </div>
  );
};

export default UserProfile;
