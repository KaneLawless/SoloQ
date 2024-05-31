import { useEffect, useState } from "react"
import axios from "axios"
import { Outlet } from "react-router-dom"

function Root() {

  const [testData, setTestData] = useState()

  useEffect(() => {
    async function getData() {
      try {
        const data = await axios.get('/api/posts')
        setTestData(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [])

  return (
    <>
      <Outlet />
    </>
  )

}

export default Root
