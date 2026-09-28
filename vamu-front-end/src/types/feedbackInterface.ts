export interface FeedbacksReviewsProps{
  tag_id:number;
  label:string;
  type:"POSITIVE" | "NEGATIVE";
  total_count : string | number;
}
export interface FeedbackData{
  positive: FeedbacksReviewsProps[];
  negative : FeedbacksReviewsProps[];
}