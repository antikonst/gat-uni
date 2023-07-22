import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import UniApp from "../uni/UniApp"
import "../styles/global.css"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <UniApp />
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>UNI</title>
