import React from 'react'
import "./Popup.css";

class Popup extends React.Component{
    render(){
      return(
        <div className='popup'>
            <div className='popup\_inner'>
                <h1>{this.props.titleText}</h1>
                <button onClick={this.props.justClosePopup}>zurück</button>
                <button onClick={this.props.deleteAndClose}>löschen</button>
            </div>
        </div>
      )
    }
}

  export default Popup;