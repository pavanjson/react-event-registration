import EventModel from "../../interfaces/EventModel";

export interface EventState {
  loading: boolean;
  data: EventModel[];
  error?: null | string;
  createdEvent?: any;
  searchQuery?: any;
}
