import Image from "next/image";
import logo from "../../../public/as_cimento_logo_white.png";

export function Logo({ compact = false }: { compact?: boolean }) {
  const width = compact ? 140 : 500;

  return (
    <div className={`flex flex-col ${compact ? "items-start" : "items-center"}`}>
      <Image
        src={logo}
        alt="AS Çimento"
        width={width}
        height={Math.round((width * logo.height) / logo.width)}
        priority
        className={`h-auto max-w-full ${compact ? "w-[140px]" : "w-[500px]"}`}
      />
      {!compact && (
        <p className="mt-3 text-[10px] font-medium tracking-[0.25em] text-white/70">
          FABRİKA SEVKİYAT TAKİP SİSTEMİ
        </p>
      )}
    </div>
  );
}
