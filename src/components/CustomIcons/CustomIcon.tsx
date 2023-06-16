
import React from "react";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import Theme from "../../assets/theme/theme.styles";

export enum IconsVariant {
  AntDesign,
  Entypo,
  MaterialIcons
}

interface CustomIconProps {
  variant: IconsVariant;
  name:
    | React.ComponentProps<typeof AntDesign>["name"]
    | React.ComponentProps<typeof Entypo>["name"]
    | React.ComponentProps<typeof MaterialIcons>["name"];
  color?: string;
  size?: number;
  others?: object;
}

const CustomIcon = ({
  variant,
  name,
  size = 16,
  color = Theme.white,
  others = {},
}: CustomIconProps) => {
  switch (variant) {
    case IconsVariant.AntDesign:
      return <AntDesign name={name} color={color} size={size} {...others} />;
    case IconsVariant.Entypo:
      return <Entypo name={name} color={color} size={size} {...others} />;
    case IconsVariant.MaterialIcons:
      return <MaterialIcons name={name} color={color} size={size} {...others} />;
    default:
      return null;
  }
};

export default CustomIcon;
