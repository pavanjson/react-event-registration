interface EventModel {
  eventCode: string;
  eventName: string;
  organizerID: number;
  description: string;
  organizerName?: string;
  date: string;
  timeInterval: string;
  venue: string;
  isActive: boolean;
}

export default EventModel;
