import React from 'react';
import axios from 'axios';
import config from "./config";
export default class CommonFunction extends React.Component {

  /**
    * Function for getting dropdown
    * @param {*} id 
    */
   getDropDown(api) {
    axios.delete(`${config.api_url}/common/${id}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
      this.componentDidMount();
    })
 }
 
}
 