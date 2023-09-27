import { useState } from "react"
import { useDaumPostcodePopup } from "react-daum-postcode"

export default function usePostcode() {
  const [addresscode, setAddresscode] = useState<string>("")

  const scriptUrl =
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"

  const open = useDaumPostcodePopup(scriptUrl)

  const handleComplete = (data: any) => {
    console.log("data : ", data)
    let fullAddress = data.address
    let extraAddress = ""

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName
      }

      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : ""

      if (data.zonecode !== "") {
        fullAddress += `  [${data.zonecode}]`
      }
    }

    setAddresscode(fullAddress)
  }

  const openPostcode = () => {
    open({ onComplete: handleComplete })
  }

  return { openPostcode, addresscode }
}
