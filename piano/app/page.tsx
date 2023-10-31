import GridView from "./components/GridView";
import getRandomNotes from "./utils/getRandomNotes";
export default async function Home() {
  const data = await getRandomNotes();

  return (
    <main className={`text-[1.6rem] h-full`}>
      <GridView data={data} />
    </main>
  );
}
