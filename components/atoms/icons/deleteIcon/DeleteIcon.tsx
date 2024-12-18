import * as React from "react";

function DeleteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M17 4h5v2h-2v15a1 1 0 01-1 1H5a1 1 0 01-1-1V6H2V4h5V2h10v2zM9 9v8h2V9H9zm4 0v8h2V9h-2z" />
    </svg>
  );
}

export default DeleteIcon;
