import React from "react";
import dayjs from "dayjs";
const formatDateTime = (params: any) => {
  if (params.value) {
    return dayjs(params.value).format("DD MMM YYYY hh:mm A");
  }
  return null;
};
const DateTimeCellRenderer: React.FC<any> = (props) => {
  return <span>{formatDateTime(props)}</span>;
};

export default DateTimeCellRenderer;
