import React from 'react'
import Head from 'next/head'
import themeConfig from 'src/configs/themeConfig'

function View() {
  return (
    <>
      <Head>
        <title>View Challan - {themeConfig.templateName}</title>
      </Head>
      <div>View Challan</div>
    </>
  )
}

export default View