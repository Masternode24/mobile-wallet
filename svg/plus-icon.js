import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const PlusIcon = (props) => {
  return (
    <Svg
      width={17}
      height={16}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9.639 8.843h4.511V6.748H9.64V2H7.512v4.748H3v2.095h4.512v4.845h2.127V8.843z"
        fill="#0BFFB7"
      />
    </Svg>
  )
}

