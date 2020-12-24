import React from 'react'

class GeneralServices extends React.Component {
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }
}

export default GeneralServices