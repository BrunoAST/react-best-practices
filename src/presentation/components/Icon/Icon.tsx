import React from 'react';
import Styles from "./icon.module.scss";
import { IconName, IconProps } from './types/icon-props';

const Icon: React.FC<IconProps> = ({ iconName, className }: IconProps) => {
  const iconColor = (iconName: string): string => {
    return iconName === IconName.thumbDown ? Styles.red : Styles.green;
  }

  return (
    <div className={`${Styles.iconWrapper} ${iconColor(iconName)} ${className}`}>
      <img src={iconName} alt="Thumb icon" />
    </div>
  );
}

export default Icon;
