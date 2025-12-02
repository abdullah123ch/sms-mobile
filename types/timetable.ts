export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
}

export interface Subject {
  id: string;
  name: string;
  color?: string;
  instructor?: string;
}

export interface ClassSession {
  id: string;
  subject: Subject;
  timeSlot: TimeSlot;
  dayOfWeek: string;
  type: 'lecture';
  room?: string;
  class?: string;
  section?: string;
}

export interface DaySchedule {
  day: string;
  date: string;
  sessions: ClassSession[];
}

export interface WeekSchedule {
  weekStart: string;
  weekEnd: string;
  weekNumber: number;
  days: DaySchedule[];
}

export interface TimetableSettings {
  startTime: string;
  endTime: string;
  timeSlotDuration: number;
  showWeekends: boolean;
  view: string;
  timezone: string;
}

export interface TimetableComponentProps {
  data: WeekSchedule;
  type?: 'student' | 'teacher';
  title?: string;
  subtitle?: string;
  showStats?: boolean;
  onSessionClick?: (sessionId: string) => void;
  onExport?: () => void;
}