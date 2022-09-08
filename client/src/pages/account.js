import React,{useEffect,useState,useContext} from "react";
import { UserOutlined } from "@ant-design/icons";
import axios from 'axios'
import {UserContext} from '../context'
import moment from 'moment'

const Account = ({ history }) => {
  const[subscriptions,setSubscriptions]=useState([])
  const[state,setState]=useContext(UserContext)
  useEffect(()=>{

    const getSubscriptions=async()=>{
      const {data}=await axios.get('https://myjucsubscriptions.herokuapp.com/api/subscriptions')
      console.log(data)
      setSubscriptions(data.data)
    }
    getSubscriptions()

  },[state && state.token])
  const manageSubscription=async()=>{
    const {data}=await axios.get('https://myjucsubscriptions.herokuapp.com/api/customer-portal')
    window.open(data)

  }
  return (
    <div className="container">
      <div className="row my-10">
        <UserOutlined className="display-4 " />
        <h1 className="">Account</h1>
        <p className="lead pb-4 mr-50" style={{marginLeft:'20px',color:"red", fontWeight:'bolder'}}>Subscription status</p>
      </div>
      <div className="row">
        {subscriptions.map(sub=>{
          return <div key={sub.id}>
            <section style={{marginRight:'80px',marginLeft:'10px'}}>
              <hr/>
              <h4 className="fw-bold">{sub.plan.nickname}</h4>
              <h5>
                {(sub.plan.amount/100).toLocaleString('da-DK',{
                  style:'currency',
                  currency:'DKK'
                })}
              </h5>
              <p>Status:{sub.status}</p>
              <p>Card Last 4 digits:{sub.default_payment_method.card.last4}</p>
              <p>Current period ends:{moment(sub.current_period_end*1000).format('dddd, MMMM Do YYYY').toString()}</p>
                <button className="btn btn-outline-danger" onClick={()=>history.push(`/${sub.plan.nickname.toLowerCase()}`)}>Access</button>
                <button className="btn btn-outline-warning" onClick={manageSubscription}>Manage Subscriptions</button>
            </section>
          </div>
        })}
      </div>
    </div>
  );
};

export default Account;
