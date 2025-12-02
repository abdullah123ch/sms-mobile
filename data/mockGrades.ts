// data/mockGrades.ts
export interface Grade {
  id: string;
  assignmentName: string;
  courseName: string;
  courseCode: string;
  score: number;
  maxScore: number;
  percentage: number;
  letterGrade: string;
  submittedDate: string;
  gradedDate: string;
  feedback: string;
  category: string;
  status: string;
}

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

export const mockGrades: Grade[] = [
  {
    id: '1',
    assignmentName: 'Calculus Integration Quiz',
    courseName: 'Mathematics',
    courseCode: 'MATH-401',
    score: 87,
    maxScore: 100,
    percentage: 87,
    letterGrade: 'B+',
    submittedDate: '2024-03-15',
    gradedDate: '2024-03-18',
    feedback: 'Good understanding of integration techniques. Work on substitution methods.',
    category: 'quiz',
    status: 'graded'
  },
  {
    id: '2',
    assignmentName: 'Physics Lab Report #3',
    courseName: 'Physics',
    courseCode: 'PHYS-301',
    score: 92,
    maxScore: 100,
    percentage: 92,
    letterGrade: 'A-',
    submittedDate: '2024-03-12',
    gradedDate: '2024-03-16',
    feedback: 'Excellent analysis and clear methodology. Well-structured report.',
    category: 'assignment',
    status: 'graded'
  },
  {
    id: '3',
    assignmentName: 'Data Structures Final Project',
    courseName: 'Computer Science',
    courseCode: 'CS-202',
    score: 95,
    maxScore: 100,
    percentage: 95,
    letterGrade: 'A',
    submittedDate: '2024-03-20',
    gradedDate: '2024-03-25',
    feedback: 'Outstanding implementation of binary trees and graph algorithms.',
    category: 'project',
    status: 'graded'
  },
  {
    id: '4',
    assignmentName: 'Midterm Examination',
    courseName: 'English',
    courseCode: 'ENG-205',
    score: 78,
    maxScore: 100,
    percentage: 78,
    letterGrade: 'C+',
    submittedDate: '2024-03-08',
    gradedDate: '2024-03-12',
    feedback: 'Good analysis of themes but needs improvement in essay structure.',
    category: 'exam',
    status: 'graded'
  },
  {
    id: '5',
    assignmentName: 'Chemical Equations Quiz',
    courseName: 'Chemistry',
    courseCode: 'CHEM-101',
    score: 89,
    maxScore: 100,
    percentage: 89,
    letterGrade: 'B+',
    submittedDate: '2024-03-22',
    gradedDate: '2024-03-24',
    feedback: 'Strong grasp of balancing equations. Minor calculation errors.',
    category: 'quiz',
    status: 'graded'
  }
];

export const mockCourseGrades: CourseGrade[] = [
  {
    courseId: '1',
    courseName: 'Mathematics',
    courseCode: 'MATH-401',
    instructor: 'Dr. Sarah Johnson',
    currentGrade: 87.5,
    letterGrade: 'B+',
    creditHours: 4,
    courseAverage: 82.3,
    totalAssignments: 8,
    completedAssignments: 6
  },
  {
    courseId: '2',
    courseName: 'Physics',
    courseCode: 'PHYS-301',
    instructor: 'Prof. Michael Chen',
    currentGrade: 90.2,
    letterGrade: 'A-',
    creditHours: 4,
    courseAverage: 85.7,
    totalAssignments: 10,
    completedAssignments: 8
  },
  {
    courseId: '3',
    courseName: 'Computer Science',
    courseCode: 'CS-202',
    instructor: 'Dr. Emily Rodriguez',
    currentGrade: 93.8,
    letterGrade: 'A',
    creditHours: 3,
    courseAverage: 88.1,
    totalAssignments: 6,
    completedAssignments: 5
  },
  {
    courseId: '4',
    courseName: 'English',
    courseCode: 'ENG-205',
    instructor: 'Prof. David Williams',
    currentGrade: 81.4,
    letterGrade: 'B-',
    creditHours: 3,
    courseAverage: 79.6,
    totalAssignments: 7,
    completedAssignments: 6
  },
  {
    courseId: '5',
    courseName: 'Chemistry',
    courseCode: 'CHEM-101',
    instructor: 'Dr. Lisa Park',
    currentGrade: 86.7,
    letterGrade: 'B+',
    creditHours: 4,
    courseAverage: 83.9,
    totalAssignments: 9,
    completedAssignments: 7
  }
];

export const mockStudentProfile: StudentProfile = {
  studentId: 'ST-2024-001',
  name: 'Alex Thompson',
  email: 'alex.thompson@school.edu',
  program: 'Computer Science',
  year: 3,
  cumulativeGPA: 3.47,
  totalCreditHours: 87,
  currentSemester: 'Spring 2024'
};

export const mockPerformanceMetrics: PerformanceMetrics = {
  averageScore: 85.5,
  highestScore: 98,
  lowestScore: 72,
  improvementTrend: 'up',
  gradeDistribution: [
    { range: '90-100', count: 5, percentage: 25 },
    { range: '80-89', count: 8, percentage: 40 },
    { range: '70-79', count: 5, percentage: 25 },
    { range: '60-69', count: 2, percentage: 10 },
    { range: '<60', count: 0, percentage: 0 },
  ]
};

export const getGradeColor = (percentage: number) => {
  if (percentage >= 90) return 'text-green-600';
  if (percentage >= 80) return 'text-blue-600';
  if (percentage >= 70) return 'text-yellow-600';
  if (percentage >= 60) return 'text-orange-600';
  return 'text-red-600';
};

export const getGradeBgColor = (percentage: number) => {
  if (percentage >= 90) return 'bg-green-100 dark:bg-green-900/20';
  if (percentage >= 80) return 'bg-blue-100 dark:bg-blue-900/20';
  if (percentage >= 70) return 'bg-yellow-100 dark:bg-yellow-900/20';
  if (percentage >= 60) return 'bg-orange-100 dark:bg-orange-900/20';
  return 'bg-red-100 dark:bg-red-900/20';
};