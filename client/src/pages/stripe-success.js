import React,{useContext, useEffect} from "react";
import { UserContext } from "../context";
import axios from 'axios'

import { WarningTwoTone ,SyncOutlined} from "@ant-design/icons";

const StripeSuccess = ({history}) => {
  
  const [state, setState] = useContext(UserContext);
  useEffect(()=>{
    const getSubscriptions=async()=>{
      const {data}=await axios.get('https://myjucsubscriptions.herokuapp.com/api/subscription-status')
      console.log('data',data)
      if(data && data.length ===0){
        history.push('/')
      }else{
        const auth=JSON.parse(localStorage.getItem('auth'))
        auth.user=data
        localStorage.setItem('auth',JSON.stringify(auth))
        setState(auth)
        setTimeout(()=>{
          history.push('/account')


        },1000)

      }
    }
    getSubscriptions()

  },[])

  return (
    <div
      className="d-flex justify-content-center fw-bold"
      style={{ height: "90vh" }}
    >
      <div className="d-flex align-items-center">
        <SyncOutlined spin  style={{ fontSize: "50px" }} />
      </div>
    </div>
  );
};

export default StripeSuccess;
