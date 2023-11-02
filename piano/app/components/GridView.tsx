"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import InfiniteScroll from "react-infinite-scroll-component";

import { useAppDispatch } from "../redux/hooks";
import { setRollsList } from "../redux/features/rollsList";

import { Sequence } from "../types/Sequence";
import parseSvgElement from "../utils/parseSvgElement";
import generateRolls from "../utils/generateRolls";
import getRandomNotes from "../utils/getRandomNotes";

type Roll = { svgElement: string };

const GridView = ({ data }: { data: Sequence[] }) => {
  const [dataState, setData] = useState(data);
  const [rolls, setRolls] = useState<Roll[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const rollsList = generateRolls(dataState);
    dispatch(setRollsList({ items: rollsList }));

    setRolls(rollsList);
  }, [dataState, dispatch]);

  const fetchNewRolls = async () => {
    const newRolls = await getRandomNotes();
    setData((oldRolls) => [...oldRolls, ...newRolls]);
  };

  return (
    <InfiniteScroll
      className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 container gap-[2rem] m-auto"
      dataLength={rolls.length}
      next={fetchNewRolls}
      hasMore={true}
      loader={
        <>
          <div>Loading</div>
        </>
      }
    >
      {rolls.map((item, index) => {
        const svgElement = parseSvgElement(item.svgElement);
        return (
          <Link
            href={{
              pathname: "main-view",
              query: { id: index },
            }}
            key={index}
          >
            <div dangerouslySetInnerHTML={{ __html: svgElement?.outerHTML }} />
          </Link>
        );
      })}
    </InfiniteScroll>
  );
};
export default GridView;
