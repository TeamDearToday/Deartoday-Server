export interface TimeTravelCreateDto {
  userId: string;
  title: string;
  image: string;
  year: number;
  month: number;
  day: number;
  currentDate: string;
  questions: string[];
  answers: string[];
}
