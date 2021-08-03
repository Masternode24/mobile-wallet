import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

export const NetworkHeader = (props) => {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{transform: [{ scale: 1.2 }]}}
    >
      <G clipPath="url(#clip0-501492)" fill="#fff">
        <Path d="M12.497 6.558c-1.596 2.09-3.797 4.303-5.94 5.94a5.507 5.507 0 005.94-5.94z" />
        <Path d="M13.644.364c-.904-.903-2.803.081-3.903.753.34.157.666.345.975.561.427-.236 1.89-.968 2.237-.622.463.463-.809 2.588-1.19 3.165C9.974 1.136 5.675.536 3.105 3.106c-1.557 1.556-1.952 3.75-1.33 5.637C.82 10.094-.702 12.581.362 13.645 3.044 16.327 16.328 3.05 13.643.365zm-12.59 12.59c-.453-.452.753-2.504 1.188-3.164a5.431 5.431 0 001.976 1.975c-1.719 1.128-2.893 1.46-3.164 1.19z" />
      </G>
      <Defs>
        <ClipPath id="clip0-501492">
          <Path fill="#fff" d="M0 0H14V14H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

