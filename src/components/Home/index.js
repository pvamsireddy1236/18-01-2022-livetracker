import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { openChatWebSocket } from "../../actions";
import { Loader } from "../Loader";
import "./Style.scss";
const Home = (props) => {
  const { openChatWebSocket, stockData } = props;
  const dispatch = useDispatch();
  const [showContent, setContent] = useState(true);
  const refs = useRef([]);

  useEffect(() => {
    dispatch(openChatWebSocket());
  }, [dispatch, openChatWebSocket]);


  return (
    <>
      <div className="accordion">
        <input
          type="checkbox"
          id="accordion-1"
          onClick={() => setContent(!showContent)}
        />
        <label className="accordionHandler" for="accordion-1">
          <span className="accordionTitle">
            <span className="accordionIcon">⯆</span> &nbsp;Order Book{" "}
            <span className="currency">BTC/USD</span>{" "}
          </span>
          <span>
            <span>+</span> &nbsp;
            <span>-</span> &nbsp;
            <span>X</span>
          </span>
        </label>
        {showContent ? (
          <div className="accordionBody">
            <table>
              <tr>
                <th>Count</th>
                <th>Amount</th>
                <th>Total</th>
                <th>Price</th>
              </tr>
              {stockData ? (
                stockData.map((item,i) => {
                  let { price, amount, count, totalPrice } =
                    item[Object.keys(item)];
                  return (
                      <tr key={amount} ref={(element)=>refs.current[i] = {
                        'node': element,
                        'amount':amount,
                        'price':price,
                        'count':count,
                       }}>
                        <td>{count}</td>
                        <td>{price}</td>
                        <td>{totalPrice}</td>
                        <td>{amount.toLocaleString()}</td>
                      </tr>
                  );
                })
              ) : (
                <Loader />
              )}
            </table>
          </div>
        ) : (
          ""
        )}
        <label className="accordionHandler" for="accordion-1">
          <span className="accordionTitle">View</span>
          <span>
            <span>Full Book</span> &nbsp; | &nbsp;
            <span>Real Time</span> &nbsp;
          </span>
        </label>
      </div>
    </>
  );
};

let mapStateToProps = (state) => {
  return {
    stockData: state.listReducers && state.listReducers.Info,
  };
};
let mapDispatchToProps = () => {
  return {
    openChatWebSocket,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
