import React from 'react'
import Helmet from "react-helmet";

const MetaData = ({title}) => {
  return (
   <Helmet>  
   {/* jo bhi page aap khologey page ka vo hi title ho jaga ,isliye use hvoe helmet ka */}
    <title>{title}</title>    
   </Helmet>
  )
}

export default MetaData