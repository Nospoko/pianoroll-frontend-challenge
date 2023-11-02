"use client";
import { redirect } from "next/navigation";
import MainView from "../components/MainView";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const itemId = searchParams.id;

  if (!itemId) {
    redirect("/");
  }
  return (
    <div className="h-[calc(100vh-44px)]">
      <MainView itemId={+itemId} />
    </div>
  );
};

export default Page;
