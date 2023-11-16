import styles from "./Nav.module.css";
import { useEffect, useState, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Nav = () => {
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
    <div className={styles.navContainer} onClick={toggleDropdown} ref={menuRef}>
      <div className={styles.profilePhoto}>
        {session && (
          <Image
            src={session.user.image}
            alt="User Image"
            width={50}
            height={50}
          />
        )}
      </div>

      {isDropdownVisible && (
        <div className={styles.dropdown}>
          <a onClick={() => signOut()}>Logout</a>
        </div>
      )}
    </div>
  );
};

export default Nav;
