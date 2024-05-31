import { useEffect, useState } from "react"
import axios from "axios"
import { Outlet } from "react-router-dom"

function Root() {


  return (
    <>
      <h1>
        HomePage
      </h1>
      <Outlet />
    </>
  )

}

export default Root
