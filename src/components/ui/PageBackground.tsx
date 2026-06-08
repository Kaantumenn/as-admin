import Image from "next/image";
import loginBg from "../../../public/login_bg.png";

type PageBackgroundProps = {
  overlay?: "login" | "panel";
};

export function PageBackground({ overlay = "login" }: PageBackgroundProps) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Image
        src={loginBg}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        placeholder="blur"
      />
      <div
        className={
          overlay === "login"
            ? "absolute inset-0 bg-gradient-to-b from-background/70 via-background/90 to-background"
            : "absolute inset-0 bg-background/92"
        }
      />
    </div>
  );
}
