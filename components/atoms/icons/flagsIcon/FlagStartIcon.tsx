import React, { FC } from "react";
interface Props extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const FlagStartIcon: FC<Props> = ({ className, ...props }) => {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12.439 7l2.4-3H7v6h7.839l-2.4-3zM19 12H7v10H5V2h14l-4 5 4 5z"
        clipRule="evenodd"
      />
    </svg>
  );
};
