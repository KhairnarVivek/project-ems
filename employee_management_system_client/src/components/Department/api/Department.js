import axios from "axios";
import config from "../../utils/config";
export const getAllDepartment=()=>async dispatch=>
{
    console.log("I am here");
  try {
      const res=await axios.get(`${config.api_url}/Department`);
      console.log("Calling Get All Department");
      console.log(res);
      dispatch ({
          type:'GET_Department',
          payload:res.data
      });
  } catch (err) {
      dispatch ({
          type:'Error in  calling API',
          payload:{msg:err.response.statusText,status:err.response.status}
      }); 
  }
}
