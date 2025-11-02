import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

type GeneratedAvatarProps = {
  seed: string;
  className?: string;
  variant?: "botttsNeutral" | "initials";
};

export function GeneratedAvatar({
  seed,
  className,
  variant = "botttsNeutral",
}: GeneratedAvatarProps) {
  let avatar;

  if (variant === "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, {
      seed,
    });
  } else if (variant === "initials") {
    avatar = createAvatar(initials, {
      seed,
      fontWeight: 500,
      fontSize: 42,
    });
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar?.toDataUri()} alt={seed} />
      <AvatarFallback>{seed.charAt(0)}</AvatarFallback>
    </Avatar>
  );
}
