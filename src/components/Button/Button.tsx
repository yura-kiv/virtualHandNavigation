import React, { ReactNode, FC, useContext, useEffect } from "react";
import s from "./Button.module.scss";
import { ElementsContext } from "../MainLayout/MainLayout";

type ButtonProps = {
  id: string;
  text?: string;
  size?: "sm" | "lg";
  icon?: ReactNode;
  category?: "primary" | "secondary" | "outline";
  isDisabled?: boolean;
  addClassName?: string;
  onClick?: (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data?: any
  ) => void;
};

const Button: FC<ButtonProps> = ({
  id,
  text,
  size = "lg",
  addClassName,
  category = "primary",
  icon,
  isDisabled,
  onClick,
}) => {
  const { addHoverElementRef } = useContext(ElementsContext);
  return (
    <button
      ref={(node) =>
        addHoverElementRef({
          id: `button_${id}`,
          node,
          className: "button",
        })
      }
      className={`${s.button} ${s[size]} ${s[category]} ${
        isDisabled && s.disabled
      } ${!text && icon && s.onlyIcon} ${addClassName}`}
      onClick={onClick || undefined}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
