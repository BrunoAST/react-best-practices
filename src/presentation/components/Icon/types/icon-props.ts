import { thumbDownIcon, thumbUpIcon } from "../../../../theme/assets/icons";

export const IconName = {
  thumbDown: thumbDownIcon,
  thumbUp: thumbUpIcon
}

export type IconProps = {
  iconName: string;
  className?: string;
}
