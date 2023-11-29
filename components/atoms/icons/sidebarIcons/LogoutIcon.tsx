import React, { FC } from "react";
interface Props extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const LogoutIcon: FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M24 13l-4 4v-3h-9v-2h9V9l4 4M4 20v-8H1l10-9 7 6.3v.7h-2.21L11 5.69l-5 4.5V18h10v-2h2v4H4z" />
    </svg>
  );
};
