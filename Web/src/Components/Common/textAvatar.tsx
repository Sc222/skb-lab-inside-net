import * as React from "react";
import { FunctionComponent } from "react";
import Avatar, { AvatarTypeMap } from "@mui/material/Avatar";

//FIXME better sx prop compatibility
interface TextAvatarProps {
  text: string;
  letterIndex?: number;
  bgcolor?: string;
  sx: AvatarTypeMap["props"]["sx"];
}

export const TextAvatar: FunctionComponent<TextAvatarProps> = ({ text, letterIndex = 0, sx, bgcolor }) => {
  const textToBgColor = (text: string): string => {
    let hash = 0;
    let i;
    /* eslint-disable no-bitwise */
    for (i = 0; i < text.length; i += 1) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
  };
  return <Avatar sx={{ bgcolor: bgcolor ?? textToBgColor(text), ...sx }}>{text[letterIndex]}</Avatar>;
};
