import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { useAppContext } from "./Context";
const WeatherComponent = ({ city, list, dateList }) => {
  const { selectedState, setSelectedState } = useAppContext();
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  function onNextDate() {
    setSelectedDateIndex((index) => {
      return index === dateList.length - 1 ? index : index + 1;
    });
  }
  function onPrevDate() {
    setSelectedDateIndex((index) => {
      return index === 0 ? 0 : index - 1;
    });
  }
  return (
    <div className="blackout">
      <div className="display-box">
        <h2 style={{ textAlign: "center" }}>{city}</h2>
        <div className="date-picker">
          <ArrowBackIosNewIcon
            style={{
              opacity: selectedDateIndex === 0 ? 0 : 1,
              cursor: "pointer",
            }}
            onClick={onPrevDate}
          />
          <div className="date-swipe">
            {dateList.map((date, index) => {
              const selected = index === selectedDateIndex;
              const previous = index - 1 === selectedDateIndex;
              const next = index + 1 === selectedDateIndex;
              return (
                <div
                  className={`date ${selected && "selected-date"} ${
                    previous && "prev-date"
                  } ${next && "next-date"}`}
                >
                  {date}
                </div>
              );
            })}
          </div>
          <ArrowForwardIosIcon
            style={{
              opacity: selectedDateIndex === dateList.length - 1 ? 0 : 1,
              cursor: "pointer",
              zIndex: 2,
            }}
            onClick={onNextDate}
          />
        </div>
        <div className="weather-component">
          {list.map((item) => {
            if (item.date === dateList[selectedDateIndex]) {
              return (
                <div key={item.id} className="weather-item">
                  <img
                    className="imgUrl"
                    src={`https://openweathermap.org/img/wn/${item.image}.png`}
                  ></img>
                  <div className="weather-text">{item.weather}</div>
                  <div className="details">
                    <div className="day">{item.day}</div>
                    <div className="date">{item.date}</div>
                    <div className="time">{item.time}</div>
                    <div className="temp">{item.temperature}°c</div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <span className="cancelBtn" onClick={() => setSelectedState(null)}>
          <CancelIcon />
        </span>
      </div>
    </div>
  );
};

export default WeatherComponent;
