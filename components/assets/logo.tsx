import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href={`/`}
      className="text-xl text-primary font-bold italic select-none"
    >
      <h1>SEA Catering</h1>
    </Link>
  );
};

export default Logo;
