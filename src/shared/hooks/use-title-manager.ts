import { useMatches, type UIMatch } from "react-router-dom";
import { useEffect } from "react";

const useTitleManager = () => {
  const matches = useMatches() as UIMatch<unknown, { title: string }>[];

  useEffect(() => {
    const current = matches.find((m) => m.handle?.title);
    const title = current?.handle?.title;
    if (title) document.title = title;
  }, [matches]);
};

export default useTitleManager;
