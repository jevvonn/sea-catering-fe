import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ className, ...props }: React.ComponentProps<"a">) => {
  return (
    <Link
      href={`/`}
      {...props}
      className={cn(
        "select-none flex text-lg md:text-xl text-primary gap-2 items-center",
        className
      )}
      draggable={false}
    >
      <Image
        src="/images/logo-sea-catering.svg"
        alt="SEA Catering Logo"
        width={55}
        height={100}
        priority
      />
      <h1 className="font-bold italic">SEA Catering</h1>
    </Link>
  );
};

export default Logo;
