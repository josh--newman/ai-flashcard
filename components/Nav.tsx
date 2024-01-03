import styles from "./Nav.module.css";
import { useEffect, useState, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import CardForm from "./CardForm";
import Modal from "./FormModal";
import FormModal from "./FormModal";

const Nav = () => {
  const [showModal, setShowModal] = useState(false);
  const [isDropdownVisible, setIsDropdownVisibile] = useState(false);
  const menuRef = useRef(null);

  const { data: session } = useSession();

  const toggleDropdown = () => {
    setIsDropdownVisibile((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsDropdownVisibile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.navContainer}>
      <div className={styles.addButton}>
        <button onClick={() => setShowModal(true)}>+</button>
        <FormModal onClose={() => setShowModal(false)} show={showModal}>
          <CardForm onSuccess={() => setShowModal(false)} />
        </FormModal>
      </div>
      <div
        className={styles.profilePhoto}
        onClick={toggleDropdown}
        ref={menuRef}
      >
        {session && (
          <Image
            src={session.user.image}
            alt="User Image"
            width={50}
            height={50}
          />
        )}
        {isDropdownVisible && (
          <div className={styles.dropdown}>
            <a onClick={() => signOut()}>Logout</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
