// types/results.ts
export interface CourseGrade {
  courseId: string;
  courseName: string;
  courseCode: string;
  instructor: string;
  currentGrade: number;
  letterGrade: string;
  creditHours: number;
  courseAverage: number;
  totalAssignments: number;
  completedAssignments: number;
}

export interface StudentProfile {
  studentId: string;
  name: string;
  email: string;
  program: string;
  year: number;
  cumulativeGPA: number;
  totalCreditHours: number;
  currentSemester: string;
}

export interface PerformanceMetrics {
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  improvementTrend: 'up' | 'down' | 'stable';
  gradeDistribution: {
    range: string;
    count: number;
    percentage: number;
  }[];
}