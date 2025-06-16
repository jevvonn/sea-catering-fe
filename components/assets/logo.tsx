import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href={`/`}
      className="select-none flex gap-2 items-center"
      draggable={false}
    >
      <Image
        src="/images/logo-sea-catering.svg"
        alt="SEA Catering Logo"
        width={55}
        height={100}
        priority
      />
      <h1 className="text-lg md:text-xl text-primary font-bold italic">
        SEA Catering
      </h1>
    </Link>
  );
};

export default Logo;
