import React from 'react'
import {Button} from 'semantic-ui-react'


function Okbth({changeOpen}){

    return(
        <Button
              content="OK"
              labelPosition="right"
              icon="checkmark"
              onClick={()=>changeOpen(false)}
              style={{backgroundColor: "#698474", color: "white"}}
            />
    )
}

export default Okbth