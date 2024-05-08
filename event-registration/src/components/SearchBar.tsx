import { useState } from "react";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "antd/dist/reset.css";
import { useAppDispatch } from "../redux/state/store";
import { fetchData } from "../redux/state/action-creators";
import "../assets/SearchBar.css";

const { Option } = Select;

const SearchBar = () => {
  const [searchCriteria, setSearchCriteria] = useState("eventCode");
  const [searchValue, setSearchValue] = useState("");
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
  const eventDispatch = useAppDispatch();

  const handleSearch = () => {
    let query = "";
    switch (searchCriteria) {
      case "eventCode":
        query = `?eventCode=${searchValue}`;
        break;
      case "eventName":
        query = `?eventName=${searchValue}`;
        break;
      case "venue":
        query = `?venue=${searchValue}`;
        break;
      default:
        break;
    }
    if (dateRange) {
      const [startDate, endDate] = dateRange;
      if (startDate && endDate) {
        const formattedStartDate = dayjs(startDate)
          .startOf("day")
          .toISOString();
        const formattedEndDate = dayjs(endDate).endOf("day").toISOString();
        query += `&from=${formattedStartDate}&to=${formattedEndDate}`;
      } else {
        setDateRange(null);
      }
    }
    eventDispatch(fetchData(query));
  };

  return (
    <div className="search-section">
      <div className="search-container">
        <Select
          size="large"
          value={searchCriteria}
          onChange={(value) => setSearchCriteria(value)}
        >
          <Option value="eventCode">Event Code</Option>
          <Option value="eventName">Event Name</Option>
          <Option value="venue">Venue</Option>
        </Select>
        <input
          type="text"
          className="mr-10"
          placeholder={`Enter ${searchCriteria}...`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <DatePicker.RangePicker
          size="small"
          className="mr-10"
          onChange={(dates: any) => setDateRange(dates)}
        />
        <button className="btn btn-primary" onClick={() => handleSearch()}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
