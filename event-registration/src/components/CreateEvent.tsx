import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../redux/state/store";
import { createEvent, fetchData } from "../redux/state/action-creators";
import "../assets/CreateEvent.css";
import "../index.css";
import { message } from "antd";
interface Props {
  modal: boolean;
  toggle(): void;
  save(task: any): void;
}

const CreateEvent = (props: Props) => {
  const today = new Date();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      eventCode: "",
      eventName: "",
      description: "",
      date: "",
      timeInterval: "",
      venue: "",
      isActive: false,
      image: null,
    },

    validationSchema: Yup.object().shape({
      eventCode: Yup.string()
        .required("Event Code is required")
        .min(3, "Event code must be at least 3 characters")
        .max(10, "Event code must not exceed 10 characters"),
      eventName: Yup.string()
        .required("Event Name is required")
        .min(8, "Event Name must be at least 8 characters"),
      date: Yup.string()
        .required("Date is required")
        .test(
          "valid-date",
          "Date must not be less than today",
          function (value) {
            if (!value) return true;
            const selectedDate = new Date(value);
            return selectedDate >= today;
          }
        ),

      description: Yup.string()
        .required("Description is required")
        .max(100, "Description must not exceed 100 characters"),
      timeInterval: Yup.string()
        .required("Time Interval is required")
        .max(5, "Time Interval must not exceed 10 characters"),
      venue: Yup.string()
        .required("Venue is required")
        .max(10, "Venue must not exceed 10 characters"),
      isActive: Yup.boolean().required("Is Active is required"),
    }),

    onSubmit: async () => {
      const formData = new FormData();
      formData.append("EventCode", formik.values.eventCode);
      formData.append("EventName", formik.values.eventName);

      formData.append("Description", formik.values.description);
      formData.append("Date", formik.values.date);
      formData.append("TimeInterval", formik.values.timeInterval);
      formData.append("Venue", formik.values.venue);
      formData.append("IsActive", String(formik.values.isActive));
      if (formik.values.image) {
        formData.append("Image", formik.values.image);
      }
      const response = await dispatch(createEvent(formData));

      if (response.payload && response.payload.error) {
        message.error(
          "Unable to create the event: " + response.payload.error,
          5
        );
      } else if (response.payload) {
        await dispatch(fetchData(""));
        message.success("Event Created successfully", 6);
        props.toggle();
      } else {
        message.error("Something Went Wrong error : " + response.payload, 6);
      }
    },
  });

  return (
    <Modal isOpen={props.modal} toggle={props.toggle} className="create-modal">
      <ModalHeader toggle={props.toggle} className="theme">
        Create Event
      </ModalHeader>
      <form onSubmit={formik.handleSubmit}>
        <ModalBody className="theme">
          <div className="form-container-create-event">
            <div className="form-section-create-event">
              <div className="form-group">
                <label htmlFor="eventCode">Event Code:</label>
                <input
                  type="text"
                  id="eventCode"
                  className="form-input"
                  {...formik.getFieldProps("eventCode")}
                />
                {formik.touched.eventCode && formik.errors.eventCode ? (
                  <div className="error">{formik.errors.eventCode}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="eventName">Event Name:</label>
                <input
                  type="text"
                  id="eventName"
                  className="form-input"
                  {...formik.getFieldProps("eventName")}
                />
                {formik.touched.eventName && formik.errors.eventName ? (
                  <div className="error">{formik.errors.eventName}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  className="form-input"
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="error">{formik.errors.description}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="datetime-local"
                  id="date"
                  className="form-input"
                  {...formik.getFieldProps("date")}
                />
                {formik.touched.date && formik.errors.date ? (
                  <div className="error">{formik.errors.date}</div>
                ) : null}
              </div>
            </div>
            <div className="form-section-create-event">
              <div className="form-group">
                <label htmlFor="timeInterval">Time Interval:</label>
                <input
                  type="text"
                  id="timeInterval"
                  className="form-input"
                  {...formik.getFieldProps("timeInterval")}
                />
                {formik.touched.timeInterval && formik.errors.timeInterval ? (
                  <div className="error">{formik.errors.timeInterval}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="venue">Venue:</label>
                <input
                  type="text"
                  id="venue"
                  className="form-input"
                  {...formik.getFieldProps("venue")}
                />
                {formik.touched.venue && formik.errors.venue ? (
                  <div className="error">{formik.errors.venue}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="image">Image:</label>
                <input
                  type="file"
                  id="image"
                  className="form-input"
                  onChange={(event) =>
                    formik.setFieldValue("image", event.currentTarget.files![0])
                  }
                />
                {formik.touched.image && formik.errors.image ? (
                  <div className="error">{formik.errors.image}</div>
                ) : null}
              </div>
              <div className="form-group custom-checkbox">
                <label htmlFor="isActive">Is Active:</label>
                <input
                  type="checkbox"
                  id="isActive"
                  className="form-input"
                  checked={formik.values.isActive}
                  onChange={formik.handleChange}
                />
                {formik.touched.isActive && formik.errors.isActive ? (
                  <div className="error">{formik.errors.isActive}</div>
                ) : null}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="theme">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
          <button
            type="button"
            onClick={props.toggle}
            className="btn btn-primary"
          >
            Cancel
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default CreateEvent;
