import { 
  TimeSlot, 
  Subject, 
  ClassSession, 
  TimetableSettings, 
  WeekSchedule,
  DaySchedule 
} from '../types/timetable';

export const mockTimeSlots: TimeSlot[] = [
  { id: '1', startTime: '08:00', endTime: '09:00', duration: 60 },
  { id: '2', startTime: '09:00', endTime: '10:00', duration: 60 },
  { id: '3', startTime: '10:15', endTime: '11:15', duration: 60 },
  { id: '4', startTime: '11:15', endTime: '12:15', duration: 60 },
  { id: '5', startTime: '13:00', endTime: '14:00', duration: 60 },
  { id: '6', startTime: '14:00', endTime: '15:00', duration: 60 },
  { id: '7', startTime: '15:15', endTime: '16:15', duration: 60 },
];

export const mockSubjects: Subject[] = [
  { id: '1', name: 'Mathematics', color: '#3B82F6', instructor: 'Dr. John Smith' },
  { id: '2', name: 'Physics', color: '#EF4444', instructor: 'Prof. Sarah Johnson' },
  { id: '3', name: 'Computer Science / Biology', color: '#8B5CF6', instructor: 'Dr. Mike Chen' },
  { id: '4', name: 'English', color: '#F59E0B', instructor: 'Ms. Emily Brown' },
  { id: '5', name: 'Chemistry', color: '#10B981', instructor: 'Dr. Robert Wilson' },
  { id: '6', name: 'Urdu', color: '#6366F1', instructor: 'Mr. Ahmed Khan' },
  { id: '7', name: 'Islamiat', color: '#EC4899', instructor: 'Mr. Ali Hassan' },
];

export const mockClassSessions: ClassSession[] = [
  // Monday
  {
    id: 'mon-1',
    subject: mockSubjects[0],
    timeSlot: mockTimeSlots[0],
    dayOfWeek: 'Monday',
    type: 'lecture',
    room: 'Room 101'
  },
  {
    id: 'mon-2',
    subject: mockSubjects[3],
    timeSlot: mockTimeSlots[1],
    dayOfWeek: 'Monday',
    type: 'lecture',
    room: 'Room 102'
  },
  {
    id: 'mon-3',
    subject: mockSubjects[5],
    timeSlot: mockTimeSlots[2],
    dayOfWeek: 'Monday',
    type: 'lecture',
    room: 'Room 103'
  },
  {
    id: 'mon-4',
    subject: mockSubjects[4],
    timeSlot: mockTimeSlots[3],
    dayOfWeek: 'Monday',
    type: 'lecture',
    room: 'Lab A'
  },
  {
    id: 'mon-5',
    subject: mockSubjects[6],
    timeSlot: mockTimeSlots[4],
    dayOfWeek: 'Monday',
    type: 'lecture',
    room: 'Room 104'
  },
  {
    id: 'mon-6',
    subject: mockSubjects[1],
    timeSlot: mockTimeSlots[5],
    dayOfWeek: 'Monday',
    type: 'lecture',
    room: 'Room 105'
  },
  // Tuesday
  {
    id: 'tue-1',
    subject: mockSubjects[1],
    timeSlot: mockTimeSlots[0],
    dayOfWeek: 'Tuesday',
    type: 'lecture',
    room: 'Room 101'
  },
  {
    id: 'tue-2',
    subject: mockSubjects[2],
    timeSlot: mockTimeSlots[1],
    dayOfWeek: 'Tuesday',
    type: 'lecture',
    room: 'Lab B'
  },
  {
    id: 'tue-3',
    subject: mockSubjects[0],
    timeSlot: mockTimeSlots[2],
    dayOfWeek: 'Tuesday',
    type: 'lecture',    
    room: 'Room 102'
  },
  // Add more sessions for other days as needed...
];

export const mockTimetableSettings: TimetableSettings = {
  startTime: '08:00',
  endTime: '14:00',
  timeSlotDuration: 60,
  showWeekends: false,
  view: 'week',
  timezone: 'America/New_York'
};

// Utility functions
export const getCurrentWeekDate = (day: string): string => {
  const today = new Date();
  const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(day);
  const mondayDate = new Date(today);
  mondayDate.setDate(today.getDate() - today.getDay() + 1 + dayIndex);
  return mondayDate.toISOString().split('T')[0];
};

export const getDaySchedule = (day: string): DaySchedule => {
  const sessions = mockClassSessions.filter(session => session.dayOfWeek === day);
  return {
    day,
    date: getCurrentWeekDate(day),
    sessions
  };
};

export const getCurrentWeekSchedule = (): WeekSchedule => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  return {
    weekStart: getCurrentWeekStart(),
    weekEnd: getCurrentWeekEnd(),
    weekNumber: getCurrentWeekNumber(),
    days: days.map(day => getDaySchedule(day))
  };
};

export const getCurrentWeekStart = (): string => {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  return monday.toISOString().split('T')[0];
};

export const getCurrentWeekEnd = (): string => {
  const today = new Date();
  const friday = new Date(today);
  friday.setDate(today.getDate() - today.getDay() + 5);
  return friday.toISOString().split('T')[0];
};

export const getCurrentWeekNumber = (): number => {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour24 = parseInt(hours);
  const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
  const ampm = hour24 >= 12 ? 'PM' : 'AM';
  return `${hour12}:${minutes} ${ampm}`;
};