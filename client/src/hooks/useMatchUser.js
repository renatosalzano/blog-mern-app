import { useEffect, useState } from "react";

export const useMatchUser = (obj) => {
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    if (obj.id === obj.target_id) {
      return setMatched(true);
    }
    return setMatched(false);
  }, [obj]);

  return [matched];
};
