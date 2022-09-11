import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import PriceCard from "../components/cards/Pricecard";
import { UserContext } from "../context";

const Home = ({ history }) => {
  const [state, setState] = useContext(UserContext);
  const [prices, setPrices] = useState([]);
  const[userSubscriptions,setUserSubscriptions]=useState([])

  useEffect(() => {
    fetchPrices();
  }, []);
  useEffect(()=>{
    let result=[];
    const check=()=>state?.user?.subscriptions?.map(sub=>{
      result.push(sub.plan.id)
    })
    check()
    setUserSubscriptions(result)


  },[])

  const fetchPrices = async () => {
    const { data } = await axios.get("https://myjucsubscriptions.herokuapp.com/api/prices");
    console.log("prices get request", data);
    setPrices(data);
  };

  const handleClick = async (e, price) => {
    e.preventDefault();
     console.log("plan clicked", price.id);

     if(userSubscriptions && userSubscriptions.includes(price.id)){
      history.push(`/${price.nickname.toLowerCase()}`)
      return
     }
    
    if (state && state.token) {
      const token=state.token
      const { data } = await axios.post("https://myjucsubscriptions.herokuapp.com/api/create-subscription", {
        priceId: price.id,
      },
                                     {
  headers: {
    Authorization: 'Bearer ' + token
  });
      window.open(data);
    } else {
      history.push("/register");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row col-md-6 offset-md-3 text-center">
        <h1 className="pt-5 fw-bold">
          Explore the right plan for your business
        </h1>
        <p className="lead pb-4">Choose a plan that suites you best!</p>
      </div>

      <div className="row pt-5 mb-3 text-center">
        {prices &&
          prices.map((price) => (
            <PriceCard
              key={price.id}
              price={price}
              handleSubscription={handleClick}
              userSubscriptions={userSubscriptions}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
