import React, { useState, useEffect } from "react"
import { db } from "../../../firebase"

let uniqueCardKey = 'CjC4fXoHDGhuFbvAV2mtTxEli122'

const CardRender = (cardID) => {

    return (
      <div
      style={{
        backgroundColor: "white",
        margin: "20px 10px 10px 10px",
        borderRadius: "15px",
        height: "300px",
        verticalAlign: "middle",
      }}
      >
      {cardID.text}
      </div>
    )
}

export default CardRender;

