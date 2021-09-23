import { thumbDownIcon, thumbUpIcon } from "../../../../theme/assets/icons";

export enum IconName {
  thumbDown = thumbDownIcon,
  thumbUp = thumbUpIcon
}

export type IconProps = {
  iconName: IconName;
  className?: string;
}
