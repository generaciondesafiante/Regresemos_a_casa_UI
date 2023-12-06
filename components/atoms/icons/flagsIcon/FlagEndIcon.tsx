import React, { FC } from "react";
interface Props extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const FlagEndIcon: FC<Props> = ({ className, ...props }) => {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4 21h2V11h6v2h8V5h-7V3H4v18zm8-16H6v4h7v2h5V7h-6V5z"
        clipRule="evenodd"
      />
    </svg>
  );
};
