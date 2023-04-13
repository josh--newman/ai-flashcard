import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = null;

  let right = session ? (
    <div>
      <p>
        <Image
          src={session.user.image}
          alt="User Image"
          width={50}
          height={50}
        />
        {session.user.name} ({session.user.email})
      </p>
    </div>
  ) : (
    <div className="right">
      <Link href="/api/auth/signin">Log in</Link>
    </div>
  );

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
