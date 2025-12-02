import React from 'react';
import TimetableComponent from '../../../../components/timetable/TimetableComponent';
import { getCurrentWeekSchedule } from '../../../../data/mockTimetable';

const StudentTimetablePage = () => {
  const handleSessionClick = (sessionId: string) => {
    console.log('Student session clicked:', sessionId);
  };

  const handleExport = () => {
    console.log('Export student timetable');
  };

  return (
    <TimetableComponent
      data={getCurrentWeekSchedule()}
      type="student"
      title="Timetable"
      onSessionClick={handleSessionClick}
      onExport={handleExport}
    />
  );
};

export default StudentTimetablePage;