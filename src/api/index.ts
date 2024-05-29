import { get } from "@/utils/http/methods";

interface rate {
  count: number;
}
interface result {
  discount: number;
  message: string;
  status: number;
}

export function RateRequest(params: rate) {
  return get<result>(`/job/discount.php/?count=${params.count}`);
}
