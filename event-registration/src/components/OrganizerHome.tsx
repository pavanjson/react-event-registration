import { useState, useEffect, useContext } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { fetchData } from "../redux/state/action-creators";

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import { useAppDispatch, useAppSelector } from "../redux/state/store";
import MyButton from "./MyButton";
import CreateEvent from "./CreateEvent";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import "../assets/OrganizerHome.css";
import { ThemeContext } from "../context/themeContext";
import DateTimeCellRenderer from "./DateTimeCellRenderer";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
ModuleRegistry.registerModules([ClientSideRowModelModule]);
const OrganizerHome = () => {
  const { theme } = useContext(ThemeContext);
  const { data, loading } = useAppSelector((state) => state.events);
  const eventDispatch = useAppDispatch();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    eventDispatch(fetchData(""));
  }, [eventDispatch]);

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = () => {
    setModal(false);
  };

  const columnDefs: ColDef[] = [
    { field: "eventCode" },
    {
      field: "eventName",
    },
    {
      field: "organizerName",
    },
    { field: "organizerID" },
    {
      field: "description",
      tooltipField: "description",
    },
    { field: "date", cellRenderer: DateTimeCellRenderer },
    { field: "timeInterval" },
    { field: "venue" },
    { field: "isActive" },
  ];

  return (
    <div>
      <div className="search-event-create-container">
        <SearchBar />
        <MyButton
          handler={() => setModal(true)}
          classname="btn btn-primary mt-2"
          name="Create Task"
        />
        <CreateEvent modal={modal} toggle={toggle} save={saveTask} />
      </div>
      <div
        className={
          theme === "dark" ? "ag-theme-alpine-dark" : "ag-theme-alpine"
        }
      >
        {loading ? (
          <div data-testid="loading" className="loader-container">
            <Loading />
          </div>
        ) : data && data.length ? (
          <AgGridReact
            rowData={data}
            columnDefs={columnDefs}
            pagination={true}
            paginationAutoPageSize={true}
            enableBrowserTooltips={true}
            suppressMenuHide={false}
          />
        ) : (
          <div className="loader-container">No data available</div>
        )}
      </div>
    </div>
  );
};

export default OrganizerHome;
