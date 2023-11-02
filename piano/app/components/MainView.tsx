import { useAppSelector } from "../redux/hooks";
import Link from "next/link";
import parseSvgElement from "../utils/parseSvgElement";
import { redirect } from "next/navigation";

const MainView = ({ itemId }: { itemId: number }) => {
  const rollsList = useAppSelector((state) => state.rollsList.items);
  if (!rollsList || itemId === undefined) {
    redirect("/");
  }
  const mainRoll = parseSvgElement(rollsList[itemId].svgElement);

  return (
    <div className="flex flex-col md:grid grid-cols-12 gap-[2rem] container m-auto h-full">
      <div className="flex flex-col container m-auto  md:col-span-9 lg:col-span-10 h-full">
        Piano Roll number {itemId}
        <div
          className="h-[50vh] flex items-start"
          dangerouslySetInnerHTML={{ __html: mainRoll.outerHTML }}
        ></div>
      </div>
      <div className="md:col-span-3  lg:col-span-2 flex flex-col gap-[2rem] overflow-auto">
        {rollsList.map((roll, index) => {
          const svgElement = parseSvgElement(roll.svgElement);
          return (
            <Link
              key={index}
              href={{
                pathname: "/main-view",
                query: { id: index },
              }}
              className=" h-[20vh] md:h-[15vh]"
              dangerouslySetInnerHTML={{ __html: svgElement.outerHTML }}
            ></Link>
          );
        })}
      </div>
    </div>
  );
};

export default MainView;
