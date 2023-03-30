import React from 'react'
import Head from 'next/head'
import themeConfig from 'src/configs/themeConfig'

function Search() {
  return (
    <>
      <Head>
        <title>Search Challan - {themeConfig.templateName}</title>
      </Head>
      <div>Search</div>
    </>
  )
}

export default Search